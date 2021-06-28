 declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare type Nullable<T> = T | null;
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;