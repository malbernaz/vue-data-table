import Vue from "vue";
import Vuex from "vuex";
import { Row } from "./components/DataTable";
import { GrafooClient } from "@grafoo/types";
import { LIST_PAYMENTS, ListPayments, UPDATE_PAYMENT } from "./queries";

Vue.use(Vuex);

export default function createStore(client: GrafooClient) {
  return new Vuex.Store({
    state: {
      items: [] as Row[],
      loading: false
    },
    mutations: {
      setItems(state, items: Row[]) {
        state.items = items;
      },
      updateItem(state, updatedItem: Row) {
        state.items = state.items.map(item => (updatedItem.id === item.id ? updatedItem : item));
      },
      setLoading(state, loading) {
        state.loading = loading;
      }
    },
    actions: {
      async fetchItems(ctx) {
        ctx.commit("setLoading", true);

        const { data } = await client.execute<ListPayments>(LIST_PAYMENTS);

        ctx.commit("setLoading", false);
        ctx.commit("setItems", data.listPayments.items);
      },
      async updateItem(ctx, item: Row) {
        ctx.commit("updateItem", item);

        await client.execute(UPDATE_PAYMENT, {
          input: item
        });
      }
    }
  });
}
