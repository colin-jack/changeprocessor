var assert = require('chai').assert,
    createTestChangeLogger = require('./createTestChangeLogger'),
    testObjectMother = require('./testObjectMother'),
    changeProcessor = lib.require('changeProcessor');
    
describe("callback when done", function() {
    var timeAgeChange, timeNameChange, timeTotallyComplete;

    beforeEach(function(beforeDone) {
        var original = testObjectMother.createSimpleObject();
        var updated = testObjectMother.createSimpleObject();
        updated.age = 89;
        updated.name = "salamander";

        var logChanges = changeProcessor(function() {
            this.onChange("name", function(done) { setTimeout(done, 1); timeNameChange = new Date(); });
            this.onChange("age", function(done) { setTimeout(done, 1); timeAgeChange = new Date(); });
        });

        var totallyDone = function() {
            timeTotallyComplete = new Date();
            beforeDone();
        }

        logChanges(original, updated, totallyDone);
    });

    describe('When responding to changes using simple objects', function(){
        it("should callback when completely done", function() {
            assert.isDefined(timeTotallyComplete);
        });

        it("should callback only after it is completely done done", function() {
            assert.isTrue(timeTotallyComplete.getMilliseconds() > timeAgeChange.getMilliseconds());
            assert.isTrue(timeTotallyComplete.getMilliseconds() > timeNameChange.getMilliseconds());
        });
    });
});