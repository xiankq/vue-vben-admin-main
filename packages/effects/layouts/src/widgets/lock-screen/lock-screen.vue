<script setup lang="ts">
import { useScrollLock } from '@vben-core/composables';

import { useVbenForm, z } from '@vben-core/form-ui';
import { VbenAvatar, VbenButton } from '@vben-core/shadcn-ui';
import { LockKeyhole } from '@vben/icons';

import { $t, useI18n } from '@vben/locales';
import { storeToRefs, useAccessStore } from '@vben/stores';
import { useDateFormat, useNow } from '@vueuse/core';

import { computed, reactive, ref } from 'vue';

interface Props {
  avatar?: string;
}

defineOptions({
  name: 'LockScreen',
});

withDefaults(defineProps<Props>(), {
  avatar: '',
});

defineEmits<{ toLogin: [] }>();

const { locale } = useI18n();
const accessStore = useAccessStore();

const now = useNow();
const meridiem = useDateFormat(now, 'A');
const hour = useDateFormat(now, 'HH');
const minute = useDateFormat(now, 'mm');
const date = useDateFormat(now, 'YYYY-MM-DD dddd', { locales: locale.value });

const showUnlockForm = ref(false);
const { lockScreenPassword } = storeToRefs(accessStore);

const [Form, { form, validate }] = useVbenForm(
  reactive({
    commonConfig: {
      hideLabel: true,
      hideRequiredMark: true,
    },
    schema: computed(() => [
      {
        component: 'VbenInputPassword' as const,
        componentProps: {
          placeholder: $t('ui.widgets.lockScreen.placeholder'),
        },
        fieldName: 'password',
        label: $t('authentication.password'),
        rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
      },
    ]),
    showDefaultActions: false,
  }),
);

const validPass = computed(
  () => lockScreenPassword?.value === form?.values?.password,
);

async function handleSubmit() {
  const { valid } = await validate();
  if (valid) {
    if (validPass.value) {
      accessStore.unlockScreen();
    }
    else {
      form.setFieldError('password', $t('authentication.passwordErrorTip'));
    }
  }
}

function toggleUnlockForm() {
  showUnlockForm.value = !showUnlockForm.value;
}

useScrollLock();
</script>

<template>
  <div class="bg-background size-full fixed z-[2000]">
    <transition name="slide-left">
      <div v-show="!showUnlockForm" class="size-full">
        <div
          class="flex-col-center text-foreground/80 hover:text-foreground group text-xl font-semibold my-4 cursor-pointer"
          @click="toggleUnlockForm"
        >
          <LockKeyhole
            class="size-5 transition-all duration-300 group-hover:scale-125"
          />
          <span>{{ $t('ui.widgets.lockScreen.unlock') }}</span>
        </div>
        <div class="px-[10%] flex h-full justify-center">
          <div
            class="bg-accent flex-center text-[260px] mb-14 mr-20 text-center rounded-3xl flex-auto h-4/5 w-2/5 relative"
          >
            <span class="text-xl font-semibold left-4 top-4 absolute">
              {{ meridiem }}
            </span>
            {{ hour }}
          </div>
          <div
            class="bg-accent flex-center text-[260px] mb-14 text-center rounded-3xl flex-auto h-4/5 w-2/5"
          >
            {{ minute }}
          </div>
        </div>
      </div>
    </transition>

    <transition name="slide-right">
      <div
        v-if="showUnlockForm"
        class="flex-center size-full"
        @keydown.enter.prevent="handleSubmit"
      >
        <div class="flex-col-center mb-10 w-[300px]">
          <VbenAvatar :src="avatar" class="enter-x mb-6 size-20" />

          <div class="enter-x mb-2 w-full items-center">
            <Form />
          </div>
          <VbenButton class="enter-x w-full" @click="handleSubmit">
            {{ $t('ui.widgets.lockScreen.entry') }}
          </VbenButton>
          <VbenButton
            class="enter-x my-2 w-full"
            variant="ghost"
            @click="$emit('toLogin')"
          >
            {{ $t('ui.widgets.lockScreen.backToLogin') }}
          </VbenButton>
          <VbenButton
            class="enter-x mr-2 w-full"
            variant="ghost"
            @click="toggleUnlockForm"
          >
            {{ $t('common.back') }}
          </VbenButton>
        </div>
      </div>
    </transition>

    <div
      class="enter-y text-center w-full bottom-5 absolute 2xl:text-3xl xl:text-xl"
    >
      <div v-if="showUnlockForm" class="enter-x text-3xl mb-2">
        {{ hour }}:{{ minute }} <span class="text-lg">{{ meridiem }}</span>
      </div>
      <div class="text-3xl">
        {{ date }}
      </div>
    </div>
  </div>
</template>
