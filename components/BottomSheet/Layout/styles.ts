import styled from 'styled-components'
import { IAnimationProps } from '~/components/BottomSheet/data'
import { Wrapped } from '~/components/Basics'
import { colors, space, colorTransparentConvert } from '~/styles/ThemeV2'

export default {
  Container: styled(Wrapped)`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 4;
    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: flex-end;
  `,
  Backdrop: styled.div<IAnimationProps>`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${colorTransparentConvert({
      base: 'Itaú Empresas/Contrast/onBrand-primary',
      opacityName: 'light'
    })};
    z-index: 1;
    transition: ${({ ANIMATION_TIME, hasScrolling }) => !hasScrolling && `all ${ANIMATION_TIME}ms ease 0s`};
  `,
  Content: styled.div<IAnimationProps>`
    transition: ${({ ANIMATION_TIME, hasScrolling }) => !hasScrolling && `all ${ANIMATION_TIME}ms ease 0s`};

    position: relative;
    width: 100%;
    background-color: white;
    border-radius: ${space[2]}px ${space[2]}px 0px 0px;
    z-index: 2;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    max-height: calc(100% - 50px);
  `,
  Header: styled(Wrapped)`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: ${space[3]}px;
    padding: 0 ${space[3]}px;
  `,
  HeaderContent: styled(Wrapped)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  `,
  HeaderScroll: styled.div`
    width: 100%;
    padding: ${space[1]}px 0 ${space[3]}px 0;

    display: flex;
    justify-content: center;
    align-items: center;
  `,
  HeaderScrollContent: styled.div`
    width: 42px;
    height: 4px;
    background: ${colors['brand-colors-neutral/neutral-200']};
    border-radius: 100px;
  `,
  Children: styled.div`
    overflow-y: overlay;
    width: 100%;
    padding: 0 ${space[3]}px 20px;
    overscroll-behavior: contain;
  `
}