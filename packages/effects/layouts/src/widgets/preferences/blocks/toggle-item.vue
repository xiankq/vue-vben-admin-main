<script setup lang="ts">
import type { SelectOption } from '@vben/types';

import { ToggleGroup, ToggleGroupItem } from '@vben-core/shadcn-ui';

defineOptions({
  name: 'PreferenceToggleItem',
});

withDefaults(defineProps<{ disabled?: boolean; items?: SelectOption[] }>(), {
  disabled: false,
  items: () => [],
});

const modelValue = defineModel<string>();
</script>

<template>
  <div
    :class="{
      'pointer-events-none opacity-50': disabled,
    }"
    class="hover:bg-accent px-2 py-2 rounded-md flex w-full items-center justify-between"
    disabled
  >
    <span class="text-sm">
      <slot />
    </span>
    <ToggleGroup
      v-model="modelValue"
      class="gap-2"
      size="sm"
      type="single"
      variant="outline"
    >
      <template v-for="item in items" :key="item.value">
        <ToggleGroupItem
          :value="item.value"
          class="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground rounded-sm h-7"
        >
          {{ item.label }}
        </ToggleGroupItem>
      </template>
    </ToggleGroup>
  </div>
</template>
