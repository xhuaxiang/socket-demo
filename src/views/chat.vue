<template>
  <div class="chat-room">
    <p>房间：{{ $route.params.id }}, 用户：{{ $route.params.userId }}</p>
    <div class="chat-history">
      <div class="chat-tips">{{startMS}}</div>
      <div v-for="(item, index) in messageList" :key="index" style="text-align: left">
        <p v-if="!item.name">{{ item.message }}</p>
        <p v-else>用户{{ item.name }}: {{ item.message }}</p>
      </div>
    </div>
    <div style="padding: 12px 0; display: flex">
      <el-input v-model="message" style="margin-right: 10px"></el-input>
      <el-button type="primary" @click="sendMessage">发送</el-button>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import {isObject} from '@/utils/utils'
import { enter } from '@/http/api/api'

export default {
  data() {
    return {
      message: '',
      ws: null,
      startMS: '',
      messageList: []
    }
  },
  methods: {
    initSocket() {
      const that = this
      const id = this.$route.params.id
      const userId = this.$route.params.userId
      const params = { id, userId }
      this.ws = new WebSocket('ws://localhost:8800')
      this.ws.onopen = function (e) {
        console.log('connect')
        that.ws.send(JSON.stringify(params))
      }
      this.ws.onmessage = function (e) {
        console.log(e)
        var stocksData
        try {
          stocksData = JSON.parse(e.data);
        } catch (error) {
          stocksData = e.data
        }
        console.log(stocksData)
        if (isObject(stocksData)) {
          that.messageList = [...that.messageList, stocksData]
        } else {
          that.startMS = stocksData
        }
        // that.ws.send(that.delay)
        console.log(stocksData);
      }
      this.ws.onclose = function (e) {
        console.log('websocket 断开: ' + e.code + ' ' + e.reason + ' ' + e.wasClean)
        console.log(e)
      }
    },
    sendMessage() {
      const params = {
        id: this.$route.params.id,
        userId: this.$route.params.userId,
        ms: this.message,
        sendTime: dayjs(new Date()).format('YYYY-MM-DD HH:mm')
      }
      this.ws.send(JSON.stringify(params))
    }
  },
  created() {
    // const id = this.$route.params.id
    // const userId = this.$route.params.userId
    // const params = { id, userId }
    // enter(params).then(res => {
    //   console.log(res)
    // })
    console.log(this.$route)
    this.initSocket()
  },
  beforeDestroy() {
    this.ws.close()
  }
}
</script>

<style lang="scss" scoped>
  .chat-room {
    width: 600px;
    .chat-history {
      width: 100%;
      height: 350px;
      overflow-x: hidden;
      border: 1px solid #efefef;
      .chat-tips {
        display: inline-block;
        padding: 2px 6px;
        border: none;
        border-radius: 50px;
        background: #666;
        color: #efefef;
      }
    }
  }
</style>