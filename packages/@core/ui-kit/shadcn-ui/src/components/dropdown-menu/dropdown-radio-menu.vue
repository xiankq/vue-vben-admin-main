<script lang="ts" setup>
import type { DropdownMenuProps } from './interface';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../ui';

interface Props extends DropdownMenuProps {}

defineOptions({ name: 'DropdownRadioMenu' });
withDefaults(defineProps<Props>(), {});

const modelValue = defineModel<string>();

function handleItemClick(value: string) {
  modelValue.value = value;
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child class="flex gap-1 items-center">
      <slot />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      <DropdownMenuGroup>
        <template v-for="menu in menus" :key="menu.key">
          <DropdownMenuItem
            :class="
              menu.value === modelValue
                ? 'bg-accent text-accent-foreground'
                : ''
            "
            class="text-foreground/80 data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground mb-1 cursor-pointer"
            @click="handleItemClick(menu.value)"
          >
            <component :is="menu.icon" v-if="menu.icon" class="mr-2 size-4" />
            <span
              v-if="!menu.icon"
              :class="menu.value === modelValue ? 'bg-foreground' : ''"
              class="mr-2 rounded-full size-1.5"
            />
            {{ menu.label }}
          </DropdownMenuItem>
        </template>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
