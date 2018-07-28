// tslint:disable:no-magic-numbers

import * as ps from "./index"
// tslint:disable-next-line:no-implicit-dependencies
import { assert } from "chai"

interface A {
    n: number
    s: string
    r?: boolean
    multi: number
    u: true | undefined
}

describe("test", () => {
    it("create", () => {
        const result = ps.create<A>({
            n: () => 54,
            s: () => "xxx",
            r: () => undefined,
            multi: () => 9,
            u: () => true,
        })
        assert.equal(54, result.n)
        assert.equal("xxx", result.s)
        assert.isUndefined(result.r)
        assert.equal(9, result.multi)
        assert.isTrue(result.u)
    })
    it("copyCreate", () => {
        const source: A = {
            n: 25,
            s: "yyy",
            multi: 19,
            u: true,
        }
        const result = ps.copyCreate(
            source,
            {
                s: () => "xxx",
                r: () => true,
                multi: (_: "multi", v: number) => v + v,
                u: () => undefined,
            })
        assert.equal(25, result.n)
        assert.equal("xxx", result.s)
        assert.isTrue(result.r)
        assert.equal(38, result.multi)
        assert.isUndefined(result.u)
    })
})
