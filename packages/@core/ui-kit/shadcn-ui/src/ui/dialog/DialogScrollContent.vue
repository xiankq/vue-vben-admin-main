<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'radix-vue';

import { cn } from '@vben-core/shared/utils';

import { X } from 'lucide-vue-next';

import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'radix-vue';
import { computed } from 'vue';

const props = withDefaults(
  defineProps<DialogContentProps & { class?: any; zIndex?: number }>(),
  { zIndex: 1000 },
);
const emits = defineEmits<DialogContentEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      :style="{ zIndex }"
      class="border-border data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=open]:animate-in data-[state=closed]:animate-out border bg-black/80 grid inset-0 place-items-center absolute overflow-y-auto"
    >
      <DialogContent
        :class="
          cn(
            'border-border bg-background relative z-50 my-8 grid w-full max-w-lg gap-4 border p-6 shadow-lg duration-200 sm:rounded-lg md:w-full',
            props.class,
          )
        "
        :style="{ zIndex }"
        v-bind="forwarded"
        @pointer-down-outside="
          (event) => {
            const originalEvent = event.detail.originalEvent;
            const target = originalEvent.target as HTMLElement;
            if (
              originalEvent.offsetX > target.clientWidth
              || originalEvent.offsetY > target.clientHeight
            ) {
              event.preventDefault();
            }
          }
        "
      >
        <slot />

        <DialogClose
          class="hover:bg-secondary p-0.5 rounded-md transition-colors right-4 top-4 absolute"
        >
          <X class="h-4 w-4" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogContent>
    </DialogOverlay>
  </DialogPortal>
</template>
