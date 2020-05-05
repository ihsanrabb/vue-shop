<template>
    <div class="container" style="margin-bottom: 30px">
        <form @submit.prevent="createMessage"> 
            <div class="form-group">
                <div class="row">
                    <div class="col-md-8">
                        <input type="text" name="message" class="form-control" placeholder="Enter message ... " v-model="newMessage">
                    </div>
                    <div class="col-md-4">
                        <button class="btn btn-danger mr-3" @click="endChat">Selesai</button>
                        <button class="btn btn-success" type="submit" name="action">Submit</button>
                    </div>
                </div>
                
                <p class="text-danger" v-if="errorText">{{ errorText }}</p>
            </div>
            
        </form>
    </div>
</template>

<script>
import {fb,db} from '../firebase';

export default {
    name: "CreateMessage",
    props: ['name', 'userChatId'],
    data() {
        return {
            newMessage: null,
            errorText: null,
            chat: []
        }
    },
    firestore() {
        return {
            userProfile : db.collection('profiles').doc(this.userChatId)
        }
    },
    methods: {
        createMessage() {
            let user = fb.auth().currentUser;

            if (this.newMessage) {
                db.collection('messages').add({
                    user_id: this.userChatId,
                    message: this.newMessage,
                    name: this.name,
                    timestamp: Date.now()
                }).catch(err => {
                    console.log(err)
                });
                this.newMessage = null;
                this.errorText = null;
            } else {
                this.errorText = "A message must be fill";
            }
        },
        endChat() {
            Swal.fire({
                title: 'Apakah Anda yakin?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Selesai!'
            }).then((result) => {
                if (result.value) {
                    this.$firestore.userProfile.update({isMessage : false})
                    .then(() => {
                        this.$router.push('/adminPage/chatList')
                    })      
                }
            })
        }
    }
}
</script>