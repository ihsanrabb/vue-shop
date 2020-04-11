<template>
  <div class="home">
    <Navbar></Navbar>
    
    <div class="home-container container-fluid">
      <div class="row">
        <div class="col-md-4">
            <h1>Belanja Kebutuhan haji maupun umrah disini sekarang</h1>
            <h4>Semua kebutuhan bisa dicari disini,bayar dengan mudah, transaksi aman</h4>
            <button class="btn" @click="toShop">Belanja Sekarang!</button>
        </div>
        <div class="col-md-7">
          <img src="../assets/img/makkah-home.jpg" />
        </div>
      </div>
    </div>
    <h1 class="title-category">Pilih berdarsarkan kategori.</h1>
    <div class="row category-row container-fluid">
      <div class="col-md-3">
        <img src="../assets/img/category-ihram.jpg" />
        <h2>Ihram</h2>
      </div>
      <div class="col-md-3">
        <img src="../assets/img/category-ihram.jpg" />
        <h2>Mukena</h2>
      </div>
      <div class="col-md-3">
        <img src="../assets/img/category-ihram.jpg" />
        <h2>Sajadah</h2>
      </div>
      <div class="col-md-3">
        <img src="../assets/img/category-ihram.jpg" />
        <h2>Alat mandi</h2>
      </div>  
    </div>  

    <div class="conversi-container container-fluid">
      <div class="row">
        <div class="col-md-6">
            <h1>Konversi mata uang mu disni!</h1>
            <img src="../assets/svg/Sample-Money.svg" />
        </div>
        <div class="col-md-6">
          <form class="conversi-form">
            <div class="form-row">
              <div class="form-group col-md-6">
                <img src="../assets/svg/saudi-arabia.svg" />
                <label for="Indonesia">Saudi Arabia</label>
                <input type="text" class="form-control" id="Indonesia" v-model.number="cal1">
              </div>
              <div class="form-group col-md-6">
                <img src="../assets/svg/indonesia.svg" />
                <label for="Arab">Indonesia</label>
                <input type="text" class="form-control" id="Arab" v-model.number="cal2">
              </div>
            </div>
          </form>  
        </div>
      </div>
    </div>

    <div class="tagline-custom">
      <p>Belanja Online kebutuhan Haji dan umroh yang mudan dan terpercaya. </p>
      <p>Made in Holland with great care for quality, people and the environment. A better world starts in your pocket.</p>
    </div>

    <div class="row container-fluid mt-5 news-container">
      <div class="col-md-6">
        <img src="../assets/makkah.gif" />
      </div>
      <div class="col-md-6 pt-5 mt-5">
        <p class="title-news">Berita tentang perjalanan</p>
        <p class="detail-news">The patented mechanism of our wallets provides a simple and fast way to access your cards.</p>
        <button type="button" class="btn btn-outline-secondary float-left mt-3">Lihat disini!</button>
      </div>
    </div>

    <div class="parallax-makkah"></div>

    <ProductList />
    <Login />
    <MiniCart />
    <LoginToko />
   
    
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import ProductList from "../sections/ProductList.vue"
import MiniCart from "../components/MiniCart"

export default {
  name: "home",
  components: {
    Login,
    ProductList,
    MiniCart
  },
  data() {
    return {
      cal1: '',
      cal2: '',
      countryRate: 2.5
    }
  },
  methods: {
    toShop() {
      this.$router.push({name:'productPage'})
    }
  },
  computed: {
    finalAmount: function() {
      this.cal2 = this.cal1 * 3600;
    }
  }
};
</script>

<style scoped lang="scss" src="../styles/Home.scss" />
