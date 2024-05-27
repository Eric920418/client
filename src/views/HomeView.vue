<template>
  <div class="main" ref="main">
    <nav @mouseover="mouseover" @mouseout="mouseout">

    </nav>
    <div class="containers">
      <div class="textarea-container position-relative" ref="html" @click.stop="toggleHtml">
        <label>
          <i class="fa-brands fa-html5"></i>HTML
        </label>
        <button class="btn btn-primary ms-2 run-but position-absolute" style="right: 10px;" @click.stop="runOutput">run</button>
        <textarea class="d-none" id="html-code" v-model="htmlCode"></textarea>
      </div>
      <div class="textarea-container position-relative" ref="css" @click.stop="toggleCss">
        <label>
          <i class="fa-brands fa-css3-alt"></i>CSS
        </label>
        <button class="btn btn-primary ms-2 run-but position-absolute" style="right: 10px;" @click.stop="runOutput">run</button>
        <textarea class="d-none" id="css-code" v-model="cssCode"></textarea>
      </div>
      <div class="textarea-container position-relative" ref="js" @click.stop="toggleJs">
        <label>
          <i class="fa-brands fa-square-js"></i>JavaScript
        </label>
        <button class="btn btn-primary ms-2 run-but position-absolute" style="right: 10px;" @click.stop="runOutput">run</button>
        <textarea class="d-none" id="js-code" v-model="jsCode"></textarea>
      </div>
    </div>
    <div class="row row-cols-2 m-0 p-0 mb-3 py-1" style="height: 90vh">
      <div v-if="isCollapsed" class="col-12 ">
        <div id="iframe-container">
          <iframe id="output" ref="output"></iframe>
        </div>
      </div>
      <div v-else class="col-8 ">
        <div id="iframe-container">
          <iframe id="output" ref="output"></iframe>
        </div>
      </div>
      <div v-if="!isCollapsed" class="col-4 ps-0 pb-2 pe-3 mb-0 ">
        <button @click="toggleChat" class="toggle-chat-btn">Chat</button>
        <chat :is-collapsed="isCollapsed"></chat>
      </div>
      <div v-else >
        <button @click="toggleChat" class="toggle-chat-btn">Chat</button>
      </div>
    </div>
  </div>
</template>




<script>
import hljs from 'highlight.js';
import Chat from '../components/ChatMessage.vue';
export default {
  components: {
    Chat
  },
  data() {
    return {
      htmlCode: '',
      cssCode: '',
      jsCode: '',
      isCollapsed: false
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

  toggleHtml() {
    const htmlTextarea = document.getElementById('html-code');
    const cssTextarea = document.getElementById('css-code');
    const jsTextarea = document.getElementById('js-code');
    htmlTextarea.classList.remove('d-none');
    cssTextarea.classList.add('d-none');
    jsTextarea.classList.add('d-none');
    this.$refs.html.classList.add('textarea-container-open');
    this.$refs.css.classList.remove('textarea-container-open');
    this.$refs.js.classList.remove('textarea-container-open');
    this.$refs.html.classList.remove('textarea-container');
    this.$refs.css.classList.add('textarea-container');
    this.$refs.js.classList.add('textarea-container');
  },
  toggleCss() {
    const cssTextarea = document.getElementById('css-code');
    const htmlTextarea = document.getElementById('html-code');
    const jsTextarea = document.getElementById('js-code');
    cssTextarea.classList.remove('d-none');
    htmlTextarea.classList.add('d-none');
    jsTextarea.classList.add('d-none');
    this.$refs.css.classList.add('textarea-container-open');
    this.$refs.html.classList.remove('textarea-container-open');
    this.$refs.js.classList.remove('textarea-container-open');
    this.$refs.css.classList.remove('textarea-container');
    this.$refs.html.classList.add('textarea-container');
    this.$refs.js.classList.add('textarea-container');
  },
  toggleJs() {
    const jsTextarea = document.getElementById('js-code');
    const htmlTextarea = document.getElementById('html-code');
    const cssTextarea = document.getElementById('css-code');
    jsTextarea.classList.remove('d-none');
    htmlTextarea.classList.add('d-none');
    cssTextarea.classList.add('d-none');
    this.$refs.js.classList.add('textarea-container-open');
    this.$refs.html.classList.remove('textarea-container-open');
    this.$refs.css.classList.remove('textarea-container-open');
    this.$refs.js.classList.remove('textarea-container');
    this.$refs.html.classList.add('textarea-container');
    this.$refs.css.classList.add('textarea-container');
  },
  toggleChat() {
        this.isCollapsed = !this.isCollapsed;
  },
  mouseover(){
    this.$refs.main.style.transform = 'translateY(0px)';
  },
  mouseout(){
    this.$refs.main.style.transform = 'translateY(-65px)';
  }
  },
  mounted() {
    var storedToken = localStorage.getItem('token');
    if( storedToken == null){
      this.$router.push('/');
    }
  },
}

</script>


<style scoped>
  .main{
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
    padding: 10px;
    display: flex;
}

.textarea-container {
    display: flex;
    flex: 0;
    height: 98vh;
    border: 1px solid #fff;

    label{
        display: flex;
        align-items: center;
        background: #000;
        width: 25px;
        height: 98vh;
        border-radius:2% ;
        border: 1px solid #fff;
        writing-mode: vertical-rl;
        text-orientation: upright;
    }
    transition: all 0.5s ease-in-out;
    .run-but{
        display: none
    }
}


.textarea-container-open {
    flex: 1;
    label{
      display: flex;
      align-items: center;
      background: #000;
      height: 20px;
    }
    transition: all 0.5s ease-in-out;
}



textarea {
    width: 100%;
    height: 96vh;
    padding: 10px;
    background: #1f1f1f;
    color: #fff;
    font-size: 18px;
    border: none;
    resize: none;
    border-radius: 0% 0% 2% 2% ;
}


iframe {
    width:100%;
    height: 100vh;
    background: #fff;
    border: none;
    border-radius:  2% ;
}
label i{
    margin-left: 10px;
    margin-right: 10px;;
}

.run-but {
    display: inline-flex;
    align-items: center;
    height: auto; 
    padding: 0.375rem 0.75rem; 
    font-size: 0.875rem; 
    height: 18px;
}

.toggle-chat-btn {
  position: fixed;
  right: 0;
  top: 58%;
  transform: translateY(-50%);
  z-index: 1000;
}

</style>


