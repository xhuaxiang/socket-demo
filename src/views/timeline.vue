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
  </div>
</template>

<script>
export default {
  data() {
    return {
      delay: 1000,
      ws: null
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
        // that.ws.send(that.delay)
        console.log(stocksData);
      }
      this.ws.onclose = function (e) {
        console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
        console.log(e)
      }
    },
    setDelay(i) {
      this.delay = i * 1000
      this.ws.send(this.delay)
    }
  },
  created() {
    this.initSocket()
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
</style>