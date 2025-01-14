import rollupPluginAnybar from "./index.js";

export default {
  input: "index.js",
  output: [
    { file: "dist/cjs/index.js", format: "cjs" },
    {
      file: "dist/es/index.js",
      format: "es"
    }
  ],
  external: ["node:dgram", "node:util"],
  plugins: [rollupPluginAnybar()]
};
