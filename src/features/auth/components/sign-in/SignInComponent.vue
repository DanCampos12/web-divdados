<template>
  <component
    :is="template"
    :loading="loading"
    @signIn="signIn"
  />
</template>

<script lang="ts" src="./SignInComponent.ts"></script>
