<template>
  <div class="add-to-cart">
    <button 
        class="btn btn-outline-info"
        @click="addToCart"    
    >BELI</button>     
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
    image: String,
    penjualId: String

  },
  data() {
      return {
          item: {
              productName: this.name,
              productPrice: this.price,
              product_Id: this.productId,
              productImage: this.image,
              productQuantity: 1,
              penjual_id: this.penjualId
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

<style scoped lang="scss" src="../styles/AddToCart.scss">
