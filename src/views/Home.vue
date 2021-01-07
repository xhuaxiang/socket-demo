<template>
  <div class="home">
    <div>
      <router-link tag="div" class="link-tag" to="/timeline">实时数据</router-link>
      <div class="link-tag" @click="showMessage = true">聊天数据</div>
    </div>
    <el-dialog title="进入房间" :visible.sync="showMessage">
      <el-form :model="form">
        <el-form-item label="房间序号" label-width="100px">
          <el-input v-model="form.id" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户序号" label-width="100px">
          <el-input v-model="form.userId" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="showMessage = false">取 消</el-button>
        <el-button type="primary" @click="goChat">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data() {
    return {
      showMessage: false,
      form: {
        id: '',
        userId: ''
      }
    }
  },
  components: {
  },
  methods: {
    goChat() {
      console.log(this.form)
      this.$router.push({ name: 'chat', params: { id: this.form.id, userId: this.form.userId }})
      // this.$router.push({ name: 'chat', params: { id: this.form.id }})
    }
  },
	created() {
    
	}
}
</script>

<style lang="scss" scoped>
  .home {
    margin-top: 20px;
  }
  .link-tag {
    padding: 3px 0;
    cursor: pointer;
    &:hover {
      color: #33a0ff;
    }
  }
</style>
