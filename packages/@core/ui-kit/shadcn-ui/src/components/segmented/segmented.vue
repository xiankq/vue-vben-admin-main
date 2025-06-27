<script setup lang="ts">
import type { SegmentedItem } from './types';

import { TabsTrigger } from 'radix-vue';

import { computed } from 'vue';

import { Tabs, TabsContent, TabsList } from '../../ui';
import TabsIndicator from './tabs-indicator.vue';

interface Props {
  defaultValue?: string;
  tabs?: SegmentedItem[];
}

const props = withDefaults(defineProps<Props>(), {
  defaultValue: '',
  tabs: () => [],
});

const activeTab = defineModel<string>();

const getDefaultValue = computed(() => {
  return props.defaultValue || props.tabs[0]?.value;
});

const tabsStyle = computed(() => {
  return {
    'grid-template-columns': `repeat(${props.tabs.length}, minmax(0, 1fr))`,
  };
});

const tabsIndicatorStyle = computed(() => {
  return {
    width: `${(100 / props.tabs.length).toFixed(0)}%`,
  };
});
</script>

<template>
  <Tabs v-model="activeTab" :default-value="getDefaultValue">
    <TabsList :style="tabsStyle" class="bg-accent grid w-full relative">
      <TabsIndicator :style="tabsIndicatorStyle" />
      <template v-for="tab in tabs" :key="tab.value">
        <TabsTrigger
          :value="tab.value"
          class="text-sm font-medium px-3 py-1 rounded-md inline-flex whitespace-nowrap items-center justify-center z-20 disabled:opacity-50 disabled:pointer-events-none"
        >
          {{ tab.label }}
        </TabsTrigger>
      </template>
    </TabsList>
    <template v-for="tab in tabs" :key="tab.value">
      <TabsContent :value="tab.value">
        <slot :name="tab.value" />
      </TabsContent>
    </template>
  </Tabs>
</template>
