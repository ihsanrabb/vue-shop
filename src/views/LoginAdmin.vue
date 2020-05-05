<template>
    <div class="container">

        <div class="login-admin">
            <h1>Login admin</h1>
            <p class="subtitle text-center">
                Hajj Shop
            </p>
            <div v-if="errorMsg" class="alert alert-danger" role="alert">
                {{errorMsg}}
            </div>
            <div class="form-group">
                <input type="email" class="form-control" placeholder="Email Address" v-model="email">
            </div>
            <div class="form-group">
                <input type="password" class="form-control" placeholder="Password" v-model="password" @keyup.enter="loginAdmin">
            </div>
            <button type="submit" :disabled="isLoading" class="btn-login" @click="loginAdmin">{{btnText}}</button>
        </div>

    </div>
</template>

<script>
import { fb, db } from "../firebase";

export default {
    name: "loginAdmin",
    data() {
        return {
            email: "",
            password: "",
            btnText: "Login",
            isLoading: false,
            errorMsg : ""
        }
    },
    methods: {
        loginAdmin() {
            this.btnText = "Loading..."
            this.isLoading = true
            fb.auth().signInWithEmailAndPassword(this.email, this.password)
            .then((res) => {
                this.btnText = "Login"
                this.isLoading = false
                if (res.user.uid == 'KzW5BVel1oaG14WOJKO3zSCwwgF3') {
                    this.$router.push('/adminPage/informasi')
                } else {
                    this.errorMsg = "Hanya Admin yang bisa Login!"
                }
            })
            .catch((error) => {
                this.btnText = "Login"
                this.isLoading = false
                this.errorMsg = "Pastikan email dan password yang anda masukkan sudah benar"
            });
        }
    }
}
</script>

<style scoped lang="scss" src="../styles/LoginAdmin.scss" />