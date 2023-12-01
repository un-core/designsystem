import { config } from "./config.js";

config({
  source: `tokens/**/*.json`,
  buildPath: "dist", //`distDark`,
  //themeName: 'default', //'dark',
});
