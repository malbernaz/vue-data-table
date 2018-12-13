<template>
  <div>
    <div class="search">
      <input type="text" placeholder="Search..." v-model="search">
      <label for="search">
        Filter by:
        <select id="search" v-model="filter">
          <option
            v-for="def of defs"
            v-if="def.display!==false"
            :key="def.field"
            :value="def.field"
          >{{def.field}}</option>
        </select>
        <Caret/>
      </label>
    </div>
    <slot v-bind="{defs,rows:filteredRows,search,filter,onRowSelect}"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Caret from "../icons/Caret.vue";
import { Def, TableData } from "./types";

export default Vue.extend({
  components: { Caret },
  data() {
    return {
      search: "",
      filter: this.defaultFilter || this.defs[0].field || ""
    };
  },
  props: {
    defs: {
      type: Array as () => Def[],
      required: true
    },
    rows: {
      type: Array as () => TableData[],
      require: true
    },
    defaultFilter: {
      type: String
    },
    onRowSelect: {
      // @ts-ignore
      type: Function as () => (row: TableData) => void
    }
  },
  computed: {
    filteredRows(): TableData[] {
      return this.rows.filter(row => {
        let def = this.defs.find(def => def.field === this.filter) as Def;
        let col = this.defs.indexOf(def);

        return new RegExp(this.search, "gim").test(row[col]);
      });
    }
  }
});
</script>

<style scoped>
.search {
  display: flex;
  margin-bottom: 1em;
}

input,
select {
  appearance: none;
  font: inherit;
  padding: 0.5em 3.2em 0.5em 1em;
  flex-grow: 1;
  border-radius: 0;
  border: 0;
  border-bottom: 2px solid;
  outline: 0;
  background: transparent;
  position: relative;
}

select {
  margin-left: 1em;
}

input:focus,
select:focus {
  border-color: royalblue;
}

label {
  margin-left: 1em;
  position: relative;
}

label svg {
  position: absolute;
  top: 50%;
  right: 1em;
  transform: translateY(-50%);
  pointer-events: none;
}

@media (max-width: 414px) {
  .search {
    flex-direction: column;
    align-items: flex-start;
  }

  input,
  label {
    width: 100%;
  }

  label {
    margin-left: 0;
    margin-top: 1em;
    align-items: baseline;
    display: flex;
  }
}
</style>


