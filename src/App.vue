<template>
  <div class="relative z-10 min-h-svh px-3 py-4 sm:px-4 md:px-5 md:py-6">
    <div class="mx-auto max-w-7xl space-y-5 md:space-y-6">
      <AppHeader
        title="RaidWatcher"
        :show-only-warnings="showOnlyWarnings"
        :sort-ascending="sortAscending"
        :loading="loading"
        @toggle-warnings-filter="toggleWarningsFilter"
        @toggle-sort-order="toggleSortOrder"
        @refresh-data="refreshData"
      />

      <ErrorMessage v-if="error" :message="error" @retry="refreshData" />

      <LoadingSpinner v-if="loading" />

      <template v-else>
        <section class="grid gap-3.5 sm:gap-4 xl:grid-cols-[minmax(0,1fr)_19rem]">
          <div class="wow-panel p-3.5 sm:p-5">
            <div class="flex flex-col gap-2.5 md:flex-row md:items-end md:justify-between">
              <div class="space-y-1">
                <p class="wow-section-label">Audit Overview</p>
                <h2 class="font-wow-title text-[1.65rem] text-wow-gold sm:text-3xl">當前隊伍稽查總覽</h2>
                <p class="max-w-xl text-sm leading-relaxed text-wow-text-medium sm:max-w-2xl sm:text-base">
                  優先檢查低裝等、缺附魔與低周常場次的玩家，讓補強名單在同一眼就能判讀。
                </p>
                <div class="wow-divider max-w-sm sm:max-w-lg"></div>
              </div>

              <div
                class="wow-chip inline-flex items-center self-start px-3 py-1 text-[0.7rem] font-semibold tracking-[0.18em] text-wow-text-medium uppercase md:self-auto"
              >
                {{ sortAscending ? 'Ilvl Low to High' : 'Ilvl High to Low' }}
              </div>
            </div>

            <div class="mt-3.5 grid gap-2.5 sm:gap-3 md:grid-cols-3">
              <div class="rounded-[1.35rem] border border-wow-border-dark bg-[rgba(0,0,0,0.12)] p-3.5 sm:p-4">
                <p class="wow-section-label !text-[0.68rem] !tracking-[0.2em]">玩家總數</p>
                <p class="mt-1.5 font-wow-title text-[2rem] text-wow-gold sm:text-3xl">{{ totalPlayersCount }}</p>
                <p class="mt-1 text-xs text-wow-text-medium">成功載入角色</p>
              </div>

              <div class="rounded-[1.35rem] border border-wow-horde bg-[rgba(140,14,14,0.14)] p-3.5 sm:p-4">
                <p class="wow-section-label !text-[0.68rem] !tracking-[0.2em]">裝備警告</p>
                <p class="mt-1.5 font-wow-title text-[2rem] text-wow-gold-light sm:text-3xl">{{ warningPlayersCount }}</p>
                <p class="mt-1 text-xs text-wow-text-medium">需優先補強</p>
              </div>

              <div class="rounded-[1.35rem] border border-wow-border-dark bg-[rgba(0,0,0,0.12)] p-3.5 sm:p-4">
                <p class="wow-section-label !text-[0.68rem] !tracking-[0.2em]">目前視圖</p>
                <p class="mt-1.5 font-wow-title text-xl text-wow-gold-light sm:text-2xl">
                  {{ showOnlyWarnings ? '只看警告' : '全部玩家' }}
                </p>
                <p class="mt-1 text-xs text-wow-text-medium">可快速切換</p>
              </div>
            </div>
          </div>

          <aside class="wow-panel p-3.5 sm:p-5">
            <p class="wow-section-label">Roster Control</p>
            <h2 class="mt-1.5 font-wow-title text-[1.65rem] text-wow-gold sm:mt-2 sm:text-2xl">名單管理</h2>
            <p class="mt-1.5 text-sm leading-relaxed text-wow-text-medium sm:mt-2">
              更新追蹤名單、切換預設或自訂列表，重新整理後會立即套用到玩家稽查結果。
            </p>
            <div class="wow-divider mt-3.5 sm:mt-4"></div>

            <div class="mt-4 sm:mt-5">
              <PlayerUploadDialog @update-player-list="refreshData" />
            </div>
          </aside>
        </section>

        <PlayerList
          :players="players"
          :show-only-warnings="showOnlyWarnings"
          @toggle-warnings-filter="toggleWarningsFilter"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import usePlayerData from './composables/usePlayerData';
  import LoadingSpinner from './components/ui/LoadingSpinner.vue';
  import AppHeader from './components/layout/AppHeader.vue';
  import ErrorMessage from './components/ui/ErrorMessage.vue';
  import PlayerList from './components/player/PlayerList.vue';
  import PlayerUploadDialog from './components/player/PlayerUploadDialog.vue';

  const { state, actions } = usePlayerData();
  const { players, totalPlayersCount, warningPlayersCount, showOnlyWarnings, loading, error, sortAscending } = state;

  const { toggleSortOrder, toggleWarningsFilter, refreshData } = actions;
</script>
