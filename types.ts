export enum InnovationMethod {
  TRIZ = 'TRIZ',
  DESIGN_THINKING = 'DESIGN_THINKING',
  SIT = 'SIT',
  SCAMPER = 'SCAMPER',
  SIX_HATS = 'SIX_HATS',
  BIOMIMICRY = 'BIOMIMICRY',
  FIVE_WHYS = 'FIVE_WHYS',
  MORPHOLOGICAL = 'MORPHOLOGICAL',
  ANALOGICAL = 'ANALOGICAL',
  SYNECTICS = 'SYNECTICS',
  VISUAL_PROTOTYPING = 'VISUAL_PROTOTYPING'
}

export interface TechniqueDef {
  id: InnovationMethod;
  name: string;
  description: string;
  icon: string;
  color: string;
  promptTemplate: string;
}

export interface AnalysisResult {
  markdown: string;
  timestamp: number;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';