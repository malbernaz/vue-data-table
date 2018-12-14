# Vue Data Table

## answers

### How long did you spend on the test? Would you do anything differently if you had more time?

I took 3 days to finish the components and write the tests and a day to setup amplify and integrate. If I had more time I would add more features such as pagination and async search and add error handling.

### In what ways would you adapt your component so that it could be used in many different scenarios where a data table is required?

I have created the data table component with reusability in mind, it's completely generic.

### What is your favorite CSS property? Why?

My favorite CSS properties are opacity and transform, because they are the only that do not trigger layout on the browser when animated : )

### What is your favorite modern Javascript feature? Why?

Arrow functions, because I love to write my code concisely.

### What is your favorite third-party Vue.js library? Why?

Haven't used any, because I've been working with React for the past 3 years.

## deployed version

https://vue-data-table.now.sh/

## quiz.js

```js
let Fernet = require("fernet");
let secret = new Fernet.Secret("TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=");
let message =
  "gAAAAABcEe9JztFxFCIa2zJzTPHhsvQ7-PstyYWVqeO3RjWiH3PZD6FbQs5Rc7hxuLFTZNUNNsWU-cFOZxnLk5jS-vtTbYmyfhXCNc2fN2xrwvLyQ1dtQY5LY_muPbYXJh1Oc4A2WFGKzY9-XRhJy4mYjr0By3mZohh7BEw96Js1q7mwl4tvrvBhFZLNIdH8zc0d-hImg2SG";
let token = new Fernet.Token({ secret, token: message, ttl: 0 });

console.log(token.decode());
```
