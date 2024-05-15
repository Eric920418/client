<template>
  <div class="main">
      <div class="containers">
        <div class="textarea-container">
          <label><i class="fa-brands fa-html5"></i>HTML</label>
          <textarea id="html-code" @keyup="updateOutput" v-model="htmlCode"></textarea>
        </div>
        <div class="textarea-container">
          <label><i class="fa-brands fa-css3-alt"></i>CSS</label>
          <textarea id="css-code" @keyup="updateOutput" v-model="cssCode"></textarea>
        </div>
        <div class="textarea-container">
          <label><i class="fa-brands fa-square-js"></i>JavaScript</label>
          <textarea id="js-code" @keyup="updateInput" v-model="jsCode"></textarea>
        </div>
      </div>
      <div class="row m-0 p-0 mb-3 py-1 " style="height: 90vh">
          <div class="col-8 ">
              <div id="iframe-container">
                  <iframe id="output" ref="output"></iframe>
              </div>
          </div>
          <div class="col-4 ps-0 pb-2 pe-3 mb-0" >
            <div class="chat w-100 d-flex align-content-end flex-wrap h-100 bg-black" >
                <label class=" ms-1 mb-3  " style="border-radius:  2% !important;"><i class="fa-solid fa-comment-dots"></i>AI Chat</label>
                
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

                  <div class="mt-auto w-100 ">
                      <input  class=" w-100 form-control border-0"  type="text" v-model="que" @keyup.enter="handleEnter">
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
    }
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
    handleEnter() {
      if (this.que.trim() !== '') {
        this.chat.push({ user: this.que });

     
        this.$axios.post('/chat', { que: this.que })
          .then(res => {
            console.log(res.data);
            this.chat.push({ ai: res.data.ai });
            this.scrollToEnd();
          })
          .catch(err => {
            console.error(err);
          });

        // 清空输入框
        this.que = '';
      }
    }
  },
  watch: {
    htmlCode: 'updateOutput',
    cssCode: 'updateOutput',
    jsCode: 'updateOutput'
  },
  mounted() {
    const token = localStorage.getItem('token');
    if (!token) {
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
}

.containers {
    padding: 10px;
    display: flex;
}

.textarea-container {
    flex: 1;
    margin-right: 10px;
   
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
label {
    display: flex;
    align-items: center;
    background: #000;
    height: 20px;
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


</style>
