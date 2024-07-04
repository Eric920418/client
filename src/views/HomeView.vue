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
            <button class="toggle-btn btn btn-light" style="font-size: 50px;  top: 49%;" @click="restart"><i class="fa-solid fa-rotate-left"></i></button>
          </div>
          <div>
            <button v-if="!StartPractice" class="toggle-btn btn" ref="tip" style="font-size: 50px;background-color: blueviolet;  top: 60%;" @click="startPractice"><i class="fa-solid fa-laptop-code"></i></button>
            <button v-if="StartPractice" class="toggle-btn btn" ref="tip" style="font-size: 50px;background-color: blueviolet;  top: 60%;" @click="closePractice"><i class="fa-solid fa-laptop-code"></i></button>
          </div>
          <div class="toggle-btn practice" ref="practice" style="">
            123
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
              <div id="console-output"></div>
            </div>
            <div id="iframe-container" class="text-close " ref="iframe">
              <iframe id="output" ref="output"></iframe>
            </div>
          </div>
          <button class="toggle-chat-btn btn btn-danger" style="font-size: large; width: 40px; top: 0%;" @click.stop="runOutput" ref="run">跑程式碼</button>
          <button class="toggle-chat-btn btn btn-primary" style="font-size: large; width: 40px; top: 14.5%;" @click.stop="saveButton" ref="save">儲存</button>
          <button class="toggle-chat-btn btn btn-warning" style="font-size: large; width: 40px; top: 23%;" v-if="isCollapsed" @click="toggleChat" ref="chat">開啟聊天</button>
          <button class="toggle-chat-btn btn btn-success" style="font-size: large; width: 40px; top: 37.5%;" v-if="isOpenLog" @click="openLog" ref="log">打開紀錄</button>
          <button class="toggle-chat-btn btn btn-secondary" style="font-size: large; width: 40px; top: 52%;" v-if="isTest" @click="openTest">開啟考試視窗
            <span class="position-absolute  translate-middle badge rounded-pill bg-danger " style="left: -5px; top: 10px;">{{ exams.length }}</span>
          </button>
          <button class="toggle-chat-btn btn btn-info" style="font-size: large; width: 40px; top: 72.7%;" @click="openLog">心得</button>
      </div>

      <div v-if="!isCollapsed" >
        <button @click="toggleChat" class="toggle-chat-btn btn btn-warning" style="font-size: large; width: 40px; top: 23%;">關閉聊天</button>
        <chat  class="chat" ></chat>
      </div>
      <div v-if="!isOpenLog">
        <button @click="openLog" class="toggle-chat-btn btn btn-success" style="font-size: large; width: 40px; top: 37.5%;">關閉紀錄</button>
        <document @go-to-demo="handleGoToDemo" @close-model="openLog"  class="document" ></document>
      </div>
      <div v-if="!isTest">
        <button @click="openTest" class="toggle-chat-btn btn btn-secondary" style="font-size: large; width: 40px; top: 52%;">關閉考試視窗</button>
        <div class="exam" style="height: 100vh; overflow-y: scroll;">
          <div v-if="exams && !exam.examName && !isFinishExam.examName" v-for="exam in exams" :key="exam.id" class="card mt-3 cardBody" style="margin-bottom: 20px;" >
              <div class="card-body">
                  <button class="d-flex justify-content-start align-items-center btn btn-primary mb-2" @click="checkExam(exam)">開始考試</button>
                  <div class="d-flex justify-content-between align-items-center ">
                      <div>考券名稱:{{ exam.examName }} (類型: {{ exam.examType }})</div>
                      <div>題數: {{ exam.questionCount }}題</div>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                      <div>難度: {{ exam.examDifficulty }}</div>
                      <div>截止時間: {{ exam.examDate }}  {{ exam.examTime }}以前</div>
                  </div>
              </div>
          </div>
          <div v-if="finishExams && !exam.examName && !isFinishExam.examName" v-for="exam in finishExams" :key="exam.id" class="card mt-3 cardBody" style="margin-bottom: 20px;" >
              <div class="card-body bg-success">
                <div class="d-flex justify-content-start align-items-center fs-3 ">已交卷 <button class="btn btn-primary ms-4" @click="checkFinishExam(exam)">查看結果</button></div>
                <div class="my-2 fs-5">分數: {{ exam.examScore }}分</div>
                  <div class="d-flex justify-content-between align-items-center">
                      <div>考券名稱:{{ exam.examName }} (類型: {{ exam.examType }})</div>
                      <div>題數: {{ exam.questionCount }}題</div>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                      <div>難度: {{ exam.examDifficulty }}</div>
                      
                      <div>完成時間: {{ exam.examFinishTime }}</div>
                  </div>
              </div>
          </div>
          <div v-else-if="exam.examName" class="container my-4">
              <div class="d-flex justify-content-between align-items-center">
                <h2 class="text-center text-black mb-4">{{ exam.examName }}</h2>
                <button class="btn btn-primary mb-4" @click="exam = ''">返回</button>
              </div>
              <div v-for="ques in exam.examQues.questions" :key="ques.id" class="card mb-4 shadow-sm">
                  <div class="card-body">
                      <div class="d-flex justify-content-between align-items-center my-2">
                          <h5 class="card-title">題目: {{ ques.title }}</h5>
                          <span class="badge bg-primary">{{ ques.types == "short-answer" ? "問答題" : "選擇題" }}</span>
                      </div>
                      <div v-if="ques.types != 'short-answer'" class="my-3">
                          <button @click="ques.answer = '0'" class="btn btn-outline-primary w-25 my-2 mx-2 text-black">
                              選項A: {{ ques.options[0] }}
                          </button>
                          <button @click="ques.answer = '1'" class="btn btn-outline-primary w-25 my-2 mx-2 text-black">
                              選項B: {{ ques.options[1] }}
                          </button>
                      </div>
                      <div v-if="ques.types != 'short-answer'" class="my-3">
                          <button @click="ques.answer = '2'" class="btn btn-outline-primary w-25 my-2 mx-2 text-black">
                              選項C: {{ ques.options[2] }}
                          </button>
                          <button @click="ques.answer = '3'" class="btn btn-outline-primary w-25 my-2 mx-2 text-black">
                              選項D: {{ ques.options[3] }}
                          </button>
                      </div>
                      <div v-if="ques.types == 'short-answer'" class="my-3">
                          <input type="text" class="form-control" v-model="ques.answer" placeholder="請輸入答案">
                      </div>
                      <div class="d-flex justify-content-between align-items-center mt-4">
                          <span>答案: {{ getAnswer(ques.answer) }}</span>
                          <span class="badge bg-success">{{ ques.score }}分</span>
                      </div>
                  </div>
              </div>
              <button class="btn btn-success d-flex justify-content-between align-items-center mt-4" @click="finishExam">交券</button>
          </div>
          <div v-if="isFinishExam.examName "  class="container my-4">
              <div class="d-flex justify-content-between align-items-center">
                <h2 class="text-center text-black mb-4">{{ isFinishExam.examName }}</h2>
                <button class="btn btn-primary mb-4" @click="isFinishExam = ''">返回</button>
              </div>
              <div v-for="ques in isFinishExam.examQues.questions" :key="ques.id" class="card mb-4 shadow-sm">
                  <div class="card-body">
                      <div class="d-flex justify-content-between align-items-center my-2">
                          <h5 class="card-title">題目: {{ ques.title }}</h5>
                          <span class="badge bg-primary">{{ ques.types == "short-answer" ? "問答題" : "選擇題" }}</span>
                      </div>
                    <div v-if="ques.types != 'short-answer'" class="my-3">
                          <button disabled :class="ques.answer == '0' ? 'btn btn-outline-primary w-25 my-2 mx-2 text-black bg-success' : 'btn btn-outline-primary w-25 my-2 mx-2 text-black'">
                              選項A: {{ ques.options[0] }}
                          </button>
                          <button disabled :class="ques.answer == '1' ? 'btn btn-outline-primary w-25 my-2 mx-2 text-black bg-success' : 'btn btn-outline-primary w-25 my-2 mx-2 text-black'">
                              選項B: {{ ques.options[1] }}
                          </button>
                      </div>
                      <div v-if="ques.types != 'short-answer'" class="my-3">
                          <button disabled  :class="ques.answer == '2' ? 'btn btn-outline-primary w-25 my-2 mx-2 text-black bg-success' : 'btn btn-outline-primary w-25 my-2 mx-2 text-black'">
                              選項C: {{ ques.options[2] }}
                          </button>
                          <button disabled  :class="ques.answer == '3' ? 'btn btn-outline-primary w-25 my-2 mx-2 text-black bg-success' : 'btn btn-outline-primary w-25 my-2 mx-2 text-black'">
                              選項D: {{ ques.options[3] }}
                          </button>
                      </div>
                      <div class="d-flex justify-content-between align-items-center mt-4">
                          <span><strong class="me-5">解答: {{ getAnswer(ques.answer) }}</strong> 你的答案: {{ getAnswer(ques.userAnswer) }}</span>
                          <span class="badge bg-success">{{ ques.score }}分</span>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import * as monaco from "monaco-editor";
  import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
  import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
  import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
  import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';

  import Chat from '../components/ChatMessage.vue';
  import Document from '../components/Dcumental.vue';

  import { marked } from 'marked';
  import {action} from "../components/action.js";

  export default {
    name: 'MonacoEditor',
    components: {
      Chat,
      Document,
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
        isTest: true,
        StartPractice: false,
        exams: [],
        finishExams: [],
        exam: {},
        isFinishExam: {},

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
        let storedToken = localStorage.getItem('token');
        this.$axios.post('/code/runCode', {code : this.jsCode},{
            headers: {
              'Authorization': `Bearer ${storedToken}`,
              'Content-Type': 'application/json',
            }
          })
        .then((res) => {
          this.jsCode = this.jsEditor.getValue();
          this.cssCode = this.cssEditor.getValue();
          this.htmlCode = this.htmlEditor.getValue(); 

          try {
              const originalWarn = console.warn;
              let warnings = [];

              console.warn = function (message) {
                  warnings.push(message);
                  originalWarn.apply(console, arguments);
              };

              try {
                  eval(this.jsCode); 
              } catch (jsError) {
                  this.$swal.fire({
                      title: 'JS 出现错误',
                      text: jsError,
                      icon: 'error'
                  });
              }

              try {
                eval(this.cssCode)
              } catch (cssError) {
                  this.$swal.fire({
                      title: 'CSS 出现错误',
                      text: cssError,
                      icon: 'error'
                  });
              }

              try {
                eval(this.htmlCode)
              } catch (htmlError) {
                  this.$swal.fire({
                      title: 'HTML 出现错误',
                      text: htmlError,
                      icon: 'error'
                  });
              }

              this.updateOutput();
              console.warn = originalWarn;
              if (warnings.length > 0) {
                  this.$swal.fire({
                      title: 'JavaScript 警告',
                      text: warnings.join('\n'),
                      icon: 'warning'
                  });
              }
              this.$refs.iframe.classList.add('text');
              this.$refs.html.classList.remove('text');
              this.$refs.css.classList.remove('text');
              this.$refs.js.classList.remove('text');
              this.$refs.iframe.classList.remove('text-close'); 
              this.$refs.html.classList.add('text-close');
              this.$refs.css.classList.add('text-close');
              this.$refs.js.classList.add('text-close');
          } catch (e) {
              this.$swal.fire({
                  title: '未知错误',
                  text: e,
                  icon: 'error'
              });
              console.warn = originalWarn;
          }
        }).catch((err) => {
          const errorMessage = err.response.data.message 
          this.$swal.fire({
              title: '執行失敗',
              text: errorMessage,
              icon: 'error'
            });
        });
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
      startPractice() {
        this.StartPractice = true;
        this.$refs.practice.style.top = '30%';
      },
      closePractice() {
        this.StartPractice = false;
        this.$refs.practice.style.top = '-100%';
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
        let storedToken = localStorage.getItem('token');
        this.$axios.post('/code', code, {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
            'Content-Type': 'application/json',
          }
        })
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
      openTest() {
        this.isTest = !this.isTest;
        this.$refs.html.classList.add('text-close');
        this.$refs.css.classList.add('text-close');
        this.$refs.iframe.classList.add('text-close');
        this.$refs.js.classList.add('text-close');
        this.$refs.html.classList.remove('text');
        this.$refs.css.classList.remove('text');
        this.$refs.iframe.classList.remove('text');
        this.$refs.js.classList.remove('text');
        this.$refs.chat.disabled = true;
        this.$refs.log.disabled = true;
        this.$refs.run.disabled = true;
        this.$refs.save.disabled = true;
        this.$refs.tip.disabled = true;
        if (this.isTest) {
          action.pushAction({
          action: '關閉考試視窗',
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
          this.$refs.chat.disabled = false;
          this.$refs.log.disabled = false;
          this.$refs.run.disabled = false;
          this.$refs.save.disabled = false;
          this.$refs.tip.disabled = false;
        }else{
          action.pushAction({
          action: '打開考試視窗',
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
      },
      checkExam(exam) {
          this.exam = exam;
      },
      checkFinishExam(exam) {
          this.isFinishExam = exam;
      },
      getAnswer(answer) {
          if (answer == 0) {
              return "A";
          } else if (answer == 1) {
              return "B";
          } else if (answer == 2) {
              return "C";
          } else if (answer == 3) {
              return "D";
          } else if (answer == 4) {
              return "E";
          } else if (answer == 5) {
              return "F";
          } else if (answer == 6) {
              return "G"; 
          } else if (answer == null) {
              return "未作答";
          }else {
              return answer;
          }
      },
      finishExam() {
          let userId = this.getCookie('id');
          let storedToken = localStorage.getItem('token');
          let exam = {
              examId: this.exam.examId,
              finishTime: new Date().toLocaleString('zh-TW', {
                              year: 'numeric',
                              month: '2-digit',
                              day: '2-digit',
                              hour: '2-digit',
                              minute: '2-digit',
                              hour12: false
                          }).replace(/\//g, '-').replace(',', ''),
              answer: this.exam.examQues.questions.map(ques => { return ques.answer }),
              state: 1
          }

          this.$axios.patch(`/auth/student/examTicket/${userId}`, exam, {
              headers: {
                  'Authorization': `Bearer ${storedToken}`,
                  'Content-Type': 'application/json',
              }
          }).then((res) => {
              this.$swal.fire({
                  title: '交卷成功',
                  text: '已成功交卷',
                  icon: 'success',
              }).then(() => {
                  window.location.reload();
              })
          }).catch((error) => {
              console.error(error);
              console.log(exam);
              this.$swal.fire({
                  title: '交卷失敗',
                  text: error,
                  icon: 'error'
              });
          });
      },
      restart(){
        this.htmlEditor.setValue(`<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>Document</title>\n</head>\n<body>\n\t\n</body>\n</html>\n`)
        this.cssEditor.setValue(``)
        this.jsEditor.setValue(``)
        this.htmlCode = `<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>Document</title>\n</head>\n<body>\n\t\n</body>\n</html>\n`
        this.cssCode = ``
        this.jsCode = ``
        this.updateOutput();
      }
    },
    mounted() {
      var storedToken = localStorage.getItem('token');
      if (storedToken == null) {
        this.$router.push('/');
      }
      ////////////////////////////////////////////////////////////
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
      // 初始化 HTML 编辑器
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
        value: 'body {\n\tfont-family: Arial, sans-serif;\n}\nh1 {\n\tmargin-top: 50px;\n\tz-index: 10;\n\ttext-align: center;\n}\n.content{\n\tdisplay: flex;\n\tflex-direction: column;\n\tmargin: 0 0 0 40px;\n}\n.html{\n\tdisplay:flex;\n\tjustify-content: start;\n\tmargin-top: -75px;\n\tmargin-left: 40px;\n}\n.code{\n\tdisplay:flex;\n\tjustify-content: end;\n\tmargin-right: 50px;\n\tmargin-top: -15px;\n}\n.css{\n\tdisplay:flex;\n\tjustify-content: start;\n\tmargin-top: 50px;\n\tmargin-left: 40px;\n}\n.save{\n\tdisplay:flex;\n\tjustify-content: end;\n\tmargin-right: 50px;\n\tmargin-top: 5px;\n}\n.javascript{\n\tdisplay:flex;\n\tjustify-content: start;\n\tmargin-top: 40px;\n\tmargin-left: 40px;\n}\n.chatbot{\n\tdisplay:flex;\n\tjustify-content: end;\n\tmargin-right: 50px;\n\tmargin-top: 20px;\n}\n.output{\n\tdisplay:flex;\n\tjustify-content: start;\n\tmargin-top: 80px;\n\tmargin-left: 40px;\n}\n.log{\n\tdisplay:flex;\n\tjustify-content: end;\n\tmargin-right: 50px;\n\tmargin-top: -30px;\n}\n',
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

          this.jsCode = this.jsEditor.getValue();

          function captureConsoleOutput() {
            const originalLog = console.log;
            const consoleOutput = document.getElementById('console-output');

            console.log = function(message) {
              consoleOutput.innerHTML += `<div>${message}</div>`;
              originalLog.apply(console, arguments);
            };

            return function resetConsole() {
              console.log = originalLog;
            };
          }

          const consoleOutput = document.getElementById('console-output');
          consoleOutput.innerHTML = ''; 
          const resetConsole = captureConsoleOutput();

          try {
            eval(this.jsCode); 
          } catch (e) {
          }

          resetConsole();
          if (!this.isActionPushed) {
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
      ///////////////////////////////////////////////////////////
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
      ///////////////////////////////////////////////////////////
      this.htmlCode = this.htmlEditor.getValue();
      this.cssCode = this.cssEditor.getValue();
      this.jsCode = this.jsEditor.getValue();
      this.updateOutput();
      //////////////////////////////////////////////////////////////
      let userId = this.getCookie('id');
      this.$axios.get(`/auth/student/examTicket/${userId}`, {
        headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
        }
      })
      .then(response => {
          response.data.data.ExamTicket.forEach(element => {
              if (element.state == 1) { 
                console.log(element);
                  let ticket = {
                    examScore: element.score, 
                    examAns: element.answer,
                    examType: element.examId.type == 0 ? "選擇題" : "問答題",
                    examName: element.examId.name,
                    questionCount: element.examId.HowMany,
                    examDifficulty: element.examId.difficulty == 0 ? "簡單" :
                                    element.examId.difficulty == 1 ? "普通" :
                                    element.examId.difficulty == 2 ? "困難" :
                                    element.examId.difficulty == 3 ? "超難" :
                                    element.examId.difficulty == 4 ? "地獄" : "未知",
                    examFinishTime: element.finishTime,
                    examQues: {
                        questions: element.examId.question.map((ques, index) => {
                            return {
                                types: ques.types,
                                title: ques.title,
                                options: ques.options,
                                score: ques.score,
                                answer: ques.answer,
                                userAnswer: element.answer[index]
                            };
                        }),
                      }
                  };
                this.finishExams.push(ticket);  
              }
              if (element.state == 0) {
                const currentDate = new Date();
                const examDateStr = element.examId.date;
                const examTimeStr = element.examId.time;
                const examDateTimeStr = `${examDateStr}T${examTimeStr}`;
                const examDateTime = new Date(examDateTimeStr);
                if (examDateTime < currentDate) {
                  let userId = this.getCookie('id');
                  let storedToken = localStorage.getItem('token');
                  let exam = {
                      examId: element._id,
                      finishTime: new Date().toLocaleString('zh-TW', {
                                      year: 'numeric',
                                      month: '2-digit',
                                      day: '2-digit',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                      hour12: false
                                  }).replace(/\//g, '-').replace(',', ''),
                      answer: [],
                      state: 1
                  }

                  this.$axios.patch(`/auth/student/examTicket/${userId}`, exam, {
                      headers: {
                          'Authorization': `Bearer ${storedToken}`,
                          'Content-Type': 'application/json',
                      }
                  })
                } else {
                  let ticket = {
                    examType: element.examId.type == 0 ? "選擇題" : "問答題",
                    examName: element.examId.name,
                    questionCount: element.examId.HowMany,
                    examDifficulty: element.examId.difficulty == 0 ? "簡單" :
                                    element.examId.difficulty == 1 ? "普通" :
                                    element.examId.difficulty == 2 ? "困難" :
                                    element.examId.difficulty == 3 ? "超難" :
                                    element.examId.difficulty == 4 ? "地獄" : "未知",
                    examDate: element.examId.date,
                    examTime: element.examId.time,
                    examQues: {
                        questions: element.examId.question.map(ques => {
                            return {
                                types: ques.types,
                                title: ques.title,
                                options: ques.options,
                                score: ques.score
                            };
                        }),
                        answer: ""
                    },
                    examId: element._id,
                  };
                  this.exams.push(ticket);
                }
              }
          });
      })
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
  label i {
    margin-left: 10px;
    margin-right: 10px;
  }
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
    transition: all 0.5s ease;;
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
    z-index: 999;
    padding: 0 50px;
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
  }
  .exam {
    position: fixed;
    top: 0;
    z-index: 999;
    padding: 0 50px;
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    background: #fff;

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
  .text-close{
    display: none;
  }
  .exam::-webkit-scrollbar {
    width: 0; 
  }
  .exam::-webkit-scrollbar-track {
    background-color: transparent;
  }
  .cardBody:hover {
      background-color: #aaaaaa;
      cursor: pointer;
      transition: all 0.3s ease-in-out;;
  }
  .checkbox:hover {
      background-color: #aaaaaa;
      cursor: pointer;
      transition: all 0.3s ease-in-out;;
  }
  #console-output {
      padding: 10px;
      border: 1px solid #ddd;
      background-color: #f9f9f9;
      color: #454545;
      position: absolute;
      top: calc(100vh - 200px); /* Adjust to place it 200px above the bottom of the viewport */
      left: 0;
      right: 0;
      width: 100%;
      height: 200px; /* Adjust this value as needed */
      z-index: 1000;
      overflow: auto; /* Add overflow to make it scrollable if needed */
    }
  .practice {
    left: 50%; 
    top: -30%; 
    transform: translate(-50%, -50%); 
    font-size: 50px; 
    background-color: #f0ad4e; 
    width: 500px; 
    height: 500px;  
    display: flex; 
    justify-content: 
    center; align-items: center;
  }

</style>