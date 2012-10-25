var changeProcessor = require('./../lib/changeProcessor')

var personChangeProcessor = changeProcessor(function() {
    this.onChange("name", function(done) {
        console.log("changed - name");
        
        done();
    });

    this.onChange("name.first", function(done) {
        console.log("changed - name.first");
        
        done(); 
    })
});

var original = {
    name : {
        first: "Bob",
        second: "Marshall"
    }
}

var updated = {
    name : {
        first: "Robert",
        second: "Marshall"
    }
}

var allDone = function() { 
    console.log("all done"); 
}

personChangeProcessor(original, updated, allDone);