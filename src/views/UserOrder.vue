<template>
    <div>
        <Navbar />
        
        <div v-if="filterOrder.length == 0">
            <img src="../assets/svg/empty-cart.svg"  class="w-25 pt-5"/>
            <h5 class="pt-3">Kamu belum ada belanja nih... Yuk, belanja dulu!</h5>
        </div>

        <div v-else>
            <h1 class="pt-4">Daftar pesanan</h1>
            
            <div class="container">
                <div class="container-fluid">
                    <div class="table-responsive" >
                        <table class="table">
                            <thead>
                            <tr>
                                <th>TANGGAL</th>
                                <th>PESANAN</th>
                                <th>NO PESANAN</th>
                                <th>STATUS PESANAN</th>
                                <th>NO RESI</th>
                                <th>TOTAL</th>
                            </tr>
                            </thead>

                            <tbody>
                            <tr v-for="(order, index) in filterOrder" :key="index">
                                <td>
                                    {{order.createdAt}}
                                </td>
                                <td>
                                    {{order.product.productName}}
                                </td>
                                <td>
                                    {{order.order_id}}
                                </td>
                                <td>
                                    {{order.status_pesanan}}
                                </td>
                                <td>
                                    {{order.no_resi}}
                                </td>

                                <td>
                                    {{order.total_cost | currency('Rp')}}
                                </td>

                                <td>
                                    <div v-if="order.status_pesanan !== 'Diterima'">
                                        <button type="button" class="btn btn-success" @click="pesananDiterima(order)">Diterima</button>
                                    </div>
                                </td>

                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

        <!-- modal selesai -->
        <div class="modal pt-5" tabindex="-1" role="dialog" id="diterima-modal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Apakah anda yakin pesanan dari toko yang anda pesan sudah diterima?</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="modalTutup">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div v-if="!formKeluhan">
                        <p>Lakukan konfirmasi ini hanya jika pesanan yang anda pesan sudah benar-benar diterima dengan baik dan lengkap.</p>

                        <p>Jika pesanan yang anda terima bermasalah atau tidak sesuai silahkan pilih tidak</p>
                    </div>                    

                    <div v-if="formKeluhan">
                        <label>Masukkan keluhan anda</label>
                        <textarea placeholder="Keluhan" class="form-control" style="height : 200px" v-model="order.keluhan_order"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    
                    <button 
                        type="button" 
                        class="btn btn-secondary" 
                        @click="showKeluhan" 
                        v-if="!btnKirim">
                        TIDAK
                    </button>
                    <button 
                        type="button" 
                        class="btn btn-success" 
                        v-if="!btnKirim"
                        @click="finishPesanan">
                        YA
                    </button>
                    <button 
                        type="button" 
                        class="btn btn-primary" 
                        v-if="btnKirim"
                        @click="keluhanOrder">
                        KIRIM
                    </button>
                </div>
                </div>
            </div>
        </div>
        <!-- end modal selesai -->


        <Footer style="position: fixed; bottom: 0" />
    </div>
</template>

<script>
import {fb,db} from '../firebase';

export default {
    name: "userOrder",
    data() {
        return {
            orderList: [],
            formKeluhan: false,
            btnKirim : false,
            order: null
        }
    },
    firestore() {
        const user = fb.auth().currentUser;
        return {
            orderList: db.collection('orders').where("user_id", "==", user.uid).orderBy('createdAt'),
            orderan : db.collection('orders')
        }
    },
    methods: {
        pesananDiterima(order) {
            this.order = order
            $("#diterima-modal").modal('show')
        },
        showKeluhan() {
            this.formKeluhan = true
            this.btnKirim = true
        },
        modalTutup() {
            this.formKeluhan = false
            this.btnKirim = false
        },
        finishPesanan() {
            const data = {
                status_pesanan : "Diterima"
            }
            this.$firestore.orderan.doc(this.order.id).update(data)
            .then(()=> {
                $("#diterima-modal").modal('hide')
                Swal.fire({
                    icon: 'success',
                    title: 'Terima kasih sudah berbelanja bersama kami!',
                    showConfirmButton: false,
                    timer: 2000
                })
            })
            .catch((err)=> console.log(err));
        },
        keluhanOrder() {
            const data = {
                status_pesanan : "Dikembalikan",
                keluhan_order : this.order.keluhan_order
            }
             this.$firestore.orderan.doc(this.order.id).update(data)
             .then(()=> {
                $("#diterima-modal").modal('hide')
                Swal.fire({
                    icon: 'success',
                    title: 'Keluhan anda akan segera ditindak lanjutkan!',
                    showConfirmButton: false,
                    timer: 3000
                })
            })
            .catch((err)=> console.log(err));
        }
    },
    computed: {
        filterOrder() {
            return this.orderList.filter(order => order.status_pesanan !== 'Diterima')
        }
    }
}
</script>