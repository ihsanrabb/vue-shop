<template>
    <div>
        <Navbar />
        
        <div class="container">
                <div class="row mt-5">
                    <div class="col-md-6">
                        <carousel 
                            :per-page="1"  
                            :mouse-drag="false" 
                            class="carousel-custom"
                            autoplay=true
                            loop=true
                        >
                            <slide v-for="(image,index) in products.images" :key="index">
                                <img :src="image" />
                            </slide>
                        </carousel>
                        <hr>
                        <div class="row mt-5">
                            <div class="col-2" v-for="img in products.images" >
                                <img :src="img" class="display-image" alt="...">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <p class="product-title" v-html="products.name" />
                        <hr>
                        <p class="product-price">HARGA <span>{{products.price | currency('Rp') }}</span></p>
                        <hr>
                        <p class="product-stok">STOK YANG TERSEDIA <span>{{products.stok}}</span></p>
                        <hr>
                        <ul>
                           
                        </ul>
                        <AddToCart
                            :name="products.name"
                            :price="products.price"
                            :product-id="products.id"
                            :image="getImage(products.images)"
                        >
                        </AddToCart>
                        <!-- <button @click="beli" >nih beli</button> -->
                        <MiniCart />
                    </div>
                </div>

        <div class="product-deskripsi mt-5">
        <hr class="deskripsi-line">
            <h1 class="pb-3">Deskripsi Produk</h1>
            <span v-html="products.description"></span>
        </div>
                
        </div>
        
            
    </div>
</template>

<script>
import {fb,db} from '../firebase';
import { Carousel, Slide } from 'vue-carousel';
import AddToCart from '../components/AddToCart';


export default {
    components: {
        Carousel,
        Slide,
        AddToCart
    },
    data() {
        return {
            products: []
        }
    },
    firestore() {
        let prodId = this.$route.query.pId

        return {
            products: db.collection('products').doc(prodId)
        }
    },
    methods: {
        getImage(images) {
            return images[0]
        },
        getProd() {
            console.log('beli nih')
        },
        beli() {
            let item = {
                productName: this.products.name,
                productPrice: this.products.price,
                product_Id: this.products.id,
                productImage: this.products.images,
                productQuantity: 1
            }
            $('#miniCart').modal('show')
            console.log('nih beli', item)
            this.$store.commit('addToCart', item)
        }
    }
}
</script>

<style scoped lang="scss" src="../styles/ProductDetail.scss">