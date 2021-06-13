<template>
  <q-page class="flex flex-center">
      <div class="column">
          <div class="column items-center">
            <div class="row justify-center">
                <img class="logo-image" src="../assets/logo.png">
                <div class="logo-text text-h2 q-mt-lg">
                  Bookify
                </div>
            </div>
            <div class="logo-text text-center row text-h4 text-italic q-mb-xl q-mb-xs-sm">
                 Compare book prices from major providers
            </div>
          </div>
          <searchbar inputClass="text-white q-ma-xs-sm" iconClass="cursor-pointer" autofocus rounded outlined />
      </div>
  </q-page>
</template>

<script>
import Searchbar from '../components/Searchbar.vue'
export default {
  components: { Searchbar }
}

</script>
<style scoped lang="scss">
  .q-page {
    /* background: linear-gradient(to left, #000000, #434343); */
    background: linear-gradient(145deg,#1976d2 11%,#0f477e 75%)
  }
  .logo-image{
    height: 10em;
  }
  .logo-text{
    align-self: center;
    color:white;
  }
  @media(min-width: 757px){
    .q-input{
      width: 700px;
    }

  @media(max-width: 599px){
    .logo-text{
      color:white;
      font-size: small;
    }
    .logo-image{
      height: 6.8em;
    }
  }

  }
</style>
