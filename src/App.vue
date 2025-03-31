<template>
  <div class="max-w-6xl mx-auto p-3 sm:p-4 md:p-5 relative z-10 min-h-svh">
    <!-- 頁頭 -->
    <AppHeader
      title="RaidWatcher"
      :show-only-warnings="showOnlyWarnings"
      :sort-ascending="sortAscending"
      :loading="loading"
      @toggle-warnings-filter="toggleWarningsFilter"
      @toggle-sort-order="toggleSortOrder"
      @refresh-data="refreshData"
    />

    <!-- 錯誤訊息 -->
    <ErrorMessage v-if="error" :message="error" @retry="refreshData" />

    <!-- 載入中狀態 -->
    <LoadingSpinner v-if="loading" />

    <!-- 玩家列表 -->
    <PlayerList
      v-else
      :players="players"
      :show-only-warnings="showOnlyWarnings"
      @toggle-warnings-filter="toggleWarningsFilter"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  import usePlayerData from './composables/usePlayerData';
  import LoadingSpinner from './components/ui/LoadingSpinner.vue';
  import AppHeader from './components/layout/AppHeader.vue';
  import ErrorMessage from './components/ui/ErrorMessage.vue';
  import PlayerList from './components/player/PlayerList.vue';

  export default defineComponent({
    name: 'App',
    components: {
      LoadingSpinner,
      AppHeader,
      ErrorMessage,
      PlayerList,
    },
    setup() {
      const { state, actions } = usePlayerData();
      const { players, showOnlyWarnings, loading, error, sortAscending } = state;

      const { toggleSortOrder, toggleWarningsFilter, refreshData } = actions;

      return {
        players,
        showOnlyWarnings,
        loading,
        error,
        sortAscending,
        toggleSortOrder,
        toggleWarningsFilter,
        refreshData,
      };
    },
  });
</script>

<style src="./style.css"></style>
