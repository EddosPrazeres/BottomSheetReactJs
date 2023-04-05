import { Text, CloseIcon, Wrapped} from '~/components';
import S from './styles'

import { IBottomSheetLayout } from '~/components/BottomSheet/data'
import { colors } from '~/styles/ThemeV2';

export const BottomSheet = ({ 
  children, 
  title, 
  refBottomSheet, 
  onDrag, 
  height, 
  onClose, 
  ANIMATION_TIME, 
  hasScrolling,
  hasAnimated,
  opacityPercent
}: IBottomSheetLayout ) => (
  <S.Container id={`BottomSheet`}>
    <S.Backdrop 
      {...{ 
        ANIMATION_TIME, 
        hasScrolling 
      }}
      style={{ 
        opacity: hasAnimated() ? 
          0 
          : opacityPercent() * 0.75
        }}
    />
    <S.Content 
      { ...{ 
        ANIMATION_TIME, 
        hasScrolling 
      }} 
      ref={refBottomSheet} 
      style={{ 
        bottom: hasAnimated() ?
          - height
          : 0, 
        height, 
        opacity: opacityPercent()
    }}>
      <S.Header>
        <S.HeaderScroll 
          onMouseDown={onDrag}
          onTouchStart={onDrag}
        >
          <S.HeaderScrollContent />
        </S.HeaderScroll>
        <S.HeaderContent>
          <Text> {title} </Text>
          <Wrapped onClick={onClose}>
            <CloseIcon color={colors['brand-colors-neutral/neutral-700']}/>
          </Wrapped>
        </S.HeaderContent>
      </S.Header>
      <S.Children>
        {children}
      </S.Children>
    </S.Content>
  </S.Container>
)