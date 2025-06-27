<script setup lang="ts">
import type { TabsIndicatorProps } from 'radix-vue';

import { cn } from '@vben-core/shared/utils';

import { TabsIndicator, useForwardProps } from 'radix-vue';

import { computed } from 'vue';

const props = defineProps<TabsIndicatorProps & { class?: any }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <TabsIndicator
    v-bind="forwardedProps"
    :class="
      cn(
        'absolute bottom-0 left-0 z-10 h-full w-1/2 translate-x-[--radix-tabs-indicator-position] rounded-full px-0 py-1 pr-1 transition-[width,transform] duration-300',
        props.class,
      )
    "
  >
    <div
      class="bg-background text-foreground text-sm font-medium px-3 py-1 rounded-md inline-flex h-full w-full whitespace-nowrap items-center justify-center focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-offset-2"
    >
      <slot />
    </div>
  </TabsIndicator>
</template>
