<template>
    <div>
        <Navbar />

        <div class="container">
            
            <div class="pembayaran-wrap" v-if="isLoading !== true">
                <div class="pembayaran-detail container mt-4">
                    <h5>Segera selesaikan pembayaran anda sebelum stok habis.</h5>
                    <p>Transfer pembayaran ke nomor rekening :</p>
                        <div class="row">
                            <div class="col-md-3">
                                <img v-if="shipmentData.bank == 'bca'"  src="../assets/img/bca-logo.png" class="float-left"/>
                                <img v-if="shipmentData.bank == 'mandiri'"  src="../assets/img/mandiri-logo.png" class="float-left"/>
                                <img v-if="shipmentData.bank == 'bni'"  src="../assets/img/bni-logo.png" class="float-left"/>
                                <img v-if="shipmentData.bank == 'cimb'"  src="../assets/img/cimb-logo.png" class="float-left"/>
                                <img v-if="shipmentData.bank == 'bri'"  src="../assets/img/bri-logo.png" class="float-left"/>
                            </div>
                            <div class="col">
                                <h3 v-if="!shipmentData.bank == 'cimb'" class="float-left">7401528266</h3>
                                <h3 v-else class="float-left ml-3">7401528266</h3>
                            </div>
                        </div>
                    <p>a/n Hajj Shop</p>    
                    <hr>
                        <p>Jumlah yang harus dibayar :</p>
                        <p class="price">{{shipmentData.totalTagihan | currency('Rp')}}</p>
                    <hr>
                        <p>Nomer pemesanan anda : </p>    
                        <p class="unique">{{uniqueOrder}}</p>

                    <div class="wording-trf">
                        <p class="text-center">Pastikan pembayaran anda sudah BERHASIL dan unggah bukti pembayaran </p>
                    </div>

                    <input type="file" ref="file" style="display: none" @change="uploadImage">
                    <button v-if="!loading" @click="$refs.file.click()" class="btn btn-outline-success mt-4">Unggah bukti pembayaran</button>
                    <LoadingCircle v-else />
                    <div class="alert alert-danger mt-3 mb-0" role="alert" v-if="isError">
                        Harap unggah bukti pembayaran terlebih dahulu
                    </div>
                    <div class="img-wrapp mt-3" v-for="(image, index) in order.images" :key="index">    
                        <img :src="image" alt="" width="240px" height="240px">
                        <span class="delete-img" @click="deleteImage(image,index)">X</span>
                    </div>
                    <button type="button" class="btn btn-success mt-4"  @click="saveOrder()" >Konfirmasi pembayaran</button>

                </div>
            </div>
            
            <div class="loading-pembayaran" v-else>
                <img src="../assets/working.gif" style="width: 45%"/>
                <h4>Tunggu sebentar, ya..</h4>
                <p>Pembayaranmu lagi diproses</p>
            </div>

        </div>
        
        <Footer class="footer-review" />
    </div>
</template>

<script>
import {fb,db} from '../firebase';
import LoadingCircle from "../components/LoadingCircle";

export default {
    name: "reviewPembayaran",
    components: {
        LoadingCircle
    },
    data() {
        return {
            sentHolderData: null,
            shipmentData: null,
            cartData: [],
            order: {
                images: []
            },
            uniqueOrder: '',
            loading: false,
            isLoading: false,
            isError: false
        }
    },
    methods: {
        formatDate(date) {
            let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            seconds = d.getSeconds(),
            minutes = d.getMinutes(),
            hour = d.getHours();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            if (minutes < 10) minutes = '0' + minutes;
            if (seconds < 10) seconds = '0' + seconds;

            let formatWaktu = [hour, minutes, seconds].join(':');
            let formatTanggal = [day, month, year].join('-');

            return [formatTanggal, formatWaktu].join(', ');
        },
        saveOrder() {

            if (this.order.images.length < 1) {
                this.isError = true
            } else {

                this.isLoading = true;
                let user = fb.auth().currentUser;
                let cart = this.cartData
                const date = new Date()
                let createdDate = this.formatDate(date)

                let dataPembayaran = {
                    order_id: this.uniqueOrder,
                    tgl_pembayaran: createdDate,
                    bukti_bayar: this.order.images,
                    nominal: this.shipmentData.totalTagihan,
                    metode_pembayaran: this.shipmentData.bank,
                    status_bayar: "Belum Verifikasi"
                }

                db.collection("pembayaran").add(dataPembayaran)
                    .then(function(docRef) {
                        console.log("Document written with ID: ", docRef.id);
                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                        this.isLoading = false
                    });

                for(let i = 0; i < cart.length; i++ ) {

                    let penId = this.cartData[i].penjual_id
                    let productData = this.cartData[i]
                    let totalCost = productData.productPrice * productData.productQuantity
                    let kurir = this.shipmentData.kurir[i]
                    let ongkir = this.shipmentData.ongkir[i]
                    let subtotal = this.shipmentData.subtotal[i]

                    let orderData = {
                        "nama": this.sentHolderData.nama,
                        "alamat" : this.sentHolderData.alamat,
                        "noPhone" : this.sentHolderData.noTelp,
                        "provinsi" : this.sentHolderData.provinsi,
                        "kota" : this.sentHolderData.kota,
                        "kodePos" : this.sentHolderData.kodePos,
                        "email" : this.sentHolderData.email,
                        "product" : productData,
                        "user_id" : user.uid,
                        "total_bayar" : this.shipmentData.totalTagihan,
                        "subtotal" : subtotal,
                        "order_id" : this.uniqueOrder,
                        "createdAt" : createdDate,
                        "total_cost" : totalCost,
                        "kurir" : kurir,
                        "ongkir" : ongkir,
                        "no_resi" : "Belum ada",
                        "status_pesanan" : "Disiapkan",
                        "keluhan_order" : ""
                    }

                    db.collection("products").where("penjualID", "==", penId)
                    .get()
                    .then((querySnapshot) => {
                        let totalStok = productData.productQuantity
                        querySnapshot.forEach((doc) => {
                            const productRef = db.collection("products").doc(doc.id);

                                return db.runTransaction(function(transaction) {
                                return transaction.get(productRef).then(function(sfDoc) {
                                    if (!sfDoc.exists) {
                                        throw "Document does not exist!";
                                    }
                                    var newStok = sfDoc.data().stok - totalStok;
                                    transaction.update(productRef, { stok: newStok });
                                });
                            }).then(function() {
                                console.log("Transaction successfully committed!");
                            }).catch((error) => {
                                console.log("Transaction failed: ", error);
                                this.isLoading = false
                            });
                        });
                    })
                    .catch(function(error) {
                        console.log("Error getting documents: ", error);
                    });

                    db.collection("orders").add(orderData)
                        .then(function(docRef) {
                            console.log("Document written with ID: ", docRef.id);
                        })
                        .catch((error) => {
                            console.error("Error adding document: ", error);
                            this.isLoading = false
                        });

                
                if(i == cart.length - 1) {
                    setTimeout(()=> {
                        this.isLoading = false
                        this.$router.push('/checkoutFinish')
                        localStorage.removeItem("cart");
                        localStorage.removeItem("shipmentHolder");
                        localStorage.removeItem("pengirimanHolder");    
                    }, 4000)
                }

                }
            }
        },
        uploadImage(e) {
            this.loading = true
            this.isError = false
            if (e.target.files[0]) {
                let file = e.target.files[0];

                var storageRef = fb.storage().ref('orders/' + file.name);

                let uploadTask = storageRef.put(file);
            
                console.log(e.target.files[0])

                uploadTask.on('state_changed', (snapshot) => {  

                }, (error) => {

                },() => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        this.order.images.push(downloadURL);
                        console.log('File available at', downloadURL);  
                        this.loading=false
                    });
                });
            }
        },
        deleteImage(img,index) {
            let deleteImg = fb.storage().refFromURL(img);

            this.order.images.splice(index,1);
            deleteImg.delete().then(function() {
                console.log("image delete")
            }).catch(function(error) {
                console.log("error delete image")
            })
        },
        generateId(str,num) {
            let uniqueId = ""
            let chars = "ABCDEFGHIJKLMNOPQRSTUVWYXZ"
            
            for( let i=0; i < str; i++ ) {
                uniqueId += chars.charAt(Math.floor(Math.random() * chars.length))
            }

            for (let i=0; i < num; i++) {
                uniqueId+= Math.floor(Math.random() * 10);
            }
			return uniqueId
		}
    
    },
    created() {
        this.shipmentData = JSON.parse(window.localStorage.getItem('shipmentHolder'));
        this.sentHolderData = JSON.parse(window.localStorage.getItem('pengirimanHolder'));
        this.cartData = JSON.parse(window.localStorage.getItem('cart'));
    },
    mounted() {
        this.uniqueOrder = this.generateId(3,5);    
    }
}
</script>

<style scoped lang="scss" src="../styles/ReviewPembayaran.scss">