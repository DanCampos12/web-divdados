<template>
  <component
    :is="template"
    :loading="loading"
    @changePassword="save"
  />
</template>

<script lang="ts" src="./ChangePasswordComponent.ts"></script>
