<template>
  <div class="products">
    <div class="container pt-3">
        <div class="intro">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-6">
                     <h3>History Pemesanan</h3>
                     <p>Lihat pesanan yang sudah selesai pada page ini</p>
                </div>
                <div class="col-md-6">
                    <img src="../assets/img/history-order.jpg" alt="" class="img-fluid">
                </div>  
            </div>
        </div>

        <hr>

        <div v-if="orders.length == 0">
          <h2>Kamu belum ada pemesanan</h2>
        </div>

        <!-- condition rendering -->
        <div v-else> 
          <div class="d-flex bd-highlight">
            <div class="p-2 flex-grow-1 bd-highlight">
              <h3 style="text-align:left">History Pesanan</h3>
            </div>
            <div class="p-2 bd-highlight">
              <input class="form-control " type="text" v-model="search" placeholder="Track Order Id disini" />
            </div>
          </div>
      
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Nama Produk</th>
                  <th>Order ID</th>
                  <th>Status Pesanan</th>
                  <th>Modify</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(order, index)  in filterOrder" :key="index">
                  <td>
                    {{order.product.productName}}
                  </td>

                  <td>
                    {{order.order_id}}
                  </td>

                  <td class="text-success">
                    {{order.status_pesanan}}
                  </td>

                  <td>
                    <button @click="detailOrder(order)" class="btn btn-primary">Detail</button>
                  </td>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- end condition rendering -->
    </div>

    <div>
    <!-- Modal detail -->
        <div class="modal" id="detailOrder" tabindex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title text-center">Detail pesanan</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body detail-order" v-if="order.id">
                <LoadingCircle v-if="loadingOrder"/>

                <div v-else>
                  <p>Nama Product : <span>{{order.product.productName}}</span></p>
                  <p>Jumlah Pembelian : <span>{{order.product.productQuantity}}</span></p>
                  <p>Nama pembeli : <span>{{order.nama}}</span></p>
                  <p>Nomer telepon : <span>{{order.noPhone}}</span></p>
                  <p>Email : <span>{{order.email}}</span></p>
                  <p>Alamat : <span>{{order.alamat}}</span></p>
                  <p>Kode Pos : <span>{{order.kodePos}}</span></p>
                  <p>Ongkos Kirim : <span>{{ order.ongkir | currency('Rp') }}</span></p>
                  <p>Harga Pembelian : <span>{{ order.subtotal | currency('Rp') }}</span></p>
                  <p>Tanggal Pembelian : <span>{{order.createdAt}}</span></p>
                  <p>Status Pembayaran : <span>{{order.status_pembayaran}}</span></p>
                
                  <div v-if="order.status_pesanan == 'Dikembalikan'" class="mt-4">
                    <p>Alasan pengembalian : </p>
                    <div class="keluhan-box">     
                      <p>{{order.keluhan_order.message}}</p>
                    </div>
                    <div class="mx-auto mt-2" style="width: 92%">
                      <v-zoomer style="width: 100%;">
                        <img
                          :src="order.keluhan_order.image"
                          style="object-fit: contain;"
                          class="img-fluid"
                        >
                      </v-zoomer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <!-- end modal -->
    </div>

  </div>
</template>

<script>
import {fb,db} from '../firebase';
import LoadingCircle from "@/components/LoadingCircle";

export default {
  name: "orders",
  components: {
    LoadingCircle
  },
  data() {
    return {
      search: '',
      orders: [],
      order: {
        id: null,
        status_pembayaran: null
      },
      loadingOrder: false
    }
  },
  firestore() {
    const user = fb.auth().currentUser;
    return {
        orders: db.collection('orders').where("product.penjual_id", "==", user.uid).orderBy("createdAt", "desc")
    }
  },
  methods: {
    detailOrder(order) {
      $('#detailOrder').modal('show');
      this.order = order
      this.loadingOrder = true
      db.collection("pembayaran").where("order_id", "==", this.order.order_id)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                this.order.status_pembayaran = doc.data().status_bayar
                this.loadingOrder = false
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }
  },
  computed: {
    filterOrder() {
      if(this.search) {
        return this.orders.filter((order) => {
          return order.order_id.toLowerCase().match(this.search.toLowerCase())
        })
      } else {
        return this.orders.filter(order => order.status_pesanan == 'Diterima')
      }
    }
  }
};
</script>

<style scoped lang="scss" src="../styles/OrderPenjual.scss">