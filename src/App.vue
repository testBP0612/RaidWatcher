<template>
  <div class="max-w-6xl mx-auto p-3 sm:p-4 md:p-5 relative z-10">
    <!-- 頁頭 -->
    <div
      class="flex justify-between py-3 md:py-4 mb-3 md:mb-5 border-b border-wow-gold-dark flex-col items-start md:flex-row md:items-center gap-3 md:gap-4">
      <h1
        class="font-wow-title text-3xl sm:text-4xl font-bold text-wow-gold tracking-wide md:tracking-wider mb-3 md:mb-0 text-center md:text-left">
        RaidWatcher
      </h1>
      <button @click="refreshData"
        class="bg-wow-red-button text-wow-gold-light border-2 border-wow-gold-dark rounded px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-all duration-200 font-wow-title font-bold hover:bg-wow-red-button-hover hover:border-wow-gold hover:shadow-wow-btn-hover text-sm sm:text-base"
        title="重新整理資料">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" class="stroke-wow-gold-light"
          fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9 9 9 0 0 1 6.39 2.61L21 9"></path>
          <path d="M21 4v5h-5"></path>
        </svg>
        <span v-if="loading">載入中...</span>
        <span v-else>重新整理</span>
      </button>
    </div>

    <!-- 錯誤訊息 -->
    <div v-if="error"
      class="bg-gradient-to-b from-[rgba(75,17,6,0.8)] to-[rgba(50,10,5,0.8)] border border-wow-horde p-3 sm:p-4 md:p-5 rounded my-3 sm:my-4 md:my-5 text-center shadow-wow-box">
      <p class="mb-3 sm:mb-4 text-base sm:text-lg md:text-xl text-wow-text-light">{{ error }}</p>
      <button @click="refreshData"
        class="bg-wow-red-button text-wow-gold-light border border-wow-gold-dark px-3 sm:px-4 py-1.5 sm:py-2 rounded cursor-pointer font-wow-title font-bold transition-all duration-200 hover:bg-wow-red-button-hover hover:border-wow-gold hover:shadow-wow-btn-hover text-sm sm:text-base">
        重試
      </button>
    </div>

    <!-- 載入中狀態 -->
    <div v-if="loading" class="flex justify-center items-center py-10">
      <div
        class="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 border-3 sm:border-4 border-wow-gold border-t-transparent rounded-full mx-auto mb-4 animate-spin">
      </div>
      <div class="text-sm sm:text-base md:text-lg text-wow-text-light">正在擷取資料中...</div>
    </div>

    <!-- 卡片式資料 -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      <div v-for="player in players" :key="player.name"
        class="bg-gradient-to-b from-[rgba(40,30,20,0.9)] to-[rgba(30,20,10,0.9)] border border-wow-gold-dark rounded shadow-wow-box overflow-hidden transition-all duration-300 hover:shadow-wow-box-hover hover:border-wow-gold transform hover:-translate-y-1">
        <!-- 卡片頭部 -->
        <div class="bg-gradient-to-b from-[#3d2f1b] to-[#211909] p-3 md:p-4 border-b border-wow-gold-dark">
          <div class="flex justify-between items-center">
            <div class="flex items-center gap-2 sm:gap-3">
              <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-wow-gold-dark flex-shrink-0">
                <img v-if="player.thumbnailUrl" :src="player.thumbnailUrl" alt="Character Portrait" class="w-full h-full object-cover" />
                <div v-else class="w-full h-full bg-[rgba(0,0,0,0.5)] flex items-center justify-center text-wow-text-light">
                  <span class="text-xs">無圖</span>
                </div>
              </div>
              <div>
                <h3 class="font-wow-title font-bold text-lg md:text-xl tracking-wide" :style="{ color: player.classColor }">
                  {{ player.name }}
                </h3>
                <span class="text-xs md:text-sm text-wow-text-light">{{ player.localizedClassName }}</span>
              </div>
            </div>
            <span class="text-sm md:text-base text-wow-text-light rounded px-2 py-1 bg-[rgba(0,0,0,0.3)] border border-wow-border-dark">
              {{ player.realm }}
            </span>
          </div>
        </div>

        <!-- 卡片內容 -->
        <div class="p-3 md:p-4 space-y-2.5 md:space-y-3">
          <!-- 裝等與T裝 -->
          <div class="flex justify-between">
            <div class="space-y-1">
              <p class="text-wow-text-light text-sm">裝等</p>
              <p class="font-bold text-lg" :style="{ color: player.ilvlColor }">{{ player.ilvl }}</p>
            </div>
            <div class="space-y-1">
              <p class="text-wow-text-light text-sm">T裝</p>
              <p class="font-bold text-lg text-wow-text-medium">{{ player.tierPieces }}</p>
            </div>
          </div>

          <!-- 本周最高M+ -->
          <div class="bg-[rgba(0,0,0,0.2)] p-2.5 rounded border border-wow-border-dark">
            <p class="text-wow-text-light text-sm mb-1">本周最高M+</p>
            <p class="font-bold text-lg text-wow-highlight">{{ player.key }}</p>
          </div>

          <!-- 場次資訊 -->
          <div class="grid grid-cols-2 gap-3">
            <div class="bg-[rgba(0,0,0,0.2)] p-2 rounded border border-wow-border-dark"
              :class="{ 'border-wow-horde bg-[rgba(179,0,0,0.2)]': player.currentRunsCount === 0 }">
              <p class="text-wow-text-light text-xs mb-1">本周場次</p>
              <div class="flex items-center">
                <p class="font-bold" :class="{ 'text-wow-horde': player.currentRunsCount === 0 }">
                  {{ player.currentRunsCount }}
                </p>
                <span v-if="player.currentRunsCount === 0" class="ml-1 text-lg">🤡</span>
              </div>
            </div>
            <div class="bg-[rgba(0,0,0,0.2)] p-2 rounded border border-wow-border-dark"
              :class="{ 'border-wow-horde bg-[rgba(179,0,0,0.2)]': player.previousRunsCount === 0 }">
              <p class="text-wow-text-light text-xs mb-1">上周場次</p>
              <div class="flex items-center">
                <p class="font-bold" :class="{ 'text-wow-horde': player.previousRunsCount === 0 }">
                  {{ player.previousRunsCount }}
                </p>
                <span v-if="player.previousRunsCount === 0" class="ml-1 text-lg">🤡</span>
              </div>
            </div>
          </div>

          <!-- 警告 -->
          <div v-if="player.enhancementWarning"
            class="bg-[rgba(179,0,0,0.2)] p-2.5 rounded border border-wow-horde text-wow-text-light">
            <p class="text-wow-horde text-sm font-bold mb-1 flex items-center">
              <i class="fas fa-exclamation-triangle mr-1.5"></i>裝備警告
            </p>
            <p class="text-xs text-wow-text-light leading-relaxed whitespace-pre-wrap">{{ player.enhancementWarning }}</p>
          </div>
        </div>

        <!-- 卡片底部 - 連結 -->
        <div class="bg-[rgba(0,0,0,0.2)] p-2.5 md:p-3 border-t border-wow-border-dark flex justify-center gap-4">
          <a :href="player.wclUrl" target="_blank"
            class="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full text-wow-text-light transition-all duration-200 hover:scale-110 hover:shadow-wow-light hover:bg-wow-red-button-hover"
            title="WarcraftLogs">
            <img src="/images/wcl-icon.png" alt="WCL" class="w-full h-full">
          </a>
          <a :href="player.raiderIoUrl" target="_blank"
            class="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full text-wow-text-light transition-all duration-200 hover:scale-110 hover:shadow-wow-light hover:bg-wow-alliance"
            title="Raider.io">
            <img src="/images/io-icon.webp" alt="RIO" class="w-full h-full">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import usePlayerData from './composables/usePlayerData';

export default defineComponent({
  name: 'App',
  setup() {
    const { players, loading, error, refreshData } = usePlayerData();

    return {
      players,
      loading,
      error,
      refreshData,
    }
  }
});
</script>

<style src="./style.css"></style>