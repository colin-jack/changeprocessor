var createTestChangeLogger = function(numberOfHandlersShouldBeTriggered) {
    var toReturn = Object.create(changeLoggerPrototype, {
        changes: {value: {}}
    });

    toReturn.expectedTriggerCount = numberOfHandlersShouldBeTriggered;

    return toReturn;
}

var changeLoggerPrototype =  {
    toLog : function(propertyPath) {
        var that = this;

        return function(done) {
            that.trackChangeHappened(this, propertyPath);

            // NOTE - simulates some async behavior.
            setTimeout(function() { 
                that.expectedTriggerCount--;
                done();
            }, 1);
        }
    },

    trackChangeHappened : function(changeContext, propertyPath) {
        this.changes[propertyPath] = { 
                original: changeContext.original,
                updated: changeContext.updated
            };
    },

    getChangeFor : function(propertyPath) {
        return this.changes[propertyPath];
    },

    allHandlersCalled : function() {
        return this.expectedTriggerCount === 0;
    }
};

module.exports = createTestChangeLogger;