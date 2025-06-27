<script setup lang="ts">
import type { WorkbenchTrendItem } from '../typing';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  VbenIcon,
} from '@vben-core/shadcn-ui';

interface Props {
  items?: WorkbenchTrendItem[];
  title: string;
}

defineOptions({
  name: 'WorkbenchTrends',
});

withDefaults(defineProps<Props>(), {
  items: () => [],
});
</script>

<template>
  <Card>
    <CardHeader class="py-4">
      <CardTitle class="text-lg">
        {{ title }}
      </CardTitle>
    </CardHeader>
    <CardContent class="p-5 pt-0 flex flex-wrap">
      <ul class="divide-border w-full divide-y" role="list">
        <li
          v-for="item in items"
          :key="item.title"
          class="py-5 flex gap-x-6 justify-between"
        >
          <div class="flex gap-x-4 min-w-0 items-center">
            <VbenIcon
              :icon="item.avatar"
              alt=""
              class="rounded-full flex-none size-10"
            />
            <div class="flex-auto min-w-0">
              <p class="text-foreground text-sm leading-6 font-semibold">
                {{ item.title }}
              </p>
              <!-- eslint-disable vue/no-v-html -->
              <p
                class="text-foreground/80 *:text-primary text-xs leading-5 mt-1 truncate"
                v-html="item.content"
              />
            </div>
          </div>
          <div class="shrink-0 h-full hidden sm:flex sm:flex-col sm:items-end">
            <span class="text-foreground/80 text-xs leading-6 mt-6">
              {{ item.date }}
            </span>
          </div>
        </li>
      </ul>
    </CardContent>
  </Card>
</template>
