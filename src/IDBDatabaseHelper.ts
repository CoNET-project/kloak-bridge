interface IDBDatabaseEventTarget extends EventTarget {
    result?: IDBDatabase | any
}

let db: IDBDatabase;

const getIDBDatabaseHelper = async () => {
    const openDB = () => (
        new Promise<IDBDatabase>((resolve, _) => {
            const openRequest = indexedDB.open('kloak', 1);

            openRequest.onupgradeneeded = (evt: IDBVersionChangeEvent) => {
                const db = (evt.target as IDBDatabaseEventTarget).result;
                db.createObjectStore('data');
                resolve(db);
            };

            openRequest.onsuccess = (evt) => {
                const db = (evt.target as IDBDatabaseEventTarget).result;
                resolve(db);
            };
        })
    );

    if (!db) {
        db = await openDB();
    }

    const getTx = () => db.transaction(['data'], 'readwrite');

    const save = (
        tx: IDBTransaction,
        key: string,
        data: any
    ): Promise<string> => (
        new Promise<string>(async (resolve, reject) => {
            try {
                const objectStore = tx.objectStore('data');
                const putRequest = objectStore.put(JSON.stringify(data), key);

                putRequest.onsuccess = () => resolve(key);

                putRequest.onerror = (evt: Event) => reject(evt);
            } catch (err) {
                reject(err);
            }
        })
    );

    const clearObjectStore = (
        tx: IDBTransaction
    ): Promise<boolean> => (
        new Promise<boolean>(async (resolve, _) => {
            const objectStore = tx.objectStore('data');
            const clearRequest = objectStore.clear();

            clearRequest.onsuccess = () => resolve(true);

            clearRequest.onerror = () => resolve(false);
        })
    );

    const destroy = (
        tx: IDBTransaction,
        key: string
    ): Promise<string> => (
        new Promise<string>(async (resolve, reject) => {
            try {
                const objectStore = tx.objectStore('data');
                const deleteRequest = objectStore.delete(key);

                deleteRequest.onsuccess = () => resolve(key);

                deleteRequest.onerror = (evt: Event) => reject(evt);
            } catch (err) {
                reject(err);
            }
        })
    );

    const retrieve = (
        tx: IDBTransaction,
        key: string
    ) => (
        new Promise<any>(async (resolve, reject) => {
            try {
                const objectStore = tx.objectStore('data');
                const getRequest = objectStore.get(key);

                getRequest.onsuccess = (evt: Event) => {
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
        })
    );

    return {
        getTx,
        save,
        clearObjectStore,
        destroy,
        retrieve
    };
};

export default getIDBDatabaseHelper;

// class IDBDatabaseHelper {
//
//     private database: IDBDatabase;
//     private databaseName: string = 'kloak';
//     private version: number = 1;
//
//     constructor(databaseName?: string, version?: number) {
//         if (databaseName) this.databaseName = databaseName;
//         if (version) this.version = version;
//         this.init();
//     }
//
//     public init = () => {
//         const req = indexedDB.open(this.databaseName, this.version);
//         req.onupgradeneeded = (evt: IDBVersionChangeEvent) => {
//             const db = (evt.target as IDBDatabaseEventTarget).result;
//             db.createObjectStore('data');
//         };
//
//         req.onsuccess = (evt) => {
//             const db = (evt.target as IDBDatabaseEventTarget).result;
//             this.database = db;
//         };
//     }
//
//     public getTransaction = () => this.database?.transaction('data', 'readwrite')
//
//     public clearObjectStore = (tx: IDBTransaction): Promise<boolean> => (
//         new Promise<boolean>(async (resolve, _) => {
//             const objectStore = tx.objectStore('data');
//             const storeAction = objectStore.clear();
//             storeAction.onsuccess = () => {
//                 resolve(true);
//             };
//             storeAction.onerror = () => resolve(false);
//         })
//     )
//
//     public save = (tx: IDBTransaction, uuid: string, data: any): Promise<string> => new Promise<string>(async (resolve, reject) => {
//         try {
//             const objectStore = tx.objectStore('data');
//             const storeAction = objectStore.put(JSON.stringify(data), uuid);
//             storeAction.onsuccess = () => {
//                 resolve(uuid);
//             };
//             storeAction.onerror = (evt: Event) => reject(evt);
//         } catch (err) {
//             reject(err);
//         }
//     });
//
//     public retrieve = (tx: IDBTransaction, uuid: string): Promise<any> => new Promise<any>(async (resolve, reject) => {
//         try {
//             const objectStore = tx.objectStore('data');
//             const storeAction = objectStore.get(uuid);
//             storeAction.onsuccess = (evt: Event) => {
//                 const data = (evt.target as IDBDatabaseEventTarget).result;
//                 try {
//                     const json = JSON.parse(data);
//                     return resolve(json);
//                 } catch (_) {
//                     return resolve(data);
//                 }
//             };
//         } catch (err) {
//             return reject(err);
//         }
//     });
//
//     public delete = (tx: IDBTransaction, uuid: string): Promise<string> => new Promise<string>(async (resolve, reject) => {
//         try {
//             const objectStore = tx.objectStore('data');
//             const storeAction = objectStore.delete(uuid);
//             storeAction.onsuccess = () => {
//                 resolve(uuid);
//             };
//             storeAction.onerror = (evt: Event) => reject(evt);
//         } catch (err) {
//             reject(err);
//         }
//     })
// }
//
// export default IDBDatabaseHelper;
