<script setup lang="ts">
import { Eye, EyeOff } from '@vben-core/icons';

import { cn } from '@vben-core/shared/utils';
import { ref, useSlots } from 'vue';

import { Input } from '../../ui';
import PasswordStrength from './password-strength.vue';

interface Props {
  class?: any;
  /**
   * 是否显示密码强度
   */
  passwordStrength?: boolean;
}

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<Props>();

const modelValue = defineModel<string>();

const slots = useSlots();

const show = ref(false);
</script>

<template>
  <div class="w-full relative">
    <Input
      v-bind="$attrs"
      v-model="modelValue"
      :class="cn(props.class)"
      :type="show ? 'text' : 'password'"
    />
    <template v-if="passwordStrength">
      <PasswordStrength :password="modelValue" />
      <p v-if="slots.strengthText" class="text-muted-foreground text-xs mt-1.5">
        <slot name="strengthText" />
      </p>
    </template>
    <div
      :class="{
        'top-3': !!passwordStrength,
        'top-1/2 -translate-y-1/2 items-center': !passwordStrength,
      }"
      class="hover:text-foreground text-foreground/60 text-lg leading-5 pr-3 flex cursor-pointer inset-y-0 right-0 absolute"
      @click="show = !show"
    >
      <Eye v-if="show" class="size-4" />
      <EyeOff v-else class="size-4" />
    </div>
  </div>
</template>
