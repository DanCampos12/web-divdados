<template>
  <component
    :is="template"
    :loading="loading"
    @sendEmail="send"
  />
</template>

<script lang="ts" src="./RecoverPasswordComponent.ts"></script>
