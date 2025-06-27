<script lang="ts" setup>
defineOptions({
  name: 'LayoutFooter',
});
</script>

<template>
  <div class="flex-center text-muted-foreground text-xs h-full w-full relative">
    <slot />
  </div>
</template>
