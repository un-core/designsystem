import { readFileSync } from "fs";
import { parse } from "@babel/parser";
import generate from "@babel/generator";

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
            exports[name] = generatedCode;
          }
        }
      });

      // Convert our exports object into stringified module code
      const generatedExports = Object.entries(exports)
        .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
        .join(", ");

      // Return the new code and an empty source map
      return {
        code: `export default { ${generatedExports} };`,
        map: { mappings: "" }, // Empty sourcemap
      };
    },
  };
}

export default exportsAsStrings;
