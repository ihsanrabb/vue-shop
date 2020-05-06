<template>
    <div class="">
            <Navbar />
            
            <div class="parallax-makkah">
                
            </div>

            <h1 class="mt-5 mb-5">Produk Kami</h1>
            
            <div class="container">
                <div class="row">
                    <div class="col-md-9">
                        <div class="mb-5 float-left">
                            <router-link 
                                to="/productPage/product-list" 
                                tag="button" 
                                class="btn btn-outline-success mr-2 ml-2">
                                Semua
                            </router-link>
                            <router-link 
                                to="/productPage/product-muslim" 
                                tag="button" 
                                class="btn btn-outline-warning mr-2 ml-2">
                                Muslim
                            </router-link>
                            <router-link 
                                to="/productPage/product-muslimah" 
                                tag="button" 
                                class="btn btn-outline-info mr-2 ml-2">
                                Muslimah
                            </router-link>
                            <router-link 
                                to="/productPage/alat-sholat" 
                                tag="button" 
                                class="btn btn-outline-success mr-2 ml-2">
                                Perlengkapan Sholat
                            </router-link>
                            <router-link 
                                to="/productPage/perlengkapan-mandi" 
                                tag="button" 
                                class="btn btn-outline-info mr-2 ml-2">
                                Perlengkapan Mandi
                            </router-link>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="input-group mb-3">
                            <input class="form-control mr-3" type="text" v-model="search" placeholder="Cari produk disini" />
                            <div class="input-group-append">
                                <i class="fa fa-search pt-1" aria-hidden="true" style="font-size: 1.563em"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <main class="page-content pt-2">
                <router-view :search="this.search" />
            </main>
            <MiniCart />

            <Footer />
            
    </div>    
</template>

<script>
export default {
  name: "productPage",
  data() {
      return {
          filter: 'All',
          search: ""
      }
  }
};
</script>

<style scoped lang="scss" src="../styles/ProductPage.scss">