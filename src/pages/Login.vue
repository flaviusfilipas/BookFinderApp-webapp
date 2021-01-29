<template>
  <q-page class="bg-secondary flex flex-center">
      <auth-form authType ='login'></auth-form>
   </q-page>
</template>

<script>
import AuthForm from 'src/components/auth/AuthForm.vue'
export default {
  components: { AuthForm }
}
</script>

<style>

</style>
