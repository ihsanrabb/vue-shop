<template>
  <div class="checkout">
    <Navbar />
    <div class="container pt-5 mt-5">
      <div class="row">
          <div class="col-md-9">
            <h4>Checkout page</h4>
             <ul v-for="item in this.$store.state.cart">
                <img :src="item.productImage" width="80px"  class="align-self-center" />
                <li>{{item.productName}}</li>
                <p class="mt-0">{{item.productPrice | currency('Rp') }}</p>
                <p class="mt-0">Quantity : {{item.productQuantity}}</p>
             </ul>
          </div>
          <div class="col-md-3">
            Total Price
          </div>
      </div>
    </div>
  </div>
</template>
