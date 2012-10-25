var processChanges = require('./processChanges')

module.exports =  function(registerChangeHandlers) {
    return function(original, updated, completelyDone) {
        processChanges(original, updated, registerChangeHandlers, completelyDone);
    }
}