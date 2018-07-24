import * as sm from "@ts-common/string-map"
import * as _ from "@ts-common/iterator"

export type PropertySetFactory<T> = {
    readonly [K in keyof T]-?: (k: K) => T[K]
}

// tslint:disable-next-line:no-any
type Func = (name: string) => any

export function propertySet<T>(factory: PropertySetFactory<T>): T {
    const entries = sm.entries(factory)
    const result = _.filterMap(entries, ([name, propertyFactory]) => {
        const propertyValue = (propertyFactory as Func)(name)
        return propertyValue === undefined ? undefined : sm.entry(name, propertyValue)
    })
    return sm.stringMap(result) as T
}
