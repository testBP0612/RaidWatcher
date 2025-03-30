export interface TierPieces {
  [key: string]: number;
}

export interface WowClassInfo {
  name: string;
  color: string;
  icon: string;
}

export interface IlvlTier {
  min: number;
  max: number;
  color: string;
}

export interface WowClassCssVars {
  [key: string]: string;
}

export interface WowClassNames {
  [key: string]: string;
}

export interface IlvlTiers {
  [key: string]: IlvlTier;
}
