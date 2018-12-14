<template>
  <div>
    <div class="table-wrapper">
      <WithSearch :defs="defs" :rows="items" :onRowSelect="handleRowSelect" defaultFilter="name">
        <DataTable slot-scope="tableProps" v-bind="tableProps"/>
      </WithSearch>
      <div class="spin-wrapper" v-if="loading">
        <Spinner/>
      </div>
    </div>
    <Modal v-if="showModal" @close="showModal=false" :title="selectedRow.name">
      <div class="modal">
        <label for="description">
          <h3>edit description:</h3>
          <textarea id="description" v-model="selectedRow.description"/>
        </label>
        <button @click="save">save edit</button>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import tinydate from "tinydate";
import { DataTable, WithSearch, ColumnDef, Row } from "./DataTable";
import Modal from "./Modal.vue";
import Spinner from "./Spinner.vue";
import client from "@/api";
import { LIST_PAYMENTS } from "@/queries";
import { mapActions, mapState } from "vuex";

let stamp = tinydate("{DD}/{MM}/{YYYY}");
let currFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

interface Data {
  defs: ColumnDef[];
  showModal: boolean;
  selectedRow?: Row;
}

let defs: ColumnDef[] = [
  {
    name: "id",
    display: false
  },
  {
    name: "name",
    width: "20%"
  },
  {
    name: "description",
    width: "60%"
  },
  {
    name: "date",
    align: "right",
    width: "10%",
    transform: (data: string) => stamp(new Date(data)),
    compare: (a: string, b: string) => +new Date(a) - +new Date(b)
  },
  {
    name: "amount",
    align: "right",
    width: "10%",
    transform: (data: number) => currFmt.format(data),
    compare: (a: number, b: number) => a - b
  }
];

export default Vue.extend({
  components: { DataTable, Modal, WithSearch, Spinner },
  data(): Data {
    return {
      defs,
      showModal: false,
      selectedRow: undefined
    };
  },
  created() {
    this.fetchItems();
  },
  methods: {
    handleRowSelect(row: Row) {
      this.selectedRow = row;
      this.showModal = true;
    },
    save() {
      this.updateItem(this.selectedRow);
      this.showModal = false;
    },
    ...mapActions(["fetchItems", "updateItem"])
  },
  computed: {
    ...mapState(["items", "loading"])
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

.spin-wrapper {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
