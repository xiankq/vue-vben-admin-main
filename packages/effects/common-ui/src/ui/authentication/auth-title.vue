<template>
  <div class="mb-7 sm:mx-auto sm:max-w-md sm:w-full">
    <h2
      class="text-foreground text-3xl leading-9 tracking-tight font-bold mb-3 lg:text-4xl"
    >
      <slot />
    </h2>

    <p class="text-muted-foreground lg:text-md text-sm">
      <slot name="desc" />
    </p>
  </div>
</template>
