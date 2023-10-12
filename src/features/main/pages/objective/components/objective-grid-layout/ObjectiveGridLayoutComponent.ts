import { Component, Prop, Vue } from 'vue-property-decorator'
import { GridLayout, GridItem } from 'vue-grid-layout'

@Component({
  components: {
    GridLayout,
    GridItem
  }
})
export default class ObjectiveGridLayoutComponent extends Vue {
  @Prop({ type: Boolean, default: false })
  readonly isDraggable!: boolean

  layout= [
    { x: 0, y: 0, w: 1, h: 1, i: '0' },
    { x: 0, y: 1, w: 1, h: 1, i: '1' },
    { x: 0, y: 2, w: 1, h: 1, i: '2' },
    { x: 0, y: 3, w: 1, h: 1, i: '3' },
    { x: 0, y: 4, w: 1, h: 1, i: '5' }
  ]

  layoutUpdated () {
    console.log([...this.layout].sort((a, b) => {
      if (a.y < b.y) return -1
      if (a.y > b.y) return 1
      return 0
    }).map((x, i) => `Id: ${x.i}- Order: ${i}`))
  }
}
