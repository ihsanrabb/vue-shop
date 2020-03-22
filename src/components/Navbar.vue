  <template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/">Hajj Shop</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link custom-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/productPage" class="nav-link custom-link" href="#">Shop Now</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link custom-link" href="#">About</router-link>
          </li>
        </ul>

          <a v-if="nama == ''" data-toggle="modal" data-target="#login" @click="loginUser">
            <img class="custom-icon" src="../assets/svg/user-icon.svg" />
          </a>
           <li v-else class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {{nama}}
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <a class="dropdown-item" href="#">Profile</a>
                <a class="dropdown-item" href="#">Pesanan Saya</a>
                <a class="dropdown-item" href="#" @click="logoutUser">Log out</a>
              </div>
            </li>
          <a data-toggle="modal" data-target="#miniCart">
            <img class="custom-icon" src="../assets/svg/cart-icon.svg">
          </a>
        
      </div>  
  </nav>
    
  </div>
</template>

<script>
import {fb, db} from '../firebase';

export default {
  name: "Navbar",
  props: {
    msg: String
  },
  data() {
    return {
        email: null,
        nama : ''
    }
  },
  methods: {
    loginUser() {
      console.log('login user')
    },
    logoutUser() {
      fb.auth().signOut()
            .then(() => {
                this.$router.push({path: '/'})
            })
            .catch((err) => {
                console.log(err)
      });
    }
  },
  created() {
     let user = fb.auth().currentUser;

    if (user) {
      let docRef = db.collection("profiles").doc(user.uid);

        docRef.get().then((doc) => {
            if (doc.exists) {
                this.nama = doc.data().name
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
    } 
      
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" src="../styles/Navbar.scss" />
