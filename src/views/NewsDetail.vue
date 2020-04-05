<template>
    <div>
        <Navbar />

        <div class="container">
            <div class="box-detail">
                <img :src="newsDetail.imgInfo" class="img-fluid" alt="...">
                <h5 class="card-title judul-news">{{newsDetail.judulInfo}}</h5>
                <p class="card-text"><small class="text-muted">{{newsDetail.tglInfo}}</small></p>
                <span v-html="newsDetail.deskripsiInfo"></span>
            </div>
        </div>
    </div>
</template>

<script>
import {fb,db} from '../firebase';

export default {
    name: "newsDetail",
    data() {
        return {
            newsDetail : null
        }
    },
    firestore() {
        let infoId = this.$route.query.infoId

        return {
            newsDetail: db.collection('informasi').doc(infoId)
        }
    }
}
</script>

<style scoped lang="scss" src="../styles/NewsDetail.scss">