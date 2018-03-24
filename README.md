# Chat

## Project Initialization

If you want to create a new project using React the following steps are basics
that you should do.

1. Create a project directory and initialize with `npm init`.
2. Install the following dev dependencies:

```sh
npm install --save-dev @babel/core @babel/plugin-proposal-class-properties \
    @babel/preset-env @babel/preset-react \
    webpack webpack-cli webpack-dev-server html-webpack-plugin babel-loader
npm install react react-dom
```

3. Create `webpack.config.js` like in this repo.

4. Create `src/index.js` and `src/index.html` with HTML template

## Development

To start development server do:

```sh
npm start
```

It will run `webpack-dev-server` which will start server which serves our
`src/index.html` file with injected JS file.

To run linter do `npm run lint:fix` or `npm run lint`.

## Build

To build assets (files that you will serve on your server) do:

```sh
npm run build
```

It will create assets in `dist` folder.
