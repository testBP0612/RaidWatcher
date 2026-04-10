<template>
  <article
    class="wow-panel group flex h-full flex-col hover:border-wow-gold hover:shadow-wow-box-hover"
    :class="{ 'wow-panel-warning': player.enhancementWarning }"
  >
    <div
      v-if="player.enhancementWarning"
      class="wow-warning-bar absolute inset-x-0 top-0 h-1.5 bg-[linear-gradient(90deg,rgba(179,0,0,0.85),rgba(248,230,179,0.65),rgba(179,0,0,0.85))]"
    ></div>
    <div
      class="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(circle_at_top_right,rgba(200,170,110,0.22),transparent_52%)] opacity-80"
    ></div>

    <div class="relative flex flex-1 flex-col p-3.5 sm:p-[1.125rem] lg:p-5">
      <div class="flex flex-col gap-3.5 sm:gap-[1.125rem]">
        <div class="flex min-w-0 items-start gap-3 sm:gap-4">
          <div
            class="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border-2 border-wow-gold-dark bg-[rgba(0,0,0,0.35)] sm:h-16 sm:w-16"
          >
            <img v-if="player.thumbnailUrl" :src="player.thumbnailUrl" alt="Character Portrait" class="h-full w-full object-cover" />
            <div v-else class="flex h-full w-full items-center justify-center text-xs text-wow-text-light">無圖</div>
          </div>

          <div class="min-w-0 flex-1">
            <p class="wow-section-label !text-[0.68rem] !tracking-[0.22em]">Character</p>
            <h3
              class="mt-1 break-words font-wow-title text-[1.7rem] leading-tight font-bold tracking-[0.03em] sm:text-[1.9rem]"
              :style="{ color: player.classColor }"
            >
              {{ player.name }}
            </h3>
            <div class="mt-2 flex flex-wrap items-center gap-2 text-sm text-wow-text-light">
              <span>{{ player.localizedClassName }}</span>
              <span class="wow-chip px-2 py-0.5 text-xs">
                {{ player.realm }}
              </span>
            </div>
          </div>
        </div>

        <div
          class="flex items-end justify-between gap-3 rounded-[1.25rem] border border-wow-gold-dark bg-[linear-gradient(180deg,rgba(12,10,8,0.28),rgba(26,20,14,0.42))] px-4 py-3 sm:max-w-[12rem] sm:self-end sm:text-right"
        >
          <p class="wow-section-label !text-[0.66rem] !tracking-[0.18em]">Item Level</p>
          <p class="mt-1 font-wow-title text-3xl leading-none" :style="{ color: player.ilvlColor }">{{ player.ilvl }}</p>
        </div>
      </div>

      <div class="mt-3.5 flex flex-wrap items-center gap-2">
        <div class="wow-chip px-3 py-1 text-xs text-wow-text-medium">
          最近完成: {{ player.time }}
        </div>
        <div
          v-if="player.enhancementWarning"
          class="rounded-full border border-wow-horde bg-[rgba(140,14,14,0.2)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-wow-gold-light"
        >
          Gear Warning
        </div>
      </div>

      <div class="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div class="rounded-[1.4rem] border border-wow-gold-dark bg-[linear-gradient(180deg,rgba(11,9,7,0.24),rgba(24,18,13,0.38))] p-4">
          <p class="wow-section-label !text-[0.7rem] !tracking-[0.22em]">角色面板</p>

          <div class="mt-3 space-y-2.5">
            <div class="flex items-center justify-between gap-3 border-b border-wow-border-dark pb-2">
              <span class="text-sm text-wow-text-medium">本周最高 M+</span>
              <span class="font-wow-title text-2xl text-wow-highlight">{{ player.key }}</span>
            </div>

            <div
              class="flex items-center justify-between gap-3 border-b border-wow-border-dark pb-2"
              :class="{ 'text-wow-horde': player.currentRunsCount === 0 }"
            >
              <span class="text-sm text-wow-text-medium">本周場次</span>
              <span class="flex items-center gap-2 font-wow-title text-2xl" :class="{ 'text-wow-gold-light': player.currentRunsCount !== 0, 'text-wow-horde': player.currentRunsCount === 0 }">
                {{ player.currentRunsCount }}
                <span v-if="player.currentRunsCount === 0" class="text-xl leading-none">🤡</span>
              </span>
            </div>

            <div
              class="flex items-center justify-between gap-3"
              :class="{ 'text-wow-horde': player.previousRunsCount === 0 }"
            >
              <span class="text-sm text-wow-text-medium">上周場次</span>
              <span class="flex items-center gap-2 font-wow-title text-2xl" :class="{ 'text-wow-gold-light': player.previousRunsCount !== 0, 'text-wow-horde': player.previousRunsCount === 0 }">
                {{ player.previousRunsCount }}
                <span v-if="player.previousRunsCount === 0" class="text-xl leading-none">🤡</span>
              </span>
            </div>
          </div>
        </div>

        <div class="rounded-[1.4rem] border border-wow-border-dark bg-[rgba(0,0,0,0.1)] p-4">
          <p class="wow-section-label !text-[0.7rem] !tracking-[0.22em]">裝備摘要</p>

          <div class="mt-3 space-y-3">
            <div>
              <p class="text-sm text-wow-text-medium">T 裝進度</p>
              <p class="mt-1 text-base font-semibold leading-tight text-wow-text-light">{{ player.tierPieces }}</p>
            </div>

            <div class="rounded-xl border border-wow-border-dark bg-[rgba(0,0,0,0.1)] px-3 py-2">
              <p class="wow-section-label !text-[0.66rem] !tracking-[0.18em]">角色狀態</p>
              <p class="mt-1 text-sm text-wow-text-light">
                {{ player.enhancementWarning ? '裝備需補強，請優先處理附魔或寶石。' : '裝備檢查正常，可繼續觀察周常與裝等。' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="player.enhancementWarning"
        class="mt-3.5 rounded-2xl border border-wow-horde bg-[linear-gradient(180deg,rgba(122,19,19,0.18),rgba(64,10,10,0.28))] p-3.5 sm:p-4"
      >
        <div class="flex items-start gap-3">
          <div
            class="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-wow-horde bg-[rgba(0,0,0,0.22)] text-sm text-wow-gold-light"
          >
            !
          </div>
          <div class="min-w-0">
            <p class="text-xs font-semibold uppercase tracking-[0.22em] text-wow-gold-light">Enhancement Warning</p>
            <p class="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-wow-text-light">
              {{ player.enhancementWarning }}
            </p>
          </div>
        </div>
      </div>

      <div class="mt-auto grid grid-cols-2 gap-2.5 pt-4 sm:gap-3">
        <a
          :href="player.wclUrl"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center justify-center gap-2 rounded-2xl border border-wow-border-dark bg-[rgba(0,0,0,0.12)] px-4 py-3 text-sm font-semibold text-wow-text-light transition-all duration-200 hover:border-wow-gold hover:bg-[rgba(75,17,6,0.4)]"
          title="WarcraftLogs"
        >
          <img src="/images/wcl-icon.png" alt="WCL" class="h-5 w-5 object-contain" />
          <span>WarcraftLogs</span>
        </a>

        <a
          :href="player.raiderIoUrl"
          target="_blank"
          rel="noreferrer"
          class="inline-flex items-center justify-center gap-2 rounded-2xl border border-wow-border-dark bg-[rgba(0,0,0,0.12)] px-4 py-3 text-sm font-semibold text-wow-text-light transition-all duration-200 hover:border-wow-gold hover:bg-[rgba(0,120,255,0.14)]"
          title="Raider.io"
        >
          <img src="/images/io-icon.webp" alt="RIO" class="h-5 w-5 object-contain" />
          <span>Raider.IO</span>
        </a>
      </div>
    </div>
  </article>
</template>

<script lang="ts" setup>
  import type { Player } from '@/types';

  interface Props {
    player: Player;
  }

  defineProps<Props>();
</script>
