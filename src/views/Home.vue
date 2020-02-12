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
