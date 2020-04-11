<template>
    <div class="container">
        <div class="intro">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-6">
                        <h3>Daftar Transaksi</h3>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum repellat, exercitationem odio blanditiis dolorum omnis! Nobis perspiciatis possimus laudantium ut, saepe illum quos, consequatur, ipsa facere error voluptatibus recusandae aliquam?</p>
                </div>
                <div class="col-md-6">
                    <img src="../assets/svg/products.svg" alt="" class="img-fluid">
                </div>  
            </div>
        </div>

        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Nama Pembeli</th>
                <th>Nama Produk</th>
                <th>ID Order</th>
                <th>Total Bayar</th>
                <th>Modify</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="transaksi in transactions">
                <td>
                  {{transaksi.nama}}
                </td>

                <td>
                  {{transaksi.product.productName}}
                </td>

                <td>
                    {{transaksi.order_id}}
                </td>

                <td>
                    {{transaksi.total_bayar}}
                </td>

                <td>
                  <button class="btn btn-primary" >Edit</button>
                </td>

              </tr>
            </tbody>
          </table>
        </div>

    </div>
</template>

<script>
import {fb,db} from '../firebase';

export default {
    name: "Transaksi",
    data() {
        return {
            transactions: []
        }
    },
    firestore() {
        return {
            transactions: db.collection('orders')
        }
    }
}
</script>