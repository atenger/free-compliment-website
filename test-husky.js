// Example of a properly formatted function that uses all variables
const greeting = 'Hello, world!';

function displayGreeting(customMessage = greeting) {
  // Using a proper condition instead of if(true)
  if (customMessage !== greeting) {
    return customMessage;
  }
  return greeting;
}

// Using the function to avoid unused variable warnings
const result = displayGreeting('Hi there!');
// Using result to avoid unused variable warning
module.exports = { result, displayGreeting };
