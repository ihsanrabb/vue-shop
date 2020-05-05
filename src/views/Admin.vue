<template>
  <div class="admin">
   
    <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
        <nav id="sidebar" class="sidebar-wrapper">
            <div class="sidebar-content">
                <!-- sidebar-brand  -->
                <div class="sidebar-item sidebar-brand">
                    <a href="#">CMS PENJUAL</a>
                </div>
                <!-- sidebar-header  -->
                <div class="sidebar-item sidebar-header d-flex flex-nowrap">
                    <div class="user-pic">
                        <!-- <img class="img-responsive img-rounded" src="img/user.jpg" alt="User picture"> -->
                    </div>
                    <div class="user-info">
                        <span class="user-name">
                            {{nama}}
                        </span>
                        <span class="user-role">{{email}}</span>
                        <span class="user-status">
                            <i class="fa fa-circle"></i>
                            <span>Online</span>
                        </span>
                    </div>
                </div>
                <div class=" sidebar-item sidebar-menu">
                    <ul>
                        <li class="header-menu">
                            <span>Menu</span>
                        </li>
                        <li>
                            <router-link to="/admin/overview">
                                <i class="fas fa-chart-line"></i>
                                <span class="">Overview</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin/products">
                                <i class="fab fa-amazon"></i>
                                <span class="">Produk</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/admin/orders">
                                <i class="fas fa-shopping-cart"></i>
                                <span class="">Pemesanan</span>
                            </router-link>
                        </li>
                         <li>
                            <router-link to="/admin/profile">
                                <i class="fas fa-user"></i>
                                <span class="">Profile</span>
                            </router-link>
                        </li>
                        <li>
                            <a @click="logout()">
                                <i class="fas fa-power-off"></i>
                                <span class="">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
                <!-- sidebar-menu  -->
            </div>
           
            
        </nav>
        <!-- page-content  -->
        <main class="page-content pt-2">
            <router-view/>
        </main>
        <!-- page-content" -->
    </div>
    <!-- page-wrapper -->
    
  </div>
</template>

<script>
import {fb, db} from '../firebase';

export default {
  name: "admin",
  data() {
      return {
          email: null,
          nama: ''
      }
  },
  methods: {
      logout() {
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
      this.email = user.email;
      let docRef = db.collection("profiles").doc(user.uid);

        docRef.get().then((doc) => {
            if (doc.exists) {
                // console.log("Document data:", doc.data().name);
                this.nama = doc.data().name
            } else {
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
  }
};
</script>
