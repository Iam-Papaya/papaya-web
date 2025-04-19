// routes/personaliza/components/parts.ts

export type PartCategory = 'HEAD' | 'HEAD_TOP' | 'ARM_L' | 'ARM_R' | 'LEG_L' | 'LEG_R' | 'TORSO' | 'PANTS';

export interface PartOption {
  name: string;
  color: string; // código hex para mostrar en el UI
  glb: string;   // ruta relativa al archivo .glb dentro de /models
}

export const parts: Record<PartCategory, PartOption[]> = {
  HEAD: [
    { name: 'Base', color: '#fcd34d', glb: '/models/HEAD/base.glb' },
  ],
  HEAD_TOP: [
    { name: 'Base', color: '#f87171', glb: '/models/HEAD_TOP/base.glb' },
  ],
  ARM_L: [
    { name: 'Base', color: '#60a5fa', glb: '/models/ARM_L/base.glb' },
  ],
  ARM_R: [
    { name: 'Base', color: '#60a5fa', glb: '/models/ARM_R/base.glb' },
  ],
  LEG_L: [
    { name: 'Base', color: '#a78bfa', glb: '/models/LEG_L/base.glb' },
  ],
  LEG_R: [
    { name: 'Base', color: '#a78bfa', glb: '/models/LEG_R/base.glb' },
  ],
  TORSO: [
    { name: 'Base', color: '#34d399', glb: '/models/TORSO/base.glb' },
  ],
  PANTS: [
    { name: 'Base', color: '#f472b6', glb: '/models/PANTS/base.glb' },
  ],
};
