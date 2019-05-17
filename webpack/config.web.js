var path = require("path");
var webpack = require('webpack');
var NormalModuleReplacementPlugin = webpack.NormalModuleReplacementPlugin;
var objectAssign = require('object-assign-deep');

/*
  Upon importing the 'runtime' module, this web build is made to look at
  src/runtimes/web/runtime.ts by the below webpack resolution config.
  This is achieved by adding 'src/runtimes/web' to the resolve.modules array

  -- CONVENIENCE --
  We also add 'src/runtimes' to the list for convenient referencing of 'isomorphic/' implementations.
  We also add 'src/' so that the runtimes/web folder can conveniently import 'core/' modules.
*/
var config = objectAssign(require('./config.shared'),{
  output: {
    library: "Pusher",
    path: path.join(__dirname, "../dist/web"),
    filename: "pusher.js",
    libraryTarget: "umd"
  },
  resolve: {
    modules: ['src/', 'src/runtimes/web', 'src/runtimes', 'node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      global: "window"
    })
  ]
});

module.exports = config;
