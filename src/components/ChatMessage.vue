<template>
  <div
    class="chat d-flex align-content-end flex-wrap bg-black me-3"
    :class="{ 'chat-collapsed': isCollapsed }"
  >
    <div v-if="thisLog" class="d-flex justify-content-between ms-1 mb-1 w-100">
      <div class="m-1">
        <i class="fa-solid fa-comment-dots"></i> {{ this.nowModel }} Chat
      </div>
      <div class="m-1">
        <button class="btn btn-sm btn-outline-secondary mx-3" @click="back">
          返回
        </button>
        <button
          class="btn btn-sm btn-outline-secondary d-none"
          @click="changeModel"
        >
          切換模型
        </button>
      </div>
    </div>
    <div v-if="!thisLog" class="log w-100" ref="log">
      <div
        class="thisLog"
        v-for="(log, index) in log"
        :key="index"
        @click="checkLog(log)"
      >
        <div
          class="my-2 px-2 d-flex justify-content-between align-items-center w-100 bg-opacity-10"
        >
          <div style="width: 220px; overflow: hidden">{{ log.title }}</div>
          <div>{{ log.time }}</div>
        </div>
      </div>
    </div>
    <div v-else class="ch w-100" ref="chat">
      <div v-for="(message, index) in chat" :key="index">
        <div
          class="m-1 d-flex justify-content-end"
          v-if="message.role === 'user'"
        >
          <div class="user-message">{{ message.content }}</div>
        </div>
        <div
          class="m-1 d-flex justify-content-start"
          v-if="message.role === 'assistant'"
        >
          <pre class="ai-message" v-html="renderMessage(message.content)"></pre>
        </div>
      </div>
      <div
        v-if="chatOpen == true"
        class="mt-auto w-100 position-relative pt-2 CI"
        ref="input"
      >
        <textarea
          ref="textarea"
          class="form-control border-1 int"
          type="text"
          v-model="que"
          @input="autoResize"
          @keypress.enter="handleEnter"
        ></textarea>
        <div class="icon-Loading me-2 w-25" v-if="isSubmitting">
          <div class="spinner-border" style="color: black" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div class="icon-wrapper">
          <i
            class="bi bi-arrow-up-square-fill in z-3 fs-3 mt-1"
            @click="handleEnter"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { marked } from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { jwtDecode } from "jwt-decode";
export default {
  props: ["isCollapsed"],
  data() {
    return {
      que: "",
      allChat: [],
      chat: [],
      log: [
        {
          title: "新對話 (以下是舊聊天紀錄)",
          time: new Date()
            .toLocaleString("zh-TW", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .replace(/\//g, "-")
            .replace(/,/, ""),
          dialogues: [],
        },
      ],
      thisLog: null,
      chatOpen: true,
      isSubmitting: false,
      action: [],
      nowModel: "ChatGPT",
    };
  },
  methods: {
    async handleEnter() {
      if (!this.chatOpen || this.isSubmitting) return;
      this.isSubmitting = true;
      if (this.que.trim() !== "") {
        this.chat.push({ role: "user", content: this.que });
        this.$nextTick(() => {
          this.scrollToBottom();
        });
        this.$refs.textarea.disabled = true;
        this.$refs.textarea.style.height = "30px";
        const newAction = {
          action: `發送問題 問題內容：${this.que}`,
          timestamp: new Date()
            .toLocaleString("zh-TW", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .replace(/\//g, "-")
            .replace(",", ""),
        };
        this.action.push(newAction);
        this.que = "";
        try {
          let storedToken = localStorage.getItem("token");
          const { id } = jwtDecode(storedToken);
          let chatId = this.thisLog._id;
          const response = await this.$axios.post(
            `/chat/${this.nowModel}`,
            { messages: this.chat },
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
              },
            }
          );
          this.chat.push({ role: "assistant", content: response.data.ai });
          this.$nextTick(() => {
            this.scrollToBottom();
          });
          this.$refs.textarea.disabled = false;
          this.$axios.put(
            `/chat/dialogue/${chatId}`,
            { dialogues: this.chat, user: id },
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
              },
            }
          );
        } catch (err) {
          console.error("Failed to send/receive chat:", err);
          this.chat.push({ ai: "發生錯誤" });
        }

        this.$emit("update-action", this.action);
      }
      this.isSubmitting = false;
      this.chatOpen = true;
    },
    renderMessage(message) {
      const renderer = new marked.Renderer();
      renderer.code = (code, infostring, escaped) => {
        const lang = (infostring || "").match(/\S*/)[0];
        if (lang && hljs.getLanguage(lang)) {
          try {
            const highlighted = hljs.highlight(lang, code, true).value;
            return `<pre><button class="btn btn-sm btn-dark" onclick="copyToClipboard(this)">複製</button><code class="hljs ${lang}">${highlighted}</code></pre>`;
          } catch (__) {}
        }
        return `<pre><button class="btn btn-sm btn-dark" onclick="copyToClipboard(this)">複製</button><code class="hljs">${
          hljs.highlightAuto(code).value
        }</code></pre>`;
      };
      return marked(message, { renderer });
    },
    checkLog(log) {
      this.thisLog = log;
      this.chat = log.dialogues;
      let storedToken = localStorage.getItem("token");
      const { id } = jwtDecode(storedToken);
      if (this.thisLog.title == "新對話") {
        this.$axios
          .post(
            "/chat/dialogue",
            { dialogues: this.chat, user: id },
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            this.thisLog._id = res.data._id;
          });
      }

      const newAction = {
        action: `載入${log.time}這個時間點的對話 標題：${log.title}`,
        timestamp: new Date()
          .toLocaleString("zh-TW", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
          .replace(/\//g, "-")
          .replace(",", ""),
      };
      this.action.push(newAction);
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    loadingChat() {
      let storedToken = localStorage.getItem("token");
      const { id } = jwtDecode(storedToken);
      this.$axios
        .get(`/chat/dialogue/${id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          res.data.data.forEach((data) => {
            let log = {
              title: "",
              time: "",
              dialogues: [],
            };
            log.title =
              data.dialogues &&
              data.dialogues.length > 0 &&
              data.dialogues[0].content
                ? data.dialogues[0].content
                : "空白對話";
            log.time = data.createdAt;
            log.dialogues = data.dialogues;
            log._id = data._id;
            this.log.push(log);
          });
        });
    },
    back() {
      this.thisLog = null;
      this.chat = [];
      this.chatOpen = true;
      this.que = "";
      this.log = [
        {
          title: "新對話",
          time: new Date()
            .toLocaleString("zh-TW", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .replace(/\//g, "-")
            .replace(/,/, ""),
          dialogues: [],
        },
      ];
      this.loadingChat();
    },
    scrollToBottom() {
      const chatContainer = this.$refs.chat;
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    },
    autoResize(event) {
      const textarea = event.target;
      textarea.style.height = textarea.scrollHeight + "px";
      this.$nextTick(() => {
        this.scrollToBottom();
      });
    },
    changeModel() {
      if (this.nowModel == "ChatGPT") {
        this.nowModel = "Ollama";
      } else {
        this.nowModel = "ChatGPT";
      }
    },
  },
  mounted() {
    this.loadingChat();
  },
};
</script>

<style scoped>
.chat {
  width: 100%; /* 預設寬度為 0，意味著視窗是隱藏的 */
  overflow: hidden; /* 隱藏超出容器的內容 */
  border-radius: 2%;
  border: 3px solid #ccc;

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
  cursor: pointer;
}

.in:hover {
  color: #636363;
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
  background-color: #6c6c6c;
  color: white;
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 10px;
  margin-left: 30px;
  margin-right: 5px;
}
.ai-message {
  background-color: #6c6c6c;
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 10px;
  white-space: pre-wrap;
  word-break: break-word;
  margin-left: 5px;
  margin-right: 30px;
}
.ai-message pre {
  margin: 0;
  padding: 0;
}
.thisLog {
  background-color: rgb(36, 35, 35);
}
.thisLog:hover {
  background-color: grey;
  color: white;
}
.icon-wrapper {
  position: absolute;
  top: 0;
  right: 10px;
  height: 100%;
  display: flex;
  align-items: center;
}
.icon-Loading {
  position: absolute;
  top: 0;
  right: 350px;
  height: 100%;
  display: flex;
  align-items: center;
}
.CI {
  color: white;
  border-radius: 20px;
  padding: 5px;
}
.int {
  padding-right: 40px;
  overflow-y: auto;
  resize: none;
  height: 30px;
  max-height: 300px;
}
.int::-webkit-scrollbar {
  width: 0px; /* 寬度設置為0來隱藏滾動條 */
  background: transparent; /* 背景設置為透明 */
}
.custom-hover:hover {
  background-color: #745959;
}
</style>
