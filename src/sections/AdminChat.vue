<template>
    <div class="container chat">
        <h2 class="text-primary text-center">Admin Real-time chat</h2>
        <div class="card">
            <div class="card-body">
                <p class="text-secondary nomessage" v-if="messages.length == 0">
                    [No messages yet!]
                </p>
                <div class="messages" v-chat-scroll="{always: false, smooth: true}">
                    <div v-for="message in messages" :key="message.id">
                        <span v-if="message.name == 'Admin'" class="text-danger">[{{ message.name }}]</span>
                        <span v-else class="text-info">[{{ message.name }}]</span>
                        <span>{{message.message}}</span>
                        <span class="text-secondary time">{{message.timestamp}}</span>
                    </div>
                </div>
            </div>
            <div class="card-action">
                <CreateMessageAdmin :name="name" :userChatId="userChatId" />
            </div>
        </div>
    </div>
</template>

<script>
import CreateMessageAdmin from "../components/CreateMessageAdmin.vue"
import {fb,db} from '../firebase';
import moment from 'moment';

export default {
    name: "AdminChat",
    // props: ['name'],
    components: {
        CreateMessageAdmin
    },
    data() {
        return {
            messages: [],
            name: "Admin",
            userChatId: null
        }
    },
    firestore() {
        let idChat = this.$route.query.id
        return {
            messages : db.collection('messages').where("user_id", "==",idChat).orderBy('timestamp')
        }
    },
    created() {
        this.userChatId = this.$route.query.id
    }
}
</script>

<style lang="scss" scoped>
.chat {
    h2 {
        font-size: 2.6em;
        margin-bottom: 0px;
    }

    h5 {
        margin-top: 0px;
        margin-bottom: 40px;
    }

    span {
        font-size: 1.2em;
    }
    .time {
        display: block;
        font-size: 0.7em;
    }
}

.messages {
    max-height: 300px;
    overflow: auto;
}
</style>