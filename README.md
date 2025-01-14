# rollup-plugin-anybar

For use with [anybar](https://github.com/tonsky/AnyBar):

> AnyBar is a small indicator for your menubar that does one simple thing: it displays a colored dot. What the dot means and when to change it is up to you.

rollup-plugin-anybar makes the dot:
- green when rollup is watching
- yellow when rollup is making changes
- red when rollup has errored
- hollow when rollup is not watching/running

Compatible with vite, though note that vite has [some limitations](https://vite.dev/guide/api-plugin.html#universal-hooks):

> Output Generation Hooks (except closeBundle) are not called during dev. You
> can think of Vite's dev server as only calling rollup.rollup() without
> calling bundle.generate().

So in practice, you only get green and hollow, letting you know whether vite
is watching or not.

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
