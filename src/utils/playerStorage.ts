export interface PlayerStorageData {
  customList: string[];
  useCustom: boolean;
  lastUpdated: number;
}

/**
 * 存儲key
 */
export const STORAGE_KEY = 'raidWatcherPlayers';

/**
 * 默認玩家列表文件路徑
 */
export const DEFAULT_PLAYERS_FILE = 'players.txt';

/**
 * 從 localStorage 獲取玩家存儲數據
 * @returns 解析後的存儲數據，如果不存在或解析出錯則返回 null
 */
export const getPlayerStorageData = (): PlayerStorageData | null => {
  try {
    const storageData = localStorage.getItem(STORAGE_KEY);
    if (!storageData) return null;

    const parsed = JSON.parse(storageData) as PlayerStorageData;
    return parsed;
  } catch (error) {
    console.error('解析玩家存儲數據時出錯:', error);
    return null;
  }
};

/**
 * 確定是否使用自定義玩家列表
 * @returns 如果應該使用自定義列表則返回 true，否則返回 false
 */
export const shouldUseCustomList = (): boolean => {
  const storageData = getPlayerStorageData();
  return !!(storageData?.useCustom && storageData.customList && storageData.customList.length > 0);
};

/**
 * 獲取最後更新時間的格式化字符串
 * @returns 格式化的日期時間字符串，如果沒有則返回空字符串
 */
export const getLastUpdatedFormatted = (): string => {
  const storageData = getPlayerStorageData();
  if (storageData?.lastUpdated) {
    const date = new Date(storageData.lastUpdated);
    return date.toLocaleString('zh-TW');
  }
  return '';
};

/**
 * 從默認文件獲取玩家列表
 * @param filePath 文件路徑，默認為 'players.txt'
 * @returns 成功時返回玩家列表的文本內容，失敗時返回空字符串
 */
export const fetchDefaultPlayerList = async (filePath: string = DEFAULT_PLAYERS_FILE): Promise<string> => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`無法獲取玩家列表: ${response.status} ${response.statusText}`);
    }
    return await response.text();
  } catch (error) {
    console.error('加載默認玩家列表時出錯:', error);
    return '';
  }
};

/**
 * 解析玩家列表文本為玩家數組
 * @param text 玩家列表文本，每行一個玩家
 * @returns 玩家數組
 */
export const parsePlayerListText = (text: string): string[] => {
  return text
    .trim()
    .split('\n')
    .filter(line => line.trim());
};

/**
 * 驗證玩家列表文本格式
 * @param text 玩家列表文本
 * @returns 如果格式有效則返回 { valid: true }，否則返回 { valid: false, message: '錯誤信息' }
 */
export const validatePlayerListText = (text: string): { valid: boolean; message?: string } => {
  if (!text.trim()) {
    return { valid: false, message: '玩家列表不能為空' };
  }

  const lines = text.trim().split('\n');
  const invalidLines: number[] = [];

  lines.forEach((line, index) => {
    if (line.trim() && !line.includes('-')) {
      invalidLines.push(index + 1);
    }
  });

  if (invalidLines.length > 0) {
    return {
      valid: false,
      message: `第 ${invalidLines.join(', ')} 行格式錯誤，應為 "玩家名稱-伺服器"`,
    };
  }

  return { valid: true };
};

/**
 * 保存自定義玩家列表到 localStorage
 * @param playerList 玩家列表數組
 * @returns 保存後的存儲數據
 */
export const saveCustomPlayerList = (playerList: string[]): PlayerStorageData => {
  const storageData: PlayerStorageData = {
    customList: playerList,
    useCustom: true,
    lastUpdated: Date.now(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
  return storageData;
};

/**
 * 重置為默認玩家列表（清除自定義設置）
 * @returns 重置後的存儲數據
 */
export const resetToDefaultPlayerList = (): PlayerStorageData => {
  const storageData: PlayerStorageData = {
    customList: [],
    useCustom: false,
    lastUpdated: Date.now(),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
  return storageData;
};

/**
 * 獲取當前應使用的玩家列表
 * 如果自定義列表可用則返回自定義列表，否則加載默認列表
 * @returns 包含玩家列表數組、是否為自定義列表和最後更新時間的對象
 */
export const getCurrentPlayerList = async (): Promise<{
  playerList: string[];
  isCustom: boolean;
  lastUpdated: string;
}> => {
  const storageData = getPlayerStorageData();
  const isCustom = shouldUseCustomList();

  if (isCustom && storageData) {
    return {
      playerList: storageData.customList,
      isCustom: true,
      lastUpdated: getLastUpdatedFormatted(),
    };
  } else {
    const defaultListText = await fetchDefaultPlayerList();
    const defaultList = parsePlayerListText(defaultListText);

    return {
      playerList: defaultList,
      isCustom: false,
      lastUpdated: '',
    };
  }
};
