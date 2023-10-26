export default function formatString(str: string): string[] {
  // Format generic object
  str = str.replace(/; /g, ";\n  ");
  str = str.replace(/{ /g, "{\n  ");
  str = str.replace(/ }/g, "\n}");

  // Format function signature
  str = str.replace(/\), /g, "),\n");
  str = str.replace(/, /g, ",\n"); // Break after each comma

  // Format string unions
  str = str.replace(/ \| /g, " |\n"); // Break before each |

  return str.split("\n");
}
