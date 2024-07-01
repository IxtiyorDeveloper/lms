export interface PrintdOptions {
  /** Parent element where the printable element will be appended. */
  parent?: HTMLElement;
  /** Specifies a custom document head elements */
  headElements?: HTMLElement[];
  /** Specifies a custom document body elements */
  bodyElements?: HTMLElement[];

  [key: string]: HTMLElement | HTMLElement[] | undefined;
}

export interface PrintdCallbackArgs {
  /** Iframe reference */
  iframe: HTMLIFrameElement;
  /** HTMLElement copy reference */
  element?: HTMLElement;
  /** Function to launch the print dialog after index was loaded */
  launchPrint: Function;
}

export interface IEl {
  /** Iframe reference */
  current: any;
}

export type PrintdCallback = (args: PrintdCallbackArgs) => void;
