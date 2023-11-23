import { readFileSync } from "fs";
import { parse } from "@babel/parser";
import generate from "@babel/generator";

function containsComplexContent(node) {
  if (!node) return false;
  if (node.type.startsWith("JSX")) return true;

  if (node.type === "ObjectExpression") {
    for (let prop of node.properties) {
      if (prop.type === "SpreadElement" || containsComplexContent(prop.value)) {
        return true;
      }
    }
  }

  return false;
}

// New function to handle nested objects and arrays
function processNestedElements(element) {
  console.log(typeof element);
  if (Array.isArray(element)) {
    return `[${element.map(processNestedElements).join(", ")}]`;
  } else if (element && typeof element === "object") {
    const processedObject = {};
    Object.keys(element).forEach((key) => {
      processedObject[key] = processNestedElements(element[key]);
    });
    return `{${Object.entries(processedObject)
      .map(([key, value]) => `${key}: ${value}`)
      .join(", ")}}`;
  } else if (typeof element === "function") {
    return JSON.stringify(generate.default(element).code);
  }

  return element;
}

function exportsAsStrings(options = {}) {
  return {
    name: "exports-as-strings",

    transform(code, id) {
      // Check if this file is to be included
      if (options.include && !options.include.test(id)) return null;

      // Use the Babel parser to parse the module's code into an AST
      const ast = parse(code, {
        sourceType: "module",
        plugins: ["typescript", "jsx"], // Enable TypeScript and JSX parsing
      });

      // Initialize an object to store our exports
      const exports = {};
      const argsExports = {};

      // Additional variable for default export
      let defaultExport = {};

      // Traverse the AST to find exports
      // Traverse the AST to find named exports
      ast.program.body.forEach((node) => {
        if (node.type === "ExportNamedDeclaration" && node.declaration) {
          if (
            node.declaration.type === "FunctionDeclaration" ||
            node.declaration.type === "VariableDeclaration"
          ) {
            const name = node.declaration.id
              ? node.declaration.id.name
              : node.declaration.declarations[0].id.name;

            const generatedCode = generate.default(node.declaration).code;
            exports[name] = JSON.stringify(generatedCode);
          }
        } else if (node.type === "ExpressionStatement") {
          if (
            node.expression &&
            node.expression.type === "AssignmentExpression" &&
            node.expression.left &&
            node.expression.left.type === "MemberExpression" &&
            node.expression.left.property &&
            node.expression.left.property.name === "args"
          ) {
            const parentName = node.expression.left.object.name;
            const argsCode = generate.default(node.expression.right).code;
            argsExports[`${parentName}Args`] = containsComplexContent(
              node.expression.right
            )
              ? JSON.stringify(argsCode)
              : argsCode;
          }
        }

        // Handle default export
        /* if (node.type === "ExportDefaultDeclaration") {
          const generatedCode = generate.default(node.declaration).code;
          console.log(typeof JSON.parse(generatedCode));
          defaultExport = processNestedElements(generatedCode);
        } */
      });

      // Combine exports, argsExports, and defaultExport
      const combinedExports = {
        ...exports,
        ...argsExports,
        //defaultExport: defaultExport,
      };

      const generatedExports = Object.entries(combinedExports)
        .map(([key, value]) => `${key}: ${value}`)
        .join(", ");

      // Return the new code and an empty source map
      return {
        code: `export default { ${generatedExports} };`,
        map: { mappings: "" },
      };
    },
  };
}

export default exportsAsStrings;
