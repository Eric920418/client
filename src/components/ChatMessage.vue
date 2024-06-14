<template>
  <div class="chat d-flex align-content-end flex-wrap bg-black" :class="{ 'chat-collapsed': isCollapsed }">
    <label class="ms-1 mb-1 w-100" >
      <i class="fa-solid fa-comment-dots"></i> AI Chat <button v-if="thisLog" class="btn btn-sm btn-outline-secondary float-end" @click="saveChat">返回</button>
    </label>
    <div v-if="!thisLog" class="log w-100 " ref="log">
      <div class="thisLog" v-for="(log, index) in log" :key="index" @click="checkLog(log)">
        <div class=" my-3 px-2 d-flex justify-content-between align-items-center w-100">
          <div>{{ log.title }}</div>
          <div> {{ log.time }} </div>
        </div>
      </div>
    </div>
    <div v-else class="ch w-100 " ref="chat">
      <div v-for="(message, index) in chat" :key="index">
        <div class="m-1 d-flex justify-content-end" v-if="message.user">
          <div class="user-message">User: {{ message.user }}</div>
        </div>
        <div class="m-1 d-flex justify-content-start" v-if="message.ai">
            <pre class="ai-message" v-html="renderMessage(message.ai)"></pre>
        </div>
      </div>
      <div v-if="chatOpen" class="mt-auto w-100 position-relative pt-2 " ref="input">
        <input class="w-100 form-control border-1" type="text" v-model="que" @keyup.enter="handleEnter">
        <i class="bi bi-arrow-up-square-fill in position-absolute z-3 fs-3 mt-1" style="top: 0px; right: 5px;" @click="handleEnter"></i>
      </div>
      <div v-else class="mt-auto w-100 position-relative">
        <input class="w-100 form-control border-0" type="text" v-model="que" @keyup.enter="handleEnter" disabled>
        <i class="bi bi-arrow-up-square-fill in position-absolute z-3 fs-2 opacity-25" style="top: 0px; right: 5px;" @click="handleEnter"></i>
      </div>
    </div>
    
  </div>
</template>

<script>
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import {action} from "../components/action.js"

export default {
  props: ['isCollapsed'],
  data() {
    return {
      que: '',
      allChat: [],
      chat: [],
      log: [
        {
          title: '新對話',
          time: new Date().toLocaleString('zh-TW', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }).replace(/\//g, '-').replace(/,/, ''),
          dialogues: [],
        },
      ],
      thisLog: null,
      chatOpen: true,
      isSubmitting: false,
    };
  },
  methods: {
    async handleEnter() {
      if (!this.chatOpen || this.isSubmitting) return;
      this.isSubmitting = true;

      if (this.que.trim() !== '') {
        this.chat.push({ user: this.que });
        try {
          const response = await this.$axios.post('/chat', { que: this.que });
          this.chat.push({ ai: response.data.ai });
        } catch (err) {
          console.error('Failed to send/receive chat:', err);
          this.chat.push({ ai: '發生錯誤' });
        }
        action.pushAction({
          action: `發送問題 問題內容：${this.que}`,
          timestamp: new Date().toLocaleString('zh-TW', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
          }).replace(/\//g, '-').replace(',', '')
        });
        this.que = '';
      }
      this.isSubmitting = false;
      this.chatOpen = true;
    },
    renderMessage(message) { 
      const renderer = new marked.Renderer(); 
      renderer.code = (code, infostring, escaped) => { 
        const lang = (infostring || '').match(/\S*/)[0]; 
        if (lang && hljs.getLanguage(lang)) { 
          try { 
            const highlighted = hljs.highlight(lang, code, true).value;
            return `<pre><button class="btn btn-sm btn-outline-secondary" onclick="copyToClipboard(this)">複製</button><code class="hljs ${lang}">${highlighted}</code></pre>`;
          } catch (__) {} 
        } 
        return `<pre><button class="btn btn-sm btn-outline-secondary" onclick="copyToClipboard(this)">複製</button><code class="hljs">${hljs.highlightAuto(code).value}</code></pre>`;
      }; 
      return marked(message, { renderer }); 
    },
    getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        },
    checkLog(log) {
      this.thisLog = log;
      this.chat = log.dialogues;
      action.pushAction({
            action:`載入${log.time}這個時間點的對話 標題：${log.title}`,
            timestamp: new Date().toLocaleString('zh-TW', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }).replace(/\//g, '-').replace(',', '')
      });
    },
    saveChat(){
        let userId = this.getCookie('id');
        this.$axios.post('/chat/dialogue', {dialogues: this.chat, user: userId})
        .then((res) => {
          window.location.reload();
        });
        this.thisLog = null;
    }
  },
  mounted() {

    let userId = this.getCookie('id');
    this.$axios.get(`/chat/dialogue/${userId}`)
    .then((res) => {
      res.data.data.forEach((data) => {
          let log = {
            title: '',
            time: '',
            dialogues: [],
          }
          log.title = data.dialogues[0].user;
          log.time = data.createdAt;
          log.dialogues = data.dialogues;

          this.log.push(log);
      });
    });
  },

};
</script>

<style scoped>
.chat {
  width: 100%; /* 預設寬度為 0，意味著視窗是隱藏的 */
  overflow: hidden; /* 隱藏超出容器的內容 */
  border-radius: 2%;
  transition: width 1s ease; /* 過渡效果應用於寬度的變化 */
}

.chat-collapsed {
  width: 0;
  overflow: hidden;
}

.ch {
  height: 90vh;
  overflow-y: auto !important;
  display: flex;
  flex-direction: column;
}
.ch::-webkit-scrollbar {
  width: 0; 
}

/* 可選：設置滾動條的樣式 */
.ch::-webkit-scrollbar-track {
  background-color: transparent;
}

.in {
  color: #000;
  transition: color 0.3s ease;
}

.in:hover {
  color: #636363; /* 更改 'red' 為所需顏色 */
}

.code-container {
  white-space: pre-wrap;
  background-color: #eee;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-top: 20px;
}

.user-message {
  background-color: #212121;
  color: white;
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 10px;
}
.ai-message {
  background-color: #212121;
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 10px;
  white-space: pre-wrap; /* Allow text to wrap and handle line breaks */
  word-break: break-word; /* Ensure long words break to avoid overflow */
}
.thisLog:hover {
  background-color: #745959;
  color: white;
}  
</style>