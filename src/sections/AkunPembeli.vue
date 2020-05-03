<template>
    <div class="container">
        <div class="intro">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-6">
                        <h3>Akun Pembeli</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum repellat, exercitationem odio blanditiis dolorum omnis! Nobis perspiciatis possimus laudantium ut, saepe illum quos, consequatur, ipsa facere error voluptatibus recusandae aliquam?</p>
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
                <tr v-for="(pembeli, index) in pembelis" :key="index">
                    <td>
                        {{pembeli.name}}
                    </td>

                    <td>
                        {{pembeli.phone}}
                    </td>

                    <td>
                        {{pembeli.address}}
                    </td>

                    <td>
                    <button class="btn btn-primary" @click="detailPembeli(pembeli)">Detail</button>
                    </td>

                </tr>
                </tbody>
            </table>
        </div>

        <!-- modal akun penjual -->
        <div class="modal" tabindex="-1" role="dialog" id="akun-pembeli">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Detail Akun Pembeli</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body" v-if="pembeliDetail">
                    <div class="form-group">
                        <input type="email" class="form-control" v-model="pembeliDetail.id" readonly>
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="pembeliDetail.name">
                    </div>
                    <div class="form-group">
                        <input type="email" class="form-control" v-model="pembeliDetail.email">
                    </div>
                    <div class="form-group">
                        <input type="number" class="form-control" v-model="pembeliDetail.phone" placeholder="Nomer Telepon">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="pembeliDetail.address" placeholder="Alamat">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" v-model="pembeliDetail.postcode" placeholder="Kode pos">
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <input type="text" class="form-control" v-model="pembeliDetail.status" readonly>
                        </div>
                        <div class="col-md-3">
                            <button type="button" class="btn btn-danger" @click="nonaktifPembeli">Non Aktif</button>
                        </div>
                        <div class="col-md-3">
                            <button type="button" class="btn btn-success" @click="aktifPembeli">Aktif</button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="updatePembeli">Simpan</button>
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
    name: "akunPembeli",
    data() {
        return {
            pembelis : [],
            pembeliDetail: null
        }
    },
    firestore() {
        return {
            pembelis : db.collection('profiles').where("userType", "==", "pembeli"),
            pembeliData : db.collection('profiles')
        }
    },
    methods: {
        detailPembeli(pembeli) {
            this.pembeliDetail = pembeli
            $("#akun-pembeli").modal("show")
        },
        updatePembeli() {
            this.$firestore.pembeliData.doc(this.pembeliDetail.id).update(this.pembeliDetail)
                .then(() => {
                    $("#akun-pembeli").modal("hide")
                    Toast.fire({
                        icon: 'success',
                        title: 'update successfully'
                    })
                })
                .catch((err) => console.log(err))
        },
        nonaktifPembeli() {
            this.$firestore.pembeliData.doc(this.pembeliDetail.id).update({
                    status: "non_aktif"
                })
                .then(() => {
                    $("#akun-pembeli").modal("hide")
                    Toast.fire({
                        icon: 'success',
                        title: 'update successfully'
                    })
                })
                .catch((err) => console.log(err))
        },
        aktifPembeli() {
            this.$firestore.pembeliData.doc(this.pembeliDetail.id).update({
                    status: "aktif"
                })
                .then(() => {
                    $("#akun-pembeli").modal("hide")
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