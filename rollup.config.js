const { default: swc } = require("@rollup/plugin-swc");
const { default: dts } = require("rollup-plugin-dts");
const name = require("./package.json").main.replace(/\.js$/, "");

const bundle = config => ({
  ...config,
  input: "src/index.ts",
});

export default [
  bundle({
    plugins: [swc()],
    output: [
      {
        file: `${name}.js`,
        format: "cjs",
        sourcemap: true
      },
      {
        file: `${name}.mjs`,
        format: "es",
        sourcemap: true
      }
    ]
  }),
  bundle({
    plugins: [dts()],
    output: {
      file: `${name}.d.ts`,
      format: "es"
    }
  })
];