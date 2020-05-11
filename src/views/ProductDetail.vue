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
                            :autoplay=true
                            :loop=true
                        >
                            <slide v-for="(image,index) in products.images" :key="index">
                                <img :src="image" />
                            </slide>
                        </carousel>
                        <hr>
                        <div class="row mt-5">
                            <div class="col-2" v-for="(img, index) in products.images" :key="index">
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
                        <div class="d-flex justify-content-start" v-if="cekUkuran">
                            <p class="product-stok">UKURAN : </p>
                            <select class="form-control w-50 ml-3" v-model="ukuranProduk">
                                <option>Pilih Ukuran</option>
                                <option
                                    v-for="(ukuran,index) in products.ukuranProduk"
                                    :value="ukuran"
                                    :key="index"
                                >
                                {{ukuran}}
                                </option>
                            </select>
                        </div>
                        <hr v-if="cekUkuran">

                        <p class="product-stok">Jumlah Pembelian </p>
                        <div class="row mb-4" style="width: 80%">
                            <div class="col-md-3">
                                <img src="../assets/svg/minus-icon.svg" style="width: 35%" @click="decrement">
                            </div>
                            <div class="col-md-6">
                                 <input type="text" class="form-control" v-model="quantity">
                            </div>
                            <div class="col-md-3">
                                <img src="../assets/svg/plus-icon.svg" style="width: 35%" @click="increment">
                            </div>
                        </div>
                        <hr>
                        <p class="product-stok">Dikrim Dari : {{products.provinsi}}, {{products.kota}}</p>

                        <hr>

                        <button @click="beli" class="btn btn-outline-info">Beli Sekarang!</button>
                        <MiniCart />
                    </div>
                </div>

        <div class="product-deskripsi mt-5">
        <hr class="deskripsi-line">
            <h1 class="pb-3">Deskripsi Produk</h1>
            <span v-html="products.description"></span>
        </div>
                
        </div>
        
       <Footer />     
    </div>
</template>

<script>
import {fb,db} from '../firebase';
import { Carousel, Slide } from 'vue-carousel';
import AddToCart from '../components/AddToCart';


export default {
    name: "productDetail",
    components: {
        Carousel,
        Slide,
        AddToCart
    },
    data() {
        return {
            products: [],
            quantity: 1,
            prodId: '',
            ukuranProduk: ''
        }
    },
    firestore() {
        let prodId = this.$route.query.pId
        return {
            products: db.collection('products').doc(prodId)
        }
    },
    methods: {
        increment() {
            this.quantity += 1
        },
        decrement() {
            if(!this.quantity <= 0) {
                this.quantity -= 1
            }
        },
        getImage(images) {
            if(images) {
                return images[0]
            }
        },
        beli() {
            let item = {
                productName: this.products.name,
                productPrice: this.products.price,
                product_Id: this.products.id,
                productImage: this.getImage(this.products.images),
                productQuantity: this.quantity,
                penjual_id: this.products.penjualID,
                origin: this.products.origin,
                weight: this.products.weight,
                ukuran: this.ukuranProduk
            }
            $('#miniCart').modal('show')
            this.$store.commit('addToCart', item)
        }
    },
    computed: {
        cekUkuran() {
            if(this.products.ukuranProduk) {
                if (this.products.ukuranProduk.length != 0) {
                    return true
                } else {
                    return false
                } 
            } else {
                return false
            }
        }
    }
}
</script>

<style scoped lang="scss" src="../styles/ProductDetail.scss">