<template>
  <div class="main" ref="main">
    <nav @mouseenter="mouseover" @mouseleave="mouseout">
      <button class="btn btn-outline-secondary border-0">
        <i class="bi bi-person"></i>個人資料
      </button>
    </nav>
    <div class="containers">
      <div class="text-close position-relative" id="html-code" ref="html">
        <label @click="toggleHtml">
          <i class="fa-brands fa-html5"></i>HTML
        </label>
        <button class="btn btn-primary  run-but position-absolute" style="right: 40px; top: 3px;" @click.stop="runOutput">run</button>
        <div class="editor-container" ref="htmlEditorContainer"></div>
      </div>
      <div class="text-close position-relative" id="css-code" ref="css">
        <label @click="toggleCss">
          <i class="fa-brands fa-css3-alt"></i>CSS
        </label>
        <button class="btn btn-primary  run-but position-absolute" style="right: 40px; top: 3px;" @click.stop="runOutput">run</button>
        <div class="editor-container" ref="cssEditorContainer"></div>
      </div>
      <div class="text-close position-relative" id="js-code" ref="js">
        <label @click="toggleJs">
          <i class="fa-brands fa-square-js"></i>JavaScript
        </label>
        <button class="btn btn-primary  run-but position-absolute" style="right: 40px; top: 3px;" @click.stop="runOutput">run</button>
        <div class="editor-container" ref="jsEditorContainer"></div>
      </div>
    </div>
    <div class="row row-cols-2 m-0 p-0 mb-3 py-1" style="height: 90vh">
      <div :class="isCollapsed ? 'col-12' : 'col-8'">
        <div id="iframe-container">
          <iframe id="output" ref="output"></iframe>
        </div>
      </div>
      <transition name="slide">
        <div v-if="!isCollapsed" class="col-4 ps-0 pb-2 pe-3 mb-0">
          <button @click="toggleChat" class="toggle-chat-btn">關閉</button>
          <chat :is-collapsed="isCollapsed"></chat>
        </div>
      </transition>
      <button class="toggle-chat-btn" v-if="isCollapsed" @click="toggleChat">開啟</button>
    </div>
  </div>
</template>

<script>
import Chat from '../components/ChatMessage.vue';
import * as monaco from "monaco-editor";

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
      let data = {
        code: {
          html: this.htmlCode,
          css: this.cssCode,
          js: this.jsCode,
          time: new Date().getTime(),
        }
      };
      let userId = this.getCookie('id');
      let yourToken = localStorage.getItem('token');
      this.$axios.put(`/auth/student/${userId}`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${yourToken}`, 
        }
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error(error);
      });
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
    mouseover() {
      this.$refs.main.style.transform = 'translateY(0)';
    },
    mouseout() {
      this.$refs.main.style.transform = 'translateY(-65px)';
    },
    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
  },
  mounted() {
  var storedToken = localStorage.getItem('token');
  if (storedToken == null) {
    this.$router.push('/');
  }
  
  // 设置 Monaco Editor 的 worker URL
  window.MonacoEnvironment = {
    getWorkerUrl: (moduleId, label) => {
      if (label === 'json') {
        return 'data:text/javascript;charset=utf-8,' + encodeURIComponent(`
          self.MonacoEnvironment = {
            baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.27.0/min/'
          };
          importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.27.0/min/vs/base/worker/workerMain.js');`);
      }
      return 'data:text/javascript;charset=utf-8,' + encodeURIComponent(`
        self.MonacoEnvironment = {
          baseUrl: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.27.0/min/'
        };
        importScripts('https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.27.0/min/vs/base/worker/workerMain.js');`);
    }
  };

  // 初始化 Monaco 编辑器
  this.htmlEditor = monaco.editor.create(this.$refs.htmlEditorContainer, {
    value: `<!DOCTYPE html>\n<html>\n<head>\n\t<title>My Page</title>\n</head>\n<body>\n\t<h1>Hello, world!</h1>\n</body>\n</html>`,
    language: 'html',
    theme: 'vs-dark',
    automaticLayout: true, // 启用自动布局
  });

  // 监听 HTML 编辑器内容变化
  this.htmlEditor.onDidChangeModelContent(() => {
    this.htmlCode = this.htmlEditor.getValue();
  });

  // 初始化 CSS 编辑器
  this.cssEditor = monaco.editor.create(this.$refs.cssEditorContainer, {
    value: `body {\n\tfont-family: Arial, sans-serif;\n}\nh1 {\n\tcolor: blue;\n}`,
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
    value: `console.log('Hello, world!');`,
    language: 'javascript',
    theme: 'vs-dark',
    automaticLayout: true, // 启用自动布局
  });

  // 监听 JavaScript 编辑器内容变化
  this.jsEditor.onDidChangeModelContent(() => {
    this.jsCode = this.jsEditor.getValue();
  });

  monaco.languages.registerCompletionItemProvider('html', {
    provideCompletionItems: function () {
      var suggestions = [
        {
          label: 'html',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: '<html>\n\t<head>\n\t</head>\n\t<body>\n\t</body>\n</html>',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'HTML boilerplate'
        },
        {
          label: 'h1',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: '<h1>${1}</h1>',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Header 1'
        }
      ];
      return { suggestions: suggestions };
    }
  });
  monaco.languages.registerCompletionItemProvider('css', {
  provideCompletionItems: function () {
    var suggestions = [
      {
        label: 'body',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'body {\n\t${1}\n}',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'CSS body selector'
      },
      {
        label: 'color',
        kind: monaco.languages.CompletionItemKind.Property,
        insertText: 'color: ${1};',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'CSS color property'
      }
    ];
    return { suggestions: suggestions };
  }
});

monaco.languages.registerCompletionItemProvider('javascript', {
  provideCompletionItems: function () {
    var suggestions = [
      {
        label: 'function',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'function ${1:myFunction}() {\n\t${2}\n}',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'JavaScript function declaration'
      },
      {
        label: 'console.log',
        kind: monaco.languages.CompletionItemKind.Function,
        insertText: 'console.log(${1});',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Log output to console'
      }
    ];
    return { suggestions: suggestions };
  }
});
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
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000;
  padding: 10px;
  width: 100%;
  height: 70px;
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
  top: 102%;
  transform: translateY(-50%);
  z-index: 1000;
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
