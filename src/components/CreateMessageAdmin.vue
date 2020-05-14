<template>
    <div class="container" style="margin-bottom: 30px">
        <div class="form-group">
            <div class="row">
                <div class="col-md-8">
                    <input type="text" name="message" class="form-control" placeholder="Enter message ... " v-model="newMessage" @keyup.enter="createMessage">
                </div>
                <div class="col-md-4">
                    <button class="btn btn-danger mr-3" @click="endChat">Selesai</button>
                    <button class="btn btn-success" type="submit" name="action" @click="createMessage">Submit</button>
                </div>
            </div>
            
            <p class="text-danger" v-if="errorText">{{ errorText }}</p>
        </div>
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
            var chatRef = db.collection('messages').where("user_id", "==", this.userChatId);
            let batch = db.batch()

            Swal.fire({
                title: 'Apakah Anda yakin?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Selesai!'
            }).then((result) => {
                if (result.value) {
                    chatRef.get()
                        .then(snapshot => {
                            snapshot.docs.forEach(doc => {
                                batch.delete(doc.ref)
                            })
                            return batch.commit()
                        })
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