# useStable Hook

The `useStable` is a custom React Hook that ensures the stability of the object passed to it. This is especially useful when you want to maintain the same object reference across re-renders to prevent unnecessary component updates.

## Usage

The `useStable` hook takes two parameters:

1. `factory`: This can either be an object or a function that returns an object. This is the object whose stability you want to ensure.

2. `deps`: This is the list of dependencies for the object. The object will only be updated if the dependencies specified in this list change.

Here is a simple example of how you could use this hook:

```jsx
import { useStable } from '@khmilevoi/use-stable';

function MyComponent() {
    const stableObject = useStable(() => ({ prop: 'value' }), [dependency]);

    //...
}
```

In this example, `stableObject` will always maintain the same reference unless the `dependency` changes.

## How it works
The `useStable` hook works by using a `useRef` to store the object, and a `useEffect` to update the object whenever the dependencies change. It also uses a `useMemo` to create a new proxy object that forwards all operations to the stored object, ensuring that the object reference remains stable even if the underlying object changes.

Please note that this hook only guarantees the stability of the top-level object reference. If the object contains nested properties, these properties may still be updated.

## Caveats
This hook relies on JavaScript's `Proxy` object, which is not available in all environments. If you need to support older browsers that do not support `Proxy`, you may need to include a polyfill.

In addition, it's important to note that this hook is not a replacement for properly managing state and dependencies in your React components. It should be used judiciously and as a last resort when other strategies for maintaining stable references are not suitable.

## Contribute
Contributions are always welcome! If you have any ideas or suggestions, feel free to open an issue or submit a pull request.
