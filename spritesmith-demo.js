var Spritesmith = require('spritesmith');
var fs = require('fs');
var ejs = require('ejs');

// https://github.com/Ensighten/spritesmith

Spritesmith.run({
  src: [
    './src/assets/icons/icon_douban.png',
    './src/assets/icons/icon_qq.png'
  ],
  // algorithm: 'top-down',
  padding: 5
}, function handleResult(err, result) {
  if (err) {
    throw err;
  }
  // Output the image
  fs.writeFileSync(__dirname + '/dist/alt-diagonal.png', result.image);
  var fileEjs = fs.readFileSync(__dirname + '/src/template/css-sprite.ejs');
  console.log(fileEjs.toString());
  var mySpriteData = {
    prefix: 'ico',
    items: [
      {
        name: 'github',
        x: 0,
        y: 0,
        width: 54,
        height: 54
      },
      {
        name: 'qq',
        x: 54,
        y: 0,
        width: 54,
        height: 54
      }
    ]
  };

  var rs = ejs.render(
    fileEjs.toString(),
    mySpriteData
  );

  console.log('render!', rs);

  // console.log(result);
  // // var rs = ejs.render("<p><%= users.length %></p>", {
  // //     users: [
  // //       { name: 'tj' },
  // //       { name: 'mape' },
  // //       { name: 'guillermo' }
  // //     ]
  // // });

  // var rs = ejs.render();

  // result.coordinates,
  // result.properties; // Coordinates and properties
});
