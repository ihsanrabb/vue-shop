<template>
  <div class="admin">
   
    <div class="page-wrapper default-theme sidebar-bg bg1 toggled">
        <nav id="sidebar" class="sidebar-wrapper">
            <div class="sidebar-content">
                <!-- sidebar-brand  -->
                <div class="sidebar-item sidebar-brand">
                    <a href="#">CMS ADMIN</a>
                </div>
                <!-- sidebar-header  -->
                <div class="sidebar-item sidebar-header d-flex flex-nowrap">
                    <div class="user-pic">
                        <!-- <img class="img-responsive img-rounded" src="img/user.jpg" alt="User picture"> -->
                    </div>
                    <div class="user-info">
                        <span class="user-name">
                            Admin
                        </span>
                        <span class="user-role">akunadmin@admin.com</span>
                        <span class="user-status">
                            <i class="fa fa-circle"></i>
                            <span>Online</span>
                        </span>
                    </div>
                </div>
                <!-- sidebar-menu  -->
                <div class=" sidebar-item sidebar-menu">
                    <ul>
                        <li class="header-menu">
                            <span>Menu</span>
                        </li>
                        <li>
                            <router-link to="/adminPage/informasi">
                                <i class="fas fa-info-circle"></i>
                                <span class="">Informasi</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/adminPage/chatList">
                                <i class="fas fa-comments"></i>
                                <span class="">Live Chat</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/adminPage/transaksi">
                                <i class="fas fa-shopping-cart"></i>
                                <span class="">Transaksi</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/adminPage/akunPenjual">
                                <i class="fas fa-user"></i>
                                <span class="">Akun Penjual</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/adminPage/akunPembeli">
                                <i class="fas fa-users"></i>
                                <span class="">Akun Pembeli</span>
                            </router-link>
                        </li>
                        <li>
                            <a @click="logout()" style="cursor: pointer">
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
    name: "adminPage",
    methods: {
        logout() {
            fb.auth().signOut()
            .then(() => {
                this.$router.push({path: '/loginAdmin'})
            })
            .catch((err) => {
                console.log(err)
            });
        }
    }
}
</script>