<template>
  <div class="table">
    <table>
      <tr>
        <th
          v-for="(header, i) of defs"
          v-if="header.display!==false"
          :key="header.field"
          :style="{width:header.width||'auto'}"
        >
          <button @click="sort(header, i)">
            {{header.field}}
            <Caret/>
          </button>
        </th>
      </tr>
      <tr
        v-for="(row,i) of transformedData"
        :key="'row'+i"
        role="button"
        tabindex="0"
        @keypress.enter="onRowSelect(row,i)"
        @click="onRowSelect(row,i)"
      >
        <td
          v-for="(cell,j) of row"
          v-if="defs[j].display!==false"
          :key="j"
          :style="{textAlign:defs[j].align||'left'}"
        >{{cell}}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Def, TableData } from "./types";
import Caret from "../icons/Caret.vue";

export default Vue.extend({
  components: { Caret },
  props: {
    defs: {
      type: Array as () => Def[],
      required: true
    },
    rows: {
      type: Array as () => TableData[],
      require: true
    },
    onRowSelect: {
      // @ts-ignore
      type: Function as () => (row: TableData) => void
    }
  },
  data(): { sortedBy?: Def } {
    return {
      sortedBy: void 0
    };
  },
  methods: {
    sort(def: Def) {
      if (this.sortedBy && this.sortedBy.field === def.field) {
        this.rows.reverse();
        this.sortedBy = void 0;
      } else {
        this.sortedBy = def;
      }
    }
  },
  computed: {
    transformedData(): TableData[] {
      let def = this.sortedBy;

      if (def) {
        let col = this.defs.indexOf(def);

        this.rows.sort((rowA, rowB) =>
          // @ts-ignore
          def.sort ? def.sort(rowA[col], rowB[col]) : rowA[col].localeCompare(rowB[col])
        );
      }

      return this.rows.map(row =>
        row.map((cell, i) => {
          let def = this.defs[i];

          return def.transform ? def.transform(cell) : cell;
        })
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
  /* table-layout: fixed; */
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