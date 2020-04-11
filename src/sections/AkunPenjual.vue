<template>
    <div class="container">
        <div class="intro">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-6">
                        <h3>Akun Penjual</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum repellat, exercitationem odio blanditiis dolorum omnis! Nobis perspiciatis possimus laudantium ut, saepe illum quos, consequatur, ipsa facere error voluptatibus recusandae aliquam?</p>
                </div>
                <div class="col-md-6">
                    <img src="../assets/svg/orders.svg" alt="" class="img-fluid">
                </div>  
            </div>
        </div>
    
    </div>
</template>

<script>
import { fb, db } from "../firebase";

export default {
    name: "akunPenjual",
    data() {
        return {
            penjual: []
        }
    },
    firestore() {
        return {
            penjual : db.collection('profiles').where("userType", "==", "penjual")
        }
    }
}
</script>