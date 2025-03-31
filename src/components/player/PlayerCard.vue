<template>
  <div
    class="bg-gradient-to-b from-[rgba(40,30,20,0.9)] to-[rgba(30,20,10,0.9)] border border-wow-gold-dark rounded shadow-wow-box overflow-hidden transition-all duration-300 hover:shadow-wow-box-hover hover:border-wow-gold transform hover:-translate-y-1"
  >
    <!-- 卡片頭部 -->
    <div class="bg-gradient-to-b from-[#3d2f1b] to-[#211909] p-2.5 sm:p-3 border-b border-wow-gold-dark">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2">
          <!-- 角色頭像 -->
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
              <span class="text-xs sm:text-sm">無圖</span>
            </div>
          </div>

          <!-- 角色 -->
          <div>
            <h3 class="font-wow-title font-bold text-lg sm:text-xl tracking-wide" :style="{ color: player.classColor }">
              {{ player.name }}
            </h3>
            <div class="flex items-center text-sm gap-1.5">
              <span class="text-wow-text-light">{{ player.localizedClassName }}</span>
              <span
                class="text-wow-text-light px-1.5 py-0.5 rounded bg-[rgba(0,0,0,0.3)] border border-wow-border-dark"
              >
                {{ player.realm }}
              </span>
            </div>
          </div>
        </div>

        <!-- 裝等 -->
        <div class="flex-shrink-0 text-right">
          <p class="text-wow-text-light text-sm">裝等</p>
          <p class="font-bold text-lg sm:text-xl" :style="{ color: player.ilvlColor }">{{ player.ilvl }}</p>
        </div>
      </div>
    </div>

    <!-- 卡片內容 -->
    <div class="p-2.5 sm:p-3 space-y-2">
      <!-- 第一行：M+ 和場次 -->
      <div class="flex gap-2">
        <!-- 本周最高M+ -->
        <div class="bg-[rgba(0,0,0,0.2)] px-2.5 py-2 rounded border border-wow-border-dark flex-1">
          <div class="flex justify-between items-center">
            <div>
              <p class="text-wow-text-light text-sm">本周最高M+</p>
              <p class="font-bold text-lg text-wow-highlight">{{ player.key }}</p>
            </div>
          </div>
        </div>

        <!-- 本周場次 -->
        <div
          class="bg-[rgba(0,0,0,0.2)] px-2.5 py-2 rounded border border-wow-border-dark flex-1"
          :class="{ 'border-wow-horde bg-[rgba(179,0,0,0.2)]': player.currentRunsCount === 0 }"
        >
          <p class="text-wow-text-light text-sm">本周場次</p>
          <div class="flex items-center">
            <p class="font-bold text-base sm:text-lg" :class="{ 'text-wow-horde': player.currentRunsCount === 0 }">
              {{ player.currentRunsCount }}
            </p>
            <span v-if="player.currentRunsCount === 0" class="ml-1 text-base sm:text-lg">🤡</span>
          </div>
        </div>

        <!-- 上周場次 -->
        <div
          class="bg-[rgba(0,0,0,0.2)] px-2.5 py-2 rounded border border-wow-border-dark flex-1"
          :class="{ 'border-wow-horde bg-[rgba(179,0,0,0.2)]': player.previousRunsCount === 0 }"
        >
          <p class="text-wow-text-light text-sm">上周場次</p>
          <div class="flex items-center">
            <p class="font-bold text-base sm:text-lg" :class="{ 'text-wow-horde': player.previousRunsCount === 0 }">
              {{ player.previousRunsCount }}
            </p>
            <span v-if="player.previousRunsCount === 0" class="ml-1 text-base sm:text-lg">🤡</span>
          </div>
        </div>
      </div>

      <!-- 第二行：T裝和裝備警告 -->
      <div class="flex gap-2">
        <!-- T裝 -->
        <div
          class="bg-[rgba(0,0,0,0.2)] px-2.5 py-2 rounded border border-wow-border-dark"
          :class="{ 'flex-1': !player.enhancementWarning }"
        >
          <p class="text-wow-text-light text-sm">T裝</p>
          <p class="font-bold text-base sm:text-lg text-wow-text-medium">{{ player.tierPieces }}</p>
        </div>

        <!-- 裝備警告 -->
        <div
          v-if="player.enhancementWarning"
          class="bg-[rgba(179,0,0,0.2)] px-2.5 py-2 rounded border border-wow-horde text-wow-text-light flex-1"
        >
          <div class="flex items-start gap-2">
            <div class="flex-shrink-0">
              <p class="text-wow-horde text-sm font-bold whitespace-nowrap">
                <i class="fas fa-exclamation-triangle mr-1"></i>
              </p>
            </div>
            <p class="text-sm text-wow-text-light leading-tight line-clamp-2 flex-1 whitespace-pre-wrap">
              {{ player.enhancementWarning }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 卡片底部 - 連結 -->
    <div class="bg-[rgba(0,0,0,0.2)] py-2 px-2.5 border-t border-wow-border-dark flex justify-center gap-4">
      <a
        :href="player.wclUrl"
        target="_blank"
        class="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full text-wow-text-light transition-all duration-200 hover:scale-110 hover:shadow-wow-light hover:bg-wow-red-button-hover"
        title="WarcraftLogs"
      >
        <img src="/images/wcl-icon.png" alt="WCL" class="w-full h-full" />
      </a>
      <a
        :href="player.raiderIoUrl"
        target="_blank"
        class="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full text-wow-text-light transition-all duration-200 hover:scale-110 hover:shadow-wow-light hover:bg-wow-alliance"
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
