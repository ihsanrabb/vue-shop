<template>
  <div class="products" id="product-muslim">
      <div class="container">  
          <div class="row">
              <div class="col-md-4" v-for="(product,index) in filteredProducts" :key="index">
                  <div class="card product-item card-product mt-5">
                    <img :src="getImage(product.images)" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="product-title">{{ product.name }}</h5>
                            <h5 class="product-price">{{ product.price | currency('Rp') }}</h5>           
                              
                            <button @click="goToDetail(product.id)" class="btn btn-warning">Detail</button>    
                            
                        </div>
                    </div>
              </div>

          </div>
      </div>
    
  </div>
</template>

<script>
import {fb,db} from '../firebase';
import AddToCart from '../components/AddToCart' 

export default {
  name: "ProductMuslim",
  props: ['search'],
  components: {
    AddToCart
  },
  data() {
    return {
      products: []
    }
  },
  methods: {
    getImage(images) {
      return images[0]
    },
    goToDetail(prodId) {
      this.$router.push({name:'productDetail', query: {pId: prodId}})
    },
  },
  firestore() {
    return {
        products: db.collection('products').where("productCategory", "==", "muslim")
    }
  },
  computed: {
    filteredProducts () {
      return this.products.filter((product) => {
        return product.name.toLowerCase().match(this.search.toLowerCase())
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="../styles/ProductList.scss">