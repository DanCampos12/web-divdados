import { normalizeText } from '@/helpers'
import { Event } from '@/models'

class EventHelper {
  isValidDescription (event: Event, searchText: string) {
    return !event.description || normalizeText(event.description)
      .includes(normalizeText(searchText))
  }

  isValidType (event: Event, inflow: boolean, outflow: boolean) {
    return (event.type === 'I' && inflow) ||
      (event.type === 'O' && outflow)
  }

  filterEvents (events: Event[], filters: {
    searchText: string;
    inflow: boolean;
    outflow: boolean
  }) {
    return events.filter((event) => {
      return this.isValidDescription(event, filters.searchText) &&
        this.isValidType(event, filters.inflow, filters.outflow)
    })
  }
}

const instance = new EventHelper()
export default instance
