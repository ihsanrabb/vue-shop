<template>
  <div class="checkout">
    <Navbar />
    <div class="container">

      <h1 class="checkout-title mt-5">Checkout</h1>

      <div>
        <div class="row">
            <div class="col-md-7">
              <div v-for="(item, index) in this.$store.state.cart" :key="index">
                  <div class="row product-detail">
                    <div class="col-md-4">
                      <img :src="item.productImage" width="80px"  class="align-self-center product-image" />
                    </div>
                    <div class="col-md-8">
                      <p class="product-title">{{item.productName}}</p>
                      <p class="mt-0 product-price">{{item.productPrice | currency('Rp') }}</p>
                      <p class="mt-0">Jumlah beli : {{item.productQuantity}}</p>
                      <p >Subtotal : {{ subTotal[index] | currency('Rp') }}</p>


                      <div v-if="!ongkirHolder[index]">
                        <label>Pilih Kurir Pengiriman</label>
                        <select class="form-control" v-model="selectedKurir[index]" @change="onChangeKurir($event)">
                            <option value="jne">JNE</option>
                            <option value="pos">POS</option>d
                            <option value="tiki">TIKI</option>
                        </select>
                        <button @click="getPengiriman(item, index)" v-if="selectedKurir[index]">Pilih ongkos pengiriman</button>
                      </div>
                      <p  >Ongkir : {{ongkirHolder[index] | currency('Rp') }}</p>
                    </div>
                  </div>
              </div>
            </div>
            <div class="col-md-5">
              <div class="price-container mt-4">
                  <h2>Ringkasan belanja</h2> 
                  <hr>
                  <p class="mt-0">Total Harga ({{productCount}} produk) :  <span class="total-price">{{totalPrice | currency('Rp') }}</span></p>
                  <p class="mt-0">Total Ongkos Kirim :  <span class="total-price">{{ totalOngkir | currency('Rp') }}</span></p>
                  <hr>
                    <p class="mt-0">Total Tagihan :  <span class="total-price">{{ totalTagihan | currency('Rp') }}</span></p>
                  <hr>
                  <button type="button" class="btn btn-info" @click="hitungTotal">Hitung total pembayaran</button>
                  <button type="button" class="btn btn-info" >Pilih Pembayaran</button>
              </div>
            </div>
        </div>
      </div>


      <!-- Modal -->
      <div class="modal" tabindex="-1" role="dialog" id="modal-kirim">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

              <LoadingCircle v-if="loadingOngkir" />

              <div v-else v-for="(ongkos,index) in cekOngkos" :key="index">
                <input type="radio" :value="ongkos.cost[0].value" v-model="picked">
                <label >{{ongkos.description}} | <span>{{ongkos.cost[0].etd}} </span> | {{ongkos.cost[0].value | currency('Rp') }} </label>
              </div>
              <p>ceki : {{indexHold}}</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" @click="saveOngkir()">Save changes</button>
            </div>
          </div>
        </div>
      </div>


      <!-- end modal -->

    </div>
    <Login />

    <Footer  />
  </div>
</template>

<script>
import {fb} from '../firebase';
import axios from 'axios'
import LoadingCircle from "@/components/LoadingCircle";
let url = 'https://cors-anywhere.herokuapp.com/https://api.rajaongkir.com'

export default {
  name: "checkout",
  components: {
    LoadingCircle
  },
  data() {
    return {
      totalPrice: null,
      checkUser: null,
      subTotal: [],
      selectedKurir: [],
      cekOngkos: [],
      destination: null,
      picked: null,
      ongkirHolder: [],
      loadingOngkir: false,
      indexHold : null
    }
  },
  methods: {
    getPengiriman(item, index) {
      this.loadingOngkir = true
      this.indexHold = index
      // console.log('modal', item)
      $('#modal-kirim').modal('show')

    let config = {
      headers: {
          "key": "3f102f5b68cc23333365e9df69abf115",
      }
    }
    let data = {
        "origin" : item.origin,
        "destination" : this.destination,
        "weight" : item.weight,
        "courier" : this.selectedKurir[index]
    }

    axios.post( `${url}/starter/cost`, data, config)
        .then((res) => {
            let ongkos = res.data.rajaongkir.results[0].costs
            this.cekOngkos = ongkos
            this.loadingOngkir = false
            
        })
        .catch(err => console.log(err))

    },
    saveOngkir() {
      this.$set(this.ongkirHolder, this.indexHold, this.picked);
      $('#modal-kirim').modal('hide')
      let total = this.subTotal[this.indexHold] + this.ongkirHolder[this.indexHold]
      this.subTotal[this.indexHold] = total
    },
    hitungTotal() {
      let perhitungan = []
      for(let i =0; i< this.subTotal.length; i++ ) {
        let hitungan = this.subTotal[i] + this.ongkirHolder[i]
        console.log('hasil hitung', hitungan)
        perhitungan.push(hitungan)
      }
      console.log('arr', perhitungan)
    },
    onChangeKurir(event) {  
        // console.log('kurir', event.target.value)
    },
    toShop() {
      this.$router.push({path: '/productPage'})
    },
    toPurchase() {
      if (this.checkUser !== null) {
        window.localStorage.setItem('priceHolder' , JSON.stringify(this.totalPrice))
        this.$router.push({path: '/pembayaran'})
      } else {
        $('#login').modal('show')
      }
       
    }
  },
  created() {
    const keranjang = JSON.parse(window.localStorage.getItem('cart'));
    const pengiriman_holder = JSON.parse(window.localStorage.getItem('pengirimanHolder'));
    this.destination = pengiriman_holder.idKota
    this.productCount = keranjang.length
    let sum = []
    if ( keranjang !== null ){
      for (let i = 0; i < keranjang.length; i++) {
        let harga = keranjang[i].productPrice
        let total = keranjang[i].productQuantity
        let totalProduct = harga * total
        this.subTotal.push(totalProduct)
        sum.push(totalProduct) 
        this.ongkirHolder.push(0)
      }
      
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      this.totalPrice = sum.reduce(reducer);
    }
  },
  computed: {
    totalOngkir() {
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      let totalOngkir = this.ongkirHolder.reduce(reducer)
      return totalOngkir
    },
    totalTagihan() {
      let totalTagihan = this.totalOngkir + this.totalPrice
      return totalTagihan
    }
  }
}
</script>

<style scoped lang="scss" src="../styles/Checkout.scss">
