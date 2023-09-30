<template>
  <component
    :is="template"
    @addOperation="$emit('addOperation')"
  />
</template>

<script lang="ts" src="./OperationFilterComponent.ts"></script>
