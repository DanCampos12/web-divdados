import { EventState } from '@/models'

export const state: EventState = {
  filters: {
    searchText: '',
    inflow: true,
    outflow: true
  },
  eventPeriods: [
    { key: '7D', name: 'Semanal' },
    { key: '15D', name: 'Quinzenal' },
    { key: '1M', name: 'Mensal' },
    { key: '3M', name: 'Trimestral' },
    { key: '6M', name: 'Semestral' },
    { key: '1Y', name: 'Anual' }
  ]
}
