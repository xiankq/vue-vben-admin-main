<script setup lang="ts">
import { VbenAvatar } from '../avatar';

interface Props {
  /**
   * @zh_CN 是否收起文本
   */
  collapsed?: boolean;
  /**
   * @zh_CN Logo 图片适应方式
   */
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  /**
   * @zh_CN Logo 跳转地址
   */
  href?: string;
  /**
   * @zh_CN Logo 图片大小
   */
  logoSize?: number;
  /**
   * @zh_CN Logo 图标
   */
  src?: string;
  /**
   * @zh_CN Logo 文本
   */
  text: string;
  /**
   * @zh_CN Logo 主题
   */
  theme?: string;
}

defineOptions({
  name: 'VbenLogo',
});

withDefaults(defineProps<Props>(), {
  collapsed: false,
  href: 'javascript:void 0',
  logoSize: 32,
  src: '',
  theme: 'light',
  fit: 'cover',
});
</script>

<template>
  <div :class="theme" class="text-lg flex h-full items-center">
    <a
      :class="$attrs.class"
      :href="href"
      class="text-lg leading-normal px-3 flex gap-2 h-full transition-all duration-500 items-center overflow-hidden"
    >
      <VbenAvatar
        v-if="src"
        :alt="text"
        :src="src"
        :size="logoSize"
        :fit="fit"
        class="rounded-none bg-transparent relative"
      />
      <template v-if="!collapsed">
        <slot name="text">
          <span class="text-foreground font-semibold text-nowrap truncate">
            {{ text }}
          </span>
        </slot>
      </template>
    </a>
  </div>
</template>
