interface IDBDatabaseEventTarget extends EventTarget {
    result?: IDBDatabase | any
}

class IDBDatabaseHelper {

    constructor(private databaseName = 'kloak', private version: number = 1) {}

    public init = (callback: (err: any, objectStore: IDBObjectStore | null) => void) => {
        const req = indexedDB.open(this.databaseName, this.version);
        req.onupgradeneeded = (evt: IDBVersionChangeEvent): void => {
            try {
                const db = (evt.target as IDBDatabaseEventTarget).result;
                db.createObjectStore("data");
            } catch (err: any) {
                callback(err, null)
                console.log("IDBDatabaseHelper error:", err)
            }
        }

        req.onsuccess = async (evt) => {
            try {
                const db = await (evt.target as IDBDatabaseEventTarget).result;
                const tx: IDBTransaction = await db.transaction('data', 'readwrite') as IDBTransaction;
                const objectStore = await tx.objectStore('data')
                callback(null, objectStore)
            } catch (err: any) {
                callback(err, null)
                console.log("IDBDatabaseHelper error:", err);
            }
        }
    }

    public save = (uuid: string, data: any): Promise<any> => {
        return new Promise((resolve, reject) => {
            this.init((err, objectStore) => {
                if (err) {
                    return reject(err)
                }
                if (objectStore) {
                    try {
                        objectStore.put(JSON.stringify(data), uuid).onsuccess = () => {
                            return resolve(uuid)
                        }
                    } catch (err: any) {
                        return reject(err)
                    }
                }
            })
        })
    }

    public delete = (uuid: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            this.init((err, objectStore) => {
                if (err) {
                    return reject(err);
                }
                if (objectStore) {
                    try {
                        objectStore.delete(uuid).onsuccess = () => {
                            return resolve(uuid);
                        }
                    } catch (err: any) {
                        return reject(err);
                    }
                }
            })
        })
    }
}

export default IDBDatabaseHelper
