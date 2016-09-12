describe("suite objectToQueryString", function() {
    var objectToQueryString = require("../index");
    it("string", function() {
        expect(objectToQueryString("noObject")).toBe("");
    });
    it("null", function() {
        expect(objectToQueryString(null)).toBe("");
    });
    it("undefined", function() {
        expect(objectToQueryString(undefined)).toBe("");
    });
    it("empty object", function() {
        expect(objectToQueryString({})).toBe("");
    });
    it("no object", function() {
        expect(objectToQueryString({
            prop: 'value'
        })).toBe("prop=value");
    });
    it("simple object", function() {
        expect(objectToQueryString({
            prop: 'value',
            p2: 'v2'
        })).toBe("prop=value&p2=v2");
    });
    it("nested object", function() {
        expect(objectToQueryString({
            p: {
                p2: 'value'
            }
        })).toBe("p[p2]=value");
    });
    it("nested object with empty object", function() {
        expect(objectToQueryString({
            p: {
            }
        })).toBe("");
    });
    it("complex object", function() {
        var obj = {
            prop0: "val0",
            level1: {
                prop1: "val1",
                level2: {
                    prop2: "val2"
                }
            }
        };
        expect(objectToQueryString(obj)).toBe(
            "prop0=val0&level1[prop1]=val1&level1[level2][prop2]=val2");
    });
    it("very complex object", function() {
        var obj = {
            prop0: "val0",
            level1: {
                prop1: "val1",
                level2: {
                    prop2: "val2",
                    prop3: {
                        prop4: "val3"
                    }
                }
            }
        };
        expect(objectToQueryString(obj)).toBe(
            "prop0=val0&level1[prop1]=val1&level1[level2][prop2]=val2&level1[level2][prop3][prop4]=val3");
    })
});