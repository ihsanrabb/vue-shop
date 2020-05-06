<template>
    <div class="container" style="margin-bottom: 30px">
        <form @submit.prevent="createMessage"> 
            <div class="form-group">
                <div class="row">
                    <div class="col-md-8">
                        <input type="text" name="message" class="form-control" placeholder="Enter message ... " v-model="newMessage">
                    </div>
                    <div class="col-md-4">
                        <button class="btn btn-danger mr-4" @click="endChat">End Chat</button>
                        <button class="btn btn-primary" type="submit" name="action">Submit</button>
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
    props: ['name', 'userId'],
    data() {
        return {
            newMessage: null,
            errorText: null
        }
    },
    firestore() {
        return {
            userProfile : db.collection('profiles').doc(this.userId)
        }
    },
    methods: {
        createMessage() {
            let user = fb.auth().currentUser;

            if (this.newMessage) {
                db.collection('messages').add({
                    user_id: this.userId,
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
            this.$firestore.userProfile.update({isMessage : false})
                .catch((err) => console.log(err))     
        }
    }
}
</script>