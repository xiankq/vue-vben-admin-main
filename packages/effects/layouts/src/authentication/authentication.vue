<script setup lang="ts">
import type { ToolbarType } from './types';

import { preferences, usePreferences } from '@vben/preferences';

import { Copyright } from '../basic/copyright';
import AuthenticationFormView from './form.vue';
import SloganIcon from './icons/slogan.vue';
import Toolbar from './toolbar.vue';

interface Props {
  appName?: string;
  logo?: string;
  pageTitle?: string;
  pageDescription?: string;
  sloganImage?: string;
  toolbar?: boolean;
  copyright?: boolean;
  toolbarList?: ToolbarType[];
  clickLogo?: () => void;
}

withDefaults(defineProps<Props>(), {
  appName: '',
  copyright: true,
  logo: '',
  pageDescription: '',
  pageTitle: '',
  sloganImage: '',
  toolbar: true,
  toolbarList: () => ['color', 'language', 'layout', 'theme'],
  clickLogo: () => {},
});

const { authPanelCenter, authPanelLeft, authPanelRight, isDark }
  = usePreferences();
</script>

<template>
  <div
    :class="[isDark ? 'dark' : '']"
    class="flex flex-1 min-h-full select-none overflow-x-hidden"
  >
    <template v-if="toolbar">
      <slot name="toolbar">
        <Toolbar :toolbar-list="toolbarList" />
      </slot>
    </template>
    <!-- 左侧认证面板 -->
    <AuthenticationFormView
      v-if="authPanelLeft"
      class="flex-1 min-h-full w-2/5"
      transition-name="slide-left"
    >
      <template v-if="copyright" #copyright>
        <slot name="copyright">
          <Copyright
            v-if="preferences.copyright.enable"
            v-bind="preferences.copyright"
          />
        </slot>
      </template>
    </AuthenticationFormView>

    <!-- 头部 Logo 和应用名称 -->
    <div
      v-if="logo || appName"
      class="flex flex-1 left-0 top-0 absolute z-10"
      @click="clickLogo"
    >
      <div
        class="text-foreground lg:text-foreground ml-4 mt-4 flex flex-1 items-center sm:left-6 sm:top-6"
      >
        <img v-if="logo" :alt="appName" :src="logo" class="mr-2" width="42">
        <p v-if="appName" class="text-xl font-medium m-0">
          {{ appName }}
        </p>
      </div>
    </div>

    <!-- 系统介绍 -->
    <div v-if="!authPanelCenter" class="flex-1 w-0 hidden relative lg:block">
      <div
        class="bg-background-deep h-full w-full inset-0 absolute dark:bg-[#070709]"
      >
        <div class="login-background size-full left-0 top-0 absolute" />
        <div class="flex-col-center -enter-x mr-20 h-full">
          <template v-if="sloganImage">
            <img
              :alt="appName"
              :src="sloganImage"
              class="animate-float h-64 w-2/5"
            >
          </template>
          <SloganIcon v-else :alt="appName" class="animate-float h-64 w-2/5" />
          <div class="text-foreground text-1xl font-sans mt-6 lg:text-2xl">
            {{ pageTitle }}
          </div>
          <div class="dark:text-muted-foreground mt-2">
            {{ pageDescription }}
          </div>
        </div>
      </div>
    </div>

    <!-- 中心认证面板 -->
    <div v-if="authPanelCenter" class="flex-center w-full relative">
      <div class="login-background size-full left-0 top-0 absolute" />
      <AuthenticationFormView
        class="shadow-float shadow-primary/5 md:bg-background pb-20 rounded-3xl w-full lg:w-1/2 md:w-2/3 xl:w-[36%]"
      >
        <template v-if="copyright" #copyright>
          <slot name="copyright">
            <Copyright
              v-if="preferences.copyright.enable"
              v-bind="preferences.copyright"
            />
          </slot>
        </template>
      </AuthenticationFormView>
    </div>

    <!-- 右侧认证面板 -->
    <AuthenticationFormView
      v-if="authPanelRight"
      class="flex-1 min-h-full w-[34%]"
    >
      <template v-if="copyright" #copyright>
        <slot name="copyright">
          <Copyright
            v-if="preferences.copyright.enable"
            v-bind="preferences.copyright"
          />
        </slot>
      </template>
    </AuthenticationFormView>
  </div>
</template>

<style scoped>
.login-background {
  background: linear-gradient(154deg, #07070915 30%, hsl(var(--primary) / 30%) 48%, #07070915 64%);
  filter: blur(100px);
}

.dark {
  .login-background {
    background: linear-gradient(154deg, #07070915 30%, hsl(var(--primary) / 20%) 48%, #07070915 64%);
    filter: blur(100px);
  }
}
</style>
