<template>
  <div class="overview" id="overview-page">
    <div class="container pt-3">
        <div class="intro">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-6">
                     <h3>Kelola toko anda disini</h3>
                     <p>Disini kamu bisa mengelola toko kamu mulai dari menambahkan produk baru, mengubah produk yang telah kamu jual atau menghapus produk. kamu juga bisa melihat siapa saja yang telah memesan produk kamu!</p>
                </div>
                <div class="col-md-6">
                    <img v-lazy="require('@/assets/svg/overview.svg')" alt="" class="img-fluid w-75">
                </div>  
            </div>
        </div>

        <div class="row mt-5 mb-4">
          <div class="col-md-4">
            <div class="box-counting shadow">
              <h5>Jumlah Produk</h5>
              <animated-integer :value="countProducts" class="text-info"></animated-integer>
              <p>Produk</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="box-counting shadow">
              <h5>Jumlah Pesanan</h5>
              <animated-integer :value="countOrders" class="text-danger"></animated-integer>
              <p>Pesanan</p>
            </div>  
          </div>
          <div class="col-md-4">
            <div class="box-counting shadow">
              <h5>Pesanan Selesai</h5>
              <animated-integer :value="countHistory" class="text-success"></animated-integer>
              <p>Pesanan</p>
            </div>
          </div>
        </div>

    </div>
  </div>
</template>

<script>
import { fb, db } from '@/firebase';
import AnimatedInteger from '../components/AnimatedInterger';

export default {
  name: "overview",
  components: {
    AnimatedInteger
  },
  data() {
    return {
      countProducts: 0,
      countOrders: 0,
      countHistory: 0
    }
  },
  mounted() {
    const user = fb.auth().currentUser;

    db.collection('products').where("penjualID", "==", user.uid)
      .get().then(snap => {
        this.countProducts = snap.size
       });

    db.collection('orders').where("product.penjual_id", "==", user.uid)
      .get().then(snap => {
        this.countOrders = snap.size
        let counterHistory = 0
          snap.forEach((doc) => {
              let data = doc.data().status_pesanan == 'Diterima'
              if (data == true) {
                counterHistory++
              }
          });
          this.countHistory = counterHistory
       });

  }
};
</script>

<style lang="scss" scoped>
.box-counting {
  border-radius: 1rem;
  padding: 0.5rem;
  h5 {
    margin-bottom: 2px;
  }
  span {
    font-size: 2.4em;
  }
  p {
    margin: 0;
  }
}
</style>