<script setup lang="ts">
import { VbenIconButton } from '@vben-core/shadcn-ui';
import { MdiGithub, MdiGoogle, MdiQqchat, MdiWechat } from '@vben/icons';

import { $t } from '@vben/locales';

defineOptions({
  name: 'ThirdPartyLogin',
});
</script>

<template>
  <div class="w-full sm:mx-auto md:max-w-md">
    <div class="mt-4 flex items-center justify-between">
      <span class="border-input border-b w-[35%] dark:border-gray-600" />
      <span class="text-muted-foreground text-xs text-center uppercase">
        {{ $t('authentication.thirdPartyLogin') }}
      </span>
      <span class="border-input border-b w-[35%] dark:border-gray-600" />
    </div>

    <div class="mt-4 flex flex-wrap justify-center">
      <VbenIconButton class="mb-3">
        <MdiWechat />
      </VbenIconButton>
      <VbenIconButton class="mb-3">
        <MdiQqchat />
      </VbenIconButton>
      <VbenIconButton class="mb-3">
        <MdiGithub />
      </VbenIconButton>
      <VbenIconButton class="mb-3">
        <MdiGoogle />
      </VbenIconButton>
    </div>
  </div>
</template>
