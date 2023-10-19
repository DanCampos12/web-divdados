import { OverviewOperationTypeAllocation, UserEntity } from '@/models'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class OperationTypeAllocationComponent extends Vue {
  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  @Prop({ type: Array, default: [] })
  readonly operationTypeAllocations!: OverviewOperationTypeAllocation[]

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  @Prop({ type: Boolean, default: false })
  readonly isResizing!: boolean

  getChartSeries () {
    return [{
      data: this.operationTypeAllocations.map((operationAllocation) => {
        return {
          name: operationAllocation.description,
          y: operationAllocation.allocation,
          count: operationAllocation.count,
          color: operationAllocation.description === 'Saídas' ? '#B71C1C' : '#00C853',
          borderColor: 'transparent'
        }
      })
    }]
  }

  get chartOptions () {
    return {
      chart: {
        height: this.$vuetify.breakpoint.xl ? 232 : 386,
        type: 'pie',
        spacingTop: 0,
        spacingBottom: 0,
        spacingLeft: 0,
        spacingRight: 0,
        zooming: { mouseWheel: { enabled: false } }
      },
      title: { text: '' },
      xAxis: { labels: { enabled: false } },
      yAxis: { labels: { enabled: false } },
      legend: {
        enabled: true,
        backgroundColor: 'transparent',
        itemMarginBottom: 4,
        width: 200,
        align: 'right',
        verticalAlign: 'middle',
        layout: 'vertical',
        itemStyle: {
          fontSize: '14px',
          fontFamily: 'Roboto',
          color: this.$vuetify.theme.dark ? '#FFFFFF' : '#000000',
          fontWeight: 700
        }
      },
      tooltip: {
        enabled: this.user.preference.displayValues,
        backgroundColor: this.$vuetify.theme.dark ? '#363636' : '#FFFFFF',
        borderColor: '#17967F',
        borderWidth: 2,
        borderRadius: 8,
        shared: true,
        style: {
          fontFamily: 'Roboto',
          color: this.$vuetify.theme.dark ? '#FFFFFF' : '#000000',
          fontSize: '13px'
        },
        useHTML: true,
        formatter: function (this: any) {
          return `
            <div style="display: flex; flex-direction: column; text-transform: capitalize; padding: 6px;">
              <div style="display: grid; align-items: center; grid-template-columns: 4px 1fr; column-gap: 8px; margin-bottom: 8px;">
                <div style="background: ${this.point.color}; width: 4px; height: 12px; border-radius: 2px"></div>
                <div style="font-family: Roboto; font-weight: 700; font-size: 15px;">${this.point.name}</div>
              </div>
              <div style="display: grid; align-items: center; grid-template-columns: 1fr 80px; column-gap: 8px;">
                <div style="font-weight: 700">Nº de operações</div>
                <div style="text-align: right">${this.point.count}</div>
              </div>
            </div>
          `
        }
      },
      plotOptions: {
        pie: {
          size: this.$vuetify.breakpoint.xl ? 320 : 280,
          innerSize: '56%',
          dataLabels: { enabled: false },
          borderRadius: 0,
          showInLegend: true,
          startAngle: this.$vuetify.breakpoint.xl ? -90 : 0,
          endAngle: this.$vuetify.breakpoint.xl ? 90 : 0,
          center: this.$vuetify.breakpoint.xl ? ['50%', '88%'] : []
        }
      },
      series: this.getChartSeries()
    }
  }
}
