var Spritesmith = require('spritesmith');
var fs = require('fs');

Spritesmith.run({
  src: ['./src/assets/icons/icon_douban.png', './src/assets/icons/icon_qq.png'],
  algorithm: 'alt-diagonal',
  padding: 10
}, function handleResult(err, result) {
  if (err) {
    throw err;
  }
  // Output the image
  fs.writeFileSync(__dirname + '/dist/alt-diagonal.png', result.image);
  result.coordinates,
  result.properties; // Coordinates and properties
});
