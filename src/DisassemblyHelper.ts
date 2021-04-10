import {
    DisassemblyCallback,
    DisassemblyOptions,
    DisassemblySource,
    KloakFileMetadata,
    KloakFileIndex
} from './define';
import { getUUIDv4 } from './utils';

class DisassemblyHelper {
    private fileUUID: string
    private source: DisassemblySource;
    private callback: DisassemblyCallback;
    private metadata: KloakFileMetadata = {
        uuid: '',
        name: '',
        extension: '',
        size: 0,
        type: '',
        uploadDate: new Date()
    };
    private index: KloakFileIndex = {
        chunks: {},
        lastOffset: 0,
        eof: false
    }
    private options: DisassemblyOptions = {
        chunkSize: 1_048_576,
        noEncrypt: false
    }

    constructor(source: DisassemblySource, callback: DisassemblyCallback, options?: DisassemblyOptions) {
        this.source = source;
        this.callback = callback;
        this.fileUUID = getUUIDv4();
        this.metadata.uuid = this.fileUUID;
        if (options) {
            if (options.chunkSize) {
                this.options.chunkSize = options.chunkSize;
            }
            if (options.noEncrypt) {
                this.options.noEncrypt = options.noEncrypt;
            }
        }
        this.start().then((_) => {});
    }

    private start = async () => {
        try {
            this.metadata = await this.getMetadata();
            await this.disassemble();
        } catch (err) {
            return this.callback(err, {});
        }
    }

    private getMetadata = (): Promise<KloakFileMetadata> => (
        new Promise<KloakFileMetadata>((resolve, reject) => {
            if (!this.source) {
                return reject(new Error('No source detected'));
            }
            const metadata: KloakFileMetadata = {
                uuid: this.fileUUID,
                name: '',
                extension: '',
                size: 0,
                type: '',
                uploadDate: new Date()
            };
            switch (true) {
                case this.source instanceof Blob:
                    metadata.name = getUUIDv4();
                    metadata.extension = (this.source as Blob).type.split('/').pop() || '';
                // eslint-disable-next-line no-fallthrough
                case this.source instanceof File:
                    metadata.name = (this.source as File).name;
                    metadata.extension = (this.source as File).name.split('.').pop() || '';
                    metadata.size = (this.source as File | Blob).size;
                    metadata.type = (this.source as File | Blob).type;
                    break;
                default:
                    break;
            }
            resolve(metadata);
        })
    )

    private disassemble = async (): Promise<any> => {
        const chunkUUID = getUUIDv4();
        const startOffset = this.index.lastOffset;
        const endOffset = startOffset + this.options.chunkSize;
        this.index.chunks[this.index.lastOffset] = chunkUUID;
        const buffer = new Uint8Array(await this.source.slice(startOffset, endOffset).arrayBuffer());
        this.index.lastOffset += buffer.byteLength;
        const progress = Math.round((this.index.lastOffset / this.metadata.size) * 100);
        const eof = this.index.lastOffset >= this.metadata.size;
        if (eof) {
            this.index.eof = eof;
            return this.callback(null, { chunk: { uuid: chunkUUID, data: buffer }, progress, metadata: this.metadata, index: this.index });
        }
        this.callback(null, { chunk: { uuid: chunkUUID, data: buffer }, progress }, () => this.disassemble());
    }
}

export default DisassemblyHelper;
