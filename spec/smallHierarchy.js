var assert = require('chai').assert,
    createTestChangeLogger = require('./createTestChangeLogger'),
    testObjectMother = require('./testObjectMother'),
    changeProcessor = lib.require('changeProcessor'),
    testUtil = require('./testUtil');
    
describe("changes in small hierarchy", function() {
    describe('When responding to changes using simple objects', function(){

        var changeLogger;
        var allHandlersCalledBeforeFinalDone = false;

        beforeEach(function(beforeDone) {
            var original = testObjectMother.createBob();
            var updated = testObjectMother.createBobWithAddress();

            changeLogger = createTestChangeLogger(5);

            var logChanges = changeProcessor(function() {
                this.onChange("name", changeLogger.toLog("name"));
                this.onChange("name.first", changeLogger.toLog("name.first"));
                this.onChange("name.second", changeLogger.toLog("name.second"));

                this.onChange("state", changeLogger.toLog("state"));
                this.onChange("address", changeLogger.toLog("address"));
                this.onChange("address.streetOne", changeLogger.toLog("address.streetOne"));
                this.onChange("doesNotExist", changeLogger.toLog("doesNotExist"));
                this.onChange("doesNotExist2", changeLogger.toLog("doesNotExist2"));
                this.onChange("doesNotExist3", changeLogger.toLog("doesNotExist3"));
            });

            var whenDone = function() {
                allHandlersCalledBeforeFinalDone = changeLogger.allHandlersCalled();

                beforeDone();
            }

            logChanges(original, updated, whenDone);
        });

        it("should correctly respond to changes to 'name'", function() {
            testUtil.expectReportedChangeCorrectly("name", changeLogger)
        });

        it("should correctly respond to change to 'first' property of 'name'", function() {
            testUtil.expectReportedChangeCorrectly("name.first", changeLogger)
        });

        it("should respond to change for 'status'", function() {
            testUtil.expectReportedChangeCorrectly("name.first", changeLogger);
        });

        it("should respond to change for 'address'", function() {
            testUtil.expectReportedChangeCorrectly("address", changeLogger);
        });

        it("should respond to change for 'streetOne' of 'address'", function() {
            testUtil.expectReportedChangeCorrectly("address.streetOne", changeLogger);
        });

        it("should not respond to any change for unaltered to 'second' property of 'name'", function() {
            testUtil.expectReportedNoChange("name.second", changeLogger)
        });

        it("should not respond to any change for unaltered to 'age'", function() {
            testUtil.expectReportedNoChange("age", changeLogger)
        });

        it("should only call the done callback when all handlers are done", function() {
            assert.isTrue(allHandlersCalledBeforeFinalDone);
        });
    });
});