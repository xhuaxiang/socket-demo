<template>
  <div class="x-main">
    websocket测试
    <div class="x-room-list">
      <div class="x-room-item">
        <el-button @click="room1 = true">打开房间一</el-button>
        <div v-show="room1" class="x-room-box">

        </div>
        <div>
          <label>用户一</label><el-input></el-input><el-button>发送</el-button>
        </div>
        <el-button v-show="room1" @click="room1 = false">关闭</el-button>
      </div>
      <div class="x-room-item">
        <el-button @click="room2 = true">打开房间二</el-button>
        <div v-show="room2" class="">

        </div>
        <el-button v-show="room2" @click="room2 = false">关闭</el-button>
      </div>
      <div class="x-room-item">
        <el-button @click="room3 = true">打开房间三</el-button>
        <div v-show="room3" class="">

        </div>
        <el-button v-show="room3" @click="room3 = false">关闭</el-button>
      </div>
    </div>
    
    <div class="x-websocket">
      <div class="x-socket-box">
        
      </div>
      <div class="x-socket-user">
        <el-button @click="sendMessage(1)">用户一</el-button>
        <el-button @click="sendMessage(2)">用户二</el-button>
        <el-button @click="sendMessage(3)">用户三</el-button>
        <el-button @click="sendMessage(4)">用户四</el-button>
      </div>
      <!-- <div>
        <el-input v-show="user1In"></el-input><el-button>发送</el-button>
        <el-input v-show="user2In"></el-input><el-button>发送</el-button>
        <el-input v-show="user3In"></el-input><el-button>发送</el-button>
        <el-input v-show="user4In"></el-input><el-button>发送</el-button>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: {
        name: 'hello',
        
      },
      ws: null,
      room1: false,
      room2: false,
      room3: false,
    }
  },
  methods: {
    initSocket() {
      const that = this
      this.ws = new WebSocket('ws://localhost:8181')
      this.ws.onopen = function (e) {
        console.log('Connection to server opened');
        that.ws.send('Connection to server opened');
        console.log("send a mesg");
      }
      this.ws.onmessage = function (e) {
        var stocksData = e.data;
        // that.ws.send(stocksData)
        console.log(stocksData);
      }
      this.ws.onclose = function (e) {
        console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
        console.log(e)
      }
    },
    sendMessage(v) {
      const that = this
      console.log(this.ws)
      let mes = `用户${v}点击了按钮`
      this.ws.send(mes)
    },
    createSocket() {
      const that = this
      // this.ws = new WebSocket("ws://localhost:8181")
      var isClose = false
      var stocks = {
        "AAPL": 0, "MSFT": 0, "AMZN": 0, "GOOG": 0, "YHOO": 0
      }
      function updataUI() {
        that.ws.onopen = function (e) {
          console.log('Connection to server opened');
          isClose = false;
          that.ws.send(JSON.stringify(that.text));
          console.log("sened a mesg");
        }
        //更新UI
        // var changeStockEntry = function (symbol, originalValue, newValue) {
        //   var valElem = $('#' + symbol + ' span');
        //   valElem.html(newValue.toFixed(2));
        //   if (newValue < originalValue) {
        //     valElem.addClass('label-danger');
        //     valElem.removeClass('label-success');
        //   } else if (newValue > originalValue) {
        //     valElem.addClass('label-success');
        //     valElem.removeClass('label-danger');
        //   }
        // }
        // 处理受到的消息
        that.ws.onmessage = function (e) {
          var stocksData = JSON.parse(e.data);
          console.log(stocksData);
          // for (var symbol in stocksData) {
          //   if (stocksData.hasOwnProperty(symbol)) {
          //     changeStockEntry(symbol, stocks[symbol], stocksData[symbol]);
          //     stocks[symbol] = stocksData[symbol];
          //   }
          // }
        }
        that.ws.onclose = function (e) {
          console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
          console.log(e)
        }
      }
      updataUI()
    }
  },
  mounted() {
    this.initSocket()
    // this.createSocket()
  }
}
</script>

<style lang="scss" scoped>
  .x-main {

  }
  .x-room-list {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .x-room-item {
      width: 450px;
    }
  }
  .x-websocket {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .x-socket-box {
    width: 400px;
    height: 400px;
    margin: 12px 0;
    border: 1px solid #efefef;
  }
</style>