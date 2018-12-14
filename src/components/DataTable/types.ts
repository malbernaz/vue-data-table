export interface Def {
  name: string;
  display?: boolean;
  align?: string;
  width?: string;
  compare?: (a: any, b: any) => number;
  transform?: (data: any) => string;
}

export interface Row {
  [key: string]: any;
}
