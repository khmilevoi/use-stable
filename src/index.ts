import {DependencyList, useEffect, useMemo, useRef, useState} from "react";

export function useStable<T extends object>(factory: T | (() => T), deps?: DependencyList): T {
    const isFirstRef = useRef(true);

    const valueRef = useRef<T>();

    const resolveFactory = () => {
        if (typeof factory === 'function') {
            valueRef.current = factory();
        } else {
            valueRef.current = factory;
        }
    }

    if (isFirstRef.current) {
        resolveFactory();
        isFirstRef.current = false;
    }

    useEffect(() => {
        resolveFactory()
    }, deps)

    return useMemo(() => {
        const handler = Object.getOwnPropertyNames(Reflect).reduce<ProxyHandler<T>>((result, key) => {
            const prop = key as keyof ProxyHandler<T>

            return ({
                ...result,
                [prop]: (target, ...args: any[]) => {
                    // @ts-ignore
                    return Reflect[prop](valueRef.current, ...args)
                }
            })
        }, {} as ProxyHandler<T>)

        return new Proxy<T>({} as T, handler);
    }, [])
}
