console.log('Hello, world!');

function createFunction() {
  return function() {
    console.log('hello');
  };
}

var function1 = createFunction();
function1();

function createFunctionPrinter(input) {
  return function printArgument() {
    console.log(input);
  };
}

var printSample = createFunctionPrinter('sample');
printSample();
var printHello = createFunctionPrinter('hi');
printHello();

function outer() {
  var counter = 0; // this variable is outside incrementCounter's scope
  function incrementCounter() {
    counter++;
    console.log('counter', counter);
  }

  return incrementCounter;
}

var willCounter = outer();
var jasCounter = outer();

willCounter();
willCounter();
willCounter();

jasCounter();
willCounter();

function addByX(x) {
  function addCounter(input) {
    const result = x + input;
    console.log(result);
    return result;
  }
  return addCounter;
}

var addByTwo = addByX(2);
addByTwo(1); //should return 3
addByTwo(2); //should return 4
addByTwo(3); //should return 5

var addByThree = addByX(3);
addByThree(1); //should return 4
addByThree(2); //should return 5

var addByFour = addByX(4);
addByFour(4); //should return 8
addByFour(10); //should return 14

//--------------------------------------------------
// Extension
//--------------------------------------------------

function once(func) {
  let isFirstTime = true;
  let callbackResult;

  return function callbackHandler(num) {
    if (isFirstTime) {
      callbackResult = func(num);
      isFirstTime = false;
      return callbackResult;
    }
    return callbackResult;
  };
}

var onceFunc = once(addByTwo);

console.log(onceFunc(4)); //should log 6
console.log(onceFunc(10)); //should log 6
console.log(onceFunc(9001)); //should log 6

function after(count, func) {
  let executed = 0;
  return function executing() {
    if (++executed >= count) {
      func();
    }
  };
}

var called = function() {
  console.log('hello');
};
var afterCalled = after(3, called);

afterCalled(); // -> nothing is printed
afterCalled(); // -> nothing is printed
afterCalled(); // -> 'hello' is printed

function delay(func, wait) {
  return function(arg) {
    setTimeout(() => func(arg), wait);
  };
}

delay(() => console.log('199999'), 5000)();
