import { IBottomSheetNames } from '~/utils';

export interface IBottomSheetContext {
  bsName: IBottomSheetNames;
  bsIsOpen: boolean;
  functions: any;
  data: any;
  closeBottomSheet(): void;
  defineCtx(ctx: string): void;
  openBottomSheet(name: IBottomSheetNames, data?: any): void;
  defineFunctions(functions: any): void;
}
