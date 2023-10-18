import { Options } from 'highcharts'
import colors from 'vuetify/es5/util/colors'

export const options = {
  lang: {
    contextButtonTitle: 'Opções Avançadas',
    decimalPoint: ',',
    downloadJPEG: 'Salvar como JPEG',
    downloadPDF: 'Salvar como PDF',
    downloadPNG: 'Salvar como PNG',
    downloadSVG: 'Salvar como SVG',
    drillUpText: '< Voltar para {series.name}',
    loading: 'Aguarde...',
    months: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junnho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ],
    noData: 'Sem dados a exibir para este gráfico!',
    printChart: 'Imprimir',
    resetZoom: 'Desfazer zoom',
    resetZoomTitle: 'Voltar zoom 1:1',
    shortMonths: [
      'JAN',
      'FEV',
      'MAR',
      'ABR',
      'MAI',
      'JUN',
      'JUL',
      'AGO',
      'SET',
      'OUT',
      'NOV',
      'DEZ'
    ],
    thousandsSep: '.',
    weekdays: [
      'Domingo',
      'Segunda',
      'Terça',
      'Quarta',
      'Quinta',
      'Sexta',
      'Sábado'
    ]
  },
  credits: {
    enabled: false
  }
}

export const theme: Options = {
  colors: [
    colors.lightBlue.lighten1,
    colors.lightBlue.lighten2,
    colors.lightBlue.lighten3,
    colors.lightBlue.lighten4,
    colors.lightGreen.lighten1,
    colors.lightGreen.lighten2,
    colors.lightGreen.lighten3,
    colors.lightGreen.lighten4,
    colors.indigo.lighten1,
    colors.indigo.lighten2,
    colors.indigo.lighten3,
    colors.indigo.lighten4,
    colors.deepPurple.lighten1,
    colors.deepPurple.lighten2,
    colors.deepPurple.lighten3,
    colors.deepPurple.lighten4,
    colors.deepOrange.lighten1,
    colors.deepOrange.lighten2,
    colors.deepOrange.lighten3,
    colors.deepOrange.lighten4,
    colors.green.lighten1,
    colors.green.lighten2,
    colors.green.lighten3,
    colors.green.lighten4,
    colors.pink.lighten1,
    colors.pink.lighten2,
    colors.pink.lighten3,
    colors.pink.lighten4,
    colors.red.lighten1,
    colors.red.lighten2,
    colors.red.lighten3,
    colors.red.lighten4
  ],
  chart: {
    backgroundColor: ''
  },
  title: {
    style: {
      fontSize: '16px',
      fontWeight: 'bold',
      textTransform: 'uppercase'
    }
  },
  tooltip: {
    borderWidth: 0,
    backgroundColor: 'rgba(219,219,216,0.8)',
    shadow: false
  },
  legend: {
    backgroundColor: '#F0F0EA',
    itemStyle: {
      fontWeight: 'bold',
      fontSize: '13px'
    }
  },
  xAxis: {
    gridLineWidth: 1,
    labels: {
      style: {
        fontSize: '12px'
      }
    }
  },
  yAxis: {
    minorTickInterval: 'auto',
    title: {
      style: {
        textTransform: 'uppercase'
      }
    },
    labels: {
      style: {
        fontSize: '12px'
      }
    }
  },
  plotOptions: {
    candlestick: {
      lineColor: '#404048'
    }
  }
}
