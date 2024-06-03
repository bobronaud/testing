import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store/store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type Output = [string | null, (k: string, v: string) => void];

export const useSessionStorage = (key: string): Output => {
  const value = sessionStorage.getItem(key);
  const setValue = (k: string, v: string) => {
    sessionStorage.setItem(k, v);
  };
  return [value, setValue];
};
