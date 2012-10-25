act on changes (node.js)
==========
Makes it easy to respond to changes betweeen objects, for example allowing you to run some special code whenever the property value for an object coming into your system is different than the current value.

### Samples


#####JavaScript
```js

````
### Examples
The project comes with examples in the examples directory:

    node examples/simple

### Tests
First install mocha: 

    npm install mocha -g

Run the tests using ```npm test``` or:

    mocha -R spec spec/testFixture spec/ -w -G --recursive