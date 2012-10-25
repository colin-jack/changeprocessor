change processor (node.js)
==========
Makes it easy to respond to changes betweeen objects, for example allowing you to run some special code whenever the property value for an object coming into your system is different than the current value.

### Sample
#####JavaScript
```js
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
        first: "Robert", // NOTE - Different value
        second: "Marshall"
    }
}

var allDone = function() { 
    console.log("all done."); 
}

personChangeProcessor(original, updated, allDone);
````
The output from this will be
```
changed - name
changed - name.first
all done
```
Note even though we only changed ```name.first``` the event for ```name``` was raised too.
### Examples
The project comes with examples in the examples directory:

    node examples/simple
    node examples/allinOneFile

### Tests
First install mocha: 

    npm install mocha -g

Run the tests using ```npm test``` or:

    mocha -R spec spec/testFixture spec/ -w -G --recursive

### Future
* A change to a property could trigger further changes and we should probably then call their appropriate handlers (avoiding cycles).
* Suitable reporting of errors that occur inside ```changeTo``` methods.
* Optional built-in logging using winston.