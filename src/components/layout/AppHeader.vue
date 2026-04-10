<template>
  <div class="wow-panel rounded-[2rem] px-3.5 py-4 sm:px-5 sm:py-5 md:px-6">
    <div class="relative flex flex-col gap-4 sm:gap-5 xl:flex-row xl:items-end xl:justify-between">
      <div class="space-y-1.5 sm:space-y-2">
        <p class="wow-section-label">Mythic Plus Audit Board</p>
        <h1 class="font-wow-title text-[2rem] font-bold tracking-[0.06em] text-wow-gold sm:text-5xl">
          {{ title }}
        </h1>
        <p class="max-w-xl text-sm leading-relaxed text-wow-text-medium sm:max-w-2xl sm:text-base">
          集中檢視玩家裝等、M+ 周常、套裝與裝備缺漏，讓補強與提醒都能在同一個畫面完成。
        </p>
        <div class="wow-divider max-w-sm sm:max-w-xl"></div>
      </div>

      <div class="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap sm:gap-3 xl:max-w-[32rem] xl:justify-end">
        <button
          class="wow-button w-full justify-start px-3 py-2 text-sm sm:w-auto sm:justify-center sm:px-4 sm:text-base"
          :class="{ '!border-wow-gold !bg-wow-red-button-hover': showOnlyWarnings }"
          title="只顯示有裝備警告的玩家"
          @click="emit('toggleWarningsFilter')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            class="stroke-wow-gold-light"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span>{{ showOnlyWarnings ? '警告模式中' : '只看裝備警告' }}</span>
        </button>

        <button
          class="wow-button w-full justify-start px-3 py-2 text-sm sm:w-auto sm:justify-center sm:px-4 sm:text-base"
          title="切換排序順序"
          @click="emit('toggleSortOrder')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            class="stroke-wow-gold-light"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path v-if="!sortAscending" d="M7 10l5 5 5-5"></path>
            <path v-else d="M7 15l5-5 5 5"></path>
          </svg>
          <span>裝等 {{ sortAscending ? '低→高' : '高→低' }}</span>
        </button>

        <button
          class="wow-button w-full justify-start px-3 py-2 text-sm sm:w-auto sm:justify-center sm:px-4 sm:text-base"
          title="重新整理資料"
          @click="emit('refreshData')"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="16"
            height="16"
            class="stroke-wow-gold-light"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 6.39 2.61L21 9"></path>
            <path d="M21 4v5h-5"></path>
          </svg>
          <span v-if="loading">載入中...</span>
          <span v-else>重新整理</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  interface Props {
    title: string;
    showOnlyWarnings: boolean;
    sortAscending: boolean;
    loading: boolean;
  }
  interface Emits {
    (e: 'toggleWarningsFilter'): void;
    (e: 'toggleSortOrder'): void;
    (e: 'refreshData'): void;
  }
  defineProps<Props>();
  const emit = defineEmits<Emits>();
</script>
