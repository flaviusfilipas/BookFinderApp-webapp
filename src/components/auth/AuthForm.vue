<template>
  <q-card class="auth-card rounded-borders full-width q-pa-sm">
    <div class="row">
      <div class="col q-ma-xl text-h4 text-center">{{authType | capitaliseFirstLetter }}</div>
    </div>
    <div class="row">
      <q-input class="col q-ma-xs q-mb-sm" outlined v-model="user.email" label="Email" />
    </div>
    <div class="row">
      <q-input class="col q-ma-xs q-mb-md" outlined v-model="user.password" label="Password" :type="isPwd ? 'password' : 'text'">
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>
    </div>
    <div class="row justify-end">
      <span @click="forgotPassword" style="cursor: pointer;" class="q-mb-lg justify-end">
        {{authType === 'login' ? 'Forgot password?' : ''}}
      </span>
    </div>
    <div class="row">
        <q-btn @click="authenticate" class= "bg-primary text-white col q-mb-md" outline rounded :label="authType" />
    </div>
    <div class="row justify-center">
      <span>Or {{authType | capitaliseFirstLetter }} Using</span>
      </div>
    <div class="row q-gutter-sm justify-center q-mb-md">
        <q-icon style="font-size:40px;color: #3b5998" name="facebook" />
        <q-icon style="font-size:40px;color: #31b0d5" name="fab fa-twitter" />
        <q-icon class="q-mb-md" style="font-size:40px;color: #d34836" name="fab fa-google-plus" />
      </div>
    <div class="column items-center q-mb-xl">
        <span>{{ authType == 'login' ? "Don't " : 'Already ' }} have an account ?</span>
        <div class="row justify-center">
          <q-btn flat color="primary" @click="redirect">
            {{authType === 'login' ? 'Sign up' : 'Login'}}
          </q-btn>
        </div>
    </div>
    </q-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['authType'],
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      isPwd: true
    }
  },
  methods: {
    ...mapActions('authStore', ['registerUser', 'loginUser']),
    forgotPassword () {
      alert('Password forgot')
    },
    authenticate () {
      if (this.authType === 'login') {
        this.loginUser(this.user)
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/search')
      } else {
        this.registerUser(this.user)
        window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/search')
      }
    },
    redirect () {
      if (this.authType === 'login') {
        this.$router.push('/register')
      } else {
        this.$router.push('/login')
      }
    }
  },
  filters: {
    capitaliseFirstLetter (value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style scoped>
  .auth-card{
    max-width:350px
  }
</style>
