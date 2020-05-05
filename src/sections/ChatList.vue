<template>
  <div class="container">
      
    <div class="intro">
        <div class="row justify-content-center align-items-center">
            <div class="col-md-6">
                    <h3>Live Chat Admin</h3>
                    <p>Lihat siapa saja yang chat admin disini! kamu bisa lihat daftar nama dan bisa membuka pesan mereka untuk membalas pesan mereka secapat mungkin.</p>
            </div>
            <div class="col-md-6">
                <img src="../assets/svg/orders.svg" alt="" class="img-fluid">
            </div>  
        </div>
    </div>

    <h3 class="d-inline-block">Chat List</h3>


    <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Timestamp</th>
                <th>Modify</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(chat,index) in userChat" :key="index">
                <td>
                  {{chat.name}}
                </td>

                <td>
                  {{chat.id}}
                </td>

                <td>
                  <button class="btn btn-primary" @click="goToChat(chat.id)">Buka Chat</button>
                </td>

              </tr>
            </tbody>
          </table>
        </div>

  </div>
</template>

<script>
import {fb,db} from '../firebase';

export default {
    name: "chatList",
    data() {
        return {
            userChat: []
        }
    },
    firestore() {
        return {
            userChat : db.collection('profiles').where("isMessage", "==", true)
        }
    },
    methods: {
        goToChat(id) {
            this.$router.push({name:'adminChat', query: {id}})
        }
    }
}
</script>