<template>
    <div>
        <Navbar />

        <h1>daftar pesanan</h1>
        
        <div class="container">
            <div class="container-fluid">
                <div class="table-responsive">
                <table class="table">
                    <thead>
                    <tr>
                        <th>TANGGAL</th>
                        <th>PESANAN</th>
                        <th>NO PESANAN</th>
                        <th>NO RESI</th>
                        <th>TOTAL</th>
                    </tr>
                    </thead>

                    <tbody>
                    <tr v-for="order in orderList">
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
                            {{order.no_resi}}
                        </td>

                        <td>
                            {{order.total_cost | currency('Rp')}}
                        </td>

                        <td>
                            <div v-if="order.no_resi !== 'Belum ada'">
                                <button type="button" class="btn btn-success" @click="pesananDiterima">Diterima</button>
                            </div>
                        </td>

                    </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>

        <!-- modal selesai -->
        <div class="modal" tabindex="-1" role="dialog" id="diterima-modal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Apakah anda yakin pesanan dari toko yang anda pesan sudah diterima?</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
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
                        <textarea placeholder="Keluhan" class="form-control" style="height : 200px"></textarea>
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
                        v-if="!btnKirim">
                        YA
                    </button>
                    <button 
                        type="button" 
                        class="btn btn-primary" 
                        v-if="btnKirim">
                        KIRIM
                    </button>
                </div>
                </div>
            </div>
        </div>
        <!-- end modal selesai -->

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
            btnKirim : false
        }
    },
    firestore() {
        const user = fb.auth().currentUser;
        return {
            orderList: db.collection('orders').where("user_id", "==", user.uid).orderBy('createdAt')
        }
    },
    methods: {
        pesananDiterima() {
            $("#diterima-modal").modal('show')
        },
        showKeluhan() {
            this.formKeluhan = true
            this.btnKirim = true
        }
    },
    mounted() {
        let cekResi = this.orderList.no_resi;
        if (!cekResi) {
            // console.log('ada res')
            cekResi = 'Belum ada'
        }
    }
}
</script>