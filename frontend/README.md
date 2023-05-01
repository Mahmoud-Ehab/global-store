# Get Started

## NPM install
Install the dependencies by executing the following command in the root directory:
```
npm install
```

## NPM run build
This command executes rollup configured with `rollup.config.mjs` file, in order to compile and bundle the application in `dist` directory.
```
npm run build
```

## NPM run start
This command could only be used right after building. 
It executes `app.js` from `dist` directory via node.
```
npm run start
```

## NPM run build-test
This command uses tsc to compile typescript files from the `src` directory into javascript and write them in `js` directory, to be used by test files in the `test` directory.
```
npm run build-test
```

## NPM run test
This command could only be used right after building (by using build-test command) and installing dev dependencies. 
It shall test the modules (StateManager, RequestDispatcher, and UIPainter) by using mocha framework.
```
npm run test
```