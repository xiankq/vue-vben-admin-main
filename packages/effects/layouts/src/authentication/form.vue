<script setup lang="ts">
defineOptions({
  name: 'AuthenticationFormView',
});
</script>

<template>
  <div
    class="flex-col-center bg-background dark:bg-background-deep px-6 py-10 relative lg:px-8 lg:flex-initial"
  >
    <slot />
    <!-- Router View with Transition and KeepAlive -->
    <RouterView v-slot="{ Component, route }">
      <Transition appear mode="out-in" name="slide-right">
        <KeepAlive :include="['Login']">
          <component
            :is="Component"
            :key="route.fullPath"
            class="enter-x mt-6 w-full sm:mx-auto md:max-w-md"
          />
        </KeepAlive>
      </Transition>
    </RouterView>

    <!-- Footer Copyright -->

    <div
      class="text-muted-foreground text-xs text-center flex bottom-3 absolute"
    >
      <slot name="copyright" />
    </div>
  </div>
</template>
