<template>
    <div>
        <Navbar />
        <div class="container chat mt-4">

            <div v-if="userChat.isMessage == false">
                <img src="../assets/svg/empty-chat.svg"  class="empty-icon"/>
                <p>Kamu belum melulai percakapan dengan admin.<br> Yuk, klik tombol mulai chat sekarang!</p>
                <button class="btn btn-primary" @click="startChat">Mulai Chat!</button>
            </div>

            <div v-else>
                <h2 class="text-primary text-center pt-1 pb-3">Chat Admin</h2>
                <div class="card">
                    <div class="card-body">
                        <p class="text-secondary nomessage" v-if="messages.length == 0">
                            [No messages yet!]
                        </p>
                        <div class="messages" v-chat-scroll="{always: false, smooth: true}">
                            <div v-for="message in messages" :key="message.id">
                                <span v-if="message.name == 'Admin'" class="text-danger">[{{ message.name }}]</span>
                                <span v-else class="text-info">[{{ message.name }}]</span>
                                <span class="pl-2">{{message.message}}</span>
                                <span class="text-secondary time">{{ message.timestamp | moment }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="card-action">
                        <CreateMessage :name="name" :userId="user_uid" />
                    </div>
                </div>
            </div>

            
        </div>

    </div>
</template>

<script>
import CreateMessage from "../components/CreateMessage.vue"
import {fb,db} from '../firebase';

export default {
    name: "Chat",
    components: {
        CreateMessage
    },
    data() {
        return {
            messages: [],
            name: "",
            userChat: {},
            user_uid: null
        }
    },
    firestore() {
        let user = fb.auth().currentUser;
        return {
            messages : db.collection('messages').where("user_id", "==", user.uid).orderBy('timestamp'),
            userChat : db.collection('profiles').doc(user.uid),
        }
    },
    methods: {
        startChat() {
            const data = {
                isMessage : true
            }
            this.$firestore.userChat.update(data)
                .then(()=> console.log('sukses'))
                .catch((err)=> console.log(err));
            }
    },
    created() {
        let user = fb.auth().currentUser;
        if (user) {
        this.user_uid = user.uid
        let docRef = db.collection("profiles").doc(user.uid);
        
            docRef.get().then((doc) => {
                if (doc.exists) {
                    this.name = doc.data().name
                } else {
                    console.log("No such document!");
                }
            }).catch(function(error) {
                console.log("Error getting document:", error);
            });
        } 
    },
}
</script>

<style scoped lang="scss" src="../styles/Chat.scss">