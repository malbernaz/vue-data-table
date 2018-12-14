import { ColumnDef, Row } from "./types";

export default {
  defs: {
    type: Array as () => ColumnDef[],
    required: true
  },
  rows: {
    type: Array as () => Row[],
    require: true
  },
  onRowSelect: {
    // @ts-ignore
    type: Function as () => (row: Row, i: number) => void,
    default: () => {}
  }
};
