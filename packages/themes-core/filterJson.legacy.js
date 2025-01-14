const { readFileSync, writeFileSync } = require("fs");
const _ = require("lodash");
const filterDeep = require("deepdash/getFilterDeep")(_);
const mapValuesDeep = require("deepdash/getMapValuesDeep")(_);

if (!String.prototype.endsWith) {
  Object.defineProperty(String.prototype, "endsWith", {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function (searchString, position) {
      position = position || this.length;
      position = position - searchString.length;
      var lastIndex = this.lastIndexOf(searchString);
      return lastIndex !== -1 && lastIndex === position;
    },
  });
}

const json = JSON.parse(readFileSync("./tokens/tokens-new.json.raw", "utf8"));

let filtrate = filterDeep(json, (value, key, parent) => {
  console.log(key);

  if (key == "description") return true;
  if (key === "extensions" || key === "styleId" || key === "exportKey")
    return false;
  if (typeof value !== "object") {
    return true;
  }
  //return true;
});

filtrate = mapValuesDeep(
  filtrate,
  (v) =>
    typeof v === "string" &&
    v.endsWith("ff") &&
    v.substring(0, 1) === "#" &&
    v.length === 9
      ? v.slice(0, -2)
      : v,
  { leavesOnly: true }
);

filtrate = mapValuesDeep(
  filtrate,
  (v) => {
    if (typeof v === "object" && v.type === "color")
      v.attributes = { category: "color" };

    return v;
  },
  /*  typeof v === 'object' && v.type === 'color'
      ? (v.attributes.category = 'color')
      : v*/ { leavesOnly: false }
);

writeFileSync(
  "./tokens/design-tokens.tokens.new.json",
  JSON.stringify(filtrate)
);
