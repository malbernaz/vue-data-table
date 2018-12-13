<template>
  <div>
    <div class="table-wrapper">
      <WithSearch :defs="defs" :rows="rows" :onRowSelect="handleRowSelect" defaultFilter="Name">
        <DataTable slot-scope="tableProps" v-bind="tableProps"/>
      </WithSearch>
    </div>
    <Modal v-if="showModal" @close="showModal=false" :title="rows[selectedRow][1]">
      <div class="modal">
        <label for="description">
          <h3>edit description:</h3>
          <textarea id="description" v-model="rows[selectedRow][2]"/>
        </label>
        <button @click="save">save edit</button>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import tinydate from "tinydate";
import { DataTable, WithSearch, Def, TableData } from "./DataTable";
import Modal from "./Modal.vue";

let stamp = tinydate("{DD}/{MM}/{YYYY}");
let currFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

interface Data {
  defs: Def[];
  rows: TableData[];
  showModal: boolean;
  selectedRow: number;
}

let defs: Def[] = [
  {
    field: "ID",
    display: false,
    width: "15%"
  },
  {
    field: "Name",
    width: "20%"
  },
  {
    field: "Description",
    width: "60%"
  },
  {
    field: "Date",
    align: "right",
    width: "10%",
    transform: (data: string) => stamp(new Date(data)),
    sort: (a: string, b: string) => +new Date(a) - +new Date(b)
  },
  {
    field: "Amount",
    align: "right",
    width: "10%",
    transform: (data: string) => currFmt.format(parseFloat(data)),
    sort: (a: string, b: string) => parseFloat(a) - parseFloat(b)
  }
];

export default Vue.extend({
  components: { DataTable, Modal, WithSearch },
  data(): Data {
    return {
      defs,
      rows: [],
      showModal: false,
      selectedRow: 0
    };
  },
  async created() {
    let res = await fetch("/payment-data.json");
    let [_, ...rows] = await res.json();

    this.rows = rows;
  },
  methods: {
    handleRowSelect(row: TableData, rowIndex: number) {
      this.selectedRow = rowIndex;
      this.showModal = true;
    },
    save() {
      this.showModal = false;
    }
  }
});
</script>

<style scoped>
.table-wrapper {
  max-width: calc(1200px + 2em);
  width: 100%;
  margin: 1em auto;
  padding: 0 1em;
}

.modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.modal h3 {
  margin-top: 0;
  text-transform: capitalize;
  text-align: start;
}

.modal label {
  width: 100%;
}

.modal textarea {
  font: inherit;
  width: 100%;
  resize: none;
  margin-bottom: 1em;
  height: 200px;
}

.modal button {
  font: inherit;
  color: #fff;
  appearance: none;
  border: 0;
  background: #4169e1;
  padding: 0.5em 1em;
  text-transform: uppercase;
  display: block;
  align-self: flex-end;
}
</style>
