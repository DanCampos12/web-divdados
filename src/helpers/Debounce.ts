type Callback = () => void

export default class Debounce {
  private timeout?: number
  private lastRecordedTime?: number

  wait (waitingTime: number, callback: Callback): void {
    if (this.timeout) {
      const now = new Date().getTime()
      if (!!this.lastRecordedTime && now - this.lastRecordedTime < waitingTime) {
        clearTimeout(this.timeout)
        this.createTimeout(waitingTime, callback)
      }
    } else this.createTimeout(waitingTime, callback)
  }

  private createTimeout (waitingTime: number, callback: Callback): void {
    this.lastRecordedTime = new Date().getTime()
    this.timeout = window.setTimeout(async () => {
      callback()
      this.timeout = undefined
      this.lastRecordedTime = undefined
    }, waitingTime)
  }
}
