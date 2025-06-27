<script setup lang="ts">
import { $t } from '@vben/locales';

import SwitchItem from '../switch-item.vue';

defineOptions({
  name: 'PreferenceAnimation',
});

const transitionProgress = defineModel<boolean>('transitionProgress', {
  // 默认值
  default: false,
});
const transitionName = defineModel<string>('transitionName');
const transitionEnable = defineModel<boolean>('transitionEnable');
const transitionLoading = defineModel<boolean>('transitionLoading');

const transitionPreset = ['fade', 'fade-slide', 'fade-up', 'fade-down'];

function handleClick(value: string) {
  transitionName.value = value;
}
</script>

<template>
  <SwitchItem v-model="transitionProgress">
    {{ $t('preferences.animation.progress') }}
  </SwitchItem>
  <SwitchItem v-model="transitionLoading">
    {{ $t('preferences.animation.loading') }}
  </SwitchItem>
  <SwitchItem v-model="transitionEnable">
    {{ $t('preferences.animation.transition') }}
  </SwitchItem>
  <div
    v-if="transitionEnable"
    class="mb-2 mt-3 px-2 flex gap-3 justify-between"
  >
    <div
      v-for="item in transitionPreset"
      :key="item"
      :class="{
        'outline-box-active': transitionName === item,
      }"
      class="outline-box p-2"
      @click="handleClick(item)"
    >
      <div :class="`${item}-slow`" class="bg-accent rounded-md h-10 w-12" />
    </div>
  </div>
</template>
