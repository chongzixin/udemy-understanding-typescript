### Installation

Install `typescript`

```
npm install --global typescript
```

### Template using Webpack (Recommended)

1. Create `.gitignore`

```
node_modules
*.js
```

2. Create a `public` folder, and in it create `index.html` with add the following script tag in `<head>`

```
<script module="" src="./dist/bundle.js"></script>
```

3. Create `app.ts` and compile it

```
touch app.ts
tsc app.ts
```

4. Initialise `npm` and install `webpack` related libraries

```
npm init
npm install --save-dev webpack webpack-cli webpack-dev-server
```

5. Add `start` and `build` scripts to `package.json`
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server",
    "build": "webpack",
},
```

6. Create `webpack.config.js` file

```
const path = require("path");

module.exports = {
  mode: "development",
  entry: "./app.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public/dist"),
    publicPath: "dist",
  },
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};

```

6. Run `tsc --init` to create `tsconfig.json` for compilerOptions.

7. In `tsconfig.json`, enable the following

```
"target": "es5",
"module": "es2015",
"outDir": "./public/dist",
```

8. Run `tsc -w` to monitor `.ts` files for changes and auto-compile.

9. In a separate terminal window, run `npm start` to load current app onto `http://localhost:8080`

10. Done. The page will automatically refresh whenever we re-compile our `.ts` file

A sample can be found in `section-9-10-11/using-es6-modules-with-webpack/`

### Template using Lite-Server

1. Create `.gitignore`

```
node_modules
*.js
```

2. Create `index.html` and add the following script tag in `<head>`

```
<script src="app.js" defer></script>
```

3. Create `app.ts` and compile it

```
touch app.ts
tsc app.ts
```

4. Initialise `npm` and install `lite-server`

```
npm init
npm install --save-dev lite-server
```

5. Add `start` script to `package.json`
```
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "lite-server",
},
```
6. Run `tsc --init` to create `tsconfig.json` for compilerOptions.
7. Run `tsc -w` to monitor `.ts` files for changes and auto-compile.
8. In a separate terminal window, run `npm start` to load current app onto `http://localhost:3000`
9. Done. The page will automatically refresh whenever we re-compile our `.ts` file

A sample can be found in `section-1/base/`
