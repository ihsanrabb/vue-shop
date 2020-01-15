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

        <h3>Basic CRUD in firebase and vue</h3>

        <div class="product-test">
          <div class="form-group">
            <input type="text" placeholder="Procut name" v-model="product.name" class="form-control" />
          </div>

          <div class="form-group">
            <input type="text" placeholder="Price" v-model="product.price" class="form-control" />
          </div>  

          <div class="form-group">
            <button @click="saveData" class="btn btn-primary">Save Data</button>
          </div>

        </div>

        <div class="table-responsive">
          <h3>Product list</h3>
            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Modify</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="product in products">
                  <td>{{product.data().name}}</td>
                  <td>{{product.data().price}}</td>
                  <td>
                    <button @click="editProduct(product)" class="btn btn-primary">Edit</button>
                    <button @click="deleteProduct(product.id)" class="btn btn-danger">Delete</button>
                  </td>
                </tr>
              </tbody>
            </table>
        </div>
        
    </div>

    <!-- Modal -->
      <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Edit Product</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <input type="text" placeholder="Procut name" v-model="product.name" class="form-control" />
              </div>

              <div class="form-group">
                <input type="text" placeholder="Price" v-model="product.price" class="form-control" />
              </div>  
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button @click="updateProduct()" type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
import {db} from '../firebase';
import $ from 'jquery';

export default {
  name: "products",
  data() {
    return {
      product: {
        name: null,
        price: null
      },
      products: [],
      activeItem: null
    }
  },
  methods: {
    deleteProduct(doc) {
      if(confirm('Are you sure? ')) {
        db.collection("products").doc(doc).delete().then(function() {
            alert("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
      } else {

      }
    },
    readData() {
      db.collection("products").get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              this.products.push(doc);
          });
      });
    },
    saveData() {
      db.collection("products").add(this.product)
      .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
          this.readData();
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
    },
    reset() {
      Object.assign(this.$data, this.$options.data.apply(this))
    },
    editProduct(product) {
      $('#edit').modal('show');
      this.product = product.data();
      this.activeItem = product.id;
    },
    updateProduct() {
      db.collection("products").doc(this.activeItem).update(this.product)
      .then(function() {
          $('#edit').modal('hide');
          alert("Document successfully updated!");
      })
      .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
    }
  },
  created() {
    this.readData();
  }
};
</script>