<script setup lang="ts">
import type { TabOption } from '@vben/types';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@vben-core/shadcn-ui';

import { computed } from 'vue';

interface Props {
  tabs?: TabOption[];
}

defineOptions({
  name: 'AnalysisChartsTabs',
});

const props = withDefaults(defineProps<Props>(), {
  tabs: () => [],
});

const defaultValue = computed(() => {
  return props.tabs?.[0]?.value;
});
</script>

<template>
  <div class="card-box px-4 pb-5 pt-3 w-full">
    <Tabs :default-value="defaultValue">
      <TabsList>
        <template v-for="tab in tabs" :key="tab.label">
          <TabsTrigger :value="tab.value">
            {{ tab.label }}
          </TabsTrigger>
        </template>
      </TabsList>
      <template v-for="tab in tabs" :key="tab.label">
        <TabsContent :value="tab.value" class="pt-4">
          <slot :name="tab.value" />
        </TabsContent>
      </template>
    </Tabs>
  </div>
</template>
