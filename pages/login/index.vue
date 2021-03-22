<template>
  <div class="auth-page">
  <div class="container page">
    <div class="row">

      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">{{isLogin ? 'Sign in' : 'Sign up'}}</h1>
        <p class="text-xs-center">
          <a href="">Have an account?</a>
        </p>
        <ul class="error-messages">
          <template v-for="(messages,field) in errors">
            <li v-for="(message,index) in messages" :key="index">
              {{field}}: {{message}}
            </li>
          </template>
        </ul>

        <form @submit.prevent="onSubmit">
          <fieldset v-if="!isLogin" class="form-group">
            <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
          </fieldset>
          <fieldset class="form-group">
            <input v-model="user.email" class="form-control form-control-lg" type="text" placeholder="Email">
          </fieldset>
          <fieldset class="form-group">
            <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password">
          </fieldset>
          <button class="btn btn-lg btn-primary pull-xs-right">
            {{ isLogin ? 'Sign in' : 'Sign up'}}
          </button>
        </form>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import { login,register } from '@/api/user.js'
// 仅在客户端加载js-cookie包
const cookie = process.client ? require('js-cookie') : undefined
export default {
  data(){
    return {
      errors:{}, // 错误处理
      user:{
        username:'rose1234',
        email:'z13269387005@163.com',
        password:'rose1234'
      }
    }
  },
  computed:{
    isLogin(){
      return this.$route.name === 'login'
    }
  },
  methods:{
    async onSubmit(){
      try {
        // 提交表单请求登录
        const { data } = this.isLogin 
        ? await login({user:this.user})  
        : await register({user:this.user})
        console.log(data)
        // 保存用户的登录状态
        this.$store.commit('setUser', data.user)

        // 为防止刷新页面数据丢失，需要把数据持久化
        cookie.set('user', data.user)
        this.$router.push('/')
      } catch (error) {
        console.dir(error)
        this.errors = error.response.data.errors
        console.log(this.errors)
      }
      
    }
  }
}
</script>

<style>

</style>