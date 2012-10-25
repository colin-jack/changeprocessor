var assert = require('chai').assert;

var expectReportedNoChange = function(propertyPath, changeLogger) {
    var change = changeLogger.getChangeFor(propertyPath);
    assert.isUndefined(change);
}

var expectReportedChangeCorrectly = function(propertyPath, changeLogger) {
    var change = changeLogger.getChangeFor(propertyPath);
    assert.isDefined(change);
}

module.exports = {
    expectReportedNoChange : expectReportedNoChange,
    expectReportedChangeCorrectly : expectReportedChangeCorrectly
}