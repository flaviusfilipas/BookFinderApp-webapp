<template>
  <q-page padding>
      <q-card style=" margin:0 auto;
    width:35%" class="shadow-10">
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="login" label="Login" />
            <q-tab name="register" label="Register" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="login">
                <div class="row">
                  <q-banner class="q-mb-md bg-grey-3 col">
                    <template v-slot:avatar>
                      <q-icon name="account_circle" color="primary" />
                    </template>
                    Login to add books to wishlist
                  </q-banner>
                </div>
                <div class="row">
                  <q-input class="col q-mb-md" outlined v-model="email" label="Email" />
                </div>
                <div class="row">
                  <q-input class="col q-mb-md" outlined v-model="password" label="Password" :type="isPwd ? 'password' : 'text'">
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                </div>
                <div class="row">
                  <q-btn style="margin:0 0 auto auto;" color="primary" label="Login" @click="login"/>
                </div>
            </q-tab-panel>
            <q-tab-panel name="register">
                <div class="row">
                  <q-banner class="col q-mb-md bg-grey-3">
                    <template v-slot:avatar>
                      <q-icon name="account_circle" color="primary" />
                    </template>
                    Register to add books to wishlist
                  </q-banner>
                </div>
                <div class="row">
                  <q-input class="col q-mb-md" v-model="email" outlined label="Email" />
                </div>
                <div class="row">
                  <q-input class="col q-mb-md" v-model="password" label="Password" outlined :type="isPwd ? 'password' : 'text'">
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                </div>
                <div class="row">
                  <q-btn style="margin:0 0 auto auto" color="primary" label="Register" @click="register" />
                </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      tab: 'login',
      isPwd: true
    }
  },
  methods: {
    login () {
      alert('Login')
    },
    register () {
      alert('Register')
    }
  }
}
</script>

<style>
  #auth-card{
    margin:0 auto;
    width:35%
  }
  #login-button{
    margin:0 0 auto auto;
  }
</style>
