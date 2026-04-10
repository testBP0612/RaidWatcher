<template>
  <section class="space-y-3 sm:space-y-4 md:space-y-5">
    <div class="flex flex-col gap-2.5 md:flex-row md:items-end md:justify-between">
      <div class="space-y-1">
        <p class="wow-section-label">Roster</p>
        <h2 class="font-wow-title text-2xl text-wow-gold sm:text-3xl">玩家名單</h2>
        <p class="text-sm leading-relaxed text-wow-text-medium">先看紅色警告卡，再看低裝等與低場次玩家。</p>
        <div class="wow-divider max-w-sm"></div>
      </div>

      <div
        class="wow-chip inline-flex items-center px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-wow-text-medium"
      >
        {{ showOnlyWarnings ? 'Warning View' : `${players.length} Players Loaded` }}
      </div>
    </div>

    <FilterState v-if="showOnlyWarnings" :count="players.length" @toggle-filter="emit('toggleWarningsFilter')" />

    <div
      v-if="players.length > 0"
      class="grid grid-cols-1 gap-3.5 sm:gap-4 md:grid-cols-2 md:gap-[1.125rem] xl:grid-cols-3 xl:gap-5"
    >
      <PlayerCard v-for="player in players" :key="`${player.name}-${player.realm}`" :player="player" />
    </div>

    <div
      v-else-if="!showOnlyWarnings"
      class="rounded-[1.75rem] border border-wow-gold-dark bg-gradient-to-b from-[rgba(40,30,20,0.9)] to-[rgba(30,20,10,0.9)] p-6 text-center shadow-wow-box"
    >
      <p class="text-lg text-wow-text-light">目前沒有可顯示的玩家資料</p>
      <p class="mt-2 text-sm text-wow-text-medium">請確認玩家名單後重新整理資料。</p>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import type { Player } from '@/types';
  import PlayerCard from './PlayerCard.vue';
  import FilterState from './FilterState.vue';

  interface Props {
    players: Player[];
    showOnlyWarnings: boolean;
  }
  interface Emits {
    (e: 'toggleWarningsFilter'): void;
  }
  defineProps<Props>();
  const emit = defineEmits<Emits>();
</script>
