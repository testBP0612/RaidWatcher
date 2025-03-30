import { ref, onMounted, computed } from 'vue';
import type { Player, PlayerInfo, PlayerProfile, ItemSlots } from '../types';
import type { TierPieces } from '../types/wow';

import { config } from '@/config/api';
import { wowConfig } from '@/config/wow';

const usePlayerData = () => {
  const players = ref<Player[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const sortAscending = ref<boolean>(true); // 是否升冪排序
  const showOnlyWarnings = ref<boolean>(false); // 是否只顯示有警告的玩家

  const { wowClassCssVars, wowClassNames, ilvlTiers, enchantableSlots, socketableSlots, translateSlotNameMap } =
    wowConfig;

  // 解析玩家文本
  const parsePlayersList = (text: string): string[] => text.trim().split('\n');

  // 從玩家字串中提取名稱和伺服器
  const extractPlayerInfo = (playerString: string): PlayerInfo => {
    const [name, realm] = playerString.split('-');
    return { name, realm };
  };

  // 建立API請求URL
  const buildApiUrl = ({ name, realm }: PlayerInfo): string => {
    const url = new URL(config.apiBaseUrl);
    url.searchParams.append('region', config.region);
    url.searchParams.append('realm', realm);
    url.searchParams.append('name', name);
    url.searchParams.append('fields', config.fields);
    return url.toString();
  };

  // 計算裝備的階層件數
  const countTierPieces = (items: Record<string, any> | undefined): TierPieces => {
    if (!items) return {};

    return config.tierSlots.reduce<TierPieces>((acc, slot) => {
      if (items[slot] && items[slot].tier && items[slot].tier !== 999) {
        const tier = items[slot].tier;
        acc[tier] = (acc[tier] || 0) + 1;
      }
      return acc;
    }, {});
  };

  // 轉換UTC時間到台灣時區
  const convertToTaiwanTime = (utcDateString: string | undefined): string => {
    if (!utcDateString) return 'n/a';

    const date = new Date(utcDateString);
    return new Intl.DateTimeFormat('zh-TW', {
      timeZone: config.timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  // 格式化階層件數為顯示文字
  const formatTierPieces = (tierPieces: TierPieces): string => {
    return (
      Object.entries(tierPieces)
        .map(([tier, count]) => `${tier} × ${count}`)
        .join(', ') || 'n/a'
    );
  };

  // 獲取職業顏色 (支援英文名稱，返回 CSS 變數)
  const getClassColor = (className: string): string => {
    return wowClassCssVars[className] || 'var(--class-unknown, #CCCCCC)';
  };

  // 獲取職業名稱
  const getClassName = (classId: string): string => {
    return wowClassNames[classId] || '未知';
  };

  // 獲取裝等顏色 (使用 CSS 變數)
  const getIlvlColor = (ilvl: number | string): string => {
    if (ilvl === 'n/a') return 'var(--ilvl-poor)'; // 預設灰色

    const numIlvl = Number(ilvl);
    for (const tier in ilvlTiers) {
      const { min, max, color } = ilvlTiers[tier];
      if (numIlvl >= min && numIlvl <= max) {
        return color;
      }
    }
    return 'var(--ilvl-common)'; // 預設白色
  };

  // 檢查缺少的附魔和寶石
  const checkMissingEnchantsAndGems = (items: ItemSlots) => {
    const missingEnchants: string[] = [];
    const missingGems: string[] = [];

    for (const slotName of enchantableSlots) {
      const slot = slotName as keyof ItemSlots;
      const item = items[slot];

      if (item && !item.enchants?.length) {
        missingEnchants.push(translateSlotNameMap[slot]);
      }
    }

    for (const slotName of socketableSlots) {
      const slot = slotName as keyof ItemSlots;
      const item = items[slot];

      if (item && !item.gems?.length) {
        missingGems.push(translateSlotNameMap[slot]);
      }
    }

    return { missingEnchants, missingGems };
  };

  // 從API回應轉換為所需的玩家資料結構
  const transformPlayerData = (json: PlayerProfile, playerName: string, realm: string): Player => {
    const currentRuns = json.mythic_plus_weekly_highest_level_runs || [];
    const previousRuns = json.mythic_plus_previous_weekly_highest_level_runs || [];
    const highestCurrentRun = currentRuns[0] || null;
    const gear: PlayerProfile['gear'] = json.gear;
    const tierPieces = countTierPieces(gear?.items);
    const formattedTierPieces = formatTierPieces(tierPieces);

    // 從 API 獲取職業信息 (英文字串)
    const className = json.class || '';
    const classColor = getClassColor(className);
    const localizedClassName = getClassName(className);

    const ilvlValue = gear?.item_level_equipped ? Math.round(gear?.item_level_equipped ?? 0) : 'n/a';
    const ilvlColor = getIlvlColor(ilvlValue);

    const encodeName = encodeURIComponent(playerName.trim());
    const encodeRealm = encodeURIComponent(realm.trim());

    const wclUrl = `https://${config.region}.warcraftlogs.com/character/${config.region}/${encodeRealm}/${encodeName}`;
    const raiderIoUrl = `https://raider.io/characters/${config.region}/${encodeRealm}/${encodeName}`;

    // 檢查缺少的附魔和寶石
    const { missingEnchants, missingGems } = checkMissingEnchantsAndGems(gear?.items || {});

    // 構建提示文本
    let enhancementWarning = '';
    if (missingEnchants.length > 0) {
      enhancementWarning += `缺少附魔: ${missingEnchants.join(', ')}`;
    }

    // 如果同時缺少附魔和寶石，添加換行
    if (missingEnchants.length > 0 && missingGems.length > 0) {
      enhancementWarning += '\n';
    }

    if (missingGems.length > 0) {
      enhancementWarning += `缺少寶石: ${missingGems.join(', ')}`;
    }

    return {
      name: playerName,
      realm,
      ilvl: gear?.item_level_equipped ? Math.round(gear?.item_level_equipped ?? 0) : null,
      ilvlColor,
      key: highestCurrentRun ? highestCurrentRun.mythic_level : 'n/a',
      currentRunsCount: currentRuns.length >= 10 ? '10+' : currentRuns.length,
      previousRunsCount: previousRuns.length >= 10 ? '10+' : previousRuns.length,
      time: highestCurrentRun ? convertToTaiwanTime(highestCurrentRun.completed_at) : 'n/a',
      tierPieces: formattedTierPieces,
      classColor,
      localizedClassName,
      className,
      wclUrl,
      raiderIoUrl,
      enhancementWarning,
      thumbnailUrl: json.thumbnail_url,
    };
  };

  // 依照裝等排序玩家資料
  const sortPlayersByItemLevel = (playersToSort: Player[], ascending: boolean = true): Player[] => {
    return [...playersToSort].sort((a, b) => {
      const aIlvl = a.ilvl !== null ? a.ilvl : ascending ? Infinity : -Infinity;
      const bIlvl = b.ilvl !== null ? b.ilvl : ascending ? Infinity : -Infinity;
      return ascending ? aIlvl - bIlvl : bIlvl - aIlvl;
    });
  };

  // 獲取玩家資料
  const fetchPlayerData = async (player: PlayerInfo): Promise<Player | null> => {
    try {
      const { name, realm } = player;
      const url = buildApiUrl(player);
      const response = await fetch(url);
      const json = (await response.json()) as PlayerProfile;
      return transformPlayerData(json, name, realm);
    } catch (error) {
      console.error(`Error fetching data for player: ${player.name}`, error);
      return null;
    }
  };

  // 獲取所有玩家資料
  const fetchAllPlayersData = async (): Promise<void> => {
    try {
      loading.value = true;
      error.value = null;

      // 1. 從文件取得玩家列表
      const response = await fetch(config.playersFile);

      if (!response.ok) {
        throw new Error(`無法獲取玩家列表: ${response.status} ${response.statusText}`);
      }

      const text = await response.text();

      // 2. 轉換為玩家物件
      const playersList = parsePlayersList(text).map(extractPlayerInfo);

      // 3. 獲取每個玩家的資料
      const playersData = await Promise.all(playersList.map(fetchPlayerData));

      // 4. 過濾無效資料
      const validPlayersData = playersData.filter((player): player is Player => player !== null);

      // 5. 更新玩家資料但不排序，因為排序會由 computed 屬性處理
      players.value = validPlayersData;
    } catch (err: any) {
      console.error('獲取資料過程中發生錯誤:', err);
      error.value = `資料載入失敗: ${err.message}`;
    } finally {
      loading.value = false;
    }
  };

  // 切換排序順序
  const toggleSortOrder = (): void => {
    sortAscending.value = !sortAscending.value;
  };

  // 切換篩選警告
  const toggleWarningsFilter = (): void => {
    showOnlyWarnings.value = !showOnlyWarnings.value;
  };

  // 提供手動重新整理的方法
  const refreshData = (): void => {
    fetchAllPlayersData();
  };

  const sortedPlayers = computed(() => {
    let filteredPlayers = [...players.value];

    // 如果啟用了篩選，先過濾出有裝備警告的玩家
    if (showOnlyWarnings.value) {
      filteredPlayers = filteredPlayers.filter(
        (player) => player.enhancementWarning && player.enhancementWarning.length > 0
      );
    }

    // 然後根據排序方向排序
    return sortPlayersByItemLevel(filteredPlayers, sortAscending.value);
  });

  onMounted(fetchAllPlayersData);

  return {
    state: {
      players: sortedPlayers,
      showOnlyWarnings,
      loading,
      error,
      sortAscending,
    },
    actions: {
      toggleSortOrder,
      toggleWarningsFilter,
      refreshData,
    },
  };
};

export default usePlayerData;
