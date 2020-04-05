<template>
  <div class="login">
   <!-- Modal -->
        <div class="modal fade" id="loginToko" role="dialog" aria-labelledby="loginTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">

                <div class="modal-body">

                        <ul class="nav nav-fill nav-pills mb-3" id="pills-tab" role="tablist">
                            <li class="nav-item" >
                                <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-login-toko" role="tab" aria-controls="pills-login" aria-selected="true">Login</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="pills-register-tab" data-toggle="pill" href="#pills-register-toko" role="tab" aria-controls="pills-register" aria-selected="false">Signup</a>
                            </li>
                        </ul>

                        <div class="tab-content" id="pills-tabContent">
                        <div class="tab-pane fade show active" id="pills-login-toko" role="tabpanel" aria-labelledby="pills-login-tab">
                            
                            <h5 class="text-center">Masuk sebagai penjual</h5>
                            <div class="form-group">
                                <label for="emailToko">Email address</label>
                                <input type="email" v-model="email" class="form-control" id="emailToko" aria-describedby="emailHelp" placeholder="Enter email">
                            </div>
                            <div class="form-group">
                                <label for="passwordToko">Password</label>
                                <input type="password" @keyup.enter="login" v-model="password" class="form-control" id="passwordToko" placeholder="Password">
                            </div>

                             <div class="form-group">
                                <button class="btn btn-success" @click="login()">Login</button>
                            </div>

                        </div>
                        <div class="tab-pane fade" id="pills-register-toko" role="tabpanel" aria-labelledby="pills-register-tab">
                            
                             <h5 class="text-center">Buat akun penjual</h5>
                             
                            <div class="form-group">
                                <label for="nameToko">Your name</label>
                                <input type="text" v-model="name" class="form-control" id="nameToko" placeholder="Your nice name">
                            </div>

                            <div class="form-group">
                                <label for="emailDaftar">Email address</label>
                                <input type="email"  v-model="email" class="form-control" id="emailDaftar" aria-describedby="emailHelp" placeholder="Enter email">
                            </div>
                            <div class="form-group">
                                <label for="passwordDaftar">Password</label>
                                <input type="password" v-model="password" class="form-control" id="passwordDaftar" placeholder="Password">
                            </div>

                            <div class="form-group">
                                <button class="btn btn-success" @click="register">Signup</button>
                            </div>

                        </div>
                        </div>
                </div>
           
            </div>
        </div>
        </div>
  </div>
</template>

<script>
import {fb, db} from '../firebase';
import $ from 'jquery';

export default {
  name: "login",
  data() {
      return {
          name: "",
          email: "",
          password: ""
      }
  },
  methods: {
      login() {
          fb.auth().signInWithEmailAndPassword(this.email, this.password)
            .then(() => {
                 $('#loginToko').modal('hide');
                this.$router.push('/admin/overview').catch(err => {})
            })
            .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            });
      },
      register() {
          fb.auth().createUserWithEmailAndPassword(this.email, this.password)
            .then((user) => {
                $('#loginToko').modal('hide');

                db.collection("profiles").doc(user.user.uid).set({
                    name: this.name
                })
                .then(function() {
                    console.log("Document successfully written!");
                })
                .catch(function(error) {
                    console.error("Error writing document: ", error);
                });
               
            })
            .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            });
            
      }
  }
};
</script>

