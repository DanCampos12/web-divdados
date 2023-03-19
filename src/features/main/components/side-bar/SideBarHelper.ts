class SideBarHelper {
  isPageSelected (pageSelected: string, key: string) {
    return pageSelected === key
  }
}

const instance = new SideBarHelper()
export default instance
