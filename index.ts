import StorageHelper from './src/StorageHelper';

const init = async () => {
    const storageHelper = new StorageHelper();

    const keyContainer = await storageHelper.createContainer('mypassword');
    console.log(JSON.stringify(keyContainer));
};

init();
