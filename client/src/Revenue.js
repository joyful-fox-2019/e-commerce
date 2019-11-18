import {
  Bar,
  mixins
} from 'vue-chartjs'

export default {
  extends: Bar,
  mixins: [mixins.reactiveProp],
  props: ['chartData', 'options'],
  data() {
    return {
      options: {
        title: {
          display: true,
          text: 'Revenue Growth By Month'
        },
        legend: {
          display: true
        },
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  mounted() {
    this.renderChart(this.chartdata, this.options)
  }

}
