import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import path from "node:path";
import url from "node:url";
import fs from "node:fs";

const isWatching = !!process.env.ROLLUP_WATCH;
const sdPlugin = "xyz.emradc.yamaha-extended-control.sdPlugin";

/**
 * @type {import('rollup').RollupOptions[]}
 */
const config = [
  {
    input: "src/plugin.ts",
    output: {
      file: `${sdPlugin}/bin/plugin.js`,
      sourcemap: isWatching,
      sourcemapPathTransform: (relativeSourcePath, sourcemapPath) => {
        return url.pathToFileURL(
          path.resolve(path.dirname(sourcemapPath), relativeSourcePath),
        ).href;
      },
    },
    plugins: [
      {
        name: "watch-externals",
        buildStart: function () {
          this.addWatchFile(`${sdPlugin}/manifest.json`);
        },
      },
      typescript({
        mapRoot: isWatching ? "./" : undefined,
      }),
      nodeResolve({
        browser: false,
        exportConditions: ["node"],
        preferBuiltins: true,
      }),
      commonjs(),
      !isWatching && terser(),
      {
        name: "emit-module-package-file",
        generateBundle() {
          this.emitFile({
            fileName: "package.json",
            source: `{ "type": "module" }`,
            type: "asset",
          });
        },
      },
    ],
  },
  {
    input: "src/ui/global-settings.ts",
    output: {
      file: `${sdPlugin}/ui/global-settings.js`,
      format: "iife",
      name: "GlobalSettingsPI",
      sourcemap: isWatching,
      sourcemapPathTransform: (relativeSourcePath, sourcemapPath) => {
        return url.pathToFileURL(
          path.resolve(path.dirname(sourcemapPath), relativeSourcePath),
        ).href;
      },
    },
    plugins: [
      {
        name: "watch-externals",
        buildStart: function () {
          this.addWatchFile(`${sdPlugin}/manifest.json`);
        },
      },
      typescript({
        target: "ESNext",
        mapRoot: isWatching ? "./" : undefined,
        compilerOptions: {
          lib: ["ESNext", "DOM", "DOM.Iterable"],
          module: "ESNext",
          moduleResolution: "bundler",
          types: [],
        },
      }),
      nodeResolve({
        browser: true,
        mainFields: ["browser", "module", "main"],
      }),
      commonjs(),
      !isWatching && terser(),
      {
        name: "copy-html",
        writeBundle() {
          const src = "src/ui/global-settings.html";
          const dest = `${sdPlugin}/ui/global-settings.html`;
          if (fs.existsSync(src)) {
            if (!fs.existsSync(`${sdPlugin}/ui`))
              fs.mkdirSync(`${sdPlugin}/ui`, { recursive: true });
            fs.copyFileSync(src, dest);
            console.log(`Copied: ${src} -> ${dest}`);
          }
        },
      },
    ],
  },
];

export default config;
