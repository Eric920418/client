<template>
  <div class="chat d-flex align-content-end flex-wrap bg-black" :class="{ 'chat-collapsed': isCollapsed }">
    <label class="ms-1 mb-3" style="border-radius: 2% !important;">
      <i class="fa-solid fa-comment-dots"></i> AI Chat
    </label>
    <div class="ch w-100 m-1" ref="chat">
      <div v-for="(message, index) in chat" :key="index">
        <div class="m-1 d-flex justify-content-end" v-if="message.user">
          <div class="user-message">User: {{ message.user }}</div>
        </div>
        <div class="m-1 d-flex justify-content-start" v-if="message.ai">
            
            <pre class="ai-message" v-html="renderMessage(message.ai)"></pre>
        </div>
      </div>
    </div>
    <div v-if="chatOpen" class="mt-auto w-100 position-relative" ref="input">
      <input class="w-100 form-control border-0" type="text" v-model="que" @keyup.enter="handleEnter">
      <i class="bi bi-arrow-up-square-fill in position-absolute z-3 fs-2" style="top: -5px; right: 5px;" @click="handleEnter"></i>
    </div>
    <div v-else class="mt-auto w-100 position-relative">
      <input class="w-100 form-control border-0" type="text" v-model="que" @keyup.enter="handleEnter" disabled>
      <i class="bi bi-arrow-up-square-fill in position-absolute z-3 fs-2 opacity-25" style="top: -5px; right: 5px;" @click="handleEnter"></i>
    </div>
  </div>
</template>

<script>
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

function copyToClipboard(button) { 
    const codeElement = button.nextElementSibling; 
    const textarea = document.createElement('textarea'); 
    textarea.value = codeElement.textContent; 
    document.body.appendChild(textarea); 
    textarea.select(); 
    document.execCommand('copy'); 
    document.body.removeChild(textarea); 
    alert('Code copied to clipboard'); 
  }

export default {
  props: ['isCollapsed'],
  data() {
    return {
      que: '',
      chat: [],
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
          this.chat.push({ ai: 'An error occurred. Please try again.' });
        }
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


  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
    });
  },
  updated() {
    this.$nextTick(() => {
      this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
    });
  }
};
</script>

<style scoped>
.chat {
  height: 100vh; /* 視窗的全高 */
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
}

</style>