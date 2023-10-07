<template>
  <v-sheet
    class="event--container rounded"
    color="offset"
    :style="{ height: 'calc(100vh - 250px)' }"
  >
    <div
      v-if="loading"
      class="full-width full-height d-flex flex-column align-center justify-center font-weight-thin"
    >
      <v-progress-circular
        class="ma-4"
        color="primary"
        indeterminate
      />
      <div style="font-size: 32px">
        Carregando Eventos...
      </div>
    </div>
    <div
      v-else-if="!events.length"
      class="full-width full-height d-flex flex-column align-center justify-center font-weight-thin text-center"
    >
      <v-icon
        class="ma-4"
        size="80"
      >
        mdi-database-remove-outline
      </v-icon>
      <div style="font-size: 24px">
        A consulta não retornou dados para serem exibidos.
      </div>
    </div>
    <div v-else>
      <v-virtual-scroll
        class="scroller"
        item-height="76"
        :items="events"
        max-height="calc(100vh - 276px)"
        min-height="calc(100vh - 276px)"
      >
        <template v-slot:default="{ item }">
          <div class="table--body">
            <div class="event--info">
              <div class="d-flex justify-center">
                <v-icon
                  class="mr-2"
                  :color="item.type === 'I' ? 'success' : 'error'"
                  size="22"
                >
                  {{ item.type === 'I' ? 'mdi-arrow-top-right-bold-box-outline' : 'mdi-arrow-bottom-right-bold-box-outline' }}
                </v-icon>
              </div>
              <div class="d-flex flex-column justify-center">
                <div class="font-weight-bold">
                  {{ item.description }}
                </div>
                <div
                  class="text-caption"
                  style="margin-top: -6px"
                >
                  {{ item.categoryName }}
                </div>
              </div>
              <div class="d-flex flex-column justify-center align-end text-right">
                <dd-money
                  class=" font-weight-bold"
                  :value="item.value"
                />
                <div
                  class="d-flex align-center text-caption"
                  style="margin-top: -6px"
                >
                  <dd-date
                    format="MMM/YYYY"
                    :value="item.initialDate"
                  /> &nbsp;-&nbsp;
                  <dd-date
                    format="MMM/YYYY"
                    :value="item.finalDate"
                  />
                </div>
              </div>
            </div>
            <div class="action--buttons text-caption d-flex align-center justify-space-between">
              <div>
                {{ getPeriodDescription(item.period) }}
              </div>
              <div
                class="d-flex justify-center full-width mx-1"
                style="position: absolute; width: calc(100% - 8px)"
              >
                <v-icon
                  class="mr-1"
                  :color="item.completed ? 'success' : 'accent'"
                  size="14"
                >
                  {{ item.completed ? 'mdi-progress-check' : 'mdi-progress-clock' }}
                </v-icon>
                {{ item.completed ? 'Finalizado' : 'Em andamento' }}
              </div>
              <div class="d-flex align-center">
                <v-tooltip left>
                  <template #activator="{ on }">
                    <v-btn
                      class="mr-1"
                      icon
                      text
                      x-small
                      v-on="on"
                      @click="$emit('eventSelectedToEdit', item)"
                    >
                      <v-icon size="20">
                        mdi-pencil-outline
                      </v-icon>
                    </v-btn>
                  </template>
                  Alterar
                </v-tooltip>
                <v-tooltip left>
                  <template #activator="{ on }">
                    <v-btn
                      class="ml-1"
                      icon
                      text
                      x-small
                      v-on="on"
                      @click="$emit('eventSelectedToDelete', item)"
                    >
                      <v-icon size="20">
                        mdi-delete-outline
                      </v-icon>
                    </v-btn>
                  </template>
                  Excluir
                </v-tooltip>
              </div>
            </div>
          </div>
        </template>
      </v-virtual-scroll>
    </div>
  </v-sheet>
</template>
<script lang="ts" src="./TemplateMobile.ts"></script>
<style lang="scss" scoped>
  .v-sheet.event--container {
    margin: 0px 8px;
    padding: 8px;

    div.table--body {
      border-bottom: 1px solid var(--v-border-base);

      div.event--info {
        display: grid;
        align-items: center;
        grid-template-columns: 26px repeat(2, 1fr);
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
  }
</style>
