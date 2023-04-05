import { Ref } from 'react';

export interface IBottomSheet {
  children: JSX.Element[] | JSX.Element;
  title?: string | JSX.Element;
  heighForce?: string | number;
}

export type IUseRef = Ref<HTMLDivElement>;

export interface IAnimationProps {
  ANIMATION_TIME: number;
  hasScrolling: boolean;
}

export interface IBottomSheetLayout extends IBottomSheet {
  refBottomSheet: IUseRef;
  onDrag: (event: any) => void;
  onClose: () => void;
  height: string | number;
  animationState: string;
  ANIMATION_TIME: number;
  hasScrolling: boolean;
  hasAnimated: () => boolean;
  opacityPercent: () => number;
  updateQuantity?: (operation: string) => void;

}
