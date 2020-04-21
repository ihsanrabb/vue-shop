<template>
    <div class="container">

        <div class="login-admin">
            <h1>Login admin</h1>
            <p class="subtitle text-center">
                Hajj Shop
            </p>
            <div v-if="error" class="alert alert-danger" role="alert">
                Hanya Admin yang bisa Login!
            </div>
            <div class="form-group">
                <input type="email" class="form-control" placeholder="Email Address" v-model="email">
            </div>
            <div class="form-group">
                <input type="password" class="form-control" placeholder="Password" v-model="password">
            </div>
            <button type="submit" class="btn-login" @click="loginAdmin">Login</button>
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
            error: false
        }
    },
    methods: {
        loginAdmin() {
            fb.auth().signInWithEmailAndPassword(this.email, this.password)
            .then((res) => {
                if (res.user.uid == 'KzW5BVel1oaG14WOJKO3zSCwwgF3') {
                    this.$router.push('/adminPage')
                } else {
                    this.error = true
                }
            })
            .catch(function(error) {
                console.log(error)
            });
        }
    }
}
</script>

<style scoped lang="scss" src="../styles/LoginAdmin.scss" />