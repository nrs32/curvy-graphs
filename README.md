# [Package README](https://github.com/nrs32/curvy-graphs/blob/main/packages/curvy-graphs/README.md)
# curvy-graphs
Package and demo app to generate pretty curvy graphs.

### Scaffolding:
`npm create vite@latest react-weather-app -- --template react-ts`

`npm install`

`npm install sass-embedded` for scss.

`npm run dev`

### Build/bundle pkg with tsup
Setup:
- Add dep: `npm install --save-dev tsup`
- Adjust build script in package.json 
  ```
  "build": "tsup packages/curvy-graphs/src/public-api.ts packages/curvy-graphs/src/parts-api.ts --dts --dts-resolve --format esm,cjs --out-dir packages/curvy-graphs/dist --tsconfig packages/curvy-graphs/tsconfig.pkg.json --clean",
  ```

  This will
   - Build both public-api and parts-api entry points 
   - Build ESM and CJS versions
   - Generates .d.ts type definitions
   - Output to dist/

- Add to tsconfig.app.json to watch and compile both projects
  ```
  "include": ["demo-app/src", "packages/curvy-graphs/src"]
  ```
- Add
  ```
    "workspaces": [
      "packages/*",
      "demo-app"
    ],
  ```
  to outer package.json to treat each folder as a separate package. Every folder in packages will be treated as a project, and demo-app will also be treated as a project.

  This allows demo-app to import curvy-graphs with local linking automatically. This also means `npm install` will run for all workspaces when run at the root.

Use `npm pack` to test what gets published. The command should be run at the package root, so packages > curvy-graphs. The dist folder, package.json, LICENSE, and README.md should be included in the tarbell.

You can then install the extracted lib into another projects using `file` in your package.json
e.g. `"curvy-graphs": "file:C:/...path to .../curvy-graphs-0.1.0/package",` and `npm install`

### package.json for pkg notes
```JSONC
  "main": "dist/public-api.cjs",   // for CommonJS people
  "module": "dist/public-api.js",  // For ESM people
  "types": "dist/public-api.d.ts", // TS users can access types
  "files": ["dist"],               // Only publish the dist folder
  "exports": {
    ".": { // Creates main entry point so users can write `import { CurvyChart } from "curvy-graphs";`
      "import": "./dist/public-ap.js",   // ESM
      "require": "./dist/public-ap.cjs", // CommonJS
      "types": "./dist/public-api.d.ts"  // For TS Types
    },
    "./parts": { // Creates secondary entry point for advanced use to access chart parts `import { ChartPart } from "curvy-graphs/parts"`
      "import": "./dist/parts-api.js",
      "require": "./dist/parts-api.cjs",
      "types": "./dist/parts-api.d.ts"
    }
  },
```

*Be sure to export all types that parts rely on in the parts-api, and all types that the public-api relies on in public-api. It is okay to export the same types in both api files. 

### Beta tags
You can just add -beta.x where x is a number, after your version in package.json to create a beta version. 
E.g. `1.0.0-beta.0`

Then you can use `npm publish --tag beta` to publish a beta version that can be installed by using `@beta` for the version, e.g. `npm install curvy-graphs@beta`.

### Releasing
`npm run build-pkg` 

`cd packages/curvy-graphs`

`npm login` if not logged in

`npm publish` or `npm publish --tag beta`.

To update latest, replace version and run `npm dist-tag add curvy-graphs@<version> latest` 