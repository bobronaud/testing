import { Phase } from '../../types/state';
import { RootState } from '../store';

export const getPhase = (state: RootState) => state.test.phase as Phase;
