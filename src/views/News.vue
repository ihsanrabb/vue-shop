<template>
    <div>
        <Navbar />

       <div v-if="loadingWeather" class="loading-weather"></div>
       <a  v-else class="weatherwidget-io" href="https://forecast7.com/en/21d3939d86/mecca/" data-label_1="MECCA" data-label_2="WEATHER" data-theme="original" >MECCA WEATHER</a>
        
        <div class="container mt-5" >
            <div class="card mb-3" v-for="(info, index) in informations" :key="index">
                <div class="row no-gutters box-news" @click="detailNews(info.id)">
                    <div class="col-md-4">
                    <img v-lazy="info.imgInfo" class="card-img" alt="...">
                    </div>
                    <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title judul-news">{{info.judulInfo}}</h5>
                        <p class="card-text"><small class="text-muted">{{info.tglInfo}}</small></p>
                        <span class="card-text">{{info.wording}}</span>
                    </div>
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </div>
</template>

<script>
import {fb,db} from '../firebase';

export default {
    name: "news",
    data() {
        return {
            informations : [],
            loadingWeather: false
        }
    },
    firestore() {
        return {
            informations :  db.collection('informasi')
        }
    },
    methods: {
        detailNews(infoId) {
            console.log('to detail', infoId)
            this.$router.push({name:'newsDetail', query: {infoId}})
        },
    },
    mounted() {
        this.loadingWeather = true
        var self= this
        
        setInterval(() => {
            this.loadingWeather = false
        }, 5000);

        !function(d,s,id){
            var js,fjs=d.getElementsByTagName(s)[0];
            // if(!d.getElementById(id)){
                js=d.createElement(s);
                js.id=id;
                js.src='https://weatherwidget.io/js/widget.min.js';
                fjs.parentNode.insertBefore(js,fjs);
            // }

            js.onload = () => {
             // script has loaded, you can now use it safely
                // self.loadingWeather = false
            }
        }
        (document,'script','weatherwidget-io-js');
    }
}
</script>

<style scoped lang="scss" src="../styles/News.scss">