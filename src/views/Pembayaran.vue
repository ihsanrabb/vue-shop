<template>
    <div>
        <Navbar />
        
        <div class="container mt-4">
            <h1>Alamat Pengiriman</h1>


            <form>
                <div class="form-group">
                    <label for="nama">Nama Lengkap</label>
                    <input type="text" v-model="formData.nama" class="form-control" id="nama" placeholder="Nama Lengkap">
                </div>
                <div class="form-group">
                    <label for="nama">Email</label>
                    <input type="email" v-model="formData.email" class="form-control" id="email" placeholder="Email">
                </div>
                <div class="form-group">
                    <label for="telepon">No. Telepon</label>
                    <input type="text" v-model="formData.noTelp" class="form-control" id="telepon" placeholder="No. Telepon">
                </div>
                <div class="form-group">
                    <label for="alamat">Alamat</label>
                    <textarea class="form-control" v-model="formData.alamat" id="alamat" rows="3"></textarea>
                </div>
                 <div class="form-group">
                    <label for="provinsi">Provinsi</label>
                    <select id="provinsi" class="form-control" v-model="selectedProvinsi" @change="onChangeProv($event)">
                        <option v-for="option in optionsProvinsi" :value="option.id">{{option.nama}}</option>
                        <option selected>--Pilih Provinsi--</option>
                    </select>
                    
                </div>
                 <div class="form-group">
                    <label for="provinsi">Kota</label>
                    <select id="kota" class="form-control" v-model="selectedKota" @change="onChangeKota($event)">
                        <option v-for="option in optionsKota" :value="option.id">{{option.nama}}</option>
                        <option selected>--Pilih Kota--</option>
                    </select>
                </div>
                 <div class="form-group">
                    <label for="provinsi">Kecamatan</label>
                    <select id="kota" class="form-control" v-model="selectedKecamatan" >
                        <option v-for="option in optionsKecamatan" :value="option.id">{{option.nama}}</option>
                        <option selected>--Pilih Kecamatan--</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="pos">Kode Pos</label>
                    <input type="text" v-model="formData.kodePos" class="form-control" id="pos" placeholder="Kode pos">
                </div>

                 <button type="button" class="btn btn-primary" @click="toReview">Lanjutkan</button>
            </form>

        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "Pembayaran",
    data() {
        return {
            formData: {
                nama: '',
                email: '',
                noTelp: '',
                alamat: '',
                kodePos: ''
            },
            selectedProvinsi: '',
            optionsProvinsi: [],
            selectedKota: '',
            optionsKota: [],
            selectedKecamatan: '',
            optionsKecamatan: []
        }
    },
    methods: {
        onChangeProv(event) {
            let idProvinsi = event.target.value
            axios.get(`http://dev.farizdotid.com/api/daerahindonesia/provinsi/${idProvinsi}/kabupaten`)
            .then(res => {
                this.optionsKota = res.data.kabupatens
            })
            .catch(err => console.log(err))
        },
        onChangeKota(event) {
            let idKabupaten = event.target.value
            axios.get(`http://dev.farizdotid.com/api/daerahindonesia/provinsi/kabupaten/${idKabupaten}/kecamatan`)
            .then(res => {
                this.optionsKecamatan = res.data.kecamatans
            })
            .catch(err => console.log(err))
        },
         toReview() {
             const data = {
                 nama: this.formData.nama,
                 email: this.formData.email,
                 noTelp: this.formData.noTelp,
                 alamat: this.formData.alamat,
                 kodePos: this.formData.kodePos
             }
             window.localStorage.setItem('pengirimanHolder' , JSON.stringify(data))
             this.$router.push({path: '/reviewPembayaran'})
         }
    },
    mounted() {
        axios.get("http://dev.farizdotid.com/api/daerahindonesia/provinsi")
            .then(res => {
                this.optionsProvinsi = res.data.semuaprovinsi
            })
            .catch(err => console.log(err))
    }
}
</script>

<style scoped lang="scss" src="../styles/Pembayaran.scss">