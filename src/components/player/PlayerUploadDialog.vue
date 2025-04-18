<template>
  <div>
    <!-- 上傳按鈕 - 位於頁面頂部的操作區域 -->
    <button
      class="bg-wow-red-button text-wow-gold-light border-2 border-wow-gold-dark rounded px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-all duration-200 font-wow-title font-bold hover:bg-wow-red-button-hover hover:border-wow-gold hover:shadow-wow-btn-hover text-sm sm:text-base"
      @click="openDialog"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="stroke-wow-gold-light"
      >
        <path d="M12 20h9"></path>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
      </svg>
      <span>管理玩家列表</span>
    </button>

    <!-- 對話框背景遮罩 -->
    <div
      v-if="isDialogOpen"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
      @click="closeDialogIfClickedOutside"
    >
      <!-- 對話框 -->
      <div
        class="bg-gradient-to-b from-[rgba(40,30,20,0.95)] to-[rgba(30,20,10,0.95)] w-11/12 max-w-2xl rounded-lg border-2 border-wow-gold-dark shadow-wow-box overflow-hidden"
        @click.stop
      >
        <!-- 對話框標題 -->
        <div class="bg-gradient-to-b from-[#3d2f1b] to-[#211909] p-3 border-b border-wow-gold-dark">
          <h2 class="font-wow-title text-xl sm:text-2xl font-bold text-wow-gold tracking-wide">管理玩家列表</h2>
        </div>

        <!-- 對話框內容 -->
        <div class="p-4 space-y-4">
          <!-- 使用狀態顯示 -->
          <div class="flex items-center justify-between text-wow-text-light mb-2">
            <div class="flex items-center gap-2">
              <span class="text-sm sm:text-base">
                目前使用:
                <span
                  :class="{
                    'text-wow-gold font-bold': !isCustomList,
                    'text-green-400 font-bold': isCustomList,
                  }"
                >
                  {{ isCustomList ? '自訂列表' : '預設列表' }}
                </span>
              </span>
              <span v-if="isCustomList && lastUpdated" class="text-xs text-wow-text-light opacity-70">
                上次更新: {{ lastUpdated }}
              </span>
            </div>
            <div class="flex gap-2">
              <button
                v-if="isCustomList"
                class="bg-[rgba(150,20,20,0.3)] hover:bg-[rgba(200,20,20,0.4)] text-wow-text-light text-sm px-2 py-1 rounded border border-wow-horde"
                @click="handleResetToDefault"
              >
                重置為預設
              </button>
            </div>
          </div>

          <!-- 說明文字 -->
          <div class="text-wow-text-light text-sm border border-wow-border-dark bg-[rgba(0,0,0,0.2)] p-3 rounded">
            <p>每行請輸入一個玩家，格式為：<span class="text-wow-gold">玩家名稱-伺服器</span></p>
            <p class="mt-1 opacity-80">例如：經過的兔子-寒冰皇冠</p>
          </div>

          <!-- 文本輸入區域 -->
          <div class="w-full">
            <textarea
              v-model="playerListText"
              class="w-full h-64 bg-[rgba(20,15,10,0.8)] text-wow-text-light border border-wow-border-dark p-3 rounded resize-none font-mono text-sm"
              placeholder="在此輸入玩家列表，每行一個玩家..."
            ></textarea>
          </div>

          <!-- 驗證訊息區域 -->
          <div v-if="validationMessage" class="text-wow-horde text-sm">
            {{ validationMessage }}
          </div>

          <!-- 按鈕區域 -->
          <div class="flex justify-end gap-3 mt-4">
            <button
              class="px-3 py-1.5 border border-wow-border-dark rounded bg-[rgba(40,30,20,0.5)] text-wow-text-light hover:bg-[rgba(60,45,30,0.5)]"
              @click="closeDialog"
            >
              取消
            </button>
            <button
              class="px-4 py-1.5 bg-wow-red-button text-wow-gold-light border border-wow-gold-dark rounded font-bold hover:bg-wow-red-button-hover hover:border-wow-gold"
              @click="handleSavePlayerList"
            >
              保存列表
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    getCurrentPlayerList,
    validatePlayerListText,
    parsePlayerListText,
    saveCustomPlayerList,
    resetToDefaultPlayerList,
    fetchDefaultPlayerList,
  } from '@/utils/playerStorage';

  interface Emits {
    (e: 'update-player-list', playerList: string[]): void;
  }
  const emit = defineEmits<Emits>();

  const isDialogOpen = ref(false);
  const playerListText = ref('');
  const validationMessage = ref('');
  const isCustomList = ref(false);
  const lastUpdated = ref('');

  // 打開對話框
  const openDialog = async () => {
    isDialogOpen.value = true;
    await loadCurrentPlayerList();
  };

  // 關閉對話框
  const closeDialog = () => {
    isDialogOpen.value = false;
    validationMessage.value = '';
  };

  // 點擊外部區域關閉對話框
  const closeDialogIfClickedOutside = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      closeDialog();
    }
  };

  // 從儲存加載當前玩家列表
  const loadCurrentPlayerList = async () => {
    const { playerList, isCustom, lastUpdated: updated } = await getCurrentPlayerList();
    playerListText.value = playerList.join('\n');
    isCustomList.value = isCustom;
    lastUpdated.value = updated;
  };

  // 加載默認玩家列表
  const loadDefaultList = async () => {
    const defaultListText = await fetchDefaultPlayerList();
    playerListText.value = defaultListText;
  };

  // 處理保存玩家列表
  const handleSavePlayerList = () => {
    const text = playerListText.value;

    // 驗證
    const validation = validatePlayerListText(text);
    if (!validation.valid) {
      validationMessage.value = validation.message || '格式錯誤';
      return;
    }

    // 解析並保存
    const playerList = parsePlayerListText(text);
    saveCustomPlayerList(playerList);

    // 更新狀態
    isCustomList.value = true;
    lastUpdated.value = new Date().toLocaleString('zh-TW');
    validationMessage.value = '';

    // 通知父組件
    emit('update-player-list', playerList);
    closeDialog();
  };

  // 處理重置為默認列表
  const handleResetToDefault = async () => {
    await loadDefaultList();
    resetToDefaultPlayerList();

    // 更新狀態
    isCustomList.value = false;
    lastUpdated.value = '';
    validationMessage.value = '';

    // 通知父組件
    emit('update-player-list', ['default']);
  };
</script>
