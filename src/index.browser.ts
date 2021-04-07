import 'core-js/stable';
import 'regenerator-runtime/runtime';
import StorageHelper from './StorageHelper';

if (window !== undefined) {
    // @ts-ignore
    window.KloakBridge = StorageHelper;
}

export default StorageHelper;
