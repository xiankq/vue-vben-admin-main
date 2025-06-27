<script setup lang="ts">
import type { TabDefinition } from '@vben-core/typings';

import type { TabConfig, TabsProps } from '../../types';

import { Pin, X } from '@vben-core/icons';

import { VbenContextMenu, VbenIcon } from '@vben-core/shadcn-ui';
import { computed, ref } from 'vue';

interface Props extends TabsProps {}

defineOptions({
  name: 'VbenTabsChrome',
  inheritAttrs: false,
});

const props = withDefaults(defineProps<Props>(), {
  contentClass: 'vben-tabs-content',
  contextMenus: () => [],
  gap: 7,
  tabs: () => [],
});

const emit = defineEmits<{
  close: [string];
  unpin: [TabDefinition];
}>();
const active = defineModel<string>('active');

const contentRef = ref();
const tabRef = ref();

const style = computed(() => {
  const { gap } = props;
  return {
    '--gap': `${gap}px`,
  };
});

const tabsView = computed(() => {
  return props.tabs.map((tab) => {
    const { fullPath, meta, name, path, key } = tab || {};
    const { affixTab, icon, newTabTitle, tabClosable, title } = meta || {};
    return {
      affixTab: !!affixTab,
      closable: Reflect.has(meta, 'tabClosable') ? !!tabClosable : true,
      fullPath,
      icon: icon as string,
      key,
      meta,
      name,
      path,
      title: (newTabTitle || title || name) as string,
    } as TabConfig;
  });
});

function onMouseDown(e: MouseEvent, tab: TabConfig) {
  if (
    e.button === 1
    && tab.closable
    && !tab.affixTab
    && tabsView.value.length > 1
    && props.middleClickToClose
  ) {
    e.preventDefault();
    e.stopPropagation();
    emit('close', tab.key);
  }
}
</script>

<template>
  <div
    ref="contentRef"
    :class="contentClass"
    :style="style"
    class="tabs-chrome pr-6 h-full w-max overflow-y-hidden !flex"
  >
    <TransitionGroup name="slide-left">
      <div
        v-for="(tab, i) in tabsView"
        :key="tab.key"
        ref="tabRef"
        :class="[
          {
            'is-active': tab.key === active,
            'draggable': !tab.affixTab,
            'affix-tab': tab.affixTab,
          },
        ]"
        :data-active-tab="active"
        :data-index="i"
        class="group translate-all tabs-chrome__item draggable flex h-full select-none items-center relative -mr-3"
        data-tab-item="true"
        @click="active = tab.key"
        @mousedown="onMouseDown($event, tab)"
      >
        <VbenContextMenu
          :handler-data="tab"
          :menus="contextMenus"
          :modal="false"
          item-class="pr-6"
        >
          <div class="px-1 size-full relative">
            <!-- divider -->
            <div
              v-if="i !== 0 && tab.key !== active"
              class="bg-border tabs-chrome__divider h-4 w-[1px] translate-y-[-50%] transition-all left-[var(--gap)] top-1/2 absolute z-0"
            />
            <!-- background -->
            <div
              class="tabs-chrome__background px-[calc(var(--gap)-1px)] py-0 size-full transition-opacity duration-150 absolute z-[-1]"
            >
              <div
                class="tabs-chrome__background-content group-[.is-active]:bg-primary/15 dark:group-[.is-active]:bg-accent rounded-tl-[var(--gap)] rounded-tr-[var(--gap)] h-full duration-150"
              />
              <svg
                class="tabs-chrome__background-before group-[.is-active]:fill-primary/15 dark:group-[.is-active]:fill-accent transition-all duration-150 bottom-0 left-[-1px] absolute fill-transparent"
                height="7"
                width="7"
              >
                <path d="M 0 7 A 7 7 0 0 0 7 0 L 7 7 Z" />
              </svg>
              <svg
                class="group-[.is-active]:fill-primary/15 dark:group-[.is-active]:fill-accent tabs-chrome__background-after transition-all duration-150 bottom-0 right-[-1px] absolute fill-transparent"
                height="7"
                width="7"
              >
                <path d="M 0 0 A 7 7 0 0 0 7 7 L 0 7 Z" />
              </svg>
            </div>

            <!-- extra -->
            <div
              class="tabs-chrome__extra size-4 translate-y-[-50%] right-[var(--gap)] top-1/2 absolute z-[3]"
            >
              <!-- close-icon -->
              <X
                v-show="!tab.affixTab && tabsView.length > 1 && tab.closable"
                class="hover:bg-accent stroke-accent-foreground/80 hover:stroke-accent-foreground text-accent-foreground/80 group-[.is-active]:text-accent-foreground mt-[2px] rounded-full size-3 cursor-pointer transition-all"
                @click.stop="() => emit('close', tab.key)"
              />
              <Pin
                v-show="tab.affixTab && tabsView.length > 1 && tab.closable"
                class="hover:text-accent-foreground text-accent-foreground/80 group-[.is-active]:text-accent-foreground mt-[1px] rounded-full size-3.5 cursor-pointer transition-all"
                @click.stop="() => emit('unpin', tab)"
              />
            </div>

            <!-- tab-item-main -->
            <div
              class="text-accent-foreground group-[.is-active]:text-primary dark:group-[.is-active]:text-accent-foreground tabs-chrome__item-main mx-[calc(var(--gap)*2)] my-0 pl-2 pr-4 rounded-tl-[5px] rounded-tr-[5px] flex h-full duration-150 items-center z-[2] overflow-hidden"
            >
              <VbenIcon
                v-if="showIcon"
                :icon="tab.icon"
                class="mr-1 flex size-4 items-center overflow-hidden"
              />

              <span class="text-sm flex-1 whitespace-nowrap overflow-hidden">
                {{ tab.title }}
              </span>
            </div>
          </div>
        </VbenContextMenu>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.tabs-chrome {
  &__item:not(.dragging) {
    @apply cursor-pointer;

    &:hover:not(.is-active) {
      & + .tabs-chrome__item {
        .tabs-chrome__divider {
          @apply opacity-0;
        }
      }

      .tabs-chrome__divider {
        @apply opacity-0;
      }

      .tabs-chrome__background {
        @apply pb-[2px];

        &-content {
          @apply bg-accent mx-[2px] rounded-md;
        }
      }
    }

    &.is-active {
      @apply z-[2];

      & + .tabs-chrome__item {
        .tabs-chrome__divider {
          @apply opacity-0 !important;
        }
      }
    }
  }
}
</style>
