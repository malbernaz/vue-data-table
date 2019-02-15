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
