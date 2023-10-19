import { OverviewAccumulatedValue, UserEntity } from '@/models'
import Highcharts from 'highcharts'
import moment from 'moment'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class AccumulatedValuesComponent extends Vue {
  @State('user', { namespace: 'auth' })
  readonly user!: UserEntity

  @Prop({ type: Array, default: [] })
  readonly accumulatedValues!: OverviewAccumulatedValue[]

  @Prop({ type: Boolean, default: false })
  readonly loading!: boolean

  @Prop({ type: Boolean, default: false })
  readonly isResizing!: boolean

  getChartSeries () {
    return this.accumulatedValues.map((accumulatedValue, index) => {
      return {
        name: accumulatedValue.description,
        type: index === 0 ? 'area' : 'spline',
        data: accumulatedValue.valuesByDates.map((item) => [
          moment(item.date).toDate().getTime(),
          item.value
        ]),
        color: index === 0 ? '#17967F' : '#00C853',
        lineWidth: 2,
        dashStyle: index === 0 ? 'Solid' : 'Dash'
      }
    })
  }

  get chartOptions () {
    const values = this.accumulatedValues.flatMap((accumulatedValue) => {
      return accumulatedValue.valuesByDates.map((item) => item.value)
    })
    const maxValue = Math.ceil(Math.max.apply(null, values))
    const minValue = Math.floor(Math.min.apply(null, values))
    const yTickInterval = Math.ceil((maxValue - minValue) / 5)
    let currentYTick = minValue
    const yTickPositions = [minValue]
    while (currentYTick < maxValue) yTickPositions.push(currentYTick += yTickInterval)

    const dates = this.accumulatedValues.flatMap((accumulatedValue) => {
      return accumulatedValue.valuesByDates.map((item) => moment(item.date).toDate().getTime())
    })
    const maxDate = Math.max.apply(null, dates)
    const minDate = Math.min.apply(null, dates)
    const dateDiff = moment(maxDate).diff(minDate, 'months')
    const xTickInterval = Math.ceil((maxDate - minDate) / Math.max(2, Math.min(dateDiff, 10)))
    let currentXTick = minDate
    const xTickPositions = [currentXTick]
    while (currentXTick < maxDate) xTickPositions.push(currentXTick += xTickInterval)

    return {
      series: this.getChartSeries(),
      chart: {
        type: 'spline',
        height: 400,
        spacingTop: 32,
        spacingBottom: 0,
        spacingLeft: 8,
        spacingRight: 8,
        zooming: { mouseWheel: { enabled: false } }
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
          const date = moment(this.x).format('DD/MM/YYYY')
          return `
            <div style="display: flex; flex-direction: column; text-transform: capitalize; padding: 6px;">
              ${
                this.points.reduce((accumulated: any, point: any) => {
                  const value = point.y.toLocaleString('pt-br', { style: 'currency', currency: 'BRL', maximumFractionDigits: 2 })
                  return `
                    ${accumulated}
                    <div style="display: grid; align-items: center; grid-template-columns: 4px repeat(2, 1fr); column-gap: 8px">
                      <div style="background: ${point.series.color}; width: 4px; height: 12px; border-radius: 2px"></div>
                      <div style="font-weight: 700">${point.series.name}</div>
                      <div style="text-align: right">${value}</div>
                    </div>
                  `
                }, `<div style="font-family: Roboto; font-weight: 700; font-size: 15px; margin-bottom: 8px;">${date}</div>`)
              }
            </div>
          `
        }
      },
      title: { text: '' },
      legend: {
        enabled: true,
        backgroundColor: 'transparent',
        itemStyle: {
          fontSize: '14px',
          fontFamily: 'Roboto',
          color: this.$vuetify.theme.dark ? '#FFFFFF' : '#000000',
          fontWeight: 700
        }
      },
      xAxis: {
        tickPositions: xTickPositions,
        tickWidth: 0,
        gridLineWidth: 0,
        lineColor: this.$vuetify.theme.dark ? '#454545' : '#D6D6D6',
        minPadding: this.user.preference.displayValues ? 0.08 : 0,
        maxPadding: 0,
        labels: {
          style: {
            fontSize: '12px',
            fontFamily: 'Roboto',
            color: this.$vuetify.theme.dark ? '#FFFFFF' : '#000000',
            fontWeight: 700
          },
          formatter: function (this: any) {
            if (dateDiff <= 2) return moment(this.value).locale('pt-BR').format('DD-MMM')
            return moment(this.value).locale('pt-BR').format('MMM/YY')
          }
        }
      },
      yAxis: {
        visible: this.user.preference.displayValues,
        tickPositions: yTickPositions,
        lineColor: this.$vuetify.theme.dark ? '#454545' : '#D6D6D6',
        gridLineWidth: 1,
        gridLineDashStyle: 'ShortDot',
        gridLineColor: this.$vuetify.theme.dark ? '#454545' : '#D6D6D6',
        minorGridLineWidth: 0,
        title: {
          enabled: false
        },
        labels: {
          x: 4,
          y: -6,
          align: 'left',
          style: {
            fontSize: '12px',
            fontFamily: 'Roboto',
            color: this.$vuetify.theme.dark ? '#FFFFFF' : '#000000',
            fontWeight: 700
          },
          formatter: function (this: any) {
            if (this.value >= 1000000) return `${(this.value / 1000000).toFixed(1)}M`.replace('.', ',')
            if (this.value >= 1000) return `${(this.value / 1000).toFixed(1)}K`.replace('.', ',')
            return this.value.toFixed(0)
          }
        }
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: {
              x1: 0,
              y1: 0,
              x2: 0,
              y2: 1
            },
            stops: [
              [0, Highcharts.color('#17967F').setOpacity(0.5).get('rgba')],
              [1, Highcharts.color('#17967F').setOpacity(0).get('rgba')]
            ]
          },
          threshold: null
        },
        series: {
          marker: {
            enabled: false
          }
        }
      }
    }
  }
}
