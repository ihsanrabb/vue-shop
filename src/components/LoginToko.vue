<template>
  <div class="login container">
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

                                <label>Password</label>
                                <div class="input-group flex-nowrap">
                                    <input :type="fieldType" class="form-control" placeholder="Password" @keyup.enter="login" v-model="password">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" @click="visiblyPassword" style="cursor: pointer">
                                            <i :class="{'fas fa-eye' : fieldType == 'text', 'fa fa-eye-slash' : fieldType == 'password'}"></i>
                                        </span>
                                    </div>
                                </div>
                                
                                <button class="btn btn-success mt-3" :disabled="isLoading" @click="login()">{{btnText}}</button>
                                
                            </div>
                            <div class="tab-pane fade" id="pills-register-toko" role="tabpanel" aria-labelledby="pills-register-tab">
                                
                                <h5 class="text-center">Buat akun penjual</h5>
                                
                                <div class="form-group">
                                    <label for="nameToko">Your name</label>
                                    <input 
                                        type="text" 
                                        v-model="$v.name.$model" 
                                        :class="{invalid: $v.name.$error}"
                                        class="form-control" 
                                        id="nameToko" 
                                        placeholder="Masukkan nama">
                                </div>

                                <div class="form-group">
                                    <label for="emailDaftar">Email address</label>
                                    <input 
                                        type="email"  
                                        v-model="$v.email.$model" 
                                        class="form-control" 
                                        :class="{invalid: $v.email.$error}"
                                        id="emailDaftar" 
                                        placeholder="Enter email">
                                </div>
                        
                                <label>Password</label>
                                <div class="input-group flex-nowrap">
                                    <input 
                                        :type="fieldType" 
                                        class="form-control" 
                                        :class="{invalid: $v.password.$error}"
                                        placeholder="Password" 
                                        @keyup.enter="register" 
                                        v-model="$v.password.$model">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" @click="visiblyPassword" style="cursor: pointer">
                                            <i :class="{'fas fa-eye' : fieldType == 'text', 'fa fa-eye-slash' : fieldType == 'password'}"></i>
                                        </span>
                                    </div>
                                </div>
                                
                                <button class="btn btn-success mt-3" :disabled="isLoading" @click="register">{{btnSignup}}</button>

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
import { required, email } from 'vuelidate/lib/validators'

export default {
  name: "loginToko",
  data() {
      return {
          name: "",
          email: "",
          password: "",
          btnText: "Login",
          isLoading: false,
          btnSignup: "Signup",
          fieldType: "password"
      }
  },
  validations: {
      name: {
          required
      },
      email: {
          required,
          email
      },
      password: {
          required
      }
  },
  methods: {
      login() {
          this.btnText = "Loading...";
          this.isLoading = true;
          fb.auth().signInWithEmailAndPassword(this.email, this.password)
            .then((res) => {
                let penjual = db.collection("profiles").doc(res.user.uid);
                penjual.get().then((doc) => {
                    if (doc.exists) {
                        let profile = doc.data()
                        if(profile.status == 'aktif') {
                            this.$router.push('/admin/overview').catch(err => {})
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Maaf status akun anda non aktif'
                            })
                            fb.auth().signOut()
                        }
                    } else {
                        console.log("No such document!");
                    }
                }).catch(function(error) {
                    console.log("Error getting document:", error);
                });
                 $('#loginToko').modal('hide');
            })
            .catch((error) => {
                this.btnText = "Login";
                this.isLoading = false;
                $('#loginToko').modal('hide');
                var errorCode = error.code;
                var errorMessage = error.message;
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: errorMessage
                })
            });
      },
      register() {
          this.$v.$touch()
          if (this.$v.$invalid) {
            console.log('Error Submit')
          } else {
            this.btnSignup = "Loading..."
            this.isLoading = true
            fb.auth().createUserWithEmailAndPassword(this.email, this.password)
                .then((user) => {
                    $('#loginToko').modal('hide');

                    db.collection("profiles").doc(user.user.uid).set({
                        name: this.name,
                        email: this.email,
                        userType: "penjual",
                        status: "aktif"
                    })
                    .then(() => {
                        console.log("Document successfully written!");
                        this.$router.push('/admin/overview').catch(err => {})
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
                
                })
                .catch((error) => {
                   this.btnSignUp = "Signup"
                    this.isLoading = false
                    $("#loginToko").modal("hide")
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: errorMessage
                    })
         
                });
          } 
      },
      visiblyPassword() {
          this.fieldType = this.fieldType == "password" ? "text" : "password"
      }
  }
};
</script>

<style lang="scss" scoped>
    .invalid {
        border-color: #FF0000;
    } 
</style>


