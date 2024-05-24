<template>
  <div class="main">
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
    <div class="row m-0 p-0 mb-3 py-1" style="height: 90vh">
      <div class="col-8">
        <div id="iframe-container">
          <iframe id="output" ref="output"></iframe>
        </div>
      </div>
      <div class="col-4 ps-0 pb-2 pe-3 mb-0">
        <div class="chat w-100 d-flex align-content-end flex-wrap h-100 bg-black">
          <label class="ms-1 mb-3" style="border-radius: 2% !important;"><i class="fa-solid fa-comment-dots"></i>AI Chat</label>
          <div class="ch d-flex w-100 flex-column m-1 justify-content-end" style="height: 90vh; overflow-y: auto">
            <div v-for="(message, index) in chat" :key="index">
              <div class="m-1 d-flex justify-content-end" v-if="message.user">
                <div class="text-white bg-success fs-6 p-2" style="border-radius: 20px;">User: {{ message.user }}</div>
              </div>
              <div class="m-1 d-flex justify-content-start" v-if="message.ai">
                <div class="text-white bg-primary fs-6 p-2" style="border-radius: 20px;">AI: {{ message.ai }}</div>
              </div>
            </div>
          </div>
          <div class="mt-auto w-100 position-relative">
            <input class="w-100 form-control border-0" type="text" v-model="que" @keyup.enter="handleEnter">
            <i class="bi bi-arrow-up-square-fill in position-absolute z-3 fs-2" style="top: -5px; right: 5px;" @click="handleEnter"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      htmlCode: '',
      cssCode: '',
      jsCode: '',
      que: '',
      chat: []
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
    handleEnter() {
      if (this.que.trim() !== '') {
        this.chat.push({ user: this.que });
        this.$axios.post('/chat', { que: this.que })
          .then(res => {
            this.chat.push({ ai: res.data.ai });
          })
          .catch(err => {
            console.error(err);
          });
        this.que = '';
      }
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
    }
  }
};

</script>


<style scoped>
  .main{
    font-family: Arial, sans-serif;
    box-sizing: border-box;
    background-color: #454545;
    color: #fff;
    margin: 0;
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
.chat{
    border-radius: 2%;
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
</style>
