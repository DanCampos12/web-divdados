class FooterBarHelper {
  isPageSelected (pageSelected: string, key: string) {
    return pageSelected === key
  }
}

const instance = new FooterBarHelper()
export default instance
