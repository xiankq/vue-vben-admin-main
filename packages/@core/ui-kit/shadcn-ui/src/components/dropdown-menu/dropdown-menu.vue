<script lang="ts" setup>
import type {
  DropdownMenuProps,
  VbenDropdownMenuItem as IDropdownMenuItem,
} from './interface';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../ui';

interface Props extends DropdownMenuProps {}

defineOptions({ name: 'DropdownMenu' });
const props = withDefaults(defineProps<Props>(), {});

function handleItemClick(menu: IDropdownMenuItem) {
  if (menu.disabled) {
    return;
  }
  menu?.handler?.(props);
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger class="flex gap-1 h-full items-center">
      <slot />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start">
      <DropdownMenuGroup>
        <template v-for="menu in menus" :key="menu.value">
          <DropdownMenuItem
            :disabled="menu.disabled"
            class="text-foreground/80 data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground mb-1 cursor-pointer"
            @click="handleItemClick(menu)"
          >
            <component :is="menu.icon" v-if="menu.icon" class="mr-2 size-4" />
            {{ menu.label }}
          </DropdownMenuItem>
          <DropdownMenuSeparator v-if="menu.separator" class="bg-border" />
        </template>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
