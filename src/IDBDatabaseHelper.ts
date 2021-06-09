interface IDBDatabaseEventTarget extends EventTarget {
    result?: IDBDatabase | any
}

let db: IDBDatabase;

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

const getTx = (type: 'readonly' | 'readwrite' | 'versionchange') => db.transaction(['data'], type);

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

const getIDBDatabaseHelper = async () => {
    if (!db) {
        db = await openDB();
    }

    return {
        getTx,
        save,
        clearObjectStore,
        destroy,
        retrieve
    };
};

export default getIDBDatabaseHelper;
