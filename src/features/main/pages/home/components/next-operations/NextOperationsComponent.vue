<template>
  <div
    class="full-width offset rounded pa-2"
    :class="{ 'full-height': !isMobile }"
  >
    <div
      class="d-flex align-center justify-space-between subtitle-2 font-weight-bold"
      :class="{ 'text-center': isMobile }"
    >
      Próximas operações
      <v-tooltip
        v-if="!!nextOperations.length && !loading"
        left
      >
        <template #activator="{ on }">
          <v-btn
            fab
            text
            x-small
            v-on="on"
            @click="$router.push({ name: 'Main.Operation' })"
          >
            <v-icon>
              mdi-open-in-new
            </v-icon>
          </v-btn>
        </template>
        Ir para operações
      </v-tooltip>
    </div>
    <div
      v-if="loading"
      class="full-width d-flex flex-column align-center justify-center font-weight-thin"
      style="height: calc(100% - 24px)"
    >
      <v-progress-circular
        class="ma-4"
        color="primary"
        indeterminate
      />
      <div style="font-size: 24px">
        Carregando próximas operações...
      </div>
    </div>
    <div
      v-else-if="!nextOperations.length"
      class="full-width d-flex flex-column align-center justify-center font-weight-thin text-center"
      style="height: calc(100% - 24px)"
    >
      <v-icon
        class="ma-4"
        size="80"
      >
        mdi-calendar-sync
      </v-icon>
      <div style="font-size: 24px">
        Ainda não há lançamentos futuros.
      </div>
      <v-btn
        text
        @click="$router.push({ name: 'Main.Event' })"
      >
        Ir para eventos
      </v-btn>
    </div>
    <div v-else>
      <div
        v-for="(item, index) in nextOperations"
        :key="index"
      >
        <div
          v-if="isMobile"
          class="table--body-mobile"
        >
          <div class="operation--info">
            <div class="d-flex justify-center">
              <v-icon
                class="mr-2"
                :color="item.type === 'I' ? 'success' : 'error lighten-2'"
                size="22"
              >
                {{ item.type === 'I' ? 'mdi-arrow-up-thin-circle-outline' : 'mdi-arrow-down-thin-circle-outline' }}
              </v-icon>
            </div>
            <div class="d-flex align-center justify-space-between">
              <div class="d-flex flex-column justify-center">
                <span class="d-flex align-center font-weight-bold">
                  {{ item.description }}
                </span>
                <div
                  class="text-caption"
                  style="margin-top: -6px"
                >
                  {{ item.categoryName }}
                </div>
              </div>
              <div class="d-flex flex-column justify-center text-right">
                <dd-money
                  class=" font-weight-bold"
                  :value="item.value"
                />
                <dd-date
                  class="text-caption"
                  style="margin-top: -6px"
                  :value="item.date"
                />
              </div>
            </div>
          </div>
          <div class="action--buttons d-flex align-center text-caption justify-space-between">
            <div>
              {{ item.type === 'I' ? 'Entrada' : 'Saída' }}
            </div>
          </div>
        </div>
        <div
          v-else
          class="table--body-desktop"
        >
          <div class="pl-2 d-flex align-center">
            <v-icon
              class="mr-2"
              :color="item.type === 'I' ? 'success' : 'error lighten-2'"
              size="22"
            >
              {{ item.type === 'I' ? 'mdi-arrow-up-thin-circle-outline' : 'mdi-arrow-down-thin-circle-outline' }}
            </v-icon>
            {{ item.description }}
          </div>
          <div class="d-flex align-center justify-center">
            {{ item.categoryName }}
          </div>
          <div class="d-flex align-center justify-center">
            {{ item.type === 'I' ? 'Entrada' : 'Saída' }}
          </div>
          <div class="d-flex align-center justify-center">
            <dd-date :value="item.date" />
          </div>
          <div class="pr-2 d-flex align-center justify-end">
            <dd-money :value="item.value" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" src="./NextOperationsComponent.ts"></script>
<style lang="scss" scoped>
  div.table--body-desktop {
    display: grid;
    align-items: center;
    grid-template-rows: 42px;
    grid-template-columns: 1fr repeat(4, 120px);
    font-size: 14px;
    font-weight: light;
    border-bottom: 1px solid var(--v-border-base);
  }

  div.table--body-mobile {
    div.operation--info {
      display: grid;
      align-items: center;
      grid-template-columns: 26px 1fr;
      font-size: 14px;
      font-weight: light;
    }

    div.action--buttons {
      height: 24px;
      margin-top: 4px;
      margin-bottom: 8px;
      border-radius: 4px;
      padding: 0px 4px;
      background-color: var(--v-background-base);
    }
  }
</style>
