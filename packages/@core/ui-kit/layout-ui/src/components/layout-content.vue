<script setup lang="ts">
import type { ContentCompactType } from '@vben-core/typings';

import type { CSSProperties } from 'vue';

import { useLayoutContentStyle } from '@vben-core/composables';

import { Slot } from '@vben-core/shadcn-ui';
import { computed } from 'vue';

interface Props {
  /**
   * 内容区域定宽
   */
  contentCompact: ContentCompactType;
  /**
   * 定宽布局宽度
   */
  contentCompactWidth: number;
  padding: number;
  paddingBottom: number;
  paddingLeft: number;
  paddingRight: number;
  paddingTop: number;
}

const props = withDefaults(defineProps<Props>(), {});

const { contentElement, overlayStyle } = useLayoutContentStyle();

const style = computed((): CSSProperties => {
  const {
    contentCompact,
    padding,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
  } = props;

  const compactStyle: CSSProperties
    = contentCompact === 'compact'
      ? { margin: '0 auto', width: `${props.contentCompactWidth}px` }
      : {};
  return {
    ...compactStyle,
    flex: 1,
    padding: `${padding}px`,
    paddingBottom: `${paddingBottom}px`,
    paddingLeft: `${paddingLeft}px`,
    paddingRight: `${paddingRight}px`,
    paddingTop: `${paddingTop}px`,
  };
});
</script>

<template>
  <main ref="contentElement" :style="style" class="bg-background-deep relative">
    <Slot :style="overlayStyle">
      <slot name="overlay" />
    </Slot>
    <slot />
  </main>
</template>
