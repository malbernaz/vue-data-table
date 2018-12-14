export interface Def {
  field: string;
  display?: boolean;
  align?: string;
  width?: string;
  sort?: (a: any, b: any) => number;
  transform?: (data: any) => string;
}

export type Row = { [key: string]: any }[];
