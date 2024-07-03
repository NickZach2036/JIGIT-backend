import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  js.configs.recommended,

  {
      rules: {
          "no-unused-vars": "warn",
          "no-undef": "warn"
      }
  }
];