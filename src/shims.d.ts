declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "*.json" {
  let json: any;
  export default json;
}

declare module "tinydate" {
  export default function tinydate(template: string): (data: Date) => string;
}
