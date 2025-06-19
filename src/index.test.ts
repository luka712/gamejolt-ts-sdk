import { parse_config } from "./index";

describe("index", () => {
    it("should be able to parse a config", () => {
        const fetch = jest.fn();

        const config = parse_config({
            baseUrl: "https://example.com/",
            fetch,
        });

        expect(config.baseUrl).toEqual("https://example.com/");
        expect(config.fetch).toEqual(fetch);
    });
});
