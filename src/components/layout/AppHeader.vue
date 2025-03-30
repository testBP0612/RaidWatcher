<template>
	<div
		class="flex justify-between py-3 md:py-4 mb-3 md:mb-5 border-b border-wow-gold-dark flex-col items-start md:flex-row md:items-center gap-3 md:gap-4">
		<h1
			class="font-wow-title text-3xl sm:text-4xl font-bold text-wow-gold tracking-wide md:tracking-wider mb-3 md:mb-0 text-center md:text-left">
			{{ title }}
		</h1>
		<div class="flex flex-wrap gap-2 sm:gap-3">
			<!-- 篩選按鈕 -->
			<button @click="$emit('toggleWarningsFilter')"
				class="bg-wow-red-button text-wow-gold-light border-2 border-wow-gold-dark rounded px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-all duration-200 font-wow-title font-bold hover:bg-wow-red-button-hover hover:border-wow-gold hover:shadow-wow-btn-hover text-sm sm:text-base"
				:class="{ 'bg-wow-red-button-hover border-wow-gold': showOnlyWarnings }" title="只顯示有裝備警告的玩家">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" class="stroke-wow-gold-light"
					fill="none" stroke="currentColor" stroke-width="2">
					<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
					<line x1="12" y1="9" x2="12" y2="13"></line>
					<line x1="12" y1="17" x2="12.01" y2="17"></line>
				</svg>
				<span>裝備警告{{ showOnlyWarnings ? ' 🔍' : '' }}</span>
			</button>

			<!-- 排序按鈕 -->
			<button @click="$emit('toggleSortOrder')"
				class="bg-wow-red-button text-wow-gold-light border-2 border-wow-gold-dark rounded px-3 sm:px-4 py-1.5 sm:py-2 flex items-center gap-1.5 sm:gap-2 cursor-pointer transition-all duration-200 font-wow-title font-bold hover:bg-wow-red-button-hover hover:border-wow-gold hover:shadow-wow-btn-hover text-sm sm:text-base"
				title="切換排序順序">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" class="stroke-wow-gold-light"
					fill="none" stroke="currentColor" stroke-width="2">
					<path d="M7 10l5 5 5-5" v-if="!sortAscending"></path>
					<path d="M7 15l5-5 5 5" v-if="sortAscending"></path>
				</svg>
				<span>裝等 {{ sortAscending ? '低→高' : '高→低' }}</span>
			</button>

			<!-- 重新整理按鈕 -->
			<button @click="$emit('refreshData')"
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
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppHeader',
  props: {
    title: String,
    showOnlyWarnings: {
			type: Boolean,
			default: false,
			required: true,
		},
    sortAscending: {
			type: Boolean,
			default: false,
			required: true,
		},
    loading: Boolean,
  },
  emits: ['toggleWarningsFilter', 'toggleSortOrder', 'refreshData'],
});
</script>