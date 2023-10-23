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

  selectedLegends: string[] = []

  getBarChartSeries () {
    return this.operationTypeAllocations.reverse().map((operationAllocation) => {
      return {
        name: operationAllocation.description,
        data: [operationAllocation.allocation * 100],
        count: operationAllocation.count,
        color: operationAllocation.description === 'Saídas' ? '#B71C1C' : '#00C853'
      }
    })
  }

  barChartTooltip () {
    return function (this: any) {
      console.log(this.series)
      return `
        <div style="display: flex; flex-direction: column; text-transform: capitalize; padding: 6px;">
          <div style="display: grid; align-items: center; grid-template-columns: 4px 1fr; column-gap: 8px; margin-bottom: 8px;">
            <div style="background: ${this.series.userOptions.color}; width: 4px; height: 12px; border-radius: 2px"></div>
            <div style="font-family: Roboto; font-weight: 700; font-size: 15px;">${this.series.userOptions.name}</div>
          </div>
          <div style="display: grid; align-items: center; grid-template-columns: 1fr 80px; column-gap: 8px;">
            <div style="font-weight: 700">Nº de operações</div>
            <div style="text-align: right">${this.series.userOptions.count}</div>
          </div>
        </div>
      `
    }
  }

  getPieChartSeries () {
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

  pieChartTooltip () {
    return function (this: any) {
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
  }

  onLegendClick (legendName: string) {
    if (this.selectedLegends.includes(legendName)) {
      const index = this.selectedLegends.indexOf(legendName)
      this.selectedLegends.splice(index, 1)
      return
    }
    this.selectedLegends.push(legendName)
  }

  get chartOptions () {
    return {
      chart: {
        height: this.$vuetify.breakpoint.xl ? 232 : this.isMobile ? 312 : 386,
        type: this.$vuetify.breakpoint.xl ? 'bar' : 'pie',
        spacingTop: 0,
        spacingBottom: 0,
        spacingLeft: this.$vuetify.breakpoint.xl ? 24 : 0,
        spacingRight: this.$vuetify.breakpoint.xl ? 24 : 0,
        zooming: { mouseWheel: { enabled: false } }
      },
      title: {
        verticalAlign: 'middle',
        floating: true,
        text: this.$vuetify.breakpoint.xl
          ? ''
          : `<div style="text-align: center">
          <div style="font-size: 14px; font-weight: bold">Nº de operações</div><br>
          <div style="filter: blur(${this.user.preference.displayValues ? '0px' : '10px'});">${this.totalValueFormatted}</div>
        </div>`,
        x: this.isMobile ? -2 : -112,
        y: this.isMobile ? -8 : 16,
        style: {
          fontSize: this.isMobile ? '20px' : '26px',
          fontFamily: 'Roboto',
          color: this.$vuetify.theme.dark ? '#FFFFFF' : '#000000',
          fontWeight: 100,
          textAlign: 'center',
          textTransform: 'capitalize'
        }
      },
      xAxis: {
        labels: { enabled: false },
        lineWidth: 0,
        gridLineWidth: 0,
        minorGridLineWidth: 0,
        categories: ['Alocação']
      },
      yAxis: {
        labels: { enabled: false },
        lineWidth: 0,
        title: { text: '' },
        gridLineWidth: 0,
        minorGridLineWidth: 0,
        min: 0,
        max: 100
      },
      legend: {
        enabled: true,
        reversed: this.$vuetify.breakpoint.xl,
        backgroundColor: 'transparent',
        itemMarginBottom: 4,
        itemMarginTop: 4,
        layout: this.isMobile || this.$vuetify.breakpoint.xl ? 'horizontal' : 'vertical',
        width: this.isMobile || this.$vuetify.breakpoint.xl ? null : 200,
        align: this.isMobile || this.$vuetify.breakpoint.xl ? 'center' : 'right',
        verticalAlign: this.isMobile || this.$vuetify.breakpoint.xl ? 'bottom' : 'middle',
        alignColumns: false,
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
        shared: !this.$vuetify.breakpoint.xl,
        style: {
          fontFamily: 'Roboto',
          color: this.$vuetify.theme.dark ? '#FFFFFF' : '#000000',
          fontSize: '13px'
        },
        useHTML: true,
        formatter: this.$vuetify.breakpoint.xl ? this.barChartTooltip() : this.pieChartTooltip()
      },
      plotOptions: {
        pie: {
          size: this.isMobile ? 200 : 280,
          innerSize: '82%',
          dataLabels: { enabled: false },
          borderRadius: 0,
          showInLegend: true,
          point: {
            events: {
              legendItemClick: (event: any) => { this.onLegendClick(event.target.options.name) }
            }
          }
        },
        series: {
          stacking: 'normal',
          dataLabels: {
            enabled: false
          }
        },
        bar: {
          pointWidth: 56,
          borderRadius: 0,
          borderWidth: 0
        }
      },
      series: this.$vuetify.breakpoint.xl ? this.getBarChartSeries() : this.getPieChartSeries()
    }
  }

  get totalValueFormatted () {
    const totalValue = this.operationTypeAllocations
      .filter((item) => !this.selectedLegends.includes(item.description))
      .reduce((acc, item) => acc + item.count, 0)
      .toString()
    return this.user.preference.displayValues ? totalValue : '0'.repeat(totalValue.length)
  }

  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }
}
