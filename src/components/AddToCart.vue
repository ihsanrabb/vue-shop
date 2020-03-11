<template>
  <div class="add-to-cart">
    <button 
        class="btn btn-primary"
        @click="addToCart"    
    >Beli</button>     
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: "add-to-cart",
  props: {
    name: String,
    price: String,
    productId: String,
    image: String

  },
  data() {
      return {
          item: {
              productName: this.name,
              productPrice: this.price,
              product_Id: this.productId,
              productImage: this.image,
              productQuantity: 1
          }
      }
  },
  methods: {
      addToCart() {
          $('#miniCart').modal('show')
          this.$store.commit('addToCart', this.item)
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
