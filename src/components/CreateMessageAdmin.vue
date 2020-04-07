<template>
    <div class="container" style="margin-bottom: 30px">
        <form @submit.prevent="createMessage"> 
            <div class="form-group">
                <input type="text" name="message" class="form-control" placeholder="Enter message ... " v-model="newMessage">
                <p class="text-danger" v-if="errorText">{{ errorText }}</p>
            </div>
            <button class="btn btn-success" type="submit" name="action">Submit</button>
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
            errorText: null
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
        }
    }
}
</script>