# rollup-plugin-anybar

## Install

``` shell
npm install --save-dev rollup-plugin-anybar
# OR
yarn add -D rollup-plugin-anybar
```

## Usage

``` javascript
export default defineConfig({
  plugins: [
    rollupPluginAnybar({
      port: 1738, // optional, default is 1738
      host: 'localhost', // optional, default is 'localhost'
    }),
  ]
})
```
