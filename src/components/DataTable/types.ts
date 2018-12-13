export interface Def {
  field: string;
  display?: boolean;
  align?: string;
  width?: string;
  sort?: (a: string, b: string) => number;
  transform?: (data: string) => string;
}

export type Row = string[];
