<template>
  <div class="main" ref="main">
    <div class="containers" ref="code">
      <div>
        <button class="toggle-btn btn btn-danger" style="font-size: 50px;  top: 0%;" @click="toggleHtml"><i class="fa-brands fa-html5"></i></button>
      </div>
      <div>
        <button class="toggle-btn btn btn-primary" style="font-size: 50px;  top: 10.5%;" @click="toggleCss"><i class="fa-brands fa-css3-alt"></i></button>
      </div>
      <div>
        <button class="toggle-btn btn btn-warning" style="font-size: 50px;  top: 21%;" @click="toggleJs"><i class="fa-brands fa-square-js"></i></button>
      </div>
      <div>
        <button class="toggle-btn btn btn-success" style="font-size: 50px;  top: 38%;" @click="toggleIframe"><i class="fa-brands fa-codepen"></i></button>
      </div>
      <div>
        <div class="text-close" id="html-code" ref="html">
            <div class="editor-container" ref="htmlEditorContainer"></div>
        </div>
        <div class="text-close " id="css-code" ref="css">
          <div class="editor-container" ref="cssEditorContainer"></div>
        </div>
        <div class="text-close " id="js-code" ref="js">
          <div class="editor-container" ref="jsEditorContainer"></div>
        </div>
        <div id="iframe-container" class="text-close " ref="iframe">
          <iframe id="output" ref="output"></iframe>
        </div>
      </div>
      <button class="toggle-chat-btn btn btn-danger" style="font-size: large; width: 40px; top: 0%;" @click.stop="runOutput">跑程式碼</button>
      <button class="toggle-chat-btn btn btn-primary" style="font-size: large; width: 40px; top: 14.5%;" @click.stop="saveButton">儲存</button>
      <button class="toggle-chat-btn btn btn-warning" style="font-size: large; width: 40px; top: 23%;" v-if="isCollapsed" @click="toggleChat">開啟聊天</button>
      <button class="toggle-chat-btn btn btn-success" style="font-size: large; width: 40px; top: 37.5%;" v-if="isCollapsed" @click="openLog">打開紀錄</button>
      <button class="toggle-chat-btn btn btn-secondary" style="font-size: large; width: 40px; top: 52%;" @click="openLog">考試</button>
      <button class="toggle-chat-btn btn btn-info" style="font-size: large; width: 40px; top: 60.2%;" @click="openLog">心得</button>
    </div>


      <div v-if="!isCollapsed" >
        <button @click="toggleChat" class="toggle-chat-btn btn btn-warning" style="font-size: large; width: 40px; top: 23%;">關閉聊天</button>
        <chat :is-collapsed="isCollapsed" class="chat" ></chat>
      </div>

      <div v-if="!isOpenLog">
        <button @click="openLog" class="toggle-chat-btn btn btn-success" style="font-size: large; width: 40px; top: 37.5%;">關閉紀錄</button>
        <document @go-to-demo="handleGoToDemo"  class="document" ></document>
      </div>
  </div>
</template>

<script>
import Chat from '../components/ChatMessage.vue';
import Document from '../components/Dcumental.vue';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import * as monaco from "monaco-editor";
import {action} from "../components/action.js"
export default {
  name: 'MonacoEditor',
  components: {
    Chat,
    Document
  },
  data() {
    return {
      htmlCode: '',
      cssCode: '',
      jsCode: '',
      isCollapsed: true,
      actions: [],
      isActionPushed : false,
      isOpenLog: true,
    };
  },
  methods: {
    updateOutput() {
      const iframe = this.$refs.output;
      const documentContent = `
        <html>
          <head>
            <style>${this.cssCode}</style>
          </head>
          <body>
            ${this.htmlCode}
            <script>${this.jsCode}<\/script>
          </body>
        </html>
      `;
      iframe.srcdoc = documentContent;
    },
    runOutput() {
      this.updateOutput();
      const iframe = this.$refs.output;
      this.$refs.iframe.classList.add('text');
      this.$refs.html.classList.remove('text');
      this.$refs.css.classList.remove('text');
      this.$refs.js.classList.remove('text');
      this.$refs.iframe.classList.remove('text-close'); 
      this.$refs.html.classList.add('text-close');
      this.$refs.css.classList.add('text-close');

      this.$refs.js.classList.add('text-close');

      action.pushAction({
        action: '跑程式碼',
        timestamp: new Date().toLocaleString('zh-TW', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
          }).replace(/\//g, '-').replace(',', '')
      });
      this.isActionPushed = false;
    },
    toggleChat() {
      this.isCollapsed = !this.isCollapsed;

      if (this.isCollapsed) {
          action.pushAction({
            action: '關閉聊天室',
            timestamp: new Date().toLocaleString('zh-TW', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }).replace(/\//g, '-').replace(',', '')
          });
          this.isActionPushed = false;
      }else{
          action.pushAction({
            action: '開啟聊天室',
            timestamp: new Date().toLocaleString('zh-TW', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }).replace(/\//g, '-').replace(',', '')
          });
          this.isActionPushed = false;
      }
    },
    toggleHtml() {
      this.$refs.html.classList.add('text');
      this.$refs.css.classList.remove('text');
      this.$refs.js.classList.remove('text');
      this.$refs.iframe.classList.remove('text');
      this.$refs.html.classList.remove('text-close');
      this.$refs.css.classList.add('text-close');
      this.$refs.js.classList.add('text-close');
      this.$refs.iframe.classList.add('text-close');
      this.htmlEditor.layout();
      action.pushAction({
          action: '開啟HTML編輯器',
          timestamp: new Date().toLocaleString('zh-TW', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
          }).replace(/\//g, '-').replace(',', '')
      });
      this.isActionPushed = false;
    },
    toggleCss() {
      this.$refs.css.classList.add('text');
      this.$refs.html.classList.remove('text');
      this.$refs.js.classList.remove('text');
      this.$refs.iframe.classList.remove('text');
      this.$refs.css.classList.remove('text-close');
      this.$refs.html.classList.add('text-close');
      this.$refs.js.classList.add('text-close');
      this.$refs.iframe.classList.add('text-close');
      this.cssEditor.layout();
      action.pushAction({
          action: '開啟CSS編輯器',
          timestamp: new Date().toLocaleString('zh-TW', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
          }).replace(/\//g, '-').replace(',', '')
      });
      this.isActionPushed = false;
    },
    toggleJs() {
      this.$refs.js.classList.add('text');
      this.$refs.html.classList.remove('text');
      this.$refs.css.classList.remove('text');
      this.$refs.iframe.classList.remove('text');
      this.$refs.js.classList.remove('text-close');
      this.$refs.html.classList.add('text-close');
      this.$refs.css.classList.add('text-close');
      this.$refs.iframe.classList.add('text-close');
      this.jsEditor.layout();
      action.pushAction({
          action: '開啟JavaScript編輯器',
          timestamp: new Date().toLocaleString('zh-TW', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
          }).replace(/\//g, '-').replace(',', '')
      });
      this.isActionPushed = false;
    },
    toggleIframe() {
      this.$refs.iframe.classList.add('text');
      this.$refs.html.classList.remove('text');
      this.$refs.css.classList.remove('text');
      this.$refs.js.classList.remove('text');
      this.$refs.iframe.classList.remove('text-close'); 
      this.$refs.html.classList.add('text-close');
      this.$refs.css.classList.add('text-close');
      this.$refs.js.classList.add('text-close');
      action.pushAction({
        action: '觀看結果',
        timestamp: new Date().toLocaleString('zh-TW', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
          }).replace(/\//g, '-').replace(',', '')
      });
      this.isActionPushed = false;
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    },
    saveButton() {
      let userId = this.getCookie('id');
      let code = {
          html: this.htmlCode,
          css: this.cssCode,
          js: this.jsCode,
          user: userId,
      };
      action.pushAction({
        action: '存程式碼',
        timestamp: new Date().toLocaleString('zh-TW', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
          }).replace(/\//g, '-').replace(',', '')
      });
      this.isActionPushed = false;
      this.$axios.post('/code', code)
      .then((res) => {
        this.$swal.fire({
            title: '儲存成功',
            text: '已成功儲存',
            icon: 'success',
            })
      })
      .catch((error) => {
        console.error(error);
        this.$swal.fire({
            title: '儲存失敗',
            text: '儲存時發生錯誤',
            icon: 'error'
          });
      });
    },
    handleBeforeUnload(event) {
        const confirmationMessage = '您確定要離開此頁面嗎？';
        event.returnValue = confirmationMessage;

        let userId = this.getCookie('id');
        action.pushDBAction(userId);

        return confirmationMessage;
    },
    openLog() {
      this.isOpenLog = !this.isOpenLog;
      if (this.isOpenLog) {
        action.pushAction({
        action: '關閉程式碼紀錄',
        timestamp: new Date().toLocaleString('zh-TW', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
          }).replace(/\//g, '-').replace(',', '')
        });
        this.isActionPushed = false;
      }else{
        action.pushAction({
        action: '打開程式碼紀錄',
        timestamp: new Date().toLocaleString('zh-TW', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
          }).replace(/\//g, '-').replace(',', '')
        });
        this.isActionPushed = false;
      }
    },
    handleGoToDemo(code) {
      this.htmlEditor.setValue(code.html);
      this.cssEditor.setValue(code.css);
      this.jsEditor.setValue(code.js);
      this.htmlCode = code.html;
      this.cssCode = code.css;
      this.jsCode = code.js;
      this.isOpenLog = true;
      this.updateOutput();
    }
  },
  mounted() {
    var storedToken = localStorage.getItem('token');
    if (storedToken == null) {
      this.$router.push('/');
    }  
    this.$refs.htmlEditorContainer.MonacoEnvironment = {
      getWorkerUrl: (moduleId, label) => {
        return new htmlWorker()
      }
    };
    this.$refs.cssEditorContainer.MonacoEnvironment = {
      getWorkerUrl: (moduleId, label) => {
        return new cssWorker()
      }
    };
    this.$refs.jsEditorContainer.MonacoEnvironment = {
      getWorkerUrl: (moduleId, label) => {
        return new tsWorker()
      }
    };
    // 初始化 Monaco 编辑器
    this.htmlEditor = monaco.editor.create(this.$refs.htmlEditorContainer, {
      value: `<!DOCTYPE html>\n<html>\n<head>\n\t<title>My Page</title>\n</head>\n<body>\n\t<h1 style="text-align: center;">歡迎來到編譯器網站</h1>\n\t\n    <div class="container">
          <div class="html">這是HTML</div>
          <div class="code">這是執行程式碼</div>
          <div class="css">這是CSS</div>
          <div class="save">這是儲存你的程式碼</div>
          <div class="javascript">這是JavaScript</div>
          <div class="chatbot">這是開起聊天機器人</div>
          <div class="output">這是你的輸出結果</div>
          <div class="log">這是你的程式碼紀錄</div>
      </div>\n</body>\n</html>`,
      language: 'html',
      theme: 'vs-dark',
      colorDecorators: true,
      automaticLayout: true, // 启用自动布局
    });
    // 监听 HTML 编辑器内容变化
    this.htmlEditor.onDidChangeModelContent(() => {
      if (!this.isActionPushed) {
        this.htmlCode = this.htmlEditor.getValue();
        action.pushAction({
          action: '編寫html',
          timestamp: new Date().toLocaleString('zh-TW', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
          }).replace(/\//g, '-').replace(',', '')
        });

        this.isActionPushed = true;
      }

    });
    // 初始化 CSS 编辑器
    this.cssEditor = monaco.editor.create(this.$refs.cssEditorContainer, {
      value: `body {\n\tfont-family: Arial, sans-serif;\n}\nh1 {\n\tmargin-top: 50px;\n\tz-index: 10;\n\ttext-align: center;\n}\n.content{\n\tdisplay: flex;\n\tflex-direction: column;\n\tmargin: 0 0 0 40px;\n}\n.html{\n\tdisplay:flex;\n\tjustify-content: start;\n\tmargin-top: -75px;\n\tmargin-left: 40px;\n}\n.code{\n\tdisplay:flex;\n\tjustify-content: end;\n\tmargin-right: 50px;\n\tmargin-top: -15px;\n}\n.css{\n\tdisplay:flex;\n\tjustify-content: start;\n\tmargin-top: 50px;\n\tmargin-left: 40px;\n}\n.save{\n\tdisplay:flex;\n\tjustify-content: end;\n\tmargin-right: 50px;\n\tmargin-top: 5px;\n}\n.javascript{\n\tdisplay:flex;\n\tjustify-content: start;\n\tmargin-top: 40px;\n\tmargin-left: 40px;\n}\n.chatbot{\n\tdisplay:flex;\n\tjustify-content: end;\n\tmargin-right: 50px;\n\tmargin-top: 20px;\n}\n.output{\n\tdisplay:flex;\n\tjustify-content: start;\n\tmargin-top: 80px;\n\tmargin-left: 40px;\n}\n.log{\n\tdisplay:flex;\n\tjustify-content: end;\n\tmargin-right: 50px;\n\tmargin-top: -30px;\n}\n`,
      language: 'css',
      theme: 'vs-dark',
      codeLens: false,
      colorDecorators: true,
      automaticLayout: true, // 启用自动布局
    });
    // 监听 CSS 编辑器内容变化
    this.cssEditor.onDidChangeModelContent(() => {
      if (!this.isActionPushed) {
        this.cssCode = this.cssEditor.getValue();
        action.pushAction({
            action: '編寫css',
            timestamp: new Date().toLocaleString('zh-TW', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }).replace(/\//g, '-').replace(',', '')
        });
        this.isActionPushed = true;
      }
    });
    // 初始化 JavaScript 编辑器
    this.jsEditor = monaco.editor.create(this.$refs.jsEditorContainer, {
      value: `console.log('Hello, world!');`,
      language: 'javascript',
      theme: 'vs-dark',
      automaticLayout: true, // 启用自动布局
    });
    // 监听 JavaScript 编辑器内容变化
    this.jsEditor.onDidChangeModelContent(() => {
      if (!this.isActionPushed) {
        this.jsCode = this.jsEditor.getValue();
        action.pushAction({
          action: '編寫JavaScript',
          timestamp: new Date().toLocaleString('zh-TW', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
          }).replace(/\//g, '-').replace(',', '')
        });

        this.isActionPushed = true;
      }
    });
    monaco.languages.html.htmlDefaults.setOptions({
    suggest: { html5: true },
    });
    monaco.languages.css.cssDefaults.setOptions({
      validate: true,
      lint: {
        compatibleVendorPrefixes: 'ignore',
        vendorPrefix: 'warning',
      },
    });
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES6,
      allowNonTsExtensions: true,
    });

    this.htmlCode = this.htmlEditor.getValue();
    this.cssCode = this.cssEditor.getValue();
    this.jsCode = this.jsEditor.getValue();

    this.updateOutput();

    window.addEventListener('beforeunload', this.handleBeforeUnload);
  },
  beforeUnmount() {
    if (this.htmlEditor) {
      this.htmlEditor.dispose();
    }
    if (this.cssEditor) {
      this.cssEditor.dispose();
    }
    if (this.jsEditor) {
      this.jsEditor.dispose();
    }
  },        
  beforeDestroy() {
    window.removeEventListener('beforeunload', this.handleBeforeUnload);
  },
};
</script>

<style scoped>
.main {
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  background-color: #454545;
  color: #fff;
  margin: 0;
  padding: 0;
  transition: transform 0.3s ease;
}

.row {
  width: 100%;
}
#iframe-container {
  width: 100%;
  height: 100%;
}
iframe {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  background: #fff;
  border: none;
}
.toggle-chat-btn {
  position: fixed;
  right: 0;
  width: 80px;
  z-index: 1000;
  transform: translateX(85%);
  transition: all 0.3s ease;;
}
.toggle-chat-btn:hover {
  transform: translateX(0);
  transition: all 0.3s ease;
}
.text {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  transition: all 0.5s ease, opacity 0.5s ease;
  opacity: 1;
}


.text-close {
  flex: 0;
  transition: all 0.5s ease, opacity 0.5s ease;
  opacity: 0;
}
.toggle-btn {
  position: fixed;
  z-index: 1000;
  transform: translateX(-85%);
  transition: all 0.3s ease;;
}
.chat{
  position: fixed;
  right: 8px;
  top: 0;
  z-index: 999;
  width: 400px;
}
.document{
  position: fixed;
  top: 0;
  left: 5%;
  z-index: 999;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
}
.document::-webkit-scrollbar {
  width: 0; 
}

.document::-webkit-scrollbar-track {
  background-color: transparent;
}
.toggle-btn:hover {
  transform: translateX(0);
  transition: all 0.3s ease;;
}
.text .editor-container {
  width: 100%;
  height: 100vh;
}


.text-close .editor-container {
  display: none;
}
label i {
  margin-left: 10px;
  margin-right: 10px;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.5s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateX(-30%);
  opacity: 0;
}
</style>
