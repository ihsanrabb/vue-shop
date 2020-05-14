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
                        type="number" 
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
                    <select 
                        id="provinsi" 
                        class="form-control" 
                        :class="{invalid: $v.formData.provinsi.$error}" 
                        v-model="selectedProvinsi" 
                        @change="onChangeProv($event)"
                    >
                        <option 
                            v-for="(option, index) in optionsProvinsi" 
                            :value="option.province_id" 
                            :key="index"
                            :data-provinsi="option.province">
                        {{option.province}}</option>
                    </select>
                    <small class="form-text" v-if="$v.formData.provinsi.$error">Pilih Provinsi terlebih dahulu</small>
                </div>
                <LoadingCircle v-if="loadingKota" class="w-100" />
                <div v-else>
                    <div class="form-group">
                        <label for="provinsi">Kota</label>
                        <select 
                            id="kota" 
                            class="form-control" 
                            v-model="selectedKota"
                            :class="{invalid: $v.formData.kota.$error}" 
                            @change="onChangeKota($event)"
                        >
                            <option 
                                v-for="(option,index) in optionsKota" 
                                :value="option.city_id" 
                                :key="index"
                                :data-nama-kota="option.city_name"
                                :data-kode-pos="option.postal_code">
                            {{option.city_name}}</option>
                        </select>
                        <small class="form-text" v-if="$v.formData.provinsi.$error">Pilih Kota terlebih dahulu</small>
                    </div>
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
import LoadingCircle from "@/components/LoadingCircle";
let url = 'https://cors-anywhere.herokuapp.com/https://api.rajaongkir.com'

export default {
    name: "Pembayaran",
    components: {
        LoadingCircle
    },
    data() {
        return {
            formData: {
                nama: '',
                email: '',
                noTelp: '',
                alamat: '',
                kodePos: '',
                provinsi: '',
                kota: ''
            },
            email: '',
            selectedProvinsi: '',
            optionsProvinsi: [],
            selectedKota: '',
            optionsKota: [],
            selectedKecamatan: '',
            optionsKecamatan: [],
            loadingKota : false
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
            provinsi: {
                required
            },
            kota: {
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
            let namaProvinsi = $("#provinsi").find(':selected').attr('data-provinsi')
            this.formData.provinsi = namaProvinsi
            this.loadingKota = true
            
            let config = {
                headers: {
                    "key": "3f102f5b68cc23333365e9df69abf115",
                }
            }
            
            axios.get(`${url}/starter/city?province=${idProvinsi}`, config)
                .then((res) => {
                    let kota = res.data.rajaongkir.results;
                    this.optionsKota = kota
                    this.loadingKota = false
                }).catch(err => console.log(err))
        },
        onChangeKota() {
            let namaKota = $("#kota").find(':selected').attr('data-nama-kota')
            let kodePos = $("#kota").find(':selected').attr('data-kode-pos')

            this.formData.kota = namaKota
            this.formData.kodePos = kodePos
        },
        toReview() {
            //  console.log('submit!')
             this.$v.$touch()
             if (this.$v.$invalid) {
                 console.log('error submit')
             } else {
                //  console.log('sukses submit')
                    const data = {
                        nama: this.formData.nama,
                        email: this.formData.email,
                        noTelp: this.formData.noTelp,
                        alamat: this.formData.alamat,
                        provinsi: this.formData.provinsi,
                        kota: this.formData.kota,
                        kodePos: this.formData.kodePos,
                        idKota : this.selectedKota
                    }
                    window.localStorage.setItem('pengirimanHolder' , JSON.stringify(data))
                    this.$router.push({path: '/checkoutShipment'})
             }
          
         }
    },
    mounted() {
        let config = {
            headers: {
                "key": "3f102f5b68cc23333365e9df69abf115",
            }
        }

        axios.get(`${url}/starter/province`, config)
            .then((res) => {
                // console.log('raja ongkir', res.data.rajaongkir.results)
                let provinsi = res.data.rajaongkir.results;
                this.optionsProvinsi = provinsi
            }).catch(err => console.log(err))
    }
}
</script>

<style scoped lang="scss" src="../styles/Pembayaran.scss">