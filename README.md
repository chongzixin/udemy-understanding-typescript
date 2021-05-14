### Installation
Install `typescript`
```
npm install --global typescript
```

### Template
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
    "start": "lite-server"
},
```

6. Run `npm start` to load current app onto `http://localhost:300`
7. Done. The page will automatically refresh whenever we re-compile our `.ts` file

A sample can be found in `section-1/base/`