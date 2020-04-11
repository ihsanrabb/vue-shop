<template>
  <div class="products">
    <div class="container pt-3">
        <div class="intro">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-6">
                     <h3>Order page</h3>
                     <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum repellat, exercitationem odio blanditiis dolorum omnis! Nobis perspiciatis possimus laudantium ut, saepe illum quos, consequatur, ipsa facere error voluptatibus recusandae aliquam?</p>
                </div>
                <div class="col-md-6">
                    <img src="../assets/svg/orders.svg" alt="" class="img-fluid">
                </div>  
            </div>
        </div>

        <hr>

        <h3 class="d-inline-block">Order List</h3>
          

        <div class="product-test">
      
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Order ID</th>
                 <th>Status Pesanan</th>
                <th>Modify</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(order, index)  in orders">
                <td>
                  {{order.product.productName}}
                </td>

                <td>
                  {{order.order_id}}
                </td>

                <!-- status order condition -->
                <td v-if="order.status_pesanan == 'Dikembalikan'" class="text-danger font-weight-bold">
                  {{order.status_pesanan}}
                </td>

                <td v-else>
                  {{order.status_pesanan}}
                </td>
                 <!-- end status order condition -->

                <td>
                  <button @click="detailOrder(order)" class="btn btn-primary">Detail</button>
                </td>

              </tr>
            </tbody>
          </table>
        </div>

       
       </div>
    </div>

    <div v-if="order.no_resi !== null">
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
              <div class="modal-body detail-order">
                <p>Nama Product : <span>{{order.product.productName}}</span></p>
                <p>Jumlah yang dibeli : <span>{{order.product.productQuantity}}</span></p>
                <p>Nama pembeli : <span>{{order.nama}}</span></p>
                <p>Nomer telepon : <span>{{order.noPhone}}</span></p>
                <p>Email : <span>{{order.email}}</span></p>
                <p>Alamat : <span>{{order.alamat}}</span></p>
                <p>Kode Pos : <span>{{order.kodePos}}</span></p>
                <p>Tanggal Pembelian : <span>{{order.createdAt}}</span></p>

               
                <div v-if="order.status_pesanan == 'Dikembalikan'" class="mt-4">
                  <p>Alasan pengembalian : </p>
                  <div class="keluhan-box">     
                    <p>{{order.keluhan_order}}</p>
                  </div>
                </div>

                 <div class="form-group mt-5">
                 <p>NO RESI</p>
                  <input type="email" class="form-control" id="no_resi" v-model="order.no_resi" >
                </div>

                <p>STATUS PESANAN</p>
                <select class="form-control" v-model="order.status_pesanan">
                  <option selected>--Status Pesanan--</option>
                  <option>Disiapkan</option>
                  <option>Dikirim</option>
                </select>

              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button 
                  type="button" 
                  class="btn btn-primary"
                  @click="updateOrder()"  
                >Apply changes</button>
              </div>
            </div>
          </div>
        </div>
      <!-- end modal -->
    </div>

  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
import {fb,db} from '../firebase';

export default {
  name: "orders",
  components: {
    VueEditor
  },
  data() {
    return {
      product: {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: []
      },
      products: [],
      activeItem: null,
      modal: null,
      tag: null,
      orders: [],
      hasilProduct: [],
      order: {
        no_resi : null
      }
    }
  },
  firestore() {
    const user = fb.auth().currentUser;
    console.log('firestore', user.uid)
    return {
        orders: db.collection('orders').where("product.penjual_id", "==", user.uid),
        orderan : db.collection('orders')
    }
  },
  methods: {
    detailOrder(order) {
      $('#detailOrder').modal('show');
      this.order = order
    },
    updateOrder() {
      const data = {
        no_resi : this.order.no_resi,
        status_pesanan : this.order.status_pesanan
      }

      this.$firestore.orderan.doc(this.order.id).update(data)
        .then(()=> {
          $('#detailOrder').modal('hide');
          Toast.fire({
            icon: 'success',
            title: 'No resi berhasil di update'
          })
        })
        .catch((err)=> console.log(err));

    },
      
  },
 computed: {
   classObject() {
     console.log('test color')
     return {
       'text-danger' : 'text-danger'
     }
   }
 }
  
};
</script>

<style scoped lang="scss" src="../styles/OrderAdmin.scss">