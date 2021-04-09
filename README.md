# Kloak Bridge

The Kloak Bridge library.

## Usage

Add an authorization token for reading packages in the GitHub package repository under the `@conet-project` organization to your `~/.npmrc`.

Add the package repository to your project `.yarnrc`:

```
"@conet-project:registry" "https://npm.pkg.github.com/"
```

Add the dependency to your project:

```bash
yarn add @conet-project/kloak-bridge
```

Import StorageHelper from package and initialize new instance.

```typescript
import { StorageHelper} from '@conet-project/kloak-bridge';
const storageHelper = new StorageHelper();
```

Create a KeyContainer using StorageHelper and save into IndexedDB.

```typescript
const keyChainContainer = await storageHelper.createKeyContainer('mysupersecretpassword')
```

Check if a KeyContainer exists in IndexedDB.
```typescript
const hasKeyContainer = await storageHelper.checkKeyContainer();
```

Unlock a KeyContainer from IndexedDB. (Will perform a check before).
```typescript
const unlocked = await storageHelper.unlockContainer('mysupersecretpassword');
```

