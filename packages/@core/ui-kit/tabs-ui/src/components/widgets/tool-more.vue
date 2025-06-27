<script lang="ts" setup>
import type { DropdownMenuProps } from '@vben-core/shadcn-ui';

import { ChevronDown } from '@vben-core/icons';
import { VbenDropdownMenu } from '@vben-core/shadcn-ui';

defineProps<DropdownMenuProps>();
</script>

<template>
  <VbenDropdownMenu :menus="menus" :modal="false">
    <div
      class="flex-center hover:text-foreground text-muted-foreground border-border hover:bg-muted text-lg font-semibold px-2 border-l h-full cursor-pointer"
    >
      <ChevronDown class="size-4" />
    </div>
  </VbenDropdownMenu>
</template>
