import { createContext, useContext, useState, FC, useEffect } from 'react';

import { IBottomSheetNames, IBottomSheetContext } from '~/utils';

export const BottomSheetContext = createContext<IBottomSheetContext>({} as IBottomSheetContext);

export const BottomSheetProvider: FC = ({ children }) => {
  const [bsName, setBSName] = useState<string>('');
  const [bsIsOpen, setBSIsOpen] = useState(false);
  const [functions, setFunctions] = useState<any>([() => { }]);
  const [data, setData] = useState({});

  useEffect(() => {
    if (bsIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [bsIsOpen]);

  const openBottomSheet = (name: IBottomSheetNames, data?: any, extraInfo?: any): void => {
    console.log({ name, data, extraInfo })
    setBSName(name);
    const fullData = {
      ...data,
      extraInfo
    }
    setData(fullData);
    setBSIsOpen(true);
  };

  const closeBottomSheet = () => {
    setBSName('');
    setBSIsOpen(false);
    defineFunctions([() => null]);
    setData({});
  };

  const defineFunctions = (functions: any) => {
    setFunctions(functions);
  };

  const defineCtx = (ctx: string) => {
    console.log({ ctx });
  };

  return (
    <BottomSheetContext.Provider
      value={{
        functions,
        openBottomSheet,
        bsName,
        defineCtx,
        closeBottomSheet,
        bsIsOpen,
        defineFunctions,
        data,
      }}>
      {children}
    </BottomSheetContext.Provider>
  );
};

export function useBottomSheet(): IBottomSheetContext {
  return useContext(BottomSheetContext);
}
