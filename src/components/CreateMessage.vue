<template>
    <div class="container" style="margin-bottom: 30px">
        <div class="form-group">
            <div class="d-flex bd-highlight">
                <div class="p-2 flex-grow-1 bd-highlight">
                    <input type="text" name="message" class="form-control" placeholder="Enter message ... " v-model="newMessage" @keyup.enter="createMessage">
                </div>
                <div class="p-2 bd-highlight btn-end">
                    <button class="btn btn-danger mr-4" @click="endChat">End Chat</button>
                </div>
                <div class="p-2 bd-highlight">
                    <button class="btn btn-primary" name="action" @click="createMessage"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
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
            var chatRef = db.collection('messages').where("user_id", "==", this.userId);
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
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@media only screen and (max-width: 768px) {
    .btn-end {
        display: none
    }
}
</style>