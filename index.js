var _u  = require('underscore');
_.str = require('underscore.string');
_u.mixin(_.str.exports()); // mixin string functions we use


var changeProcessor = require('./lib/changeProcessor');
changeProcessor.processChanges = require('processChanges');

module.exports = changeProcessor;