<script setup lang="ts">
import type { Component } from 'vue';

import { $t } from '@vben/locales';

import { computed } from 'vue';

import { ContentCompact, ContentWide } from '../../icons';

defineOptions({
  name: 'PreferenceLayoutContent',
});

const modelValue = defineModel<string>({ default: 'wide' });

const components: Record<string, Component> = {
  compact: ContentCompact,
  wide: ContentWide,
};

const PRESET = computed(() => [
  {
    name: $t('preferences.wide'),
    type: 'wide',
  },
  {
    name: $t('preferences.compact'),
    type: 'compact',
  },
]);

function activeClass(theme: string): string[] {
  return theme === modelValue.value ? ['outline-box-active'] : [];
}
</script>

<template>
  <div class="flex gap-5 w-full">
    <template v-for="theme in PRESET" :key="theme.name">
      <div
        class="flex flex-col w-[100px] cursor-pointer"
        @click="modelValue = theme.type"
      >
        <div :class="activeClass(theme.type)" class="outline-box flex-center">
          <component :is="components[theme.type]" />
        </div>
        <div class="text-muted-foreground text-xs mt-2 text-center">
          {{ theme.name }}
        </div>
      </div>
    </template>
  </div>
</template>
