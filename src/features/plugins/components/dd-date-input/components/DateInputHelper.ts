import moment from 'moment'

class DateInputHelper {
  completeDate (date: string) {
    const newDate = date.split('/')
    const today = moment(new Date(), 'DD/MM/YYYY')

    if (newDate.length === 1 && newDate[0]) {
      const day = newDate[0]
      if (day.length === 1) newDate[0] = `0${day}`
      newDate[1] = today.format('MM')
      newDate[2] = today.format('YYYY')
    }

    if (newDate.length === 2) {
      const month = newDate[1]
      if (month.length === 1) newDate[1] = `0${month}`
      newDate[2] = today.format('YYYY')
    }

    if (newDate.length === 3) {
      const year = newDate[2]
      if (year.length === 2) {
        newDate[2] = `${today.year().toString().substring(0, 2)}${year}`
      }
    }

    const dateCompleted = `${newDate[2]}-${newDate[1]}-${newDate[0]}`
    return moment(dateCompleted, 'YYYY-MM-DD', true)
  }
}

const instance = new DateInputHelper()
export default instance
