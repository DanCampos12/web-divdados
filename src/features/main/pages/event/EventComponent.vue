<template>
  <div>
    <event-filter-component @addEvent="setFormVisible(true)" />
    <event-table-component
      :events="eventsFiltered"
      :loading="loading"
      @eventSelectedToEdit="onEventSelectedToEdit"
      @operationPerformed="getEvents"
      @sortEvents="sortEvents"
    />
    <event-form-component
      v-model="formVisible"
      :categories="categories"
      :event-selected="eventSelected"
      @closeForm="setFormVisible(false)"
      @operationPerformed="getEvents"
    />
  </div>
</template>
<script lang="ts" src="./EventComponent.ts"></script>
