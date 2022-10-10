/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

export interface IElectronAPI {
  selectFile: () => void;
  selectFileCompleted: (handler: (filePath: string) => void) => void;
  selectImage: () => void;
  selectImageCompleted: (handler: (base64Image: string) => void) => void;
}

declare global {
  interface Window {
    electron: IElectronAPI;
  }
}




