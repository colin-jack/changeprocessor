var handlerDone = function() {
    this.outstandingHandlers--;

    if (this.outstandingHandlers === 0 && this.callWhenAllDone) {
        this.callWhenAllDone();
    }
}

var addHandler = function(handler) {
    this.handlers.push(handler)
}

var callAllHandlers = function() {
    this.outstandingHandlers = this.handlers.length;
    var whenDone = this.handlerDone.bind(this);

    this.handlers.forEach(function(handler) {
        handler(whenDone);
    });
}

var allHandlersCalledTracker = {
    handlerDone : handlerDone,
    addHandler : addHandler,
    callAllHandlers : callAllHandlers
}

var createHandlerDoneTracker = function(callWhenAllDone) {
    return Object.create(allHandlersCalledTracker, {
        handlers: { value: [] },
        callWhenAllDone : { value: callWhenAllDone }
    });
}

module.exports = createHandlerDoneTracker;