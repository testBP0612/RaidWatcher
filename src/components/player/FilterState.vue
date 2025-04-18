<template>
  <!-- 有過濾結果時顯示計數指示器 -->
  <div v-if="count > 0" class="mb-4 bg-[rgba(179,0,0,0.2)] border border-wow-horde rounded py-2 px-4">
    <p class="flex items-center justify-center text-wow-text-light">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        class="stroke-wow-horde mr-2"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
      <span>目前只顯示有裝備警告的玩家 ({{ count }} 位)</span>
    </p>
  </div>

  <!-- 無過濾結果時顯示空狀態 -->
  <div
    v-else
    class="bg-gradient-to-b from-[rgba(40,30,20,0.9)] to-[rgba(30,20,10,0.9)] border border-wow-gold-dark rounded shadow-wow-box p-6 my-4 text-center"
  >
    <p class="text-wow-text-light text-lg">目前沒有玩家存在裝備警告</p>
    <button
      class="mt-4 bg-wow-red-button text-wow-gold-light border border-wow-gold-dark px-3 py-1.5 rounded cursor-pointer font-wow-title font-bold transition-all duration-200 hover:bg-wow-red-button-hover hover:border-wow-gold hover:shadow-wow-btn-hover text-sm"
      @click="emit('toggleFilter')"
    >
      顯示所有玩家
    </button>
  </div>
</template>

<script lang="ts" setup>
  interface Props {
    count: number;
  }
  interface Emits {
    (e: 'toggleFilter'): void;
  }
  defineProps<Props>();
  const emit = defineEmits<Emits>();
</script>
