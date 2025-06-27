<script lang="ts" setup>
import type { NotificationItem } from './types';

import {
  VbenButton,
  VbenIconButton,
  VbenPopover,
  VbenScrollbar,
} from '@vben-core/shadcn-ui';
import { Bell, MailCheck } from '@vben/icons';

import { $t } from '@vben/locales';

import { useToggle } from '@vueuse/core';

interface Props {
  /**
   * 显示圆点
   */
  dot?: boolean;
  /**
   * 消息列表
   */
  notifications?: NotificationItem[];
}

defineOptions({ name: 'NotificationPopup' });

withDefaults(defineProps<Props>(), {
  dot: false,
  notifications: () => [],
});

const emit = defineEmits<{
  clear: [];
  makeAll: [];
  read: [NotificationItem];
  viewAll: [];
}>();

const [open, toggle] = useToggle();

function close() {
  open.value = false;
}

function handleViewAll() {
  emit('viewAll');
  close();
}

function handleMakeAll() {
  emit('makeAll');
}

function handleClear() {
  emit('clear');
}

function handleClick(item: NotificationItem) {
  emit('read', item);
}
</script>

<template>
  <VbenPopover
    v-model:open="open"
    content-class="relative right-2 w-[360px] p-0"
  >
    <template #trigger>
      <div class="flex-center mr-2 h-full" @click.stop="toggle()">
        <VbenIconButton class="text-foreground bell-button relative">
          <span
            v-if="dot"
            class="bg-primary rounded h-2 w-2 right-0.5 top-0.5 absolute"
          />
          <Bell class="size-4" />
        </VbenIconButton>
      </div>
    </template>

    <div class="relative">
      <div class="p-4 py-3 flex items-center justify-between">
        <div class="text-foreground">
          {{ $t('ui.widgets.notifications') }}
        </div>
        <VbenIconButton
          :disabled="notifications.length <= 0"
          :tooltip="$t('ui.widgets.markAllAsRead')"
          @click="handleMakeAll"
        >
          <MailCheck class="size-4" />
        </VbenIconButton>
      </div>
      <VbenScrollbar v-if="notifications.length > 0">
        <ul class="flex-col max-h-[360px] w-full !flex">
          <template v-for="item in notifications" :key="item.title">
            <li
              class="hover:bg-accent border-border px-3 py-3 border-t flex gap-5 w-full cursor-pointer items-start relative"
              @click="handleClick(item)"
            >
              <span
                v-if="!item.isRead"
                class="bg-primary rounded h-2 w-2 right-2 top-2 absolute"
              />

              <span
                class="rounded-full flex shrink-0 h-10 w-10 relative overflow-hidden"
              >
                <img
                  :src="item.avatar"
                  class="h-full w-full aspect-square object-cover"
                  role="img"
                >
              </span>
              <div class="leading-none flex flex-col gap-1">
                <p class="font-semibold">
                  {{ item.title }}
                </p>
                <p class="text-muted-foreground text-xs my-1 line-clamp-2">
                  {{ item.message }}
                </p>
                <p class="text-muted-foreground text-xs line-clamp-2">
                  {{ item.date }}
                </p>
              </div>
            </li>
          </template>
        </ul>
      </VbenScrollbar>

      <template v-else>
        <div class="flex-center text-muted-foreground min-h-[150px] w-full">
          {{ $t('common.noData') }}
        </div>
      </template>

      <div
        class="border-border px-4 py-3 border-t flex items-center justify-between"
      >
        <VbenButton
          :disabled="notifications.length <= 0"
          size="sm"
          variant="ghost"
          @click="handleClear"
        >
          {{ $t('ui.widgets.clearNotifications') }}
        </VbenButton>
        <VbenButton size="sm" @click="handleViewAll">
          {{ $t('ui.widgets.viewAll') }}
        </VbenButton>
      </div>
    </div>
  </VbenPopover>
</template>

<style scoped>
:deep(.bell-button) {
  &:hover {
    svg {
      animation: bell-ring 1s both;
    }
  }
}

@keyframes bell-ring {
  0%,
  100% {
    transform-origin: top;
  }

  15% {
    transform: rotateZ(10deg);
  }

  30% {
    transform: rotateZ(-10deg);
  }

  45% {
    transform: rotateZ(5deg);
  }

  60% {
    transform: rotateZ(-5deg);
  }

  75% {
    transform: rotateZ(2deg);
  }
}
</style>
