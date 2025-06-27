<script setup lang="ts">
interface Props {
  title?: string;
}

defineOptions({
  name: 'PreferenceBlock',
});

withDefaults(defineProps<Props>(), {
  title: '',
});
</script>

<template>
  <div class="py-4 flex flex-col">
    <h3 class="leading-none tracking-tight font-semibold mb-3">
      {{ title }}
    </h3>
    <slot />
  </div>
</template>
