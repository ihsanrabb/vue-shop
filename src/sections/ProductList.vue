<template>
  <div class="products" id="products">
      <div class="container">
          <!-- <h1 class="mt-5 mb-5">Our Products</h1> -->

          <!-- <div class="row">
            <div class="col-md-9">
              <div class="mb-5 float-left">
                <button type="button" class="btn btn-outline-success mr-2 ml-2" @click="setFilter('All')">Semua</button>
                <button type="button" class="btn btn-outline-warning mr-2 ml-2" @click="setFilter('muslim')">Muslim</button>
                <button type="button" class="btn btn-outline-info mr-2 ml-2" @click="setFilter('muslimah')">Muslimah</button>
                <button type="button" class="btn btn-outline-info mr-2 ml-2" @click="setQuery('muslimah')">Query 1</button>
                <button type="button" class="btn btn-outline-info mr-2 ml-2" @click="setQuery('muslim')">Query 2</button>
              </div>
            </div>
            <div class="col-md-3">
              <input class="form-control" type="text" v-model="search" placeholder="Cari produk disini" />
            </div>
          </div> -->
          
          
          <div class="row">
              <div class="col-md-4" v-for="(product,index) in filteredProducts" :key="index">
                  <div class="card product-item card-product mt-5">
                    <img :src="getImage(product.images)" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="product-title">{{ product.name }}</h5>
                            <h5 class="product-price">{{ product.price | currency('Rp') }}</h5>
                            
                            <div class="row pt-3">
                              <div class="col-md-6">
                                <button @click="goToDetail(product.id)" class="btn btn-warning float-left">Detail</button>    
                              </div>
                              <div class="col-md-6">
                                  <AddToCart
                                    :name="product.name"
                                    :price="product.price"
                                    :product-id="product.id"
                                    :image="getImage(product.images)"
                                    :penjual-id="product.penjualID"
                                    class="float-right"
                                  >
                                  </AddToCart>
                              </div>
                            </div>
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
  name: "Products-list",
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
        products: db.collection('products')
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