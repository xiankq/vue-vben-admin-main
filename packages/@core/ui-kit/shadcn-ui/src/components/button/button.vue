<script setup lang="ts">
import type { VbenButtonProps } from './button';

import { LoaderCircle } from '@vben-core/icons';

import { cn } from '@vben-core/shared/utils';
import { Primitive } from 'radix-vue';

import { computed } from 'vue';

import { buttonVariants } from '../../ui';

interface Props extends VbenButtonProps {}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  class: '',
  disabled: false,
  loading: false,
  size: 'default',
  variant: 'default',
});

const isDisabled = computed(() => {
  return props.disabled || props.loading;
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
    :disabled="isDisabled"
  >
    <LoaderCircle
      v-if="loading"
      class="text-md mr-2 flex-shrink-0 size-4 animate-spin"
    />
    <slot />
  </Primitive>
</template>
