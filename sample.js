// sample.js

function greetUser(name) {
    console.log("Hello, " + name + "!");
}

function calculateSum(a, b) {
    let result = a + b;
    console.log("Sum:", result);
    return result;
}

function showTime() {
    const now = new Date();
    console.log("Current Time:", now.toLocaleTimeString());
}

// Run demo functions
greetUser("ChatGPT User");
calculateSum(10, 25);
showTime();
