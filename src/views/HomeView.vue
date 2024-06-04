<template>
  <div class="main" ref="main">
    <div class="containers" ref="code">
      <div class="text-close " id="html-code" ref="html">
        <label @click="toggleHtml">
          <i class="fa-brands fa-html5"></i>HTML
        </label>
        <div class="editor-container" ref="htmlEditorContainer"></div>
      </div>
      <div class="text-close " id="css-code" ref="css">
        <label @click="toggleCss">
          <i class="fa-brands fa-css3-alt"></i>CSS
        </label>
        <div class="editor-container" ref="cssEditorContainer"></div>
      </div>
      <div class="text-close " id="js-code" ref="js">
        <label @click="toggleJs">
          <i class="fa-brands fa-square-js"></i>JavaScript
        </label>
        <div class="editor-container" ref="jsEditorContainer"></div>
      </div>
    </div>
    <div class="row row-cols-2 m-0 p-0 mb-3 py-1" style="height: 90vh">
      <div :class="isCollapsed ? 'col-12' : 'col-8'">
        <div id="iframe-container">
          <iframe id="output" ref="output"></iframe>
        </div>
      </div>
      <div v-if="!isCollapsed" class="col-4 ps-0 pb-2 pe-3 mb-0">
        <button @click="toggleChat" class="toggle-chat-btn btn btn-warning" style="font-size: small; width: 40px; top: 31.5%;">關閉</button>
        <chat :is-collapsed="isCollapsed"></chat>
      </div>
      <button class="toggle-chat-btn btn btn-danger" style="font-size: small; width: 40px; top: 0%;" @click.stop="runOutput">跑程式碼</button>
      <button class="toggle-chat-btn btn btn-secondary" style="font-size: small; width: 40px; top: 11%;" @click.stop="runToCode">回到程式碼</button>
      <button class="toggle-chat-btn btn btn-primary" style="font-size: small; width: 40px; top: 24.5%;" @click.stop="saveButton">儲存</button>
      <button class="toggle-chat-btn btn btn-warning" style="font-size: small; width: 40px; top: 31.5%;" v-if="isCollapsed" @click="toggleChat">開啟</button>
      <button class="toggle-chat-btn btn btn-success" style="font-size: small; width: 40px; top: 38.5%;" @click="this.$router.push('/documental')">紀錄</button>
    </div>
  </div>
</template>

<script>
import Chat from '../components/ChatMessage.vue';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import * as monaco from "monaco-editor";
import {sharedCode} from "../components/sharedCode.js"
export default {
  name: 'MonacoEditor',
  components: {
    Chat,
  },
  data() {
    return {
      htmlCode: '',
      cssCode: '',
      jsCode: '',
      isCollapsed: true,
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

      setTimeout(() => {
        iframe.focus();
        iframe.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    },
    toggleChat() {
      this.isCollapsed = !this.isCollapsed;
    },
    toggleHtml() {
      this.$refs.html.classList.add('text');
      this.$refs.css.classList.remove('text');
      this.$refs.js.classList.remove('text');
      this.$refs.html.classList.remove('text-close');
      this.$refs.css.classList.add('text-close');
      this.$refs.js.classList.add('text-close');
      this.htmlEditor.layout();
    },
    toggleCss() {
      this.$refs.css.classList.add('text');
      this.$refs.html.classList.remove('text');
      this.$refs.js.classList.remove('text');
      this.$refs.css.classList.remove('text-close');
      this.$refs.html.classList.add('text-close');
      this.$refs.js.classList.add('text-close');
      this.cssEditor.layout();
    },
    toggleJs() {
      this.$refs.js.classList.add('text');
      this.$refs.html.classList.remove('text');
      this.$refs.css.classList.remove('text');
      this.$refs.js.classList.remove('text-close');
      this.$refs.html.classList.add('text-close');
      this.$refs.css.classList.add('text-close');
      this.jsEditor.layout();
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
    runToCode() {
      const code = this.$refs.code;
      code.focus();
      code.scrollIntoView({ behavior: 'smooth' });
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
    value: sharedCode.code.html 
        ? sharedCode.code.html 
        : `<!DOCTYPE html>\n<html>\n<head>\n\t<title>My Page</title>\n</head>\n<body>\n\t<h1>Hello, world!</h1>\n</body>\n</html>`,
    language: 'html',
    theme: 'vs-dark',
    colorDecorators: true,
    automaticLayout: true, // 启用自动布局
  });

  // 监听 HTML 编辑器内容变化
  this.htmlEditor.onDidChangeModelContent(() => {
      this.htmlCode = this.htmlEditor.getValue();
  });

  // 初始化 CSS 编辑器
  this.cssEditor = monaco.editor.create(this.$refs.cssEditorContainer, {
    value: sharedCode.code.css
          ? sharedCode.code.css
          :`body {\n\tfont-family: Arial, sans-serif;\n}\nh1 {\n\tcolor: blue;\n}`,
    language: 'css',
    theme: 'vs-dark',
    codeLens: false,
    colorDecorators: true,
    automaticLayout: true, // 启用自动布局
  });

  // 监听 CSS 编辑器内容变化
  this.cssEditor.onDidChangeModelContent(() => {
      this.cssCode = this.cssEditor.getValue();
  });

  // 初始化 JavaScript 编辑器
  this.jsEditor = monaco.editor.create(this.$refs.jsEditorContainer, {
    value: sharedCode.code.js
          ? sharedCode.code.js
          :`console.log('Hello, world!');`,
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true, // 启用自动布局
  });

  // 监听 JavaScript 编辑器内容变化
  this.jsEditor.onDidChangeModelContent(() => {
      this.jsCode = this.jsEditor.getValue();
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
};
</script>

<style scoped>
.main {
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  background-color: #454545;
  color: #fff;
  margin: 0;
  transition: transform 0.3s ease;
}
.containers {
  padding: 5px;
  display: flex;
}
.row {
  width: 100%;
}
#iframe-container {
  width: 100%;
  height: 100%;
}
iframe {
  width: 100%;
  height: 100vh;
  background: #fff;
  border: none;
  border-radius: 2%;
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
  transition: all 0.3s ease;;
}
.text {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 5px;
}
.text label {
  align-items: center;
  background: #000;
  border-radius: 2%;
}
.text .editor-container {
  width: 100%;
  height: 100vh;
}
.text-close {
  flex: 0;
  height: 100vh;
  border: 1px solid #fff;

  .run-but{
    display: none;
  }
}
.text-close label {
  display: flex;
  align-items: center;
  background: #000;
  width: 25px;
  height: 100vh;
  border-radius: 2%;
  border: 1px solid #fff;
  writing-mode: vertical-rl;
  text-orientation: upright;
}
.text-close .editor-container {
  display: none;
}
.run-but {
  display: inline-flex;
  align-items: center;
  height: auto;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  height: 18px;
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
