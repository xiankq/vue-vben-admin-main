<script setup lang="ts">
import type { CSSProperties } from 'vue';

import { VbenSpineText } from '@vben-core/shadcn-ui';

import { computed, useTemplateRef } from 'vue';

const props = defineProps<{
  contentStyle: CSSProperties;
  isPassing: boolean;
  successText: string;
  text: string;
}>();

const contentRef = useTemplateRef<HTMLDivElement>('contentRef');

const style = computed(() => {
  const { contentStyle } = props;

  return {
    ...contentStyle,
  };
});

defineExpose({
  getEl: () => {
    return contentRef.value;
  },
});
</script>

<template>
  <div
    ref="contentRef"
    :class="{
      [$style.success]: isPassing,
    }"
    :style="style"
    class="text-xs flex size-full select-none items-center top-0 justify-center absolute"
  >
    <slot name="text">
      <VbenSpineText class="flex h-full items-center">
        {{ isPassing ? successText : text }}
      </VbenSpineText>
    </slot>
  </div>
</template>

<style module>
.success {
  -webkit-text-fill-color: hsl(0deg 0% 98%);
}
</style>
