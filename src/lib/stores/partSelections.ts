import { writable } from 'svelte/store';

export type PartKey = 'HEAD' | 'HEAD_TOP' | 'TORSO' | 'ARM_L' | 'ARM_R' | 'LEG_L' | 'LEG_R' | 'PANTS';

export const partSelections = writable<Record<PartKey, string>>({
  HEAD: 'base',
  HEAD_TOP: 'base',
  TORSO: 'base',
  ARM_L: 'base',
  ARM_R: 'base',
  LEG_L: 'base',
  LEG_R: 'base',
  PANTS: 'base'
});
