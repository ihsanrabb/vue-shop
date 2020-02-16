<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="jumbotron jumbotron-fluid">
    <div class="container">
      <h1 class="display-4">Sementara jumbotron</h1>
      <p class="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
    </div>
    <ProductList />
    </div>
    <Login />

    <!-- Modal -->
    <div class="modal fade" id="miniCart" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">My bag</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ul v-for="item in this.$store.state.cart">
              <li>{{item.productName}}</li>
            </ul>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Continue shopping</button>
            <button type="button" class="btn btn-primary">Check out</button>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import Login from "@/components/Login.vue";
import ProductList from "../sections/ProductList.vue"

export default {
  name: "home",
  components: {
    Login,
    ProductList
  }
};
</script>
