<template>
  <div class="products" id="products">
      <div class="container">
          <!-- <h1 class="mt-5 mb-5">Our Products</h1> -->
          
          <div v-if="visibleProducts.length != 0">
            <div class="row">
                <div class="col-md-4" v-for="(product,index) in visibleProducts" :key="index">
                    <div class="card product-item card-product mt-5">
                      <img :src="getImage(product.images)" class="card-img-top" alt="...">
                          <div class="card-body">
                              <h5 class="product-title">{{ product.name }}</h5>
                              <h5 class="product-price">{{ product.price | currency('Rp') }}</h5>
                              
                              <button @click="goToDetail(product.id)" class="btn btn-warning btn-detail">Detail</button>    
                          </div>
                      </div>
                </div>
            </div>
            <pagination 
              :data="products"
              @page:update="updatePage"
              :currentPage="currentPage"
              :pageSize="pageSize"
            />
          </div>

          <div v-else>
            <img src="../assets/svg/empty-file.svg"  class="w-25 pt-3"/>
            <h3>Data tidak ditemukan...</h3>
          </div>

      </div>
    
  </div>
</template>

<script>
import {fb,db} from '../firebase';
import AddToCart from '../components/AddToCart' 
import Pagination from '../components/Pagination'

export default {
  name: "Products-list",
  props: ['search'],
  components: {
    AddToCart,
    Pagination
  },
  data() {
    return {
      products: [],
      currentPage: 0,
      pageSize: 12,
      // visibleProducts: []
    }
  },
  firestore() {
    return {
      products: {
        ref: db.collection('products'),
        resolve: (data) => {
          this.products = data
          this.updateVisibleProducts();
        }
      } 
    }
  },
  methods: {
    getImage(images) {
      return images[0]
    },
    goToDetail(prodId) {
      this.$router.push({name:'productDetail', query: {pId: prodId}})
    },
    updatePage(pageNumber) {
      this.currentPage = pageNumber;
      // this.updateVisibleProducts()
    },
    // updateVisibleProducts() {
    //   this.visibleProducts = this.products.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)
    //   if (this.visibleProducts.length == 0 && this.currentPage > 0) {
    //     this.updatePage(this.currentPage - 1)
    //   }
    // }
  },
  computed: {
    // filteredProducts () {
    //   console.log('mencari')
    //   return this.products.filter((product) => {
    //     if (this.search) {
    //       return product.name.toLowerCase().match(this.search.toLowerCase())
    //     } else {
    //       return product
    //     }
        
    //   })
    // }
    visibleProducts() {
      if(this.search) {
        return this.products.filter((product) => {
          return product.name.toLowerCase().match(this.search.toLowerCase())
        })
      } else {
        return this.products.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)
        if (this.products.length == 0 && this.currentPage > 0) {
          return this.updatePage(this.currentPage - 1)
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="../styles/ProductList.scss">