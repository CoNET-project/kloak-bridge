interface IDBDatabaseEventTarget extends EventTarget {
    result?: IDBDatabase | any
}

class IDBDatabaseHelper {

    private database: IDBDatabase | null = null
    private databaseName: string = 'kloak';
    private version: number = 1;

    constructor(databaseName?: string, version?: number) {
        if (databaseName) this.databaseName = databaseName;
        if (version) this.version = version;
        this.init();
    }

    public init = () => {
        const req = indexedDB.open(this.databaseName, this.version);
        req.onupgradeneeded = (evt: IDBVersionChangeEvent) => {
            const db = (evt.target as IDBDatabaseEventTarget).result;
            db.createObjectStore('data');
        };

        req.onsuccess = (evt) => {
            const db = (evt.target as IDBDatabaseEventTarget).result;
            this.database = db;
        };
    }

    public getTransaction = () => this.database?.transaction('data', 'readwrite')

    public clearObjectStore = (tx: IDBTransaction): Promise<boolean> => (
        new Promise<boolean>(async (resolve, _) => {
            // eslint-disable-next-line no-param-reassign
            tx.oncomplete = () => resolve(true);
            // eslint-disable-next-line no-param-reassign
            tx.onerror = (err) => {
                console.log(err);
                return resolve(false);
            };
            const objectStore = tx.objectStore('data');
            const storeAction = objectStore.clear();
            storeAction.onsuccess = () => {};
            storeAction.onerror = () => resolve(false);
        })
    )

    public save = (tx: IDBTransaction, uuid: string, data: any): Promise<string> => new Promise<string>(async (resolve, reject) => {
        try {
            // eslint-disable-next-line no-param-reassign
            tx.oncomplete = () => resolve(uuid);
            // eslint-disable-next-line no-param-reassign
            tx.onerror = (err) => console.log(err);
            const objectStore = tx.objectStore('data');
            const storeAction = objectStore.put(JSON.stringify(data), uuid);
            storeAction.onsuccess = () => {};
            storeAction.onerror = (evt: Event) => reject(evt);
        } catch (err) {
            reject(err);
        }
    });

    public retrieve = (tx: IDBTransaction, uuid: string): Promise<any> => new Promise<any>(async (resolve, reject) => {
        try {
            // eslint-disable-next-line no-param-reassign
            tx.oncomplete = () => resolve(uuid);
            // eslint-disable-next-line no-param-reassign
            tx.onerror = (err) => console.log(err);
            const objectStore = tx.objectStore('data');
            const storeAction = objectStore.get(uuid);
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

    public delete = (tx: IDBTransaction, uuid: string): Promise<string> => new Promise<string>(async (resolve, reject) => {
        try {
            // eslint-disable-next-line no-param-reassign
            tx.oncomplete = () => resolve(uuid);
            // eslint-disable-next-line no-param-reassign
            tx.onerror = (err) => console.log(err);
            const objectStore = tx.objectStore('data');
            const storeAction = objectStore.delete(uuid);
            storeAction.onsuccess = () => {};
            storeAction.onerror = (evt: Event) => reject(evt);
        } catch (err) {
            reject(err);
        }
    })
}

export default IDBDatabaseHelper;
