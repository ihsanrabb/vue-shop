<template>
    <div>
        <Navbar />

        <img src="../assets/img/delivery.jpeg" style="width: 40%" class="pt-5"/>
        <h1>Terima kasih pesanan kamu sedang dalam proses</h1>
        <!-- <button type="button" class="btn btn-info"><a href="/">Kembali ke Halama Utama</a></button> -->
        <router-link to="/" tag="button" class="btn btn-info"> Kembali ke Halama Utama </router-link>
    </div>
</template>

<style lang="scss" scoped>
a {
    text-decoration: none;
    color: #fff;
}
a:hover{
    color: inherit;
    text-decoration: none;
}
@media only screen and (max-width: 768px) {
    h1 {
        font-size: 30px;
    }
}
</style>