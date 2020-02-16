<template>
  <div class="products" id="products">
      <div class="container">
          <h1 class="text-center p-5">Our Products</h1>
          <div class="row">
              
              <div class="col-md-4" v-for="product in products">
                  <div class="card product-item">
                    <img :src="getImage(product.images)" class="card-img-top" alt="...">
                        <div class="card-body">
                          <div class="d-flex justify-content-between">
                            <h5 class="card-title">{{ product.name }}</h5>
                            <h5 class="card-prices">{{ product.price | currency('Rp') }}</h5>
                          </div>
                            <p class="card-text" v-html="product.description" />
                                
                           
                            <AddToCart
                              :name="product.name"
                              :price="product.price"
                              :product-id="product.id"
                              :product-image="getImage(product.images)"
                            >
                            </AddToCart>
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
  props: {
    msg: String
  },
  components: {
    AddToCart
  },
  data() {
    return {
      products: [],
    }
  },
  methods: {
    getImage(images) {
      return images[0]
    }
  },
  firestore() {
    return {
        products: db.collection('products')
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .products{
        margin-top: 7rem;
        background: #f2f2f2;
        padding-bottom: 3rem;
    }
</style>