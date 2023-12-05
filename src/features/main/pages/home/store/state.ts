import { HomeState } from '@/models'
import moment from 'moment'

export const state: HomeState = {
  date: moment(new Date()).format('YYYY-MM-DD')
}
