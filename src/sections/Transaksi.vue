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
                <th>ID ORDER</th>
                <th>Tgl Pembayaran</th>
                <th>Metode Pembayaran</th>
                <th>Nominal</th>
                <th>Modify</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(transaction,index) in visiblePembayaran" :key="index">
                <td>
                  {{transaction.order_id}}
                </td>

                <td>
                  {{transaction.tgl_pembayaran | moment }}
                </td>

                <td>
                    {{transaction.metode_pembayaran}}
                </td>

                <td>
                    {{transaction.nominal | currency('Rp') }}
                </td>

                <td>
                  <button class="btn btn-primary" @click="detailTransaksi(transaction)">Detail</button>
                </td>

              </tr>
            </tbody>
          </table>
        </div>

        <pagination 
          :data="pembayaran"
          @page:update="updatePage"
          :currentPage="currentPage"
          :pageSize="pageSize"
        />

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
                  <p>Order Id : <span>{{transaksi.order_id}}</span></p>
                  <p>Tanggal Pembayaran : <span>{{transaksi.tgl_pembayaran}}</span></p>
                  <p>Metode Pembayaran : <span>{{transaksi.metode_pembayaran}}</span></p>
                  <p>Nominal Pembayaran : <span>{{transaksi.nominal | currency('Rp')}}</span></p>
                  <!-- <p>Harga Produk : <span>{{transaksi.product.productPrice | currency('Rp')}}</span></p> -->
                  <!-- <p>Jumlah Pembelian : <span>{{transaksi.product.productQuantity}}</span></p> -->
                  <!-- <p>Jumlah yang dibayarkan : <span>{{transaksi.total_bayar | currency('Rp')}}</span></p> -->
                  <div class="row pr-4">
                    <div class="col-md-6">
                        <input type="text" class="form-control" v-model="transaksi.status_bayar" readonly>
                    </div>
                    <div class="col-md-3">
                        <button type="button" class="btn btn-danger" @click="onGagal">Gagal</button>
                    </div>
                    <div class="col-md-3">
                        <button type="button" class="btn btn-success" @click="onVerifikasi">Verifikasi</button>
                    </div>
                </div>
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
                <button type="button" class="btn btn-danger" @click="deleteTransaksi" hidden>Hapus Data</button>
              </div>
            </div>
          </div>
        </div>
        <!-- end modal detail transaksi -->


    </div>
</template>

<script>
import {fb,db} from '../firebase';
import Pagination from '@/components/Pagination'

export default {
    name: "Transaksi",
    components: {
      Pagination
    },
    data() {
        return {
            transaksi: null,
            pembayaran: [],
            currentPage: 0,
            pageSize: 12
        }
    },
    firestore() {
        return {
            pembayaran: db.collection('pembayaran').orderBy("tgl_pembayaran", "desc")
        }
    },
    methods: {
      detailTransaksi(transaction) {
        $("#modal-transaksi").modal("show")
        this.transaksi = transaction
      },
      updatePage(pageNumber) {
        this.currentPage = pageNumber;
      },
      onVerifikasi() {
        db.collection("pembayaran").doc(this.transaksi.id).update({
            status_bayar: "Verifikasi"
        })
        .then(() => {
          console.log('berhasil')
          $("#modal-transaksi").modal("hide")
          Toast.fire({
              icon: 'success',
              title: 'Berhasil diverifikasi'
          })
        })
        .catch((err) => console.log(err))
      },
      onGagal() {
          db.collection("pembayaran").doc(this.transaksi.id).update({
            status_bayar: "Pembayaran Gagal"
          })
          .then(() => {
            console.log('berhasil')
            $("#modal-transaksi").modal("hide")
            Toast.fire({
                icon: 'success',
                title: 'Berhasil diverifikasi'
            })
          })
          .catch((err) => console.log(err))
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
            db.collection("pembayaran").doc(this.transaksi.id).delete()
              .then(() => {
                Swal.fire(
                  'Terhapus!',
                  'Data Transaksi berhasil terhapus.',
                  'success'
                )
                $("#modal-transaksi").modal("hide")
              })
              .catch((error) => {
                console.error("Error removing document: ", error);
              });
          }
        })
      }
    },
    computed: {
      visiblePembayaran() {
        return this.pembayaran.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize)
        if (this.pembayaran.length == 0 && this.currentPage > 0) {
          return this.updatePage(this.currentPage - 1)
        }
      }
    }
}
</script>

<style scoped lang="scss" src="../styles/Transaksi.scss">