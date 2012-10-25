// A namespace is used so that reorganising the folder containing the code under test doesn't result in 
// lots of broken tests, and so if we have deeply neds test files we don't need to do things like ./../../../lib
var requireNamespace = require('require-namespace');
module.exports = global.lib = requireNamespace.createSync('lib', __dirname + '/../lib/');