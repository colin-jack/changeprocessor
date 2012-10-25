var assert = require('chai').assert,
    createTestChangeLogger = require('./createTestChangeLogger'),
    testObjectMother = require('./testObjectMother'),
    changeProcessor = lib.require('changeProcessor'),
    testUtil = require('./testUtil');
    
describe("no changesy", function() {
    var changeLogger;

    beforeEach(function() {
        var original = testObjectMother.createMario();
        var updated = testObjectMother.createMario();

        changeLogger = createTestChangeLogger();

        var logChanges = changeProcessor(function() {
            this.onChange("name", changeLogger.toLog("name"));
            this.onChange("name.first", changeLogger.toLog("name.first"));
            this.onChange("name.title", changeLogger.toLog("name.title"));
        });

        logChanges(original, updated);
    });

    describe('When responding to no changes found', function(){
        it("should correctly do nothing", function() {
            testUtil.expectReportedNoChange("name", changeLogger)
            testUtil.expectReportedNoChange("name.first", changeLogger)
            testUtil.expectReportedNoChange("name.title", changeLogger)
        });
    });
});