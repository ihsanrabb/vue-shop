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
                    <div class="table-responsive pt-3" >
                        <table class="table">
                            <thead>
                            <tr>
                                <th>TANGGAL</th>
                                <th>PESANAN</th>
                                <th>ORDER ID</th>
                                <!-- <th>STATUS PESANAN</th>
                                <th>NO RESI</th> -->
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
                                <!-- <td>
                                    {{order.status_pesanan}}
                                </td>
                                <td>
                                    {{order.no_resi}}
                                </td> -->

                                <td>
                                    {{order.total_cost | currency('Rp')}}
                                </td>

                                <td>
                                    <div v-if="order.status_pesanan !== 'Diterima'">
                                        <button type="button" class="btn btn-success" @click="detailPesanan(order)">Detail Pesanan</button>
                                    </div>
                                </td>

                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal" tabindex="-1" role="dialog" id="detail-pesanan">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Detail Pesanan</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body pesanan-detail" v-if="order.id">
                        <LoadingCircle v-if="loadingOrder"/>

                        <div v-else>
                            <p>Status Pesanan : <span>{{order.status_pesanan}}</span></p>
                            <p>Status Pembayaran : <span>{{order.status_pembayaran}}</span></p>
                            <p>Nomer Resi : <span>{{order.no_resi}}</span></p>
                            <p>Pesanan sudah diterima? <button type="button" class="btn btn-success btn-sm" @click="pesananDiterima">Pesanan Diterima</button> </p> 
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>


        <!-- modal selesai -->
        <div class="modal pt-5" tabindex="-1" role="dialog" id="diterima-modal">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">{{titleModal}}</h5>
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
                        <textarea placeholder="Tuliskan keluhanan anda" class="form-control" style="height : 200px" v-model="holderKeluhan"></textarea>
                        <p class="pt-2 float-left" v-if="!loadingImg">
                            Sertakan foto bukti :  
                            <button type="button" class="btn btn-success btn-sm"  :class="{'btn-danger' : imgData}"  @click="$refs.file.click()">Upload Bukti</button> 
                            <br><small class="float-left">*optional</small>
                        </p>
                        <input type="file" ref="file" style="display: none" @change="uploadBukti">
                        
                        <div class="progress mt-2" v-if="loadingImg">
                            <div class="progress-bar progress-bar-striped bg-info progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" :style="{width: uploadValue + '%' }"></div>
                        </div>
                      
                        <img :src="imgData" class="img-fluid" v-if="!loadingImg">
                
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


        <Footer style="margin-top: 4em" />
    </div>
</template>

<script>
import {fb,db} from '../firebase';
import LoadingCircle from "@/components/LoadingCircle";

export default {
    name: "userOrder",
    components: {
        LoadingCircle
    },
    data() {
        return {
            orderList: [],
            formKeluhan: false,
            btnKirim : false,
            order: {
                id: null,
                status_pembayaran: null
            },
            holderKeluhan: null,
            loadingOrder: false,
            titleModal: "",
            uploadValue: 0,
            imgData: null,
            loadingImg: false
        }
    },
    firestore() {
        const user = fb.auth().currentUser;
        return {
            orderList: db.collection('orders').where("user_id", "==", user.uid).orderBy("createdAt", "desc")
        }
    },
    methods: {
        detailPesanan(order) {
            this.order = order
            this.loadingOrder = true
            this.holderKeluhan = null
            this.imgData = null
            $("#detail-pesanan").modal('show')
            db.collection("pembayaran").where("order_id", "==", this.order.order_id)
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.order.status_pembayaran = doc.data().status_bayar
                        this.loadingOrder = false
                    });
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
        },
        pesananDiterima(order) {
            $("#detail-pesanan").modal('hide')
            $("#diterima-modal").modal('show')
            this.titleModal = "Apakah anda yakin pesanan dari toko yang anda pesan sudah diterima?"
        },
        showKeluhan() {
            this.titleModal = "Form Pengembalian"
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

            db.collection("orders").doc(this.order.id).update(data)
                .then(() => {
                    $("#diterima-modal").modal('hide')
                    Swal.fire({
                        icon: 'success',
                        title: 'Terima kasih sudah berbelanja bersama kami!',
                        showConfirmButton: false,
                        timer: 2000
                    })
                })
                .catch((err) => console.log(err))

        },
        keluhanOrder() {
            const data = {
                status_pesanan : "Dikembalikan",
                keluhan_order : {
                    message: this.holderKeluhan,
                    image: this.imgData
                }
            }
           
            db.collection("orders").doc(this.order.id).update(data)
                .then(() => {
                    console.log('new keluhan')
                    $("#diterima-modal").modal('hide')
                    Swal.fire({
                        icon: 'success',
                        title: 'Keluhan anda akan segera ditindak lanjutkan!',
                        showConfirmButton: false,
                        timer: 3000
                    })
                    this.holderKeluhan = null
                    this.imgData = null
                })
                .catch((err) => console.log(err))

        },
        uploadBukti(e) {
            if (e.target.files[0]) {
                this.loadingImg = true
                let file = e.target.files[0];
                var storageRef = fb.storage().ref('keluhan/' + file.name);
                let uploadTask = storageRef.put(file);

                uploadTask.on('state_changed', (snapshot) => {  
                    this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                }, (error) => {
                    console.error(error)
                },() => {
                    this.uploadValue=100;
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        console.log('dah ke aplot', downloadURL);  
                        this.imgData = downloadURL
                        this.loadingImg = false
                    });
                });
            }
        },
        deleteImg() {
            let deleteImg = fb.storage().refFromURL(this.imgData);

            this.imgData = null
            deleteImg.delete().then(function() {
                console.log("image delete")
            }).catch(function(error) {
                console.log("error delete image")
            })
        }
    },
    computed: {
        filterOrder() {
            return this.orderList.filter(order => order.status_pesanan !== 'Diterima')
        }
    }
}
</script>

<style scoped lang="scss" src="../styles/UserOrder.scss">