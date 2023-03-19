<template>
  <component
    :is="template"
    :loading="loading"
    @signUp="signUp"
  />
</template>

<script lang="ts" src="./SignUpComponent.ts"></script>
