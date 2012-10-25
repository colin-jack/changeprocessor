var createHandlerDoneTracker = require('./createHandlerDoneTracker'),
    objectcompare = require('objectcompare'),
    _u = require('underscore'),
    _s = require('underscore.string');

var getChangesToObserve = function(registerChangeHandlers) {
    var observersTracker = Object.create(changesToObserveTracker);
    registerChangeHandlers.call(observersTracker);
    return observersTracker.changesToObserve;
}

var callHandlerIfObservedHasChanged = function(toObservePath, toObserve, differences, handlerTracker) {
    var changedPaths = Object.keys(differences);

    var changeAffectsObserver = function(changedPropertyPath) {
        return changeIsToObservedOrChild(changedPropertyPath, toObservePath) ||
               isParentBeingAddedOrRemoved(toObservePath, changedPropertyPath, differences[changedPropertyPath]);
    };

    var changesAffectingObserver = _u.filter(changedPaths, changeAffectsObserver);

    if (changesAffectingObserver.length > 0) {
        handlerTracker.addHandler(toObserve[toObservePath]);
    }
}

var isParentBeingAddedOrRemoved = function(toObservePath, changedPropertyPath, changeDescription) {
    return changeIsToParent(changedPropertyPath, toObservePath) && isAdditionOrRemoval(changeDescription);
}

var isAdditionOrRemoval = function(changeDescription) {
    return changeDescription.reason === "valueOnlyInFirstObject" || 
           changeDescription.reason === "valueOnlyInSecondObject";
}

var changeIsToParent = function(changedPropertyPath, potentialChild) {
    return _s.startsWith(potentialChild, changedPropertyPath)
}

var changeIsToObservedOrChild = function(changedPropertyPath, toObservePath) {
    return _s.startsWith(changedPropertyPath, toObservePath);
}

var changesToObserveTracker = {
    onChange : function(pathToProperty, toCall) {
        this.changesToObserve = this.changesToObserve || {};
        this.changesToObserve[pathToProperty] = toCall;
    }
}

var processChanges = function(original, updated, registerChangeHandlers, completelyDone) {
    var result = objectcompare(original, updated);

    if (result.equal) return;

    var toObserve = getChangesToObserve(registerChangeHandlers);
    var handlerTracker = createHandlerDoneTracker(completelyDone);

    for(var toObservePath in toObserve) {
        callHandlerIfObservedHasChanged(toObservePath, toObserve, result.differences, handlerTracker);
    }

    handlerTracker.callAllHandlers();
}

module.exports = processChanges;