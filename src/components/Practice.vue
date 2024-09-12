<template>
  <!-- <button type="button" class="btn btn-primary my-3">紀錄</button> -->
  <div class="card shadow-lg my-3">
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
        <!-- <div id="presentation">
                    <div v-for="(slide, slideIndex) in task.slides" :key="slideIndex" v-show="currentSlide === slideIndex" class="slide"  @mouseup="endDrag"
                    @mouseleave="endDrag">
                        <div v-for="(element, elementIndex) in slide.elements"
                            :key="elementIndex"
                            class="editable"
                            :class="element.type"
                            :contenteditable="element.type !== 'image'"
                            :style="{ position: 'absolute', top: element.style.top, left: element.style.left }"
                            @click="selectElement(slideIndex, elementIndex)"
                            @mousedown="startDrag($event, slideIndex, elementIndex)"
                            @mousemove="onDrag"
                            @input="updateContent(slideIndex, elementIndex, $event)">
                            <img v-if="element.type === 'image'" :src="element.content" alt="Image" />
                            <span v-else-if="element.type === 'code'" v-html="element.content"></span>
                            <span v-else>{{ element.content }}</span>
                        </div>
                    </div>
                </div> -->
        <!-- <div class="controls mt-3">
                    <button class="btn btn-secondary me-2" @click="prevSlide" :disabled="currentSlide === 0">上一頁</button>
                    <button class="btn btn-secondary me-2" @click="nextSlide" :disabled="currentSlide === task.slides.length - 1">下一頁</button>
                    <button class="btn btn-danger me-2" @click="removeElement">刪除元素</button>
                    <button class="btn btn-primary me-2" @click="addTitle">新增標題</button>
                    <button class="btn btn-primary me-2" @click="addContent">新增一般文字</button>
                    <button class="btn btn-dark me-2" @click="addCode">新增code</button>
                    <button class="btn btn-warning me-2" >
                        <label for="image">新增圖片</label>
                        <input type="file" id="image" class="form-control" @change="handleImageUpload" accept="image/*">
                    </button>
                    <button class="btn btn-success me-2" @click="addSlide">新增頁面</button>
                    <button class="btn btn-danger " @click="removeSlide">刪除分頁</button>
                </div> -->
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
          type="button"
          class="btn btn-primary ms-auto m-2"
          @click="sendPractice"
        >
          <div v-if="loading" class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div v-else class="fs-4">發送</div>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import * as monaco from "monaco-editor";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";

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
      isDragging: false,
      dragIndex: null,
      dragElementIndex: null,
      offsetX: 0,
      offsetY: 0,
      selectIndex: null,
      selectElementIndex: null,
      loading: false,
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

    // nextSlide() {
    // if (this.currentSlide < this.task.slides.length - 1) {
    //     this.currentSlide++;
    // }
    // },
    // prevSlide() {
    //     if (this.currentSlide > 0) {
    //         this.currentSlide--;
    //     }
    // },
    // selectElement(slideIndex, elementIndex) {
    //     this.dragIndex = slideIndex;
    //     this.dragElementIndex = elementIndex;
    //     this.selectIndex = slideIndex;
    //     this.selectElementIndex = elementIndex;
    // },
    // startDrag(event, slideIndex, elementIndex) {
    //     this.isDragging = true;
    //     this.dragIndex = slideIndex;
    //     this.dragElementIndex = elementIndex;
    //     this.offsetX = event.clientX - event.target.offsetLeft;
    //     this.offsetY = event.clientY - event.target.offsetTop;
    // },
    // onDrag(event) {
    // if (this.isDragging && this.dragIndex !== null && this.dragElementIndex !== null) {
    //     const newTop = event.clientY - this.offsetY + 'px';
    //     const newLeft = event.clientX - this.offsetX + 'px';
    //     this.task.slides[this.dragIndex].elements[this.dragElementIndex].style.top = newTop;
    //     this.task.slides[this.dragIndex].elements[this.dragElementIndex].style.left = newLeft;
    // }
    // },
    // endDrag() {
    //     this.isDragging = false;
    //     this.dragIndex = null;
    //     this.dragElementIndex = null;
    // },
    // updateContent(slideIndex, elementIndex, event) {
    //     this.task.slides[slideIndex].elements[this.dragElementIndex].content = event.target.innerText;
    // },
    // removeElement() {
    //     this.task.slides[this.selectIndex].elements.splice(this.selectElementIndex, 1)
    // },
    // addTitle() {
    //     const newElement = {
    //         type: 'title',
    //         content: 'New Title',
    //         style: { top: '0px', left: '0px' },
    //     };
    //     this.task.slides[this.currentSlide].elements.push(newElement);
    // },
    // addContent() {
    //     const newElement = {
    //         type: 'content',
    //         content: 'New Content',
    //         style: { top: '0px', left: '0px' },
    //     };
    //     this.task.slides[this.currentSlide].elements.push(newElement);
    // },
    // addCode() {
    //     const newElement = {
    //         type: 'code',
    //         content: 'New Code',
    //         style: { top: '0px', left: '0px' },
    //     };
    //     this.task.slides[this.currentSlide].elements.push(newElement);
    // },
    // handleImageUpload(event) {
    //     const file = event.target.files[0];
    //     const reader = new FileReader();
    //     reader.onload = (e) => {
    //         const imageUrl = e.target.result;
    //         const newElement = {
    //             type: 'image',
    //             content: imageUrl,
    //             style: { top: '0px', left: '0px' },
    //         };
    //         this.task.slides[this.currentSlide].elements.push(newElement);
    //     };
    //     reader.readAsDataURL(file);
    // },
    // addSlide() {
    //     const newSlide = {
    //         elements: [
    //             { type: 'title', content: 'New Slide', style: { top: '0px', left: '0px' } },
    //             { type: 'content', content: 'New Content', style: { top: '50px', left: '0px' } },
    //         ],
    //     };
    //     this.task.slides.push(newSlide);
    // },
    // removeSlide() {
    //     this.task.slides.pop();
    // },
  },
  mounted() {
    this.$refs.htmlEditorContainer.MonacoEnvironment = {
      getWorkerUrl: (moduleId, label) => {
        return new htmlWorker();
      },
    };
    this.$refs.cssEditorContainer.MonacoEnvironment = {
      getWorkerUrl: (moduleId, label) => {
        return new cssWorker();
      },
    };
    this.$refs.jsEditorContainer.MonacoEnvironment = {
      getWorkerUrl: (moduleId, label) => {
        return new tsWorker();
      },
    };
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

    // this.task.slides.forEach((slide, index) => {
    //     slide.title = localStorage.getItem(`slide-${index}-title`) || slide.title;
    //     slide.content = localStorage.getItem(`slide-${index}-content`) || slide.content;
    // });
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
