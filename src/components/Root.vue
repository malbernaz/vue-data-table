<template>
  <div>
    <div class="table-wrapper">
      <WithSearch :defs="defs" :rows="rows" :onRowSelect="handleRowSelect" defaultFilter="Name">
        <DataTable slot-scope="tableProps" v-bind="tableProps"/>
      </WithSearch>
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
import { DataTable, WithSearch, Def, Row } from "./DataTable";
import Modal from "./Modal.vue";
import client from "@/api";
import { LIST_PAYMENTS } from "@/queries";

let stamp = tinydate("{DD}/{MM}/{YYYY}");
let currFmt = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

interface Data {
  defs: Def[];
  rows: Row[];
  showModal: boolean;
  selectedRow?: Row;
}

let defs: Def[] = [
  {
    field: "id",
    display: false
  },
  {
    field: "name",
    width: "20%"
  },
  {
    field: "description",
    width: "60%"
  },
  {
    field: "date",
    align: "right",
    width: "10%",
    transform: (data: string) => stamp(new Date(data)),
    sort: (a: string, b: string) => +new Date(a) - +new Date(b)
  },
  {
    field: "amount",
    align: "right",
    width: "10%",
    transform: (data: number) => currFmt.format(data),
    sort: (a: number, b: number) => a - b
  }
];

export default Vue.extend({
  components: { DataTable, Modal, WithSearch },
  data(): Data {
    return {
      defs,
      rows: [],
      showModal: false,
      selectedRow: undefined
    };
  },
  async created() {
    const {
      data: {
        // @ts-ignore
        listPayments: { items }
      }
    } = await client.execute(LIST_PAYMENTS);

    this.rows = items;
  },
  methods: {
    handleRowSelect(row: Row) {
      this.selectedRow = row;
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
