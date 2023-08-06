import {renderHook, act} from "@testing-library/react";
import {useStable} from "./index";

describe('useStable', () => {
    it('returns the initial object', () => {
        const object = {a: 1};
        const {result} = renderHook(() => useStable(object));
        expect({...result.current}).toStrictEqual(object);
    });

    it('returns the initial function invocation result', () => {
        const object = {a: 1};
        const {result} = renderHook(() => useStable(() => object));
        expect({...result.current}).toStrictEqual(object);
    });

    it('returns the same reference on updates', () => {
        let object = {a: 1};
        const {result, rerender} = renderHook(() => useStable(object));
        const firstRef = result.current;
        object = {a: 2};
        rerender();
        const secondRef = result.current;
        expect(firstRef).toBe(secondRef);
    });

    it('reflects the updated state', () => {
        let object = {a: 1};
        const {result, rerender} = renderHook(() => useStable(object));
        expect(result.current.a).toBe(1);
        object = {a: 2};
        rerender();
        expect(result.current.a).toBe(2);
    });

    it('allows property access', () => {
        const object = {a: 1};
        const {result} = renderHook(() => useStable(object));
        expect(result.current.a).toBe(1);
    });

    it('allows property assignment', () => {
        const object = {a: 1};
        const {result} = renderHook(() => useStable(object));
        act(() => {
            result.current.a = 2;
        });
        expect(result.current.a).toBe(2);
    });

    it('allows property deletion', () => {
        const object = {a: 1};
        const {result} = renderHook(() => useStable(object));
        act(() => {
            delete result.current.a;
        });
        expect('a' in result.current).toBe(false);
    });

    it('allows method calls', () => {
        const object = {
            a: 1,
            increment() {
                this.a += 1;
            },
        };
        const {result} = renderHook(() => useStable(object));
        act(() => {
            result.current.increment();
        });
        expect(result.current.a).toBe(2);
    });

    it('reflects updates to the original object', () => {
        let object = {a: 1};
        const {result, rerender} = renderHook(() => useStable(object));
        object.a = 2;
        rerender();
        expect(result.current.a).toBe(2);
    });

    it('reflects the updated state and deps', () => {
        let object = {a: 1};
        let deps = [1]
        const {result, rerender} = renderHook(() => useStable(object, deps));
        object = {a: 2};
        rerender();
        expect(result.current.a).toBe(1);
        deps = [2]
        rerender();
        expect(result.current.a).toBe(2);
    });
});