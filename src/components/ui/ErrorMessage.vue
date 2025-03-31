<template>
  <div
    class="bg-gradient-to-b from-[rgba(75,17,6,0.8)] to-[rgba(50,10,5,0.8)] border border-wow-horde p-3 sm:p-4 md:p-5 rounded my-3 sm:my-4 md:my-5 text-center shadow-wow-box"
  >
    <p class="mb-3 sm:mb-4 text-base sm:text-lg md:text-xl text-wow-text-light">{{ message }}</p>
    <button
      class="bg-wow-red-button text-wow-gold-light border border-wow-gold-dark px-3 sm:px-4 py-1.5 sm:py-2 rounded cursor-pointer font-wow-title font-bold transition-all duration-200 hover:bg-wow-red-button-hover hover:border-wow-gold hover:shadow-wow-btn-hover text-sm sm:text-base"
      @click="$emit('retry')"
    >
      重試
    </button>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ErrorMessage',
    props: {
      message: {
        type: String,
        required: true,
      },
    },
    emits: ['retry'],
  });
</script>
