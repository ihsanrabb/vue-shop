<template>
    <div>
        <Navbar />

        <div class="container">
            <div class="intro h-100 mt-5">
                <div class="row h-100 align-items-center">
                <div class="col-md-6 ml-3">
                    <h3>Profile settings</h3>
                    <p>Ubah data diri kamu disini!</p>
                </div>
                <div class="col-md-5">
                    <img src="../assets/svg/profile.svg" width="300" alt="" class="img-fluid">
                </div>
                </div>
            </div>

            <div class="profile-wrap">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <input type="text" v-model="profile.name" placeholder="Full name" class="form-control">
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <input type="number" v-model="profile.phone" placeholder="Nomer Telepon" class="form-control">
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <input type="text" v-model="profile.address"  placeholder="Alamat rumah" class="form-control">
                  </div>
                </div>
                <div class="col-md-8">
                  <div class="form-group">
                    <input type="number" v-model="profile.postcode"  placeholder="Kode Pos" class="form-control">
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                      <input type="submit" @click="updateProfile" value="Save Changes" class="btn btn-primary w-100">
                  </div>
                </div>
              </div>
            </div>

          </div>
    
      <Footer  />
    </div>
</template>

<script>
import { fb, db } from "../firebase";

export default {
    name: "UserProfile",
    data() {
        return {
            profile: []
        }
    },
    firestore() {
        const user = fb.auth().currentUser;
        return {
            profile: db.collection('profiles').doc(user.uid)
        }
    },
    methods: {
        updateProfile() {
          this.$firestore.profile.update(this.profile)
          .then(() => {
              Toast.fire({
                  icon: 'success',
                  title: 'Profile Update!'
              })
          }).catch((err) => console.log(err))
        }
    }
}
</script>

<style scoped lang="scss" src="../styles/UserProfile.scss">