<template>
  <!-- <button type="button" class="btn btn-primary my-3">紀錄</button> -->
  <div class="card shadow-lg my-3">
    <button
      class="btn btn-warning m-3"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      任務檔案
    </button>
    <div class="card-body p-0">
      <div class="mx-auto" style="width: 90%">
        <div class="d-flex justify-content-between mb-3 mt-4">
          <input
            type="text"
            class="form-control fs-5 me-1 my-3"
            v-model="task.taskName"
            placeholder="任務名稱"
          />

          <select
            name=""
            class="form-select fs-5 ms-1 my-3"
            id=""
            v-model="task.class"
          >
            <option value="">班級</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        <div class="d-flex justify-content-between mb-3">
          <div class="card p-3" style="width: 80%; margin: 0 1%">
            <div
              v-for="(guide, index) in task.guide"
              :key="index"
              :value="guide"
              class="d-flex justify-content-between my-2 w-100"
            >
              <div class="w-100">
                <input
                  type="text"
                  class="form-control fs-5"
                  v-model="task.guide[index]"
                  :placeholder="`子任務${index + 1}`"
                />
              </div>
              <div class="d-flex align-items-end">
                <button
                  type="button"
                  class="btn btn-danger ms-2 py-2"
                  @click="remove('guide', index)"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-primary ms-2 py-2"
              @click="add('guide')"
            >
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <div class="card p-3" style="width: 80%; margin: 0 1%">
            <div
              v-for="(target, index) in task.target"
              :key="index"
              :value="target"
              class="d-flex justify-content-between my-2 w-100"
            >
              <div class="w-100">
                <input
                  type="text"
                  class="form-control fs-5"
                  v-model="task.target[index]"
                  :placeholder="`目標${index + 1}`"
                />
              </div>
              <div class="d-flex align-items-end">
                <button
                  type="button"
                  class="btn btn-danger ms-2 py-2"
                  @click="remove('target', index)"
                >
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
            <button
              type="button"
              class="btn btn-primary ms-2 py-2"
              @click="add('target')"
            >
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
        <div class="card p-3 w-100">
          <div
            v-for="(question, index) in task.question"
            :key="index"
            :value="question"
            class="d-flex justify-content-between my-2"
          >
            <div class="w-100">
              <input
                type="text"
                class="form-control fs-5"
                v-model="task.question[index]"
                :placeholder="`實作問題${index + 1}`"
              />
            </div>
            <div class="d-flex align-items-end">
              <button
                type="button"
                class="btn btn-danger ms-2 py-2"
                @click="remove('question', index)"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
          <button
            type="button"
            class="btn btn-primary ms-2 py-2"
            @click="add('question')"
          >
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>

        <br />
        <h4 class="ms-1" style="margin-top: 50px">教材PPT</h4>
        <div class="card p-3 w-100">
          <input
            class="form-control"
            type="file"
            id="ppt"
            @change="handleFileUpload"
            accept="application/pdf"
          />
        </div>
        <div v-if="this.task.slides.length != 0" class="text-danger">
          目前已經有檔案
        </div>
      </div>
      <h4 class="ms-1" style="margin-top: 50px">體驗範例</h4>
      <div class="d-flex my-3">
        <div class="text" id="html-code" ref="html">
          <div class="editor-container" ref="htmlEditorContainer"></div>
        </div>
        <div class="text" id="css-code" ref="css">
          <div class="editor-container" ref="cssEditorContainer"></div>
        </div>
        <div class="text" id="js-code" ref="js">
          <div class="editor-container" ref="jsEditorContainer"></div>
        </div>
      </div>
      <div id="iframe-container" class="text-close" ref="iframe">
        <iframe id="output" ref="output"></iframe>
      </div>
      <div class="d-flex mt-2">
        <button
          class="btn btn-success ms-auto m-2"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal2"
        >
          發送單一同學考卷
        </button>
        <button type="button" class="btn btn-primary m-2" @click="sendPractice">
          <div v-if="loading" class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>

          <div v-else class="fs-4">發送</div>
        </button>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-black" id="exampleModalLabel">
            全部任務(點擊載入)
          </h5>
        </div>
        <div class="modal-body text-black">
          <table class="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">任務名稱</th>
                <th scope="col">班級</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(task, index) in allTask"
                :key="index"
                @click="checkTask(task)"
                data-bs-dismiss="modal"
              >
                <td>{{ task.title }}</td>
                <td>{{ task.type }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    class="modal fade"
    id="exampleModal2"
    tabindex="-1"
    aria-labelledby="exampleModalLabel2"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body text-black">
          <table class="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">姓名</th>
                <th scope="col">學號</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(student, index) in AllStudent"
                :key="index"
                @click="pushOnlyOne(student._id)"
              >
                <td>{{ student.name }}</td>
                <td>{{ student.studentID }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as monaco from "monaco-editor";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import JsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import CssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import HtmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import TsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

import * as pdfjsLib from "pdfjs-dist/webpack";

export default {
  data() {
    return {
      task: {
        taskName: "",
        class: "",
        guide: [""],
        target: [""],
        question: [""],
        slides: [],
        htmlCode: "",
        cssCode: "",
        jsCode: "",
      },
      AllStudent: [],
      isDragging: false,
      dragIndex: null,
      dragElementIndex: null,
      offsetX: 0,
      offsetY: 0,
      selectIndex: null,
      selectElementIndex: null,
      loading: false,
      allTask: [],
    };
  },
  methods: {
    updateOutput() {
      const iframe = this.$refs.output;
      const documentContent = `
                <html>
                    <head>
                    <style>${this.task.cssCode}</style>
                    </head>
                    <body>
                    ${this.task.htmlCode}
                    <script>${this.task.jsCode}<\/script>
                    </body>
                </html>
                `;
      iframe.srcdoc = documentContent;
    },
    sendPractice() {
      this.loading = true;
      var storedToken = localStorage.getItem("token");
      const practice = {
        title: this.task.taskName,
        type: this.task.class,
        html: this.task.htmlCode,
        css: this.task.cssCode,
        js: this.task.jsCode,
        target: this.task.target,
        guide: this.task.guide,
        question: this.task.question,
        ppt: this.task.slides,
      };
      this.$axios
        .post("/task", practice, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.loading = false;
          this.$swal.fire({
            title: "發送成功",
            text: "已成功發送",
            icon: "success",
          });
        })
        .catch((err) => {
          this.$swal.fire({
            title: "發送失敗",
            text: "發送失敗",
            icon: "error",
          });
          console.log(err);
        });
    },
    add(i) {
      this.task[i].push("");
    },
    remove(i, index) {
      this.task[i].splice(index, 1);
    },
    async handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file || file.type !== "application/pdf") {
        alert("Please upload a PDF file.");
        return;
      }

      const fileReader = new FileReader();
      fileReader.onload = async (e) => {
        const pdfData = new Uint8Array(e.target.result);
        try {
          const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
          const images = [];
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const scale = 1;
            const viewport = page.getViewport({ scale });
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({ canvasContext: context, viewport: viewport })
              .promise;
            const base64Image = canvas.toDataURL("image/png");
            images.push(base64Image);
          }

          this.task.slides = images;
        } catch (error) {
          console.error("Error loading PDF:", error);
        }
      };

      fileReader.readAsArrayBuffer(file);
    },
    checkTask(event) {
      this.task.taskName = event.title;
      this.task.guide = event.guide;
      this.task.target = event.target;
      this.task.question = event.question;
      this.task.htmlCode = event.html;
      this.htmlEditor.setValue(event.html);
      this.task.cssCode = event.css;
      this.cssEditor.setValue(event.css);
      this.task.jsCode = event.js;
      this.jsEditor.setValue(event.js);
      this.task.slides = event.ppt;
      this.updateOutput();
    },
    pushOnlyOne(student) {
      const practice = {
        title: this.task.taskName,
        type: this.task.class,
        html: this.task.htmlCode,
        css: this.task.cssCode,
        js: this.task.jsCode,
        target: this.task.target,
        guide: this.task.guide,
        question: this.task.question,
        ppt: this.task.slides,
      };
      this.$axios
        .post(`/task/${student}`, practice)
        .then((res) => {
          this.loading = false;
          this.$swal.fire({
            title: "發送成功",
            text: "已成功發送",
            icon: "success",
          });
        })
        .catch((err) => {
          this.$swal.fire({
            title: "發送失敗",
            text: "發送失敗",
            icon: "error",
          });
          console.log(err);
        });
    },
  },
  mounted() {
    // 初始化 HTML 编辑器
    this.htmlEditor = monaco.editor.create(this.$refs.htmlEditorContainer, {
      value: `<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>Document</title>\n</head>\n<body>\n\t\n</body>\n</html>\n`,
      language: "html",
      theme: "vs-dark",
      fontSize: 10,
      colorDecorators: true,
      automaticLayout: true, // 启用自动布局
      formatOnType: true,
      minimap: {
        enabled: false, // 關閉迷你地圖
      },
    });
    // 监听 HTML 编辑器内容变化
    this.htmlEditor.onDidChangeModelContent(() => {
      this.task.htmlCode = this.htmlEditor.getValue();
      this.updateOutput();
    });
    // 初始化 CSS 编辑器
    this.cssEditor = monaco.editor.create(this.$refs.cssEditorContainer, {
      value: "",
      language: "css",
      theme: "vs-dark",
      codeLens: false,
      colorDecorators: true,
      fontSize: 10,
      automaticLayout: true, // 启用自动布局
      formatOnType: true,
      minimap: {
        enabled: false, // 關閉迷你地圖
      },
    });
    // 监听 CSS 编辑器内容变化
    this.cssEditor.onDidChangeModelContent(() => {
      this.task.cssCode = this.cssEditor.getValue();
      this.updateOutput();
    });
    // 初始化 JavaScript 编辑器
    this.jsEditor = monaco.editor.create(this.$refs.jsEditorContainer, {
      value: `console.log('Hello, world!');`,
      language: "javascript",
      theme: "vs-dark",
      automaticLayout: true, // 启用自动布局
      formatOnType: true,
      minimap: {
        enabled: false, // 關閉迷你地圖
      },
    });
    // 监听 JavaScript 编辑器内容变化
    this.jsEditor.onDidChangeModelContent(() => {
      this.task.jsCode = this.jsEditor.getValue();
      this.updateOutput();
    });
    var storedToken = localStorage.getItem("token");
    this.$axios
      .get("/task/allTask")
      .then((res) => {
        res.data.task.forEach((task) => {
          this.allTask.push(task);
        });
      })
      .catch((err) => {
        console.error(err);
      });
    this.$axios
      .get("/auth/students", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        this.AllStudent = res.data.data.students;
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      });
  },
  beforeDestroy() {
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
/* 
input[type='file'] {
  display: none;
} */
.text {
  flex-direction: column;
  flex: 1;
  transition: all 0.5s ease, opacity 0.5s ease;
  opacity: 1;
}
.editor-container {
  width: 100%;
  height: 60vh;
}
#iframe-container {
  width: 100%;
  height: 61vh;
  border: solid 2px #ccc;
}
iframe {
  width: 100%;
  height: 60vh;
  background: transparent;
  border: none;
}
</style>
