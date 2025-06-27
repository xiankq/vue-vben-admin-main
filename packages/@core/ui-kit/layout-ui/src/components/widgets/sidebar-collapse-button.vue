<script setup lang="ts">
import { ChevronsLeft, ChevronsRight } from '@vben-core/icons';

const collapsed = defineModel<boolean>('collapsed');

function handleCollapsed() {
  collapsed.value = !collapsed.value;
}
</script>

<template>
  <div
    class="flex-center bg-accent text-foreground/60 hover:bg-accent-hover hover:text-foreground p-1 rounded-sm cursor-pointer bottom-2 left-3 absolute z-10"
    @click.stop="handleCollapsed"
  >
    <ChevronsRight v-if="collapsed" class="size-4" />
    <ChevronsLeft v-else class="size-4" />
  </div>
</template>
