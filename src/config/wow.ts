import type { IlvlTiers, WowClassCssVars, WowClassNames } from '@/types/wow';

type WowConfig = {
  /** WoW 職業名稱與 CSS 變數映射 */
  wowClassCssVars: WowClassCssVars;
  /** WoW 職業名稱映射 (英文轉中文) */
  wowClassNames: WowClassNames;
  /** 裝等顏色等級 (可自定義) */
  ilvlTiers: IlvlTiers;
  /** 套裝的部位 */
  tierSlots: string[];
  /** 可附魔的部位 */
  enchantableSlots: string[];
  /** 可插寶石的部位 */
  socketableSlots: string[];
  /** 翻譯部位名稱 */
  translateSlotNameMap: {
    [key: string]: string;
  };
};

/** 魔獸世界相關配置 */
export const wowConfig: WowConfig = {
  wowClassCssVars: {
    Warrior: 'var(--color-class-warrior)',
    Paladin: 'var(--color-class-paladin)',
    Hunter: 'var(--color-class-hunter)',
    Rogue: 'var(--color-class-rogue)',
    Priest: 'var(--color-class-priest)',
    'Death Knight': 'var(--color-class-death-knight)',
    DeathKnight: 'var(--color-class-death-knight)',
    Shaman: 'var(--color-class-shaman)',
    Mage: 'var(--color-class-mage)',
    Warlock: 'var(--color-class-warlock)',
    Monk: 'var(--color-class-monk)',
    Druid: 'var(--color-class-druid)',
    'Demon Hunter': 'var(--color-class-demon-hunter)',
    DemonHunter: 'var(--color-class-demon-hunter)',
    Evoker: 'var(--color-class-evoker)',
  },
  wowClassNames: {
    Warrior: '戰士',
    Paladin: '聖騎士',
    Hunter: '獵人',
    Rogue: '盜賊',
    Priest: '牧師',
    'Death Knight': '死亡騎士',
    Shaman: '薩滿',
    Mage: '法師',
    Warlock: '術士',
    Monk: '武僧',
    Druid: '德魯伊',
    'Demon Hunter': '惡魔獵人',
    Evoker: '喚能師',
  },
  ilvlTiers: {
    poor: { min: 0, max: 599, color: 'var(--color-ilvl-poor)' },
    common: { min: 600, max: 619, color: 'var(--color-ilvl-common)' },
    uncommon: { min: 620, max: 629, color: 'var(--color-ilvl-uncommon)' },
    rare: { min: 630, max: 639, color: 'var(--color-ilvl-rare)' },
    epic: { min: 640, max: Infinity, color: 'var(--color-ilvl-epic)' },
  },
  tierSlots: ['chest', 'hands', 'head', 'legs', 'shoulder'],
  enchantableSlots: ['back', 'chest', 'wrist', 'legs', 'finger1', 'finger2', 'mainhand'],
  socketableSlots: ['neck', 'finger1', 'finger2'],
  translateSlotNameMap: {
    head: '頭部',
    neck: '項鍊',
    shoulder: '肩膀',
    back: '披風',
    chest: '胸甲',
    waist: '腰帶',
    wrist: '護腕',
    hands: '手套',
    legs: '腿部',
    feet: '鞋子',
    finger1: '戒指 1',
    finger2: '戒指 2',
    trinket1: '飾品 1',
    trinket2: '飾品 2',
    mainhand: '主手武器',
    offhand: '副手武器',
  },
};
