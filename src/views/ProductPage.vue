<template>
    <div class="">
            <Navbar />
            
            <div class="parallax-makkah">
                
            </div>

            

            
            
            <div class="container">
                
            <div class="box-rekomendasi">
                <h4>Bingung perlengkapan apa saja yang harus dipersiapkan?</h4>
                <p>Yuk,cek beberapa rekomendasi perlengkapan Haji dan umroh dari Hajj Shop</p>
                <button type="button" class="btn btn-primary mr-4" data-toggle="modal" data-target="#rekomendasi-muslim">Perlengkapan Muslim</button>
                <button type="button" class="btn btn-info" data-toggle="modal" data-target="#rekomendasi-muslimah">Perlengkapan Muslimah</button>
            </div>    

            <h1 class="mt-5 mb-5">Produk Kami</h1>

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
                                Toiletries
                            </router-link>
                            <router-link 
                                to="/productPage/product-lain" 
                                tag="button" 
                                class="btn btn-outline-warning mr-2 ml-2">
                                Lain-lain
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

            <!-- modal muslim -->
            <div class="modal rekomendasi" tabindex="-1" role="dialog" id="rekomendasi-muslim">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Perlengkapan Muslim</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <ol>
                            <li @click="searchRekomendasi('ihram')">Kain Ihram</li>
                            <li @click="searchRekomendasi('sabuk')">Sabuk Haji</li>
                            <li @click="searchRekomendasi('koko')">Baju Koko</li>
                            <li @click="searchRekomendasi('sorban')">Sorban</li>
                            <li @click="searchRekomendasi('pangsi')">Celana Pangsi</li>
                            <li @click="searchRekomendasi('dalam ihram')">Celana Dalam Ihram</li>
                            <li @click="searchRekomendasi('gamis')">Gamis Jubah Muslimah</li>
                            <li @click="searchRekomendasi('handuk')">Handuk Kecil</li>
                            <li @click="searchRekomendasi('quran')">Al-Quran</li>
                            <li @click="searchRekomendasi('sandal')">Sandal</li>
                        </ol>
                    </div>
                    </div>
                </div>
            </div>
            <!-- end modal muslim -->

            <!-- modal muslimah -->
            <div class="modal rekomendasi" tabindex="-1" role="dialog" id="rekomendasi-muslimah">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Perlengkapan Muslimah</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <ol>
                            <li @click="searchRekomendasi('khimar')">Khimar/Jilbab Panjang</li>
                            <li @click="searchRekomendasi('mukena')">Mukena</li>
                            <li @click="searchRekomendasi('inner')">Inner Pants</li>
                            <li @click="searchRekomendasi('gamis')">Gamis Muslimah</li>
                            <li @click="searchRekomendasi('kaos kaki')">Kaos Kaki</li>
                            <li @click="searchRekomendasi('handuk')">Handuk Kecil</li>
                            <li @click="searchRekomendasi('quran')">Al-Quran</li>
                            <li @click="searchRekomendasi('sajadah')">Sajadah</li>
                            <li @click="searchRekomendasi('sajadah')">Sajadah</li>
                            <li @click="searchRekomendasi('tas')">Tas Medium/Tas Kecil</li>
                            <li @click="searchRekomendasi('sunlock')">Sunblock</li>
                        </ol>
                    </div>
                    </div>
                </div>
            </div>
            <!-- end modal muslimah -->


            <main class="page-content pt-2">
                <router-view :search="this.search" />
            </main>
            <MiniCart />

            <Footer />
            <Login />
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
  },
  methods: {
      searchRekomendasi(keywoard) {
          this.search = keywoard
          $(".rekomendasi").modal("hide")
      }
  }
};
</script>

<style scoped lang="scss" src="../styles/ProductPage.scss">