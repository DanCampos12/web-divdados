<template>
  <div>
    <v-tabs
      v-model="tabSelected"
      background-color="transparent"
      dense
      height="44"
    >
      <v-tab
        active-class="primary offset--text"
        class="ml-2"
        style="width: 100%"
      >
        <v-icon class="mr-2">
          mdi-cash-check
        </v-icon>
        Efetuadas
      </v-tab>
      <v-tab
        active-class="primary offset--text"
        class="mr-2"
        style="width: 100%"
      >
        <v-icon class="mr-2">
          mdi-cash-clock
        </v-icon>
        Pendentes
      </v-tab>
    </v-tabs>
    <operation-filter-component @addOperation="setFormVisible(true)" />
    <v-fade-transition>
      <operation-table-component
        v-if="tabSelected === 0"
        :categories="categories"
        :loading="loading"
        :operations="operationsEffected"
        @operationPerformed="getOperations"
        @operationSelectedToEdit="onOperationSelectedToEdit"
      />
      <operation-table-component
        v-else
        :categories="categories"
        :loading="loading"
        :operations="operationsPending"
        @operationPerformed="getOperations"
        @operationSelectedToEdit="onOperationSelectedToEdit"
      />
    </v-fade-transition>
    <operation-form-component
      v-model="formVisible"
      :categories="categories"
      :operation-selected="operationSelected"
      @closeForm="setFormVisible(false)"
      @operationPerformed="getOperations"
    />
  </div>
</template>
<script lang="ts" src="./OperationComponent.ts"></script>
