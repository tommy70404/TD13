export interface IReactComProps {
  className?: string;
  children?: React.ReactNode;
  style?: any;
}

export interface IField<T> {
  key: keyof T;
  label: string;
  type?: string;
  options?: {
    value: any;
    label?: string;
  }[];
  fields?: IField<any>[];
  fetchMethod?: any;
  soloPostMethod?: any;
  inputProps?: any;
}

export interface StrIndxObj<T> {
  [index: string]: T;
}

export type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;
