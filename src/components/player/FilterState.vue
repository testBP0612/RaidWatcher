<template>
  <div
    v-if="count > 0"
    class="rounded-2xl border border-wow-horde bg-[rgba(179,0,0,0.2)] px-4 py-3 shadow-wow-box"
  >
    <p class="flex flex-wrap items-center justify-center gap-2 text-center text-wow-text-light">
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
      <span>目前只顯示有裝備警告的玩家</span>
      <span class="wow-status-pill border-wow-horde px-2 py-0.5 text-xs font-semibold">
        {{ count }} 位
      </span>
    </p>
  </div>

  <div
    v-else
    class="rounded-[1.75rem] border border-wow-gold-dark bg-gradient-to-b from-[rgba(40,30,20,0.9)] to-[rgba(30,20,10,0.9)] p-6 text-center shadow-wow-box"
  >
    <p class="text-xs font-semibold uppercase tracking-[0.28em] text-wow-text-medium">All Clear</p>
    <p class="mt-3 text-lg text-wow-text-light">目前沒有玩家存在裝備警告</p>
    <button
      class="wow-button mt-4 px-4 py-2 text-sm"
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
