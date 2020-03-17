<template>
    <div>
        <Navbar />

        <h1>Dikirim kepada</h1>
        <p>nama : {{sentHolderData.nama}}</p>
        <p>alamat pengiriman : {{sentHolderData.alamat}}</p>
        <p>no. hp : {{sentHolderData.noTelp}}</p>

        <h3>Konfirmasi pembayaran</h3>
        <div class="form-group">
            <label for="product_image">struk bayar</label>
            <input type="file" @change="uploadImage" class="form-control">
        </div>
        <div class="form-group">
            <div class="p-1 d-flex">
                <div class="img-wrapp" v-for="(image, index) in order.images">
                    <img :src="image" alt="" width="480px">
                    <span class="delete-img" @click="deleteImage(image,index)">X</span>
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
</template>

<script>
import {fb,db} from '../firebase';

export default {
    data() {
        return {
            sentHolderData: null,
            cartData: [],
            totalPrice: null,
            order: {
                images: []
            }
        }
    },
    methods: {
        saveOrder() {
            let user = fb.auth().currentUser;
            // console.log('holder' ,this.sentHolderData.nama)
            // let orderData = {
            //     "nama": this.sentHolderData.nama,
            //     "alamat" : this.sentHolderData.alamat,
            //     "noPhone" : this.sentHolderData.noTelp,
            //     "kodePos" : this.sentHolderData.kodePos,
            //     "product" : this.cartData,
            //     "user_id" : user.uid,
            //     "total bayar" : this.totalPrice,
            //     "bukti_bayar" : this.order.images 
            // }

            // db.collection("orders").add(orderData)
            // .then(function(docRef) {
            //     console.log("Document written with ID: ", docRef.id);
            // })
            // .catch(function(error) {
            //     console.error("Error adding document: ", error);
            // });
            console.log('after adding', this.cartData.length)
            let cart = this.cartData
            for(let i = 0; i < cart.length; i++ ) {




                let productData = this.cartData[i]
                

                let orderData = {
                    "nama": this.sentHolderData.nama,
                    "alamat" : this.sentHolderData.alamat,
                    "noPhone" : this.sentHolderData.noTelp,
                    "kodePos" : this.sentHolderData.kodePos,
                    "product" : productData,
                    "user_id" : user.uid,
                    "total bayar" : this.totalPrice,
                    "bukti_bayar" : this.order.images 
                }

                
                
                
                db.collection("orders").add(orderData)
                .then(function(docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            }

        },
        uploadImage(e) {
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
        }
    
    },
    mounted() {
        this.sentHolderData = JSON.parse(window.localStorage.getItem('pengirimanHolder'));
        this.cartData = JSON.parse(window.localStorage.getItem('cart'));
        this.totalPrice = JSON.parse(window.localStorage.getItem('priceHolder'));
        
    }
}
</script>