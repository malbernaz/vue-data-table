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
            :key="def.name"
            :value="def.name"
          >{{def.name}}</option>
        </select>
        <Caret/>
      </label>
    </div>
    <slot v-bind="{defs,rows:filteredRows,onRowSelect,search,filter}"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Caret from "../icons/Caret.vue";
import { Row, ColumnDef } from "./types";
import props from "@/components/DataTable/props";

export default Vue.extend({
  components: { Caret },
  data() {
    return {
      search: "",
      filter: this.defaultFilter || (this.defs.find(def => def.display !== false) as ColumnDef).name
    };
  },
  props: {
    ...props,
    defaultFilter: {
      type: String
    }
  },
  computed: {
    filteredRows(): Row[] {
      return this.rows.filter(row => new RegExp(this.search, "gim").test(row[this.filter]));
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
  transition: border-color 0.2s ease;
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


