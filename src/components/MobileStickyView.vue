<template>
    <q-page-sticky expand :class="stickyClass" position="top" >
      <div class="q-ml-xs flex col-11">
        <div class="col">
          <searchbar inputClass="mobile-input text-white q-pa-xs" bgColor="white" iconClass="text-grey-9"/>
        </div>
        <div class="filter-div q-ma-xs">
          <q-btn flat round icon="filter_list" @click="handleFilterModal(true)">
            <q-tooltip>Filter results</q-tooltip>
          </q-btn>
        </div>
      </div>
    </q-page-sticky>
</template>

<script>
import Searchbar from '../components/Searchbar.vue'
import { mapActions } from 'vuex'
export default {
  props: {
    stickyClass: {
      type: String
    }
  },
  components: {
    Searchbar
  },
  methods: {
    ...mapActions('modalsStore', ['setFilterModal']),
    handleFilterModal (value) {
      this.setFilterModal(value)
    }
  }
}
</script>

<style>
.filter-div{
  background-color:#f8f1f1;
  height:2.8em;
  border-radius:3px;
}
@media(min-width: 695px) {
    .q-page-sticky{
      display: none;
    }
}
 @media(max-width: 695px){
  .filter-div{
    background-color:#f8f1f1;
    height:2.8em;
    border-radius:3px;
  }
  .q-page-sticky{
    justify-content: flex-start;
  }
 }
</style>
