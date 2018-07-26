export type MapFunc<T, R> = <K extends keyof T>(k: K, v: T[K]) => R

export function forEach<T>(source: T, func: MapFunc<T, void>): void {
    // tslint:disable-next-line:forin
    for (const key in source) {
        func(key, source[key])
    }
}

export type PropertyFactory<T, K extends keyof T> = (k: K) => T[K]

export type Factory<T> = {
    readonly [K in keyof T]-?: PropertyFactory<T, K>
}

export function copyProperty<T>(value: T): <K extends keyof T>(k: K) => T[K] {
    return (k) => value[k]
}

export type MutableOptional<T> = {
    [K in keyof T]?: T[K]
}

function fromMutableOptional<T>(v: MutableOptional<T>): T {
    return v as T
}

export function create<T>(factory: Factory<T>): T {
    const result: MutableOptional<T> = {}
    forEach(factory, (k, propertyFactory) => {
        result[k] = propertyFactory(k)
    })
    return fromMutableOptional(result)
}

export type PartialFactory<T> = {
    readonly [K in keyof T]?: (k: K, v: T[K]) => T[K]
}

export function copyCreate<T>(source: T, factory: PartialFactory<T>): T {
    const result: MutableOptional<T> = {}
    forEach(source, (k, v) => {
        result[k] = v
    })
    forEach(factory, (k, propertyFactory) => {
        // tslint:disable-next-line:strict-type-predicates
        if (propertyFactory !== undefined) {
            result[k] = propertyFactory(k, source[k])
        }
    })
    return fromMutableOptional(result)
}
