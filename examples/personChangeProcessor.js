var changeProcessor = require('./../lib/changeProcessor')

module.exports = changeProcessor(function() {
    this.onChange("name", function(done) {
        console.log("changed - name");
        
        done();
    });

    this.onChange("address.streetOne", function(done) {
       console.log("changed - address.streetOne");
        
        done(); 
    })
});