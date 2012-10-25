var changeProcessor = require('./../changeProcessor')

module.exports = changeProcessor(function() {
    this.onChange("name", function(done) {
        console.log("name changed");
        
        done();
    });

    this.onChange("address.streetOne", function(done) {
       console.log("address.streetOne");
        
        done(); 
    })
});