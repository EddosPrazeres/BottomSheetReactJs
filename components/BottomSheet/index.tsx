import { useEffect, useRef, useState } from 'react'
import { IBottomSheet, IUseRef } from '~/components/BottomSheet/data';
import { useBottomSheet } from '~/context';
import { BottomSheet as Layout } from './Layout';

export const BottomSheet = (props: IBottomSheet) => {
  const { heighForce } = props;
  const refBottomSheet: IUseRef = useRef();
  const [height, setHeight] = useState<string | number>("auto");
  const [hasStartHeight, setHasStartHeight] = useState(false);
  const [animationState, setAnimationState] = useState<string>("animated");
  const [hasScrolling, setHasScrolling] = useState<boolean>(false)
  const { closeBottomSheet } = useBottomSheet();
  const ANIMATION_TIME = 700;

  useEffect(() => {
    if (!hasStartHeight) {
      return
    }

    if (animationState === "animated") {
      setAnimationState("none")
    }
  }, [hasStartHeight])

  useEffect(() => {
    if (hasStartHeight) {
      return;
    }

    setHeight(refBottomSheet?.current?.clientHeight)
    setHasStartHeight(true)
  }, [refBottomSheet?.current?.clientHeight, heighForce])

  const calculateNewHeight = ({ pageY, startPosition }) => (
    Number(height) - (pageY - startPosition)
  )

  const onPositionPageY = (event) => {
    const pageY = {
      touchmove: (event?.touches ?? [])[0]?.pageY || 0,
      touchstart: (event?.touches ?? [])[0]?.pageY || 0,
      touchend: (event?.changedTouches ?? [])[0]?.pageY || 0,
      mouse: event?.pageY || 0
    }

    return pageY[event.type || 'mouse']
  }

  const onDrag = (event) => {
    setHasScrolling(true);
    const startHeight = Number(height);
    const startPosition = onPositionPageY(event);

    const onMouseMove = (_event) => {
      const newHeight = calculateNewHeight({ pageY: onPositionPageY(_event), startPosition });

      const hasMaxScroll = newHeight > startHeight

      if (hasMaxScroll) {
        return
      }

      setHeight(newHeight);
    }

    const onMouseUp = (_event) => {
      setHasScrolling(false);
      const newHeight = calculateNewHeight({ pageY: onPositionPageY(_event), startPosition });
      const hasMinScroll = newHeight < 100;
      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("touchmove", onMouseMove);

      if (hasMinScroll) {
        onClose();
        return;
      }

      setHeight(startHeight);
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });

    document.body.addEventListener("touchmove", onMouseMove);
    document.body.addEventListener("touchend", onMouseUp, { once: true });
  };

  const onClose = () => {
    setAnimationState("animated")

    setTimeout(() => {
      closeBottomSheet();
    }, ANIMATION_TIME)
  }

  const hasAnimated = (): boolean => (
    animationState === "animated"
  )

  const opacityPercent = (): number => (
    Number(height !== "auto" ? height : 0) * 0.01
  )

  const layoutProps = {
    ...props,
    refBottomSheet,
    onDrag,
    onClose,
    height,
    animationState,
    ANIMATION_TIME,
    hasScrolling,
    hasAnimated,
    opacityPercent
  }

  return <Layout {...layoutProps} />
};