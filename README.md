# @bndl-io/use-local-storage

A TypeScript-friendly React hook for managing local storage values as component state, with compatibility for private or unsupported environments.

## Installation

```bash
npm install @bndl-io/use-local-storage
```

## Features

- Simple interface to use local storage with React state management.
- Supports environments where local storage is unavailable (e.g., private browsing mode).
- Automatically syncs values across multiple tabs.

## Usage

Import the hook and use it in your functional React component:

```typescript
import useLocalStorageValue from '@bndl-io/use-local-storage';

const MyComponent: React.FC = () => {
  const [name, setName] = useLocalStorageValue<string>('username');

  return (
    <div>
      <input
        type="text"
        value={name || ''}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Your name is: {name}</p>
    </div>
  );
};
```

### API

```typescript
const [value, setValue] = useLocalStorageValue<T>(key: string): [T | null, (value: T) => void];
```

- **key**: `string` - The key to be used in local storage.
- **value**: `T | null` - The current value stored in local storage, parsed as an object.
- **setValue**: `(value: T) => void` - Function to update the value in both local storage and state.

### Example

```typescript
import useLocalStorageValue from '@bndl-io/use-local-storage';

const [counter, setCounter] = useLocalStorageValue<number>('counter');

setCounter(prev => (prev ?? 0) + 1);
```

This hook can be used to persist and manipulate any serializable value in local storage.

## Safe Storage Handling

The hook uses a `safeLocalStorage` implementation to ensure the code works even in environments where access to local storage may be restricted (such as private browsing).

## License

MIT
