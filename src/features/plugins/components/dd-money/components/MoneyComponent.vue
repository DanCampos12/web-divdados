<template>
  <div :class="{ 'blur': !user.preference.displayValues }">
    {{ valueFormatted }}
  </div>
</template>
<script src="./MoneyComponent.ts"></script>

<style lang="scss" scoped>
  div.blur {
    filter: blur(10px);
    user-select: none;
    font-weight: 400 !important;
  }
</style>
