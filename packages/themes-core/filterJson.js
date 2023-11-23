const { readFileSync, writeFileSync } = require("fs");
const _ = require("lodash");
const filterDeep = require("deepdash/getFilterDeep")(_);
const mapValuesDeep = require("deepdash/getMapValuesDeep")(_);

function removeKeys(obj) {
  // Base case: if the object is not an object or is null, return it as is
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // List of keys to remove
  const keysToRemove = [
    "textDecoration",
    "textCase",
    "paragraphSpacing",
    "paragraphIndent",
  ];

  // If the object has any of the keys to be removed, delete them
  for (const key of keysToRemove) {
    if (key in obj) {
      delete obj[key];
    }
  }

  // Iterate over the object's keys and apply the function recursively
  for (let key in obj) {
    obj[key] = removeKeys(obj[key]);
  }

  return obj;
}

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

let json = JSON.parse(readFileSync("./tokensRepository/tokens.json", "utf8"));

json = { ...json.Global, ...json.System, ...json.Component };
json = removeKeys(json);

/*

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
      : v*/ //{ leavesOnly: false }
//);

writeFileSync(
  "./tokens/design-tokens.tokens.new.json",
  JSON.stringify(json, null, 2)
);
