var createSimpleObject = function() {
  return { name: "bob", age: 15, gender: "male", friend: "foe", goodie: true };
}

var createBob = function() {
     return {
        name : {
            first: "Bob",
            second: "Marshall"
        },
        age: 55,
        state: "Unauthorised"
    };
}

var createBobWithAddress = function() {
    return {
        name: {
            first: "Robert",
            second: "Marshall"  
        },
        state: "Authorised",
        age : 55,
        address : {
            streetOne: "45 Gravy Lane",
            streetTwo: "Merton Tidville",
            town: "Staines"
        }
    }
}

var createMario = function() {
    return { 
        name: {
            first: "super",
            second: "mario",
            title: "mr"
        },
        age: 25, 
        gender: "male",
        career: "Plumber",
        car: {
            type: "dragon",
            name: "Yoshi"
        } 
    }; 
}

var createRetiredMario = function() {
    return { 
        name: {
            first: "martin",
            second: "mario",
            title: "dr"
        },
        age: 65, 
        gender: "male",
        career: "Retired",
        address: {
            streetOne: "Powderpuff Palace",
            streetTwo: "Mushroom Land",
            town: "Merthyr Tydfil"
        }
    }; 
}


module.exports = {
    createSimpleObject   : createSimpleObject,
    createMario          : createMario,
    createRetiredMario   : createRetiredMario,
    createBob            : createBob,
    createBobWithAddress : createBobWithAddress,
    createBob            : createBob
}