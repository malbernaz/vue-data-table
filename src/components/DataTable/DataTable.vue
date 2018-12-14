<template>
  <div class="table">
    <table>
      <tr>
        <th
          v-for="def of defs"
          v-if="def.display!==false"
          :key="def.field"
          :style="{width:def.width||'auto'}"
        >
          <button @click="sort(def)">
            {{def.field}}
            <Caret/>
          </button>
        </th>
      </tr>
      <tr
        v-for="(row,i) of transformedData"
        :key="'row'+i"
        @keypress.enter="onRowSelect(row,i)"
        @click="onRowSelect(row,i)"
        role="button"
        tabindex="0"
      >
        <td
          v-for="(def,j) of defs"
          v-if="def.display!==false"
          :key="j+i+'cell'"
          :style="{textAlign:def.align||'left'}"
        >{{row[def.field]}}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Def, Row } from "./types";
import Caret from "../icons/Caret.vue";

export default Vue.extend({
  components: { Caret },
  props: {
    defs: {
      type: Array as () => Def[],
      required: true
    },
    rows: {
      type: Array as () => Row[],
      require: true
    },
    onRowSelect: {
      // @ts-ignore
      type: Function as () => (row: Row) => void,
      default: () => {}
    }
  },
  data(): { sortedBy?: Def } {
    return {
      sortedBy: undefined
    };
  },
  methods: {
    sort(def: Def) {
      if (this.sortedBy && this.sortedBy.field === def.field) {
        this.rows.reverse();
        this.sortedBy = undefined;
      } else {
        this.sortedBy = def;
      }
    }
  },
  computed: {
    transformedData(): Row {
      if (this.sortedBy) {
        let { field, sort } = this.sortedBy;

        this.rows.sort((rowA, rowB) =>
          sort ? sort(rowA[field], rowB[field]) : rowA[field].localeCompare(rowB[field])
        );
      }

      return this.rows.map(row =>
        this.defs.reduce(
          (acc, { field, transform }) => ({
            ...acc,
            [field]: transform ? transform(row[field]) : row[field]
          }),
          {}
        )
      );
    }
  }
});
</script>

<style scoped>
.table {
  overflow-x: auto;
  min-height: 0.01%;
}

table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
}

button {
  padding: 0.625em 0.75em 0.625em 1em;
  appearance: none;
  font: inherit;
  border: 0;
  background-color: #4169e1;
  color: #fff;
  display: flex;
  justify-content: space-between;
  outline: 0;
  width: 100%;
  transition: background-color 0.2s ease;
  cursor: pointer;
}

button:hover,
button:focus {
  background-color: #375ac2;
}

th,
td {
  padding: 0;
  margin: 0;
}

td {
  padding: 0.5em 1em;
  text-align: left;
}

tr:nth-child(odd) {
  background: #f3f3f3;
}

button svg {
  transition: transform 0.2s ease;
}

button:focus svg {
  transform: rotate(-180deg);
}
</style>