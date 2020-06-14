<template>
  <div class="mini-cart">
    <div class="modal fade" id="miniCart" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header border-bottom-0">
            <h5 class="modal-title ml-2" id="exampleModalLabel">
              <i class="fas fa-shopping-bag mr-3" /> Keranjang Belanja
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="alert alert-success" role="alert" v-if="isTransaksi">
              Jangan ada transaksi tertunda diantara kita! Ayo selesaikan pembayaran kamu terlebih dahulu
            </div>
            <table class="table table-image">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Qty</th>
                  <th scope="col" v-if="!isTransaksi">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in this.$store.state.cart" :key="index">
                  <td class="w-25">
                    <img :src="item.productImage" class="img-fluid img-thumbnail" alt="Sheep">
                  </td>
                  <td>{{item.productName}}</td>
                  <td>{{item.productPrice | currency('Rp') }}</td>
                  <td>{{item.productQuantity}}</td>
                  <td v-if="!isTransaksi">
                    <span @click="$store.commit('removeFromCart', item)" class="btn btn-danger btn-sm">
                      <i class="fa fa-times"></i>
                    </span>
                  </td>
                </tr>
              </tbody>
            </table> 
          </div>
          <div class="modal-footer border-top-0 d-flex justify-content-end">
              <!-- <p v-if="isTransaksi">Jangan ada transaksi tertunda diantara kita!</p> -->
              <button type="button" class="btn btn-success" @click="lanjutPembayaran" v-if="isTransaksi">Lanjutkan Pembayaran</button>
             
              <button type="button" class="btn btn-info" data-dismiss="modal" v-if="!isTransaksi">Lanjutkan Belanja</button>
              <button type="button" class="btn btn-success" @click="checkout" v-if="!isTransaksi">Checkout</button>
          </div>
        </div>
      </div>
    </div>



    
  </div>
</template>

<script>
export default {
  name: "MiniCart",
  data() {
    return {
      isTransaksi: false
    }
  },
  methods: {
    checkout() {
      $('#miniCart').modal('hide')
      this.$router.push('/checkout')
      
    },
    lanjutPembayaran() {
      $('#miniCart').modal('hide')
      this.$router.push('/reviewPembayaran')
    }
  },
  created() {
    let pembayaran_tgl = JSON.parse(window.localStorage.getItem('pembayaranTgl'));
    if(pembayaran_tgl) {
      this.isTransaksi = true
      var tempDate = pembayaran_tgl.datetime_pembayaran
      var nowDate = new Date().toLocaleString()
      if(nowDate >= tempDate) {
        this.isTransaksi = false
        // localStorage.removeItem("cart");
        // localStorage.removeItem("shipmentHolder");
        // localStorage.removeItem("pengirimanHolder");    
        localStorage.removeItem("pembayaranTgl");   
        localStorage.removeItem("order_id")
      }
    } 
  }
};
</script>

<style scoped lang="scss" src="../styles/MiniCart.scss">
