<template>
  <div class="login container">
   <!-- Modal -->
        <div class="modal fade" id="login" role="dialog" aria-labelledby="loginTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">

                    <div class="modal-body">

                            <ul class="nav nav-fill nav-pills mb-3" id="pills-tab" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Login</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">Signup</a>
                                </li>
                            </ul>

                            <div class="tab-content" id="pills-tabContent">
                            <div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
                                
                                <h5 class="text-center">Masuk sebagai pembeli</h5>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
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
                                
                                <button class="btn btn-primary mt-3" @click="login()" :disabled="isLoading">{{btnText}}</button>
                            
                            </div>
                            <div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
                                
                                <h4 class="text-center">Buat akun baru</h4>
                                
                                <div class="form-group">
                                    <label for="name">Your name</label>
                                    <input 
                                        type="text" 
                                        v-model="$v.name.$model" 
                                        class="form-control" 
                                        :class="{invalid: $v.name.$error}"
                                        id="name" 
                                        placeholder="Masukkan nama anda">
                                </div>

                                <div class="form-group">
                                    <label for="email">Email address</label>
                                    <input 
                                        type="email"  
                                        v-model="$v.email.$model" 
                                        class="form-control" 
                                        :class="{invalid: $v.email.$error}"
                                        id="email" 
                                        placeholder="Masukkan email">
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

                                <button class="btn btn-primary mt-3" :disabled="isLoading" @click="register">{{btnSignUp}}</button>

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
  name: "login",
  data() {
      return {
          name: "",
          email: "",
          password: "",
          btnText: "Login",
          isLoading: false,
          btnSignUp: "Signup",
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
          this.btnText = "Loading..."
          this.isLoading = true
          fb.auth().signInWithEmailAndPassword(this.email, this.password)
            .then((res) => {
                let pembeli = db.collection("profiles").doc(res.user.uid);
                pembeli.get().then((doc) =>{
                    if (doc.exists) {
                        let profile = doc.data()
                        console.log('cek profile', profile)
                        this.$store.dispatch("fetchUser", profile)
                        if(profile.status == 'aktif') {
                            $('#login').modal('hide');
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
                $('#login').modal('hide');
            })
            .catch((error) => {
               this.btnText = "Login"
               this.isLoading = false
                $("#login").modal("hide")
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
              console.log("Erorr submit")
          } else {
                this.btnSignUp = "Loading..."
                this.isLoading = true
                 fb.auth().createUserWithEmailAndPassword(this.email, this.password)
                    .then((user) => {
                        $('#login').modal('hide');

                        db.collection("profiles").doc(user.user.uid).set({
                            name: this.name,
                            email: this.email,
                            isMessage: false,
                            userType: "pembeli",
                            status: "aktif"
                        })
                        .then(function() {
                            console.log("Document successfully written!");
                        })
                        .catch(function(error) {
                            console.error("Error writing document: ", error);
                        });
                    })
                    .catch((error) => {
                        this.btnSignUp = "Signup"
                        this.isLoading = false
                        $("#login").modal("hide")
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
    label {
        font-size: 17px;
    }
    .invalid {
        border-color: #FF0000;
    } 
</style>

