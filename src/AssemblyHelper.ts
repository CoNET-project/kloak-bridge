import { AssemblyCallback, KloakFileIndex } from './define';

class AssemblyHelper {
    private callback: AssemblyCallback
    private currentOffset: number = 0;
    private currentProgress: number = 0;
    private index: KloakFileIndex | undefined;
    private workerInstance: Worker | undefined;
    private chunks: Array<string> = [];
    constructor(index: KloakFileIndex, callback: AssemblyCallback) {
        this.callback = callback;
        this.index = index;
        this.init();
    }

    private init = async () => {
        this.workerInstance = await this.createWorker();
        this.chunks = Object.values((this.index as KloakFileIndex).chunks);
        this.next();
    }

    private next = () => {
        const nextChunk = this.chunks.shift();
        if (nextChunk) {
            return this.callback(null, this.currentProgress, nextChunk);
        }
        return this.finish();
    }

    public append = (uuid: string, data: Uint8Array, done?: boolean) => {
        if (done) {
            return this.workerInstance?.postMessage({ command: 'DONE' });
        }
        const cmd = {
            command: 'APPEND',
            uuid,
            payload: data.buffer
        };
        this.currentOffset += data.byteLength;
        if (this.index) {
            this.currentProgress = Math.round((this.currentOffset / this.index?.lastOffset) * 100);
        }
        return this.workerInstance?.postMessage(cmd, [data.buffer]);
    }

    private finish = () => {
        const cmd = {
            command: 'BUILD'
        };
        return this.workerInstance?.postMessage(cmd);
    }

    private workerFn = () => {
        let totalUint8: Uint8Array = new Uint8Array();
        // eslint-disable-next-line no-restricted-globals,no-undef
        self.addEventListener('message', (evt: MessageEvent) => {
            const { command, payload } = evt.data;
            switch (command) {
                case 'APPEND':
                    if (!totalUint8) {
                        totalUint8 = new Uint8Array(payload);
                    } else {
                        let nextUint8Array: Uint8Array | null = new Uint8Array(payload);
                        let tempUint8Array: Uint8Array | null = new Uint8Array(totalUint8.byteLength + nextUint8Array.byteLength);
                        tempUint8Array.set(totalUint8, 0);
                        tempUint8Array.set(nextUint8Array, totalUint8.byteLength);
                        totalUint8 = tempUint8Array;
                        tempUint8Array = null;
                        nextUint8Array = null;
                    }
                    // eslint-disable-next-line no-restricted-globals
                    // @ts-ignore
                    // eslint-disable-next-line no-restricted-globals
                    return self.postMessage({ command: 'APPEND_NEXT' });
                case 'BUILD':
                    // eslint-disable-next-line no-restricted-globals
                    // @ts-ignore
                    // eslint-disable-next-line no-restricted-globals
                    return self.postMessage({ command: 'COMPLETE_DATA', payload: totalUint8.buffer }, [totalUint8.buffer]);
                default:
                    return payload;
            }
        });
    }

    private messageChannel = (evt: MessageEvent) => {
        const { command, payload } = evt.data;
        switch (command) {
            case 'APPEND_NEXT':
                this.next();
                break;
            case 'COMPLETE_DATA':
                this.callback(null, 0, '', payload);
                break;
            default:
                break;
        }
    }

    private createWorker = (): Promise<Worker> => (
        new Promise<Worker>((resolve, reject) => {
            // eslint-disable-next-line no-undef
            if (!window.Worker === undefined || Worker === undefined) {
                reject(new Error('Web Workers are not supported.'));
            }
            const url = URL.createObjectURL(new Blob([`(${this.workerFn.toString()})()`], { type: 'text/javascript' }));
            const worker = new Worker(url);
            worker.addEventListener('message', this.messageChannel);
            URL.revokeObjectURL(url);
            resolve(worker);
        })
    )
}

export default AssemblyHelper;
