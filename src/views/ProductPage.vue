<template>
    <div class="">
            <Navbar />
            
            <div class="parallax-makkah">
                <h1>nyontek tokopedia, liat yang busana muslim</h1>
            </div>
            <ProductList />

    </div>    
</template>

<script>
import ProductList from "../sections/ProductList.vue"
import Parallax from 'vue-parallaxy'

export default {
  name: "productPage",
  components: {
      ProductList,
      Parallax
  },
  data() {
      return {
          filter: 'All'
      }
  },
  methods: {
      setFilter(filterKey) {
          this.filter = filterKey
          console.log('set filter', this.filter)
      }
  }
};
</script>

<style lang="scss" scoped>
    .parallax-makkah {
        height: 250px;
        background-image: url("../assets/img/Islamic-vector.svg");
        background-attachment: fixed;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
    }
</style>