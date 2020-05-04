<template>
  <div class="products" id="alat-solat">
      <div class="container">  
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
            :products="products"
            @page:update="updatePage"
            :currentPage="currentPage"
            :pageSize="pageSize"
          />

      </div>
  </div>
</template>

<script>
import {fb,db} from '../firebase';
import AddToCart from '../components/AddToCart' 
import Pagination from '../components/Pagination'

export default {
  name: "AlatSholat",
  props: ['search'],
  components: {
    AddToCart,
    Pagination
  },
  data() {
    return {
      products: [],
      currentPage: 0,
      pageSize: 1
    }
  },
  firestore() {
    return {
        products: db.collection('products').where("productCategory", "==", "alat-sholat")
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
    },
  },
  computed: {
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