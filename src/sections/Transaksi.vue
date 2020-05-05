<template>
    <div class="container">
        <div class="intro">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-6">
                        <h3>Kelola Transaksi</h3>
                        <p>Halaman untuk melihat daftar transaksi didalam website Hajj shop. kamu bisa melihat detail transaksi dan mengahapus transaksi jika menurut kamu sudah tidak diperlukan lagi datanya.</p>
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
              <tr v-for="transaction in transactions">
                <td>
                  {{transaction.nama}}
                </td>

                <td>
                  {{transaction.product.productName}}
                </td>

                <td>
                    {{transaction.order_id}}
                </td>

                <td>
                    {{transaction.total_bayar | currency('Rp') }}
                </td>

                <td>
                  <button class="btn btn-primary" @click="detailTransaksi(transaction)">Detail</button>
                </td>

              </tr>
            </tbody>
          </table>
        </div>

        <!-- modal detail transaksi -->
        <div class="modal" tabindex="-1" role="dialog" id="modal-transaksi">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Detail Transaksi</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body" v-if="transaksi">
                <div class="transaksi-detail">
                  <p>Nama Pembeli : <span>{{transaksi.nama}}</span></p>
                  <p>Nama Product : <span>{{transaksi.product.productName}}</span></p>
                  <p>Id Penjual : <span>{{transaksi.product.penjual_id}}</span></p>
                  <p>Jumlah Pembelian : <span>{{transaksi.product.productQuantity}}</span></p>
                  <p>Jumlah yang dibayarkan : <span>{{transaksi.total_bayar | currency('Rp')}}</span></p>
                  <p>Bukti Pembayaran : </p>
                </div>             
                <div class="mx-auto" style="width: 300px;">
                  <v-zoomer style="width: 300px; height: 400px;">
                    <img
                      :src="transaksi.bukti_bayar[0]"
                      style="object-fit: contain; width: 100%; height: 100%;"
                    >
                  </v-zoomer>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-danger" @click="deleteTransaksi">Hapus Data</button>
              </div>
            </div>
          </div>
        </div>
        <!-- end modal detail transaksi -->


    </div>
</template>

<script>
import {fb,db} from '../firebase';

export default {
    name: "Transaksi",
    data() {
        return {
            transactions: [],
            transaksi: null
        }
    },
    firestore() {
        return {
            transactions: db.collection('orders')
        }
    },
    methods: {
      detailTransaksi(transaction) {
        // console.log('isi', transaction)
        $("#modal-transaksi").modal("show")
        this.transaksi = transaction
      },
      deleteTransaksi() {
        Swal.fire({
          title: 'Apakah anda yakin?',
          text: "Data yang sudah dihapus tidak bisa dikembalikan",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, saya yakin!'
        }).then((result) => {
          if (result.value) {
            this.$firestore.transactions.doc(this.transaksi.id).delete()
              .then(() => {
                Swal.fire(
                  'Terhapus!',
                  'Data Transaksi berhasil terhapus.',
                  'success'
                )
                $("#modal-transaksi").modal("hide")
              })
          }
        })
      }
    }
}
</script>

<style scoped lang="scss" src="../styles/Transaksi.scss">