import { OverviewCategoryAllocation, UserEntity } from '@/models'
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class CategoryAllocationComponent extends Vue {
  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  @Prop({ type: Array, default: [] })
  readonly categoryAllocations!: OverviewCategoryAllocation[]

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  @Prop({ type: Boolean, default: false })
  readonly isResizing!: boolean

  @Watch('isResizing')
  onIsResizingChange () {
    if (!this.isResizing) this.setChartHeight()
  }

  _uid = ''
  chartHeight = 386

  private setChartHeight () {
    if (!this.$vuetify.breakpoint.xl) {
      this.chartHeight = 386
      return
    }
    this.chartHeight = (document.getElementById(this._uid)?.clientHeight || 386) - 56
  }

  getChartSeries () {
    return [{
      data: this.categoryAllocations.map((categoryAllocation) => {
        return {
          name: categoryAllocation.name,
          y: categoryAllocation.allocation,
          color: categoryAllocation.color,
          value: categoryAllocation.value,
          count: categoryAllocation.count,
          borderColor: 'transparent'
        }
      })
    }]
  }

  get chartOptions () {
    return {
      chart: {
        height: this.isMobile ? 312 : this.chartHeight,
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
        itemMarginTop: 4,
        layout: this.isMobile ? 'horizontal' : 'vertical',
        width: this.isMobile ? null : 200,
        align: this.isMobile ? 'center' : 'right',
        verticalAlign: this.isMobile ? 'bottom' : 'middle',
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
              <div style="display: grid; align-items: center; grid-template-columns: 80px 1fr; column-gap: 8px; margin-bottom: 2px;">
                <div style="font-weight: 700">Nº de operações</div>
                <div style="text-align: right">${this.point.count}</div>
              </div>
              <div style="display: grid; align-items: center; grid-template-columns: 80px 1fr; column-gap: 8px; margin-bottom: 2px;">
                <div style="font-weight: 700">Alocação</div>
                <div style="text-align: right">${this.point.y.toLocaleString('pt-br', { style: 'percent', maximumFractionDigits: 1 })}</div>
              </div>
              <div style="display: grid; align-items: center; grid-template-columns: 80px 1fr; column-gap: 8px">
                <div style="font-weight: 700">Saldo</div>
                <div style="text-align: right">${this.point.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 })}</div>
              </div>
            </div>
          `
        }
      },
      plotOptions: {
        pie: {
          size: this.$vuetify.breakpoint.xl ? 320 : this.isMobile ? 200 : 280,
          innerSize: '56%',
          dataLabels: { enabled: false },
          borderRadius: 0,
          showInLegend: true
        }
      },
      series: this.getChartSeries()
    }
  }

  get isMobile () {
    return this.$vuetify.breakpoint.xs || this.$vuetify.breakpoint.sm
  }
}