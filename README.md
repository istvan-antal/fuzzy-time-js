# Introduction

FuzzyTime is a module that can format timestamp differences into human readable 
time strings.

## Example

```
FuzzyTime.getFuzzyTimeString(1); //1 second ago
FuzzyTime.getFuzzyTimeString(-10 * 60); //10 minutes before
```

# Setup

Install NodeJS from http://nodejs.org/
Install GruntJS runner: npm install -g grunt-cli
Install the dependencies: npm install

# Test running

You can run the tests with: grunt check
