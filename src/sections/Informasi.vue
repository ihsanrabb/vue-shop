<template>
  <div class="informasi">
    <div class="container pt-3">
        <div class="intro">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-6">
                     <h3>Informasi page</h3>
                     <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum repellat, exercitationem odio blanditiis dolorum omnis! Nobis perspiciatis possimus laudantium ut, saepe illum quos, consequatur, ipsa facere error voluptatibus recusandae aliquam?</p>
                </div>
                <div class="col-md-6">
                    <img src="../assets/svg/overview.svg" alt="" class="img-fluid">
                </div>  
            </div>
        </div>

        <h3 class="d-inline-block">Product List</h3>
        <button @click="addInformasi()" class="btn btn-primary float-right">Tambah Informasi</button>

        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Judul Informasi</th>
                <th>Dibuat Tanggal</th>
                <th>Modify</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(info,index) in informations" :key="index">
                <td>
                  {{info.judulInfo}}
                </td>

                <td>
                  {{info.tglInfo}}
                </td>

                <td>
                  <button @click="editInformasi(info)" class="btn btn-primary">Edit</button>
                   <button @click="deleteInfo(info)" class="btn btn-danger">Delete</button>
                </td>

              </tr>
            </tbody>
          </table>
        </div>

        <!-- modal informasi -->

        <div class="modal pt-5" tabindex="-1" role="dialog" id="modalInformasi">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit Informasi</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="judul">Judul Informasi</label>
                            <input type="text" class="form-control" id="judul" placeholder="Judul Informasi" v-model="infoData.judulInfo">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="tglInfo">Tanggal Dibuat</label>
                            <input type="text" class="form-control" id="tglInfo" placeholder="Tanggal Dibuat" v-model="infoData.tglInfo" readonly>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="imgInfo">Foto Informasi</label>
                        <input type="file" class="form-control-file" id="imgInfo" @change="uploadImg">
                    </div>
                    <div class="form-group">
                      <label for="wordingInfo">Deskripsi Informasi</label>
                      <textarea class="form-control" id="wordingInfo" rows="3" v-model="infoData.wording" maxlength="160"></textarea>
                    </div>
                    <div class="form-group">
                      <vue-editor id="editor2" v-model="infoData.deskripsiInfo"></vue-editor>
                    </div>
                </div>
                <div class="modal-footer">
                    <button 
                      type="button" 
                      class="btn btn-secondary" 
                      data-dismiss="modal">
                      Close</button>
                    <button 
                      type="button" 
                      class="btn btn-primary"
                      v-if="modal == 'add'"
                      @click="saveInfo()"
                      >Save changes</button>
                    <button 
                      type="button" 
                      class="btn btn-success"
                      v-if="modal == 'edit'"
                      @click="updateInfo()"
                      >Apply changes</button>
                </div>
                </div>
            </div>
        </div>

        <!-- end modal informasi -->

    </div>
  </div>
</template>

<script>
import { VueEditor, Quill } from 'vue2-editor';
import {fb,db} from '../firebase';

export default {
  name: "informasi",
  components: {
      VueEditor
  },
  data() {
      return { 
        informations: [],
        infoData : {
          deskripsiInfo: "",
          judulInfo: "",
          tglInfo: "",
          imgInfo: "",
          wording: ""
        },
        modal: null
      }
  },
  firestore() {
      return {
          informations :  db.collection('informasi')
      }
  },
  methods: {
      formatDate(date) {
         let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear(),
            seconds = d.getSeconds(),
            minutes = d.getMinutes(),
            hour = d.getHours();

            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
            if (minutes < 10) minutes = '0' + minutes;
            if (seconds < 10) seconds = '0' + seconds;

            let formatWaktu = [hour, minutes, seconds].join(':');
            let formatTanggal = [day, month, year].join('-');

            return [formatTanggal, formatWaktu].join(', ');
      },
      addInformasi() {
        this.modal = "add";
        const date = new Date()
        let createdDate = this.formatDate(date)

        this.infoData.tglInfo = createdDate;

         $("#modalInformasi").modal('show');
      },
      editInformasi(info) {
        this.modal = "edit";
        this.infoData = info;
        const date = new Date()
        let createdDate = this.formatDate(date);
        this.infoData.tglInfo = createdDate;
        
        $("#modalInformasi").modal('show');
      },
      deleteInfo(info) {
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
            this.$firestore.informations.doc(info.id).delete()
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
      },
      uploadImg(e) {
        if (e.target.files[0]) {
          let file = e.target.files[0];

          var storageRef = fb.storage().ref('informasi/' + file.name);

          let uploadTask = storageRef.put(file);
    
          uploadTask.on('state_changed', (snapshot) => {  

          }, (error) => {
            console.log(error)
          },() => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.infoData.imgInfo = downloadURL;
              console.log('File available at', downloadURL);  
            });
          });
        }
      },
      saveInfo() {
        const data = {
          "judulInfo" : this.injudulInfo,
          "tglInfo" : this.tglInfo,
          "deskripsiInfo" : this.detailInfo,
          "imgInfo" : this.imgInfo 
        }

        this.$firestore.informations.add(this.infoData)
        .then(() => {
          $('#modalInformasi').modal('hide');
          Toast.fire({
            icon: 'success',
            title: 'Add successfully'
          })
        }).catch((err) => console.log(err));
      },
      updateInfo() {
        this.$firestore.informations.doc(this.infoData.id).update(this.infoData)
          .then(() => {
            Toast.fire({
            icon: 'success',
            title: 'update successfully'
          })

            $('#modalInformasi').modal('hide');
          });
      }
  }
};
</script>

<style lang="scss" scoped>
.form-group {
  label {
    text-align: left;
  }
} 

</style>