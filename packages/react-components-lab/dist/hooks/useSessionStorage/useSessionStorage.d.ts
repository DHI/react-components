declare function useSessionStorage<T>(key: string, initialValue?: T): [T, (value: T) => void];
export default useSessionStorage;
