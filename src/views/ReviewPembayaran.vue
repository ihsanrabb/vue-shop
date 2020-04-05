<template>
    <div>
        <Navbar />

        <div class="container" v-if="isLoading !== true">
            <div class="pesanan mt-5" v-if="sentHolderData !== null">
                <h5>PESANAN AKAN DIKIRIM KE</h5>
                <p><span>Nama</span> : {{sentHolderData.nama}}</p>
                <p><span>Pengiriman</span> : {{sentHolderData.alamat}}</p>
                <p><span>No.HP</span> : {{sentHolderData.noTelp}}</p>
                <p><span>Total Pembayaran</span> : {{totalPrice | currency('Rp')}}</p>
                <p><span>NOMER ORDER ANDA</span> : {{uniqueOrder}}</p>
            </div>
            
            <div class="bukti-bayar mt-4">
                <h5>BUKTI PEMBAYARAN</h5>
                <div class="input-group mb-3">
                    <div class="custom-file">
                        <label class="custom-file-label" for="inputGroupFile01">Choose file</label>
                        <input type="file" class="custom-file-input" id="inputGroupFile01" @change="uploadImage">
                    </div>
                </div>

                <!-- <div class="">
                    <label for="product_image">Upload</label>
                    <input type="file" @change="uploadImage" class="form-control">
                </div> -->
                <div class="form-group">
                    <div class="p-1 d-flex">
                        <div v-if="loading" class="lds-ring"><div></div><div></div><div></div><div></div></div>

                        <div class="img-wrapp" v-for="(image, index) in order.images" :key="index">    
                            <img :src="image" alt="" width="340px" >
                            <span class="delete-img" @click="deleteImage(image,index)">X</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <button 
                    @click="saveOrder()" 
                    type="button" 
                    class="btn btn-primary"
                    >
                    Konfirmasi</button>
        </div>
        
        <div v-else>
            <img src="../assets/working.gif" style="width: 25%"/>
            <p>Sedang menyimpan data</p>
        </div>
        
    </div>
</template>

<script>
import {fb,db} from '../firebase';

export default {
    name: "reviewPembayaran",
    data() {
        return {
            sentHolderData: null,
            cartData: [],
            totalPrice: null,
            order: {
                images: []
            },
            uniqueOrder: '',
            loading: false,
            isLoading: false
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
            this.isLoading = true;
            let user = fb.auth().currentUser;
            let cart = this.cartData
            const date = new Date()
            let createdDate = this.formatDate(date)

            for(let i = 0; i < cart.length; i++ ) {

                let productData = this.cartData[i]
                let totalCost = productData.productPrice * productData.productQuantity

                let orderData = {
                    "nama": this.sentHolderData.nama,
                    "alamat" : this.sentHolderData.alamat,
                    "noPhone" : this.sentHolderData.noTelp,
                    "kodePos" : this.sentHolderData.kodePos,
                    "email" : this.sentHolderData.email,
                    "product" : productData,
                    "user_id" : user.uid,
                    "total_bayar" : this.totalPrice,
                    "bukti_bayar" : this.order.images,
                    "order_id" : this.uniqueOrder,
                    "createdAt" : createdDate,
                    "total_cost" : totalCost,
                    "no_resi" : "Belum ada",
                    "status_pesanan" : "Disiapkan",
                    "keluhan_order" : ""
                }

                 let penId = this.cartData[i].penjual_id

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
                        localStorage.removeItem("priceHolder");
                        localStorage.removeItem("pengirimanHolder");    
                    }, 4000)
                }

                }
        },
        uploadImage(e) {
            this.loading = true
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
    mounted() {
        this.sentHolderData = JSON.parse(window.localStorage.getItem('pengirimanHolder'));
        this.cartData = JSON.parse(window.localStorage.getItem('cart'));
        this.totalPrice = JSON.parse(window.localStorage.getItem('priceHolder'));
        this.uniqueOrder = this.generateId(3,5)
     
        
    }
}
</script>

<style scoped lang="scss" src="../styles/ReviewPembayaran.scss">