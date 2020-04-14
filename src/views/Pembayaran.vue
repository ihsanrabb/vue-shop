<template>
    <div>
        <Navbar />
        
        <div class="container mt-4">
            <h1>Alamat Pengiriman</h1>


            <form>
                <div class="form-group">
                    <label for="nama">Nama Lengkap</label>
                    <input 
                        type="text" 
                        v-model.trim="$v.formData.nama.$model" 
                        class="form-control"
                        :class="{invalid: $v.formData.nama.$error}" 
                        id="nama" 
                        placeholder="Nama Lengkap">
                    <small class="form-text" v-if="$v.formData.nama.$error">Nama harus diisi</small>
                </div>
                <div class="form-group">
                    <label for="nama">Email</label>
                    <input 
                        type="email"
                        v-model.trim="$v.formData.email.$model" 
                        class="form-control"
                        :class="{invalid: $v.formData.email.$error}" 
                        id="email" 
                        placeholder="Email">
                    <small class="form-text" v-if="$v.formData.email.$error">Pastikan alamat email yang anda masukkan benar</small>    
                </div>
                <div class="form-group">
                    <label for="telepon">No. Telepon</label>
                    <input 
                        type="text" 
                        v-model.trim="$v.formData.noTelp.$model" 
                        class="form-control"
                        :class="{invalid: $v.formData.noTelp.$error}"  
                        id="telepon" 
                        placeholder="No. Telepon">
                    <small class="form-text" v-if="$v.formData.noTelp.$error">Nomer Telepon harus diisi</small>
                </div>
                <div class="form-group">
                    <label for="alamat">Alamat</label>
                    <textarea 
                        class="form-control" 
                        v-model.trim="$v.formData.alamat.$model"
                        :class="{invalid: $v.formData.alamat.$error}"   
                        id="alamat" rows="3">
                    </textarea>
                    <small class="form-text" v-if="$v.formData.alamat.$error">Alamat harus diisi</small>
                </div>
                 <div class="form-group">
                    <label for="provinsi">Provinsi</label>
                    <select id="provinsi" class="form-control" v-model="selectedProvinsi" @change="onChangeProv($event)">
                        <option v-for="(option, index) in optionsProvinsi" :value="option.province_id" :key="index">{{option.province}}</option>
                    </select>
                </div>
                 <div class="form-group">
                    <label for="provinsi">Kota</label>
                    <select id="kota" class="form-control" v-model="selectedKota" @change="onChangeKota($event)">
                        <option v-for="(option,index) in optionsKota" :value="option.city_id" :key="index">{{option.city_name}}</option>
                        <option selected>--Pilih Kota--</option>
                    </select>
                </div>
                <!-- <div class="form-group">
                    <label for="provinsi">Kecamatan</label>
                    <select id="kota" class="form-control" v-model="selectedKecamatan" >
                        <option v-for="(option, index) in optionsKecamatan" :value="option.id" :key="index">{{option.nama}}</option>
                        <option selected>--Pilih Kecamatan--</option>
                    </select>
                </div> -->

                <div class="form-group">
                    <label for="pos">Kode Pos</label>
                    <input 
                        type="text" 
                        v-model="$v.formData.kodePos.$model" 
                        class="form-control"
                        :class="{invalid: $v.formData.kodePos.$error}"    
                        id="pos" 
                        placeholder="Kode pos">
                    <small class="form-text" v-if="$v.formData.kodePos.$error">Kode Pos harus diisi</small>
                </div>

                 <button type="button" class="btn btn-primary" @click="toReview">Lanjutkan</button>
            </form>

        </div>

        <Footer />
    </div>
</template>

<script>
import { required, email, numeric } from 'vuelidate/lib/validators'
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
            email: '',
            selectedProvinsi: '',
            optionsProvinsi: [],
            selectedKota: '',
            optionsKota: [],
            selectedKecamatan: '',
            optionsKecamatan: []
        }
    },
    validations: {
        formData: {
            nama: {
                required
            },
            email: {
                required,
                email
            },
            noTelp: {
                required,
                numeric
            },
            alamat: {
                required
            },
            kodePos: {
                required,
                numeric
            }
        }
        
    },
    methods: {
        getKota() {
            console.log('helo kota')
        },
        onChangeProv(event) {
            let idProvinsi = event.target.value
            console.log('isi prov', idProvinsi)

            let config = {
                headers: {
                    "key": "3f102f5b68cc23333365e9df69abf115",
                }
            }
            
            axios.get(`https://cors-anywhere.herokuapp.com/https://api.rajaongkir.com/starter/city?province=${idProvinsi}`, config)
                .then((res) => {
                    let kota = res.data.rajaongkir.results;
                    this.optionsKota = kota
                    // console.log('hasil kota', res)
                }).catch(err => console.log(err))
        },
        onChangeKota(event) {
            let idKabupaten = event.target.value
            // axios.get(`http://dev.farizdotid.com/api/daerahindonesia/provinsi/kabupaten/${idKabupaten}/kecamatan`)
            // .then(res => {
            //     this.optionsKecamatan = res.data.kecamatans
            // })
            // .catch(err => console.log(err))
        },
        toReview() {
             console.log('submit!')
             this.$v.$touch()
             if (this.$v.$invalid) {
                 console.log('error submit')
             } else {
                 console.log('sukses submit')
                    const data = {
                        nama: this.formData.nama,
                        email: this.formData.email,
                        noTelp: this.formData.noTelp,
                        alamat: this.formData.alamat,
                        kodePos: this.formData.kodePos,
                        idKota : this.selectedKota
                    }
                    window.localStorage.setItem('pengirimanHolder' , JSON.stringify(data))
                    this.$router.push({path: '/reviewPembayaran'})
             }
          
         }
    },
    mounted() {
            let config = {
                headers: {
                    "key": "3f102f5b68cc23333365e9df69abf115",
                }
            }

            axios.get("https://cors-anywhere.herokuapp.com/https://api.rajaongkir.com/starter/province", config)
                .then((res) => {
                    // console.log('raja ongkir', res.data.rajaongkir.results)
                    let provinsi = res.data.rajaongkir.results;
                    this.optionsProvinsi = provinsi
                }).catch(err => console.log(err))
    }
}
</script>

<style scoped lang="scss" src="../styles/Pembayaran.scss">