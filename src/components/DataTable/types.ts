export interface Def {
  field: string;
  display?: boolean;
  align?: string;
  sort?: (a: string, b: string) => number;
  transform?: (data: string) => string;
  width?: string;
}

export type TableData = string[];
