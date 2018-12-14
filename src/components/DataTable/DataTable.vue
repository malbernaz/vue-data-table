<template>
  <div class="table">
    <table>
      <tr>
        <th
          v-for="def of defs"
          v-if="def.display!==false"
          :key="def.name"
          :style="{width:def.width}"
        >
          <button @click="sort(def)">
            {{def.name}}
            <Caret/>
          </button>
        </th>
      </tr>
      <tr
        v-for="(row,i) of transformedData"
        :key="'row'+i"
        @keypress.enter="onRowSelect(rows[i])"
        @click="onRowSelect(rows[i])"
        role="button"
        tabindex="0"
      >
        <td
          v-for="(def,j) of defs"
          v-if="def.display!==false"
          :key="j+i+'cell'"
          :style="{textAlign:def.align}"
        >{{row[def.name]}}</td>
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
      type: Function as () => (row: Row, i: number) => void,
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
      if (this.sortedBy && this.sortedBy.name === def.name) {
        this.rows.reverse();
        this.sortedBy = undefined;
      } else {
        this.sortedBy = def;
      }
    }
  },
  computed: {
    transformedData(): Row[] {
      if (this.sortedBy) {
        let { name, compare } = this.sortedBy;

        this.rows.sort((rowA, rowB) =>
          compare ? compare(rowA[name], rowB[name]) : rowA[name].localeCompare(rowB[name])
        );
      }

      return this.rows.map(row =>
        this.defs.reduce(
          (acc, { name, transform }) => ({
            ...acc,
            [name]: transform ? transform(row[name]) : row[name]
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
