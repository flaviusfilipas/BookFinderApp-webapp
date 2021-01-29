<template>
  <q-page class="bg-secondary flex flex-center">
    <auth-form authType ='register'></auth-form>
   </q-page>
</template>

<script>
import AuthForm from '../components/auth/AuthForm'
export default {
  components: { AuthForm }

}
</script>

<style>

</style>
