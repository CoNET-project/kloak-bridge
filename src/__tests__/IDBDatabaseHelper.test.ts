import IDBDatabaseHelper from '../IDBDatabaseHelper';
require('fake-indexeddb/auto');

describe('IDBDatabaseHelper Class', () => {
    const fileUuid = '5f586bb1-dbee-43c0-861e-5c0dd6911b5c';
    const testData = {
        filename: 'myfile.txt',
        size: 124,
        date: (new Date()).toISOString()
    };

    test('Should successfully return an object store', async () => {
        const idb = new IDBDatabaseHelper();
        const objectStore = await idb.getObjectStore();
        expect(objectStore).toBeTruthy();
    });

    test('Should save data into IndexedDB', async () => {
        const idb = new IDBDatabaseHelper();
        const uuid = await idb.save(fileUuid, testData);
        expect(uuid).toBe(fileUuid);
    });

    test('Should retrieve data from IndexedDB', async () => {
        const idb = new IDBDatabaseHelper();
        await idb.save(fileUuid, testData);
        const retrievedData = await idb.retrieve(fileUuid);
        expect(retrievedData).toStrictEqual(testData);
    });

    test('Should retrieve data from IndexedDB but fail', async () => {
        const idb = new IDBDatabaseHelper();
        const retrievedData = await idb.retrieve('randomUUID');
    });

    test('Should delete data from IndexedDB', async () => {
        const idb = new IDBDatabaseHelper();
        await idb.save(fileUuid, testData);
        const deleteUuid = await idb.delete(fileUuid);
        expect(deleteUuid).toBe(fileUuid);
    });
});
