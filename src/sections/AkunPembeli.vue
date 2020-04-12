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
                <tr v-for="(pembeli, index) in paraPembeli" :key="index">
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
                    <button class="btn btn-primary" >Edit</button>
                    </td>

                </tr>
                </tbody>
            </table>
        </div>
    
    </div>
</template>

<script>
import { fb, db } from "../firebase";

export default {
    name: "akunPembeli",
    data() {
        return {
            paraPembeli : []
        }
    },
    firestore() {
        return {
            paraPembeli : db.collection('profiles').where("userType", "==", "pembeli")
        }
    }
}
</script>