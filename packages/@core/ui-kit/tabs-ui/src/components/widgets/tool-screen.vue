<script lang="ts" setup>
import { Fullscreen, Minimize2 } from '@vben-core/icons';

const screen = defineModel<boolean>('screen');

function toggleScreen() {
  screen.value = !screen.value;
}
</script>

<template>
  <div
    class="flex-center hover:bg-muted hover:text-foreground text-muted-foreground border-border text-lg font-semibold px-2 border-l h-full cursor-pointer"
    @click="toggleScreen"
  >
    <Minimize2 v-if="screen" class="size-4" />
    <Fullscreen v-else class="size-4" />
  </div>
</template>
