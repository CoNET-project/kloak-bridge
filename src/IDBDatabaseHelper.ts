interface IDBDatabaseEventTarget extends EventTarget {
    result?: IDBDatabase | any
}

class IDBDatabaseHelper {

    private databaseName: string = 'kloak';
    private version: number = 1;

    constructor(databaseName?: string, version?: number) {
        if (databaseName) this.databaseName = databaseName;
        if (version) this.version = version;
    }

    public getObjectStore = (): Promise<IDBObjectStore> => new Promise<IDBObjectStore>((resolve, reject) => {
        // eslint-disable-next-line no-undef
        const req = indexedDB.open(this.databaseName, this.version);
        req.onupgradeneeded = async (evt: IDBVersionChangeEvent): Promise<any> => {
            try {
                const db = await (evt.target as IDBDatabaseEventTarget).result;
                const objectStore = await db.createObjectStore('data');
                resolve(objectStore);
            } catch (err: any) {
                reject(err);
            }
        };

        req.onsuccess = async (evt) => {
            try {
                const db = await (evt.target as IDBDatabaseEventTarget).result;
                const tx: IDBTransaction = await db.transaction('data', 'readwrite') as IDBTransaction;
                const objectStore = await tx.objectStore('data');
                resolve(objectStore);
            } catch (err: any) {
                reject(err);
            }
        };
    });

    public save = (uuid: string, data: any): Promise<string> => new Promise<string>(async (resolve, reject) => {
        try {
            const objectStore = await this.getObjectStore();
            const storeAction = await objectStore?.put(JSON.stringify(data), uuid);
            storeAction.onsuccess = () => resolve(uuid);
            storeAction.onerror = (evt: Event) => reject(evt);
        } catch (err) {
            reject(err);
        }
    });

    public retrieve = (uuid: string): Promise<any> => new Promise<any>(async (resolve, reject) => {
        try {
            const objectStore = await this.getObjectStore();
            const storeAction = await objectStore?.get(uuid);
            storeAction.onsuccess = (evt: Event) => {
                const data = (evt.target as IDBDatabaseEventTarget).result;
                try {
                    const json = JSON.parse(data);
                    return resolve(json);
                } catch (_) {
                    return resolve(data);
                }
            };
        } catch (err) {
            return reject(err);
        }
    });

    public delete = (uuid: string): Promise<string> => new Promise<string>(async (resolve, reject) => {
        try {
            const objectStore = await this.getObjectStore();
            const storeAction = await objectStore?.delete(uuid);
            storeAction.onsuccess = () => resolve(uuid);
            storeAction.onerror = (evt: Event) => reject(evt);
        } catch (err) {
            reject(err);
        }
    })
}

export default IDBDatabaseHelper;
