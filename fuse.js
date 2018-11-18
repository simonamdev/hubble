const { FuseBox, WebIndexPlugin, SassPlugin, CSSResourcePlugin, CSSPlugin, JSONPlugin } = require('fuse-box');
const fuse = FuseBox.init({
  homeDir: 'src',
  target: 'browser@es6',
  output: 'dist/$name.js',
  plugins: [JSONPlugin(), WebIndexPlugin({ template: 'src/page.html' }), [SassPlugin(), CSSResourcePlugin({ dist: 'dist/css-resources' }), CSSPlugin()]]
});
fuse.dev(); // launch http server
fuse
  .bundle('app')
  .instructions(' > index.ts')
  //   .hmr()
  .watch();
fuse.run();
