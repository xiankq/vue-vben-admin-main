<script setup lang="ts">
import type { WorkbenchTodoItem } from '../typing';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  VbenCheckbox,
} from '@vben-core/shadcn-ui';

interface Props {
  items?: WorkbenchTodoItem[];
  title: string;
}

defineOptions({
  name: 'WorkbenchTodo',
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
          :class="{
            'select-none line-through opacity-60': item.completed,
          }"
          class="py-5 flex gap-x-6 cursor-pointer justify-between"
        >
          <div class="flex gap-x-4 min-w-0 items-center">
            <VbenCheckbox v-model:checked="item.completed" name="completed" />
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
