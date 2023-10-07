<template>
  <component
    :is="template"
    @addEvent="$emit('addEvent')"
  />
</template>

<script lang="ts" src="./EventFilterComponent.ts"></script>
