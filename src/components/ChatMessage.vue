<template>
    <div class="chat  d-flex align-content-end flex-wrap  bg-black" :class="{ 'chat-collapsed': isCollapsed }">        
          <label class="ms-1 mb-3" style="border-radius: 2% !important;">
            <i class="fa-solid fa-comment-dots"></i> AI Chat
          </label>
          <div class="ch  w-100  m-1 " ref="chat">
            <div v-for="(message, index) in chat" :key="index">
              <div class="m-1 d-flex justify-content-end" v-if="message.user">
                <div class="user-message">User: {{ message.user }}</div>
              </div>
              <div class="m-1 d-flex justify-content-start" v-if="message.ai && Array.isArray(message.ai)">
                <div class="ai-message">
                  <div v-for="(part, partIndex) in message.ai" :key="partIndex">
                    <p v-if="part.type === 'text'">{{ part.content }}</p>
                    <pre v-else-if="part.type === 'code'" >
                      <code class="text-dark">{{ part.content }}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="chatOpen" class="mt-auto w-100 position-relative" ref="input">
            <input class="w-100 form-control border-0" type="text" v-model="que" @keyup.enter="handleEnter">
            <i class="bi bi-arrow-up-square-fill in position-absolute z-3 fs-2" style="top: -5px; right: 5px;" @click="handleEnter"></i>
          </div>
          <div v-else class="mt-auto w-100 position-relative">
            <input class="w-100 form-control border-0" type="text" v-model="que" @keyup.enter="handleEnter" disabled >
            <i class="bi bi-arrow-up-square-fill in position-absolute z-3 fs-2 opacity-25 " style="top: -5px; right: 5px;" @click="handleEnter"></i>
          </div>
    </div>
</template>

<script>
export default {
  props: ['isCollapsed'],
  data() {
    return {
      que: '',
      chat: [],
      chatOpen: true,
      isSubmitting: false,
    }
  },
  methods: {
    async handleEnter() {
      if (!this.chatOpen || this.isSubmitting) return;
      this.isSubmitting = true;

      if (this.que.trim() !== '') {
        this.chat.push({ user: this.que });
        try {
          const response = await this.$axios.post('/chat', { que: this.que });
          this.chat.push({ ai: this.parseAiResponse(response.data.ai) });
        } catch (err) {
          console.error('Failed to send/receive chat:', err);
          this.chat.push({ ai: [{ type: 'text', content: 'An error occurred. Please try again.' }] });
        }
        this.que = '';
      }
      this.isSubmitting = false;
      this.chatOpen = true;
    },

    parseAiResponse(aiResponse) {
      let codeBlocks = aiResponse.split(/```/);
      let Ai = [];
      codeBlocks.forEach((block, index) => {
        if (index % 2 !== 0) {
          Ai.push({ type: 'code', content: block.trim() });
        } else {
          block.split('\n').filter(part => part.trim() !== '').forEach(text => {
            Ai.push({ type: 'text', content: text.trim() });
          });
        }
      });
      return Ai;
    }
  }
}
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

/* 可选：设置滚动条的样式 */
.ch::-webkit-scrollbar-track {
  background-color: transparent;
}


.in {
  color: #000;
  transition: color 0.3s ease;
}

.in:hover {
  color: #636363; /* Change 'red' to the desired color */
}

.code-container {
    white-space: pre-wrap;
    background-color: #eee;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-top: 20px;
}
code {
    display: block;
    font: 1em sans-serif;
    background-color: #f5f5f5;
    padding: 5px;
    white-space: pre-wrap; 
}
.user-message {
    background-color: #212121;
    color: white;
    border-radius: 20px;
    padding: 10px;
    margin-bottom: 10px;
}
.ai-message {
    background-color: #535557;
    color: white;
    border-radius: 20px;
    padding: 10px;
    margin-bottom: 10px;
}

</style>