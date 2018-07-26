// tslint:disable:no-magic-numbers

import * as ps from "./index"
// tslint:disable-next-line:no-implicit-dependencies
import { assert } from "chai"

interface A {
    n: number
    s: string
    r?: boolean
    multi: number
}

describe("test", () => {
    it("create", () => {
        const result = ps.create<A>({
            n: () => 54,
            s: () => "xxx",
            r: () => undefined,
            multi: () => 9,
        })
        assert.equal(54, result.n)
        assert.equal("xxx", result.s)
        assert.isUndefined(result.r)
        assert.equal(9, result.multi)
    })
    it("copyCreate", () => {
        const source: A = {
            n: 25,
            s: "yyy",
            multi: 19,
        }
        const result = ps.copyCreate(
            source,
            {
                s: () => "xxx",
                r: () => true,
                multi: (_: "multi", v: number) => v + v,
            })
        assert.equal(25, result.n)
        assert.equal("xxx", result.s)
        assert.isTrue(result.r)
        assert.equal(38, result.multi)
    })
})
