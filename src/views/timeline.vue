<template>
  <div class="box" style="width: 600px">
    <div>实时数据</div>
    <p>数据在调试窗口查看 ——> network ——> ws</p>
    <div style="margin-top: 30px; display: flex; justify-content: space-around;">
      <el-button @click="setDelay(1)">时间间隔1</el-button>
      <el-button @click="setDelay(2)">时间间隔2</el-button>
      <el-button @click="setDelay(5)">时间间隔3</el-button>
      <el-button @click="setDelay(10)">时间间隔4</el-button>
    </div>
    <div id="echarts"></div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
import { getList } from '@/http/api/api'
const echarts = require('echarts')

export default {
  data() {
    return {
      delay: 1000,
      ws: null,
      AAPL: [],
      Echarts: null,
      options: {
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            params = params[0]
            var date = new Date(params.name)
            const hours = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
            const minutes = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
            const seconds = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
            const val = params.value[1].toFixed(2)
            return hours + ':' + minutes + ':' + seconds + ': ' + val
          },
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: function (value, index) {
              // 格式化成月/日，只在第一个刻度显示年份
              var date = new Date(value);
              var texts = [date.getHours(), date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()];
              if (index === 0) {
                texts.unshift(date.getYear());
              }
              return texts.join(':');
            }
          },
          minInterval: 1000 * 60,
          maxInterval: 3600 * 24 * 1000,
          interval: 360000
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          },
          axisLine: {
            show: true
          }
        },
        series: [{
          type: 'line',
          lineStyle: {
            color: '#f0f',
            width: 1,
          },
          showSymbol: false,
          legendHoverLink: false,
          hoverAnimation: false,
          data: []
        },
        {
          name:'.anchor',
          type:'line', 
          showSymbol:false, 
          data:[
            {name: dayjs(new Date()).format('YYYY/MM/DD'), value:[dayjs(new Date()).format('YYYY/MM/DD'), 0]},
            {name: dayjs(+new Date().getTime() + 24 * 60 * 60 * 1000).format('YYYY/MM/DD'), value:[dayjs(+new Date().getTime() + 24 * 60 * 60 * 1000).format('YYYY/MM/DD'), 0]}
          ],
          itemStyle:{normal:{opacity:0}},
          lineStyle:{normal:{opacity:0}},
          showSymbol: false,
          legendHoverLink: false,
          hoverAnimation: false,
        }],
        dataZoom: {
          type: 'inside'
        }
      }
    }
  },
  methods: {
    initSocket() {
      const that = this
      this.ws = new WebSocket('ws://localhost:8888')
      this.ws.onopen = function (e) {
        console.log('Connection to server opened');
        console.log("send a msg");
      }
      this.ws.onmessage = function (e) {
        var stocksData = e.data;
        // that.drawEcharts()
        stocksData = JSON.parse(stocksData)
        that.AAPL.push({
          name: dayjs(new Date()).format('YYYY/MM/DD HH:mm:ss'),
          value: [new Date(), stocksData.AAPL]
        })
        that.$nextTick(() => {
          that.$set(that.options.series[0], 'data', that.AAPL)
        })
        that.Echarts.setOption(that.options)
        // options.series[0].data = that.AAPL
      }
      this.ws.onclose = function (e) {
        console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
        console.log(e)
      }
    },
    setDelay(i) {
      this.delay = i * 1000
      this.ws.send(this.delay)
    },
    drawEcharts() {
      this.Echarts = echarts.init(document.getElementById('echarts'))
      this.Echarts.setOption({
        ...this.options
      })
    },
    getLists() {
      getList().then(res => {
        console.log(res)
        this.AAPL = res.data
        this.options.series[0].data = res.data
        this.Echarts.setOption(this.options)
      })
    }
  },
  mounted() {
    this.drawEcharts()
    this.getLists()
    setTimeout(() => {
      this.initSocket()
    })
    
  },
  beforeDestroy() {
    this.ws.close()
  }
}
</script>

<style lang="scss" scoped>
  .box {
    div, p {
      padding: 3px 0;
    }
  }
  #echarts {
    width: 600px;
    height: 400px;
  }
</style>