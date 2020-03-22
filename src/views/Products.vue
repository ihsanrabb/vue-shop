<template>
  <div class="products">
    <div class="container pt-3">
        <div class="intro">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-6">
                     <h3>Products page</h3>
                     <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum repellat, exercitationem odio blanditiis dolorum omnis! Nobis perspiciatis possimus laudantium ut, saepe illum quos, consequatur, ipsa facere error voluptatibus recusandae aliquam?</p>
                </div>
                <div class="col-md-6">
                    <img src="../assets/svg/products.svg" alt="" class="img-fluid">
                </div>  
            </div>
        </div>

        <hr>

        <h3 class="d-inline-block">Product List</h3>
          <button @click="addNew()" class="btn btn-primary float-right">Add product</button>

        <div class="product-test">
      
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>MOdify</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="product in productsList">
                <td>
                  {{product.name}}
                </td>

                <td>
                  {{product.price}}
                </td>

                <td>
                  <button @click="editProduct(product)" class="btn btn-primary">Edit</button>
                  <button @click="deleteProduct(product)" class="btn btn-danger">Delete</button>
                </td>

              </tr>
            </tbody>
          </table>
        </div>

       
       </div>
    </div>

    <!-- Modal -->
      <div class="modal fade" id="product" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">

              <div class="row">
                  <!-- main product -->
                  <div class="col-md-8">
                    <div class="form-group">
                      <input type="text" placeholder="Product Name" v-model="product.name" class="form-control">
                    </div>

                    <div class="form-group">
                      <vue-editor v-model="product.description"></vue-editor>
                      <!-- <textarea placeholder="Product Description" class="form-control" v-model="product.description"></textarea> -->
                    </div>
                  </div>
                  <!-- product sidebar -->
                  <div class="col-md-4">
                    <h4 class="display-6">Product Details</h4>
                    <hr>

                    <div class="form-group">
                      <input type="text" placeholder="Product price" v-model="product.price" class="form-control">
                    </div>

                    <div class="form-group">
                      <input type="text" placeholder="Stok" v-model="product.stok" class="form-control">
                    </div>

                    <div class="form-group">
                      <input type="text" @keyup.188="addTag" placeholder="Product tags" v-model="tag" class="form-control">
                      
                      <div  class="d-flex">
                        <p v-for="tag in product.tags">
                            <span class="p-1">{{tag}}</span>
                        </p>
                      </div>
                    </div>

                    <select class="form-control" v-model="product.productCategory">
                      <option value="">Baju untuk</option>
                      <option value="muslim">Muslim</option>
                      <option value="muslimah">Muslimah</option>
                    </select>

                    </div>

                    

                    <div class="form-group">
                      <label for="product_image">Product Images</label>
                      <input type="file" @change="uploadImage" class="form-control">

                    </div>

                    <div class="form-group">
                      <div class="p-1 d-flex">
                          <div class="img-wrapp" v-for="(image, index) in product.images">
                              <img :src="image" alt="" width="80px">
                              <span class="delete-img" @click="deleteImage(image,index)">X</span>
                          </div>
                      </div>
                    </div>

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
import { VueEditor } from "vue2-editor";
import {fb,db} from '../firebase';
import $ from 'jquery';

export default {
  name: "products",
  components: {
    VueEditor
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
        stok: null
      },
      products: [],
      activeItem: null,
      modal: null,
      tag: null,
      productList: []
    }
  },
  firestore() {
    const user = fb.auth().currentUser;
    return {
        productsList: db.collection('products').where("penjualID", "==", user.uid),
        products: db.collection('products')
    }
  },
  methods: {
    addNew() {
      this.modal = 'new';
      this.reset();
      $('#product').modal('show');
    },
    deleteProduct(doc) {


      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$firestore.products.doc(doc.id).delete()
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
      
    },
    readData() {
      
    },
    addProduct() {
      let user = fb.auth().currentUser;
      let data = {
        name: this.product.name,
        description: this.product.description,
        price: this.product.price,
        tags: this.product.tags,
        images: this.product.images,
        penjualID: user.uid,
        productCategory: this.product.productCategory,
        stok: this.product.stok
      }
      
      this.$firestore.products.add(this.product);

      Toast.fire({
            icon: 'success',
            title: 'Add successfully'
      })

      $('#product').modal('hide');

      
    },
    reset() {
      this.product = {
        name: null,
        description: null,
        price: null,
        tags: [],
        images: []
      }
    },
    editProduct(product) {
      this.modal = 'edit'
      this.product = product;
      $('#product').modal('show');
      
    },
    updateProduct() {
      this.$firestore.products.doc(this.product.id).update(this.product);

      Toast.fire({
        icon: 'success',
        title: 'update successfully'
      })

      $('#product').modal('hide');
    },
    addTag() {
      this.product.tags.push(this.tag);
      this.tag = "";
    },
    uploadImage(e) {
      if (e.target.files[0]) {
        let file = e.target.files[0];

        var storageRef = fb.storage().ref('products/' + file.name);

        let uploadTask = storageRef.put(file);
      
        // console.log(e.target.files[0])

        uploadTask.on('state_changed', (snapshot) => {  

        }, (error) => {

        },() => {
          uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
            this.product.images.push(downloadURL);
            console.log('File available at', downloadURL);  
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
  created() {

  },
  
};
</script>

<style scoped lang="scss">
.img-wrapp {
  position: relative;
}

.img-wrapp span.delete-img {
  position: absolute;
  top: -14px;
  left: -2px;
}

.img-wrapp span.delete-img:hover {
    cursor: pointer;
}
</style>