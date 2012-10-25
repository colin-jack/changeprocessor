var personChangeProcessor = require('./personChangeProcessor')

var original = {
    name : {
        first: "Bob",
        second: "Marshall"
    },
}

var updated = {
    name: {
        first: "Robert",
        second: "Marshall"  
    },
    address : {
        streetOne: "45 Gravy Lane",
        streetTwo: "Merton Tidville",
        town: "Staines"
    }
}

var allDone = function() {
    console.log("all done");
}

personChangeProcessor(original, updated, allDone)