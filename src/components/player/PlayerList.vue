<template>
  <!-- 過濾狀態顯示 -->
  <FilterState v-if="showOnlyWarnings" :count="players.length" @toggle-filter="emit('toggleWarningsFilter')" />

  <!-- 卡片式資料 -->
  <div
    v-if="!showOnlyWarnings || players.length > 0"
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5"
  >
    <PlayerCard v-for="player in players" :key="player.name" :player="player" />
  </div>
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
