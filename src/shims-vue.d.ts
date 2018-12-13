declare module "*.vue" {
  import Vue from "vue";
  export default Vue;
}

declare module "tinydate" {
  export default function tinydate(template: string): (data: Date) => string;
}
