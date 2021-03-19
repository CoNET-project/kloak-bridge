require("fake-indexeddb/auto");
import IDBDatabaseHelper from '../IDBDatabaseHelper';



describe("IDBDatabaseHelper Class", () => {
    const uuid = "5f586bb1-dbee-43c0-861e-5c0dd6911b5c";
    const testData = {
        filename: "myfile.txt",
        size: 124,
        date: new Date()
    }

    test("Should successfully return an object store", (done) => {
        const idb = new IDBDatabaseHelper();
        const initCallback = jest.fn((err: any, objectStore: IDBObjectStore | null) => {
            expect(typeof objectStore?.name).toBe('string');
            done();
        });

        idb.init(initCallback);
    })

    test('Should save data into IndexedDB', (done) => {
        const idb = new IDBDatabaseHelper();
        const saveCallback = jest.fn((result: string) => {
            expect(result).toBe(uuid);
            done();
        })
        idb.save(uuid, testData).then(saveCallback).catch(err => {
            expect(err).toBe(null);
        })
    })

    test('Should delete data from IndexedDB', (done) => {
        const idb = new IDBDatabaseHelper();

        const deleteCallback = jest.fn((result: string) => {
            expect(result).toBe(uuid);
            done();
        })

        idb.save(uuid, testData).then(uuid => {
            idb.delete(uuid).then(deleteCallback).catch(err => expect(err).toBe(null));
        })
    })
})



