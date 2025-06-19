import {utilCreateQueryString, utilNullToUndefined, utilStrCompare} from "./utils";

describe("utils", () => {
    it("should be able to compare a string", () => {
        const data = [
            ["a", "b", -1],
            ["b", "a", 1],
            ["z", "z", 0],
        ];

        for (const [a, b, expected] of data) {
            expect(utilStrCompare(a as string, b as string)).toEqual(expected);
        }
    })

    it("should be able to create query parameters", () => {
        const queryParams = {
            "foo bar": "bar",
            hello: "hello world",
            x: undefined,
            y: null,
        };

        expect(utilCreateQueryString(queryParams)).toEqual(
            "foo%20bar=bar&hello=hello%20world",
        );
    });

    it("should be able to convert a null value to undefined", () => {
        const data = [
            ["foo", "foo"],
            [undefined, undefined],
            [null, undefined],
        ];

        for (const [input, expected] of data) {
            expect(utilNullToUndefined(input)).toEqual(expected);
        }
    });
});
