import Vue, { VNode } from "vue";
import { GrafooClient } from "@grafoo/types";

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }

  interface Window {
    client: GrafooClient;
  }
}
