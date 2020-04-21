<template>
  <div class="container">
      
    <div class="intro">
        <div class="row justify-content-center align-items-center">
            <div class="col-md-6">
                    <h3>Chat List Here</h3>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Earum repellat, exercitationem odio blanditiis dolorum omnis! Nobis perspiciatis possimus laudantium ut, saepe illum quos, consequatur, ipsa facere error voluptatibus recusandae aliquam?</p>
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
                  <button class="btn btn-primary" @click="goToChat(chat.id)">Chat</button>
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