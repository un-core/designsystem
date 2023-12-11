import { readFileSync, writeFileSync } from "fs";

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

function addCategoryToLeaves(obj, category) {
  let newObj = Array.isArray(obj) ? [] : {};

  Object.keys(obj).forEach((key) => {
    // If the property is a 'value', add 'category'
    if (key === "value") {
      newObj["category"] = category;
    }

    if (typeof obj[key] === "object" && obj[key] !== null) {
      // Recursively call the function for nested objects
      newObj[key] = addCategoryToLeaves(obj[key], category);
    } else {
      newObj[key] = obj[key];
    }
  });

  return newObj;
}
const Global = json.Global;

json = {
  ...addCategoryToLeaves(json.Global, "global"),
  ...addCategoryToLeaves(json.System, "system"),
  ...addCategoryToLeaves(json.Component, "component"),
};
json = removeKeys(json);

writeFileSync(
  "./tokens/design-tokens.tokens.new.json",
  JSON.stringify(json, null, 2)
);
