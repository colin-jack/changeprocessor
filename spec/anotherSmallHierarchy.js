var assert = require('chai').assert,
    testUtil = require('./testUtil'),
    createTestChangeLogger = require('./createTestChangeLogger'),
    testObjectMother = require('./testObjectMother'),
    changeProcessor = lib.require('changeProcessor');
    
describe("changes in smallish hierarchy", function() {
    var changeLogger;

    beforeEach(function() {
        var original = testObjectMother.createRetiredMario();
        var updated = testObjectMother.createMario();

        changeLogger = createTestChangeLogger();

        var logChanges = changeProcessor(function() {
            this.onChange("name", changeLogger.toLog("name"));
            this.onChange("name.first", changeLogger.toLog("name.first"));
            this.onChange("name.title", changeLogger.toLog("name.title"));

            this.onChange("career", changeLogger.toLog("career"));

            this.onChange("age", changeLogger.toLog("age"));

            this.onChange("car", changeLogger.toLog("car"));
            this.onChange("car.type", changeLogger.toLog("car.type"));

            this.onChange("address", changeLogger.toLog("address"));
            this.onChange("address.streetOne", changeLogger.toLog("address.streetOne"));
        });

        logChanges(original, updated);
    });

    describe('When responding to changes using simple objects', function(){
        it("should correctly respond to change to 'name' and properties", function() {
            testUtil.expectReportedChangeCorrectly("name", changeLogger)
            testUtil.expectReportedChangeCorrectly("name.first", changeLogger)
            testUtil.expectReportedChangeCorrectly("name.title", changeLogger)
            testUtil.expectReportedNoChange("name.second", changeLogger)
        });

        it("should correctly respond to change to 'career'", function() {
            testUtil.expectReportedChangeCorrectly("career", changeLogger)
        });

        it("should correctly respond to change to 'age'", function() {
            testUtil.expectReportedChangeCorrectly("age", changeLogger)
        });

         it("should correctly respond to change to 'car' and properties", function() {
            testUtil.expectReportedChangeCorrectly("car", changeLogger)
            testUtil.expectReportedChangeCorrectly("car.type", changeLogger)
        });

         it("should correctly respond to change to 'address' and properties", function() {
            testUtil.expectReportedChangeCorrectly("address.streetOne", changeLogger, "Street One")
            testUtil.expectReportedNoChange("address.streetTwo", changeLogger, "Street Two")
            testUtil.expectReportedNoChange("address.town", changeLogger)
        });
    });
});