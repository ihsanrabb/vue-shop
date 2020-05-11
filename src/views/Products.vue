<template>
  <div class="products">
    <div class="container pt-3">
        <div class="intro">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-6">
                     <h3>Kelola Produk</h3>
                     <p>Tambahkan produk yang ingin kamu jual, memperbarui informasi atau stok kamu bisa disini! kamu juga bisa menghapus produk yang tidak ingin lagi kamu tampilkan. Jangan lupa untuk memberikan informasi sejelas mungkin untuk produk kamu yaa agar mempermudah calon pembeli &#128521; </p>
                </div>
                <div class="col-md-6">
                    <img src="../assets/svg/products.svg" alt="" class="img-fluid">
                </div>  
            </div>
        </div>

        <hr>

        <div v-if="productsList.length == 0">
          <h4>Kamu belum punya produk. Yuk masukkan produk pertama kamu!</h4>
          <button @click="addNew()" class="btn btn-primary">Tambah Produk</button>
        </div>

        <!-- empty condition rendering -->
        <div v-else>
          <div class="d-flex bd-highlight">
            <div class="p-2 flex-grow-1 bd-highlight">
              <h3 style="text-align:left">Product List</h3>
            </div>
            <div class="p-2 bd-highlight">
              <input class="form-control" type="text" v-model="search" placeholder="Cari produk kamu disini" />
            </div>
            <div class="p-2 bd-highlight">
              <button @click="addNew()" class="btn btn-primary float-right">Tambah Produk</button>
            </div>
          </div>

          <div class="table-responsive" >
            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Modify</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(product, index) in filterProduct" :key="index">
                  <td>
                    {{product.name}}
                  </td>

                  <td>
                    {{product.price | currency('Rp')}}
                  </td>

                  <td>
                    <button @click="editProduct(product)" class="btn btn-primary mr-1">Edit</button>
                    <button @click="deleteProduct(product)" class="btn btn-danger">Delete</button>
                  </td>

                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- end empty condition rendering -->

    </div>

    <!-- Modal -->
      <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

              <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <input 
                        type="text" 
                        placeholder="Product Name" 
                        v-model.trim="$v.product.name.$model" 
                        class="form-control"
                        :class="{invalid: $v.product.name.$error}" >
                      <small class="form-text" v-if="$v.product.name.$error">Nama produk harus diisi</small>
                    </div>

                    <div class="form-group">
                      <vue-editor 
                        id="editor1" 
                        v-model.trim="$v.product.description.$model"
                        />
                      <small class="form-text" v-if="$v.product.description.$error">Deskripsi produk harus diisi dan minimal {{$v.product.description.$params.minLength.min}} karakter</small>
                    </div>

                    <div class="row">
                      <div class="col">
                        <div class="form-group ">
                          <label for="product_image">Product Images</label>
                          <input type="file" @change="uploadImage" class="form-control" :disabled="loadingImg">
                        </div>
                      </div>
                      <div class="col">
                        <LoadingCircle v-if="loadingImg" />
                      </div>
                    </div>

                    <div class="form-group pl-2 pt-2">
                      <div class="p-1 d-flex">
                          <div class="img-wrapp pl-3" v-for="(image, index) in product.images" :key="index">
                              <img :src="image" alt="" width="140px">
                              <span class="delete-img" @click="deleteImage(image,index)">X</span>
                          </div>
                      </div>
                    </div>
  
                  </div>

                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Product Details</h4>
                    <hr>

                    <div class="form-group">
                      <input 
                        type="number" 
                        placeholder="Product price" 
                        v-model.trim="$v.product.price.$model" 
                        class="form-control"
                        :class="{invalid: $v.product.price.$error}">
                        <small class="form-text" v-if="$v.product.price.$error">Harga produk harus diisi</small>
                    </div>

                    <div class="form-group">
                      <input 
                        type="number" 
                        placeholder="Stok" 
                        v-model.trim="$v.product.stok.$model" 
                        :class="{invalid: $v.product.stok.$error}"
                        class="form-control">
                        <small class="form-text" v-if="$v.product.stok.$error">Stok produk harus diisi</small>
                    </div>

                    <!-- <div class="form-group">
                      <input type="text" @keyup.188="addTag" placeholder="Product tags" v-model="tag" class="form-control">
                      
                      <div  class="d-flex">
                        <p v-for="(tag, index) in product.tags" :key="index">
                            <span class="p-1">{{tag}}</span>
                        </p>
                      </div>
                    </div> -->

                    <select 
                      class="form-control" 
                      :class="{invalid: $v.product.productCategory.$error}"
                      v-model.trim="$v.product.productCategory.$model"
                      >
                        <option value="" selected>Product Category</option>
                        <option value="muslim">Muslim</option>
                        <option value="muslimah">Muslimah</option>
                        <option value="alat-sholat">Perlengkapan Sholat</option>
                        <option value="alat-mandi">Perlengkapan Mandi</option>
                        <option value="lain-lain">Lain-Lain</option>
                    </select>
                    <small class="form-text" v-if="$v.product.productCategory.$error">Kategori produk harus diisi</small>


                    <h4 class="display-6 pt-3">Varian Produk</h4>
                    <hr>

                    <div class="form-group">
                      <label for="ukuran-produk">Ukuran</label>
                      <select class="form-control" id="ukuran-produk" @change="onChangeUkuran($event)">
                        <option value="null">Pilih Ukuran</option>
                        <option value="xs">xs</option>
                        <option value="s">s</option>
                        <option value="m">m</option>
                        <option value="xl">xl</option>
                        <option value="xxl">xxl</option>
                      </select>
                      <small class="wording-ukuran">*Tidak Wajib diisi</small>
                    </div>

                    <div v-for="(ukuran, index) in product.ukuranProduk" class="ukuran-wrapper" :key="index">
                      <p class="float-left">{{ukuran}}</p>
                      <span class="delete-img float-right" @click="deleteUkuran(index)">X</span>
                    </div>

                    <h4 class="display-6 pt-3">Ekspedisi Detail</h4>
                    <hr>
                    <div class="form-group">
                        <select 
                            id="provinsi" 
                            class="form-control"
                            :class="{invalid: $v.product.provinsi.$error}"  
                            v-model="selectedProvinsi" 
                            @change="onChangeProv($event)"
                        >
                            <option value="">Pilih Provinsi</option>
                            <option 
                                v-for="(option, index) in optionsProvinsi" 
                                :value="option.province_id" 
                                :key="index"
                                :data-provinsi="option.province">
                            {{option.province}}</option>
                        </select>
                        <small class="form-text" v-if="$v.product.provinsi.$error">Pilih Provinsi terlebih dahulu</small>
                    </div>
                    <div class="form-group">
                        <select 
                            id="kota" 
                            class="form-control"
                            :class="{invalid: $v.product.kota.$error}" 
                            v-model="selectedKota"
                            @change="onChangeKota($event)"
                        > 
                            <option value="" >Pilih Kota</option>
                            <option 
                                v-for="(option,index) in optionsKota" 
                                :value="option.city_id" 
                                :key="index"
                                :data-nama-kota="option.city_name">
                            {{option.city_name}}</option>
                        </select>
                        <small class="form-text" v-if="$v.product.kota.$error">Pilih Kota terlebih dahulu</small>
                    </div>
                    <div class="form-group">
                      <input 
                        type="number" 
                        placeholder="Berat Produk" 
                        v-model.trim="$v.product.weight.$model" 
                        class="form-control"
                        :class="{invalid: $v.product.weight.$error}">
                        <small class="form-text" v-if="$v.product.weight.$error">Berat produ harus diisik</small>
                        <small class="form-text text-muted">Berat produk dalam gram</small>
                    </div>

                    </div>

                </div>


                <div class="alert alert-danger" role="alert" v-if="errorImg">
                    Upload foto produk minimal 3 foto
                </div>
      <!-- end modal body -->
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button 
                @click="addProduct()" 
                type="button" 
                class="btn btn-primary"
                v-if="modal == 'new'" >
                Save changes</button>
              <button 
                @click="updateProduct()"
                type="button" 
                class="btn btn-primary" 
                v-if="modal == 'edit'"
                >Apply changes</button>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
import { VueEditor, Quill } from 'vue2-editor'
import {fb,db} from '../firebase';
import { required, minLength } from 'vuelidate/lib/validators'
import LoadingCircle from "@/components/LoadingCircle";
import axios from 'axios';

let url = 'https://cors-anywhere.herokuapp.com/https://api.rajaongkir.com'

export default {
  name: "products",
  components: {
    VueEditor,
    LoadingCircle
  },
  data() {
    return {
      product: {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: [],
        productCategory: "",
        stok: null,
        provinsi: '',
        kota: '',
        weight: null,
        ukuranProduk: []
      },
      products: [],
      activeItem: null,
      modal: null,
      tag: null,
      productsList: [],
      errorImg: false,
      loadingImg: false,
      optionsProvinsi: [],
      optionsKota: [],
      selectedProvinsi: '',
      selectedKota: '',
      search: '',
    }
  },
  validations: {
    product: {
      name: {
        required
      },
      description: {
        required,
         minLength: minLength(20)
      },
      price: {
        required
      },
      stok: {
        required
      },
      productCategory: {
        required
      },
      provinsi: {
        required
      },
      kota: {
        required
      },
      weight: {
        required
      }
    }
  },
  firestore() {
    const user = fb.auth().currentUser;
    return {
        productsList: db.collection('products').where("penjualID", "==", user.uid),
        // products: db.collection('products')
    }
  },
  methods: {
    addNew() {
      this.modal = 'new';
      this.reset();
      $('#product').modal('show');

      let config = {
            headers: {
                "key": "3f102f5b68cc23333365e9df69abf115",
            }
        }

        axios.get(`${url}/starter/province`, config)
            .then((res) => {
                let provinsi = res.data.rajaongkir.results;
                this.optionsProvinsi = provinsi
            }).catch(err => console.log(err))

    },
    onChangeProv(event) {
       let idProvinsi = event.target.value
       let namaProvinsi = $("#provinsi").find(':selected').attr('data-provinsi')
       this.product.provinsi = namaProvinsi
       let config = {
            headers: {
                "key": "3f102f5b68cc23333365e9df69abf115",
            }
        }
        
        axios.get(`${url}/starter/city?province=${idProvinsi}`, config)
            .then((res) => {
                let kota = res.data.rajaongkir.results;
                this.optionsKota = kota
            }).catch(err => console.log(err))
    },
    onChangeKota() {
      let namaKota = $("#kota").find(':selected').attr('data-nama-kota')
      this.product.kota = namaKota
    },
    onChangeUkuran(event) {
      let val = event.target.value
      if (val != 'null' && !this.product.ukuranProduk.includes(val)) {
        this.product.ukuranProduk.push(val)
      }
    },
    deleteUkuran(index){
      this.product.ukuranProduk.splice(index,1);
    },
    deleteProduct(doc) {
     Swal.fire({
        title: 'Are you sure?',
        text: "Apakah kamu yakin menghapus produk ini?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          db.collection("products").doc(doc.id).delete()
            .then(() => {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            })
        }
      })
      
    },
    addProduct() {
      const cekImage = this.product.images.length
      this.$v.$touch()

      if (this.$v.$invalid) {
          console.log('error submit')
      } else {
          if (cekImage < 3) {
            this.errorImg = true
          } else {
            let user = fb.auth().currentUser;
            let formData = {
              name: this.product.name,
              description: this.product.description,
              price: this.product.price,
              // tags: this.product.tags,
              images: this.product.images,
              penjualID: user.uid,
              productCategory: this.product.productCategory,
              stok: this.product.stok,
              origin: this.selectedKota,
              provinsi: this.product.provinsi,
              kota: this.product.kota,
              weight: this.product.weight,
              ukuranProduk: this.product.ukuranProduk
            }

            db.collection("products").add(formData)
              .then(() => {
                  $('#product').modal('hide');
                  Toast.fire({
                    icon: 'success',
                    title: 'Add successfully'
                  })
              }).catch(err => console.error(err))

          }
      }
    },
    reset() {
      this.$v.$reset()
      this.product = {
        name: null,
        description: null,
        price: null,
        stok: null,
        tags: [],
        images: [],
        productCategory: "",
        provinsi: '',
        kota: '',
        weight: null,
        ukuranProduk: []
      }
      this.selectedProvinsi = ''
      this.selectedKota = ''
    },
    editProduct(product) {
      this.modal = 'edit'
      this.product = product;
      $('#product').modal('show');
    },
    updateProduct() {
      db.collection("products").doc(this.product.id).update(this.product)
        .then(() => {
          $('#product').modal('hide');
          Toast.fire({
            icon: 'success',
            title: 'update successfully'
          })
        })
        .catch((err) => console.error(err))

    },
    addTag() {
      this.product.tags.push(this.tag);
      this.tag = "";
    },
    uploadImage(e) {
      this.errorImg = false
      if (e.target.files[0]) {
        let file = e.target.files[0];
        this.loadingImg = true
        var storageRef = fb.storage().ref('products/' + file.name);

        let uploadTask = storageRef.put(file);
  
        uploadTask.on('state_changed', (snapshot) => {  
        }, (error) => {
          console.error(error)
        },() => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.product.images.push(downloadURL);
            // console.log('File available at', downloadURL);  
            this.loadingImg = false
          });
        });
      }
    },
    deleteImage(img,index) {
      let deleteImg = fb.storage().refFromURL(img);

      this.product.images.splice(index,1);
      deleteImg.delete().then(function() {
        console.log("image delete")
      }).catch(function(error) {
        console.log("error delete image")
      })
    }
      
  },
  computed: {
    filterProduct() {
      if(this.search) {
        return this.productsList.filter((product) => {
          return product.name.toLowerCase().match(this.search.toLowerCase())
        })
      } else {
        return this.productsList
      }
    }
  } 
};
</script>

<style scoped lang="scss" src="../styles/Products.scss">