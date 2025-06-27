<script setup lang="ts">
import type { Recordable } from '@vben/types';

import { useVbenForm, z } from '@vben-core/form-ui';

import { useVbenModal } from '@vben-core/popup-ui';

import { VbenAvatar, VbenButton } from '@vben-core/shadcn-ui';
import { $t } from '@vben/locales';
import { computed, reactive } from 'vue';

interface Props {
  avatar?: string;
  text?: string;
}

defineOptions({
  name: 'LockScreenModal',
});

withDefaults(defineProps<Props>(), {
  avatar: '',
  text: '',
});

const emit = defineEmits<{
  submit: [Recordable<any>];
}>();

const [Form, { resetForm, validate, getValues }] = useVbenForm(
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
        fieldName: 'lockScreenPassword',
        formFieldProps: { validateOnBlur: false },
        label: $t('authentication.password'),
        rules: z
          .string()
          .min(1, { message: $t('ui.widgets.lockScreen.placeholder') }),
      },
    ]),
    showDefaultActions: false,
  }),
);

const [Modal] = useVbenModal({
  onConfirm() {
    handleSubmit();
  },
  onOpenChange(isOpen) {
    if (isOpen) {
      resetForm();
    }
  },
});

async function handleSubmit() {
  const { valid } = await validate();
  const values = await getValues();
  if (valid) {
    emit('submit', values?.lockScreenPassword);
  }
}
</script>

<template>
  <Modal
    :footer="false"
    :fullscreen-button="false"
    :title="$t('ui.widgets.lockScreen.title')"
  >
    <div
      class="mb-10 px-10 flex flex-col w-full items-center"
      @keydown.enter.prevent="handleSubmit"
    >
      <div class="w-full">
        <div class="ml-2 flex flex-col w-full items-center">
          <VbenAvatar
            :src="avatar"
            class="size-20"
            dot-class="bottom-0 right-1 border-2 size-4 bg-green-500"
          />
          <div class="text-foreground font-medium my-6 flex items-center">
            {{ text }}
          </div>
        </div>
        <Form />
        <VbenButton class="mt-1 w-full" @click="handleSubmit">
          {{ $t('ui.widgets.lockScreen.screenButton') }}
        </VbenButton>
      </div>
    </div>
  </Modal>
</template>
