<template>
  <div class="checkout">
    <Navbar />
    <div class="container">

      <h1 class="checkout-title mt-5">Checkout</h1>

      <div>
        <div class="row">
            <div class="col-md-7">

              <h4>Alamat Pengiriman</h4>
              <p>{{sentHolder.noTelp}}</p>
              <p>{{sentHolder.alamat}}</p>
              <p>{{sentHolder.provinsi}}, {{sentHolder.kota}}, {{sentHolder.kodePos}}</p>

              <div v-for="(item, index) in this.$store.state.cart" :key="index">
                  <div class="row product-detail">
                    <div class="col-md-4">
                      <img :src="item.productImage" width="80px"  class="align-self-center product-image" />
                    </div>
                    <div class="col-md-8">
                      <p class="product-title">{{item.productName}}</p>
                      <p class="mt-0 product-price">{{item.productPrice | currency('Rp') }}</p>
                      <p class="mt-0">Jumlah beli : {{item.productQuantity}} Barang</p>
                        <div class="row">
                          <div class="col-md-8">
                            
                            <select class="form-control" v-model.trim="selectedKurir[index]">
                                <option value="" selected>Pilih Kurir</option>
                                <option value="jne">JNE</option>
                                <option value="pos">POS</option>d
                                <option value="tiki">TIKI</option>
                            </select>
                            <small class="form-text" v-if="$v.selectedKurir.$error">Pilih pengiriman terlebih dahulu</small>
                          </div>
                          <div class="col-md-4">
                            <button @click="getPengiriman(item, index)" class="btn btn-success">Pilih Paket</button>
                          </div>
                        
                      </div>
                      <p class="pt-2"> Ongkor Kirim : {{ongkirHolder[index] | currency('Rp') }}</p>
                    </div>
                  </div>
                <div class="subtotal-container">
                  <p class="float-left title">Subtotal : </p>
                  <p class="float-right price">{{ subTotal[index] | currency('Rp') }}</p>
                </div>  
                
                <hr>
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
                  <button type="button" class="btn btn-info" @click="selectPembayaran">Pilih Pembayaran</button>
              </div>
            </div>
        </div>
      </div>


      <!-- Modal pengiriman-->
      <div class="modal" tabindex="-1" role="dialog" id="modal-kirim">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Paket Pengiriman</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

              <LoadingCircle v-if="loadingOngkir" />
              <label v-else class="container-paket" v-for="(ongkos,index) in cekOngkos" :key="index"> 
                {{ongkos.description}} | <span>{{ongkos.cost[0].etd}} </span> | {{ongkos.cost[0].value | currency('Rp') }}
                <input type="radio" name="radio" :value="ongkos.cost[0].value" v-model="picked">
                <span class="checkmark"></span>
              </label>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="saveOngkir()">Pilih paket</button>
            </div>
          </div>
        </div>
      </div>

      <!-- end modal pengiriman -->

      <!-- modal pembayaran -->
      <div class="modal" tabindex="-1" role="dialog" id="modal-pembayaran">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Pembayaran</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <h4>Metode Pembayaran Transfer Manual</h4>
              <div class="pembayaran-wrap">
                <label class="container-paket"> 
                  <img src="../assets/img/bca-logo.png"/>
                  Bank Central Asia
                  <input type="radio" name="radio" value="bca" v-model="bankSelected">
                  <span class="checkmark mt-2"></span>
                </label>
              </div>
              <div class="pembayaran-wrap">
                <label class="container-paket"> 
                  <img src="../assets/img/mandiri-logo.png"/>
                  Bank Mandiri
                  <input type="radio" name="radio" value="mandiri" v-model="bankSelected">
                  <span class="checkmark mt-2"></span>
                </label>
              </div>
              <div class="pembayaran-wrap">
                <label class="container-paket"> 
                  <img src="../assets/img/bni-logo.png"/>
                  Bank Negara Indonesia
                  <input type="radio" name="radio" value="bni" v-model="bankSelected">
                  <span class="checkmark mt-2"></span>
                </label>
              </div>
              <div class="pembayaran-wrap">
                <label class="container-paket"> 
                  <img src="../assets/img/cimb-logo.png"/>
                  Bank CIMB
                  <input type="radio" name="radio" value="cimb" v-model="bankSelected">
                  <span class="checkmark mt-2"></span>
                </label>
              </div>
              <div class="pembayaran-wrap">
                <label class="container-paket"> 
                  <img src="../assets/img/bri-logo.png"/>
                  Bank Rakyat Indonesia
                  <input type="radio" name="radio" value="bri" v-model="bankSelected">
                  <span class="checkmark mt-2"></span>
                </label>
              </div>
            </div>
            <div class="modal-footer">
              <p >Total Bayar : </p>
              <p class="total-footer">{{totalTagihan | currency('Rp')}}</p>
              <button type="button" class="btn btn-dark"><i class="fa fa-lock mr-2" aria-hidden="true"></i>Bayar</button>
            </div>
          </div>
        </div>
      </div>
      <!-- end modal pembayaran -->




    </div>
    <Login />

    <Footer  />
  </div>
</template>

<script>
import {fb} from '../firebase';
import axios from 'axios'
import LoadingCircle from "@/components/LoadingCircle";
import { required } from 'vuelidate/lib/validators'
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
      indexHold : null,
      bankSelected: null,
      sentHolder: {}
    }
  },
  validations: {
    selectedKurir: {
      $each: {
        required
      }
    }
  },
  methods: {
    getPengiriman(item, index) {
      if(!this.selectedKurir[index]) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Pilih kurir terlebih dahulu!',
        })
      } else {
        this.loadingOngkir = true
        this.indexHold = index
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
      }      

    },
    saveOngkir() {
      this.$set(this.ongkirHolder, this.indexHold, this.picked);
      $('#modal-kirim').modal('hide')
      let total = this.subTotal[this.indexHold] + this.ongkirHolder[this.indexHold]
      this.subTotal[this.indexHold] = total
    },
    selectPembayaran() {
      this.$v.$touch()
      if (this.$v.$invalid && !this.$v.$invalid) {
        console.log('error')
      } else {
        console.log('submit')
        $('#modal-pembayaran').modal('show')
      }
    }
  },
  created() {
    const keranjang = JSON.parse(window.localStorage.getItem('cart'));
    const pengiriman_holder = JSON.parse(window.localStorage.getItem('pengirimanHolder'));
    this.sentHolder = pengiriman_holder
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
        this.selectedKurir.push("")
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

<style scoped lang="scss" src="../styles/CheckoutShipment.scss">
