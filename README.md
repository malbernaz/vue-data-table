# Vue Data Table

## Documentation

### `DataTable`

```html
<DataTable :defs="defs" :rows="items" :onRowSelect="handleRowSelect" />
```

#### Props:

##### `defs`

The prop defs is an array of column definitions. Each column definition must have the following shape:

```ts
export interface ColumnDef {
  // the column name
  name: string;
  // whether the column should be displayed
  display?: boolean;
  // left or right (default: left)
  align?: string;
  // the column width
  width?: string;
  // a function that describes how the columns should be sorted
  compare?: (a: any, b: any) => number;
  // how the column field should be displayed
  transform?: (data: any) => string;
}
```

##### `rows`

The prop rows is an array of objects withs keys for each column name.

```ts
export interface Row {
  [key: string]: any;
}

const rows: Row[] = {
  /*...*/
};
```

##### `onRowSelect`

The prop onRowSelect is an callback that is triggered whenever a row is clicked. It receives as paramenter the row it self.

```ts
type OnRowSelect = (row: Row) => void;
```

### `WithSearch`

```html
<WithSearch :defs="defs" :rows="items" :onRowSelect="handleRowSelect" defaultFilter="name">
  <DataTable slot-scope="tableProps" v-bind="tableProps"/>
</WithSearch>
```

`WithSearch` is a wrapper for `DataTable`. It receives the same props and pass then along through `slot-scope`. In addition to that it receives a `defaultFilter` prop which correspond to a column name.

## Example app deployment method

The frontend is deployed with zeit [now](https://now.sh). And for the backend i'm using an AWS stack with amplify, dynamoDB and appsync.

## Answers

### How long did you spend on the test? Would you do anything differently if you had more time?

I took 3 days to finish the components and write the tests and a day to setup amplify and integrate. If I had more time I would add more features such as pagination and async search and add error handling.

### In what ways would you adapt your component so that it could be used in many different scenarios where a data table is required?

I have created the data table component with reusability in mind, it's completely generic.

### What is your favorite CSS property? Why?

My favorite CSS properties are opacity and transform, because they are the only that do not trigger layout on the browser when animated : )

### What is your favorite modern Javascript feature? Why?

Arrow functions, because I love to write my code concisely.

### What is your favorite third-party Vue.js library? Why?

Haven't used many, because I've been working primarily with React for the past 3 years. Vuex is great though.

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
