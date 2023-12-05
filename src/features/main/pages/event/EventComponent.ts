import { Category, Event, EventEntity, UserEntity } from '@/models'
import { Component, Vue, Watch } from 'vue-property-decorator'
import EventFilterComponent from './components/event-filter/EventFilterComponent.vue'
import EventTableComponent from './components/event-table/EventTableComponent.vue'
import EventFormComponent from './components/event-form/EventFormComponent.vue'
import { Action, State } from 'vuex-class'
import helper from './EventHelper'

@Component({
  components: {
    EventFilterComponent,
    EventTableComponent,
    EventFormComponent
  }
})
export default class EventComponent extends Vue {
  @Action('getCategories', { namespace: 'category' })
  readonly getCategories$!: (userId: string) => Promise<Category[]>

  @Action('getEvents', { namespace: 'event' })
  readonly getEvents$!: ({ userId, date }: { userId: string, date: string }) => Promise<Event[]>

  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  @State('filters', { namespace: 'event' })
  readonly filters!: { searchText: string; inflow: boolean; outflow: boolean }

  @State('date', { namespace: 'home' })
  readonly date!: string

  @Watch('date')
  onDateChange () {
    this.getEvents()
  }

  categories: Category[] = []
  events: Event[] = []
  eventSelected = new EventEntity()
  formVisible = false
  loading = false

  async getEvents () {
    try {
      this.loading = true
      this.categories = await this.getCategories$(this.user.id || '')
      this.events = await this.getEvents$({
        userId: this.user.id || '',
        date: this.date
      })
    } finally {
      this.loading = false
    }
  }

  async created () {
    this.loading = true
    this.getEvents()
  }

  setFormVisible (value: boolean) {
    this.formVisible = value
    if (!this.formVisible) this.eventSelected = new EventEntity()
  }

  onEventSelectedToEdit (event: EventEntity) {
    this.eventSelected = EventEntity.parse(event)
    this.setFormVisible(true)
  }

  sortEvents ({ column, desc }: { column: keyof Event; desc: boolean }) {
    this.events.sort((a, b) => {
      if (a[column]! > b[column]!) return desc ? -1 : 1
      if (a[column]! < b[column]!) return desc ? 1 : -1
      return 0
    })
  }

  get eventsFiltered () {
    return helper.filterEvents(this.events, this.filters)
  }
}
