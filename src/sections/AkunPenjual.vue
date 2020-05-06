<template>
    <div class="container">
        <div class="intro">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-6">
                        <h3>Kelola Akun Penjual</h3>
                        <p>Kelola akun penjual yang berada di website Hajj Shop. Kamu bisa melihat detail dan juga mengubah data profile akun jika diperlukan. Jika kamu mendapat laporan bahwa akun tersebut kamu bisa menonaktifkan akun tersebut!</p>
                </div>
                <div class="col-md-6">
                    <img src="../assets/svg/orders.svg" alt="" class="img-fluid">
                </div>  
            </div>
        </div>

        <div class="table-responsive">
            <table class="table">
                <thead>
                <tr>
                    <th>Nama</th>
                    <th>No.Telephone</th>
                    <th>Alamat</th>
                    <th>Modify</th>
                </tr>
                </thead>

                <tbody>
                <tr v-for="(penjual, index) in penjuals" :key="index">
                    <td>
                        {{penjual.name}}
                    </td>

                    <td>
                        {{penjual.phone}}
                    </td>

                    <td>
                        {{penjual.address}}
                    </td>

                    <td>
                    <button class="btn btn-primary" @click="detailPenjual(penjual)">Detail</button>
                    </td>

                </tr>
                </tbody>
            </table>
        </div>
    
        <!-- modal akun penjual -->
        <div class="modal" tabindex="-1" role="dialog" id="akun-penjual">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Detail Akun Penjual</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" v-if="penjualDetail">
                    <div class="form-group">
                        <input type="email" class="form-control" v-model="penjualDetail.id" readonly>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="penjualDetail.name">
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" v-model="penjualDetail.email">
                    </div>
                    <div class="form-group">
                        <input type="number" class="form-control" v-model="penjualDetail.phone" placeholder="Nomer Telepon">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="penjualDetail.address" placeholder="Alamat">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="penjualDetail.postcode" placeholder="Kode pos">
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <input type="text" class="form-control" v-model="penjualDetail.status" readonly>
                        </div>
                        <div class="col-md-3">
                            <button type="button" class="btn btn-danger" @click="nonaktifPenjual">Non Aktif</button>
                        </div>
                        <div class="col-md-3">
                            <button type="button" class="btn btn-success" @click="aktifPenjual">Aktif</button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="updatePenjual">Simpan</button>
                </div>
                </div>
            </div>
        </div>
        <!-- end modal akun penjual -->

    </div>
</template>

<script>
import { fb, db } from "../firebase";

export default {
    name: "akunPenjual",
    data() {
        return {
            penjuals: [],
            penjualDetail: null
        }
    },
    firestore() {
        return {
            penjuals : db.collection('profiles').where("userType", "==", "penjual"),
            penjualData: db.collection('profiles')
        }
    },
    methods: {
        detailPenjual(penjual) {
            this.penjualDetail = penjual
            $("#akun-penjual").modal("show")
        },
        updatePenjual() {
            this.$firestore.penjualData.doc(this.penjualDetail.id).update(this.penjualDetail)
                .then(() => {
                    $("#akun-penjual").modal("hide")
                    Toast.fire({
                        icon: 'success',
                        title: 'update successfully'
                    })
                })
                .catch((err) => console.log(err))
        },
        aktifPenjual() {
            this.$firestore.penjualData.doc(this.penjualDetail.id).update({
                    status: "aktif"
                })
                .then(() => {
                    $("#akun-penjual").modal("hide")
                    Toast.fire({
                        icon: 'success',
                        title: 'update successfully'
                    })
                })
                .catch((err) => console.log(err))
        },
        nonaktifPenjual() {
            this.$firestore.penjualData.doc(this.penjualDetail.id).update({
                    status: "non_aktif"
                })
                .then(() => {
                    $("#akun-penjual").modal("hide")
                    Toast.fire({
                        icon: 'success',
                        title: 'update successfully'
                    })
                })
                .catch((err) => console.log(err))
        }
    }
}
</script>