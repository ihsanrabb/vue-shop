<template>
    <div>
        <Navbar />


        <div class="container mt-5" >
            <div class="card mb-3" v-for="(info, index) in informations" :key="index">
                <div class="row no-gutters box-news" @click="detailNews(info.id)">
                    <div class="col-md-4">
                    <img :src="info.imgInfo" class="card-img" alt="...">
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
    </div>
</template>

<script>
import {fb,db} from '../firebase';

export default {
    name: "news",
    data() {
        return {
            informations : [],
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
        }
    }
}
</script>

<style scoped lang="scss" src="../styles/News.scss">