<template>
  <component
    :is="template"
    :categories="categories"
    :loading="loading"
    :operations="operations"
    @addOperation="$emit('addOperation')"
  />
</template>

<script lang="ts" src="./OperationTableComponent.ts"></script>
