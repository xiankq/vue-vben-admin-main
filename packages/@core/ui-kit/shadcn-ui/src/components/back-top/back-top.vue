<script lang="ts" setup>
import type { BacktopProps } from './backtop';

import { ArrowUpToLine } from '@vben-core/icons';

import { computed } from 'vue';

import { VbenButton } from '../button';
import { useBackTop } from './use-backtop';

interface Props extends BacktopProps {}

defineOptions({ name: 'BackTop' });

const props = withDefaults(defineProps<Props>(), {
  bottom: 20,
  isGroup: false,
  right: 24,
  target: '',
  visibilityHeight: 200,
});

const backTopStyle = computed(() => ({
  bottom: `${props.bottom}px`,
  right: `${props.right}px`,
}));

const { handleClick, visible } = useBackTop(props);
</script>

<template>
  <transition name="fade-down">
    <VbenButton
      v-if="visible"
      :style="backTopStyle"
      class="bg-background data shadow-float z-popup hover:bg-heavy dark:bg-accent dark:hover:bg-heavy rounded-full size-10 duration-500 bottom-10 fixed"
      size="icon"
      variant="icon"
      @click="handleClick"
    >
      <ArrowUpToLine class="size-4" />
    </VbenButton>
  </transition>
</template>
