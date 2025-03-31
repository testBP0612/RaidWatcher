<template>
  <div
    class="bg-gradient-to-b from-[rgba(40,30,20,0.9)] to-[rgba(30,20,10,0.9)] border border-wow-gold-dark rounded shadow-wow-box overflow-hidden transition-all duration-300 hover:shadow-wow-box-hover hover:border-wow-gold transform hover:-translate-y-1"
  >
    <!-- 卡片頭部 -->
    <div class="bg-gradient-to-b from-[#3d2f1b] to-[#211909] p-3 md:p-4 border-b border-wow-gold-dark">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2 sm:gap-3">
          <div
            class="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-wow-gold-dark flex-shrink-0"
          >
            <img
              v-if="player.thumbnailUrl"
              :src="player.thumbnailUrl"
              alt="Character Portrait"
              class="w-full h-full object-cover"
            />
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
        <span
          class="text-sm md:text-base text-wow-text-light rounded px-2 py-1 bg-[rgba(0,0,0,0.3)] border border-wow-border-dark"
        >
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
        <div
          class="bg-[rgba(0,0,0,0.2)] p-2 rounded border border-wow-border-dark"
          :class="{ 'border-wow-horde bg-[rgba(179,0,0,0.2)]': player.currentRunsCount === 0 }"
        >
          <p class="text-wow-text-light text-xs mb-1">本周場次</p>
          <div class="flex items-center">
            <p class="font-bold" :class="{ 'text-wow-horde': player.currentRunsCount === 0 }">
              {{ player.currentRunsCount }}
            </p>
            <span v-if="player.currentRunsCount === 0" class="ml-1 text-lg">🤡</span>
          </div>
        </div>
        <div
          class="bg-[rgba(0,0,0,0.2)] p-2 rounded border border-wow-border-dark"
          :class="{ 'border-wow-horde bg-[rgba(179,0,0,0.2)]': player.previousRunsCount === 0 }"
        >
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
      <div
        v-if="player.enhancementWarning"
        class="bg-[rgba(179,0,0,0.2)] p-2.5 rounded border border-wow-horde text-wow-text-light"
      >
        <p class="text-wow-horde text-sm font-bold mb-1 flex items-center">
          <i class="fas fa-exclamation-triangle mr-1.5"></i>裝備警告
        </p>
        <p class="text-xs text-wow-text-light leading-relaxed whitespace-pre-wrap">{{ player.enhancementWarning }}</p>
      </div>
    </div>

    <!-- 卡片底部 - 連結 -->
    <div class="bg-[rgba(0,0,0,0.2)] p-2.5 md:p-3 border-t border-wow-border-dark flex justify-center gap-4">
      <a
        :href="player.wclUrl"
        target="_blank"
        class="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full text-wow-text-light transition-all duration-200 hover:scale-110 hover:shadow-wow-light hover:bg-wow-red-button-hover"
        title="WarcraftLogs"
      >
        <img src="/images/wcl-icon.png" alt="WCL" class="w-full h-full" />
      </a>
      <a
        :href="player.raiderIoUrl"
        target="_blank"
        class="inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full text-wow-text-light transition-all duration-200 hover:scale-110 hover:shadow-wow-light hover:bg-wow-alliance"
        title="Raider.io"
      >
        <img src="/images/io-icon.webp" alt="RIO" class="w-full h-full" />
      </a>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, type PropType } from 'vue';
  import type { Player } from '@/types';

  export default defineComponent({
    name: 'PlayerCard',
    props: {
      player: {
        type: Object as PropType<Player>,
        required: true,
      },
    },
  });
</script>
