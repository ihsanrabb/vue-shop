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
              <tr v-for="product in products">
                <td>
                  {{product.name}}
                </td>

                <td>
                  {{product.price}}
                </td>

                <td>
                  <button class="btn btn-primary">Edit</button>
                  <button @click="deleteProduct()" class="btn btn-danger">Delete</button>
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
                      <textarea placeholder="Product Description" class="form-control" v-model="product.description"></textarea>
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
                      <input type="text" @keyup.188="addTag" placeholder="Product tags" v-model="product.tag" class="form-control">
                      
                      <div  class="d-flex">
                        <!-- <p v-for="tag in product.tags">
                            <span class="p-1">{{tag}}</span>
                        </p> -->
                      </div>
                    </div>
                    </div>

                    <div class="form-group">
                      <label for="product_image">Product Images</label>
                      <input type="file" class="form-control">
                    </div>

                    <div class="form-group d-flex">
                      <div class="p-1">
                          <div class="img-wrapp">
                              <!-- <img :src="image" alt="" width="80px">
                              <span class="delete-img">X</span> -->
                          </div>
                      </div>
                    </div>

                </div>
      <!-- end modal body -->
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="addProduct()" type="button" class="btn btn-primary" >Save changes</button>
              <button type="button" class="btn btn-primary" >Apply changes</button>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
import {fb,db} from '../firebase';
import $ from 'jquery';

export default {
  name: "products",
  data() {
    return {
      product: {
        name: null,
        description: null,
        price: null,
        tag: null,
        image: null
      },
      products: [],
      activeItem: null
    }
  },
  firestore() {
    return {
        products: db.collection('products')
    }
  },
  methods: {
    addNew() {
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
      console.log("ini hasil product : " + this.product);
      this.$firestore.products.add(this.product);
      $('#product').modal('hide');

      // db.collection("products").add(this.product)
      // .then((docRef) => {
      //     console.log("Document written with ID: ", docRef.id);
      //     this.readData();
      // })
      // .catch(function(error) {
      //     console.error("Error adding document: ", error);
      // });object
    },
    reset() {
      
    },
    editProduct(product) {
      
    },
    updateProduct() {
      // db.collection("products").doc(this.activeItem).update(this.product)
      // .then(() => {
      //     $('#edit').modal('hide');
      //     this.wathcer();
      //     alert("Document successfully updated!");
      // })
      // .catch(function(error) {
      //     // The document probably doesn't exist.
      //     console.error("Error updating document: ", error);
      // });
    }
  },
  created() {
    
  },
  
};
</script>