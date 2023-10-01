<template>
  <component
    :is="template"
    :categories="categories"
    :loading="loading"
    :operations="operations"
    @addOperation="$emit('addOperation')"
    @operationSelectedToEdit="$emit('operationSelectedToEdit', $event)"
  />
</template>

<script lang="ts" src="./OperationTableComponent.ts"></script>
