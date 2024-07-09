<template>
    <button type="button" class="btn btn-primary my-3">紀錄</button>
    <div class="card shadow-lg my-2">
        <div class="card-body">
            <textarea type="text" class="form-control fs-5 w-100 my-3 border-3" style="height: 200px;" placeholder="練習內容"></textarea>  
            <div class="d-flex my-1">
                <div class="text" id="html-code" ref="html">
                    <div class="editor-container" ref="htmlEditorContainer"></div>
                </div>
                <div class="text " id="css-code" ref="css">
                    <div class="editor-container" ref="cssEditorContainer"></div>
                </div>
                <div class="text " id="js-code" ref="js">
                    <div class="editor-container" ref="jsEditorContainer"></div>
                </div>

            </div>
            <div id="iframe-container" class="text-close " ref="iframe">
                    <iframe id="output" ref="output"></iframe>
                </div>
            <div class="d-flex mt-4">
                <button type="button" class="btn btn-primary ms-auto">送出</button>
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
export default {
    data() {
        return {
            htmlCode: '',
            cssCode: '',
            jsCode: '',
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
    },
    mounted() {
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
            value: `<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>Document</title>\n</head>\n<body>\n\t\n</body>\n</html>\n`,
            language: 'html',
            theme: 'vs-dark',
            fontSize: 10,
            colorDecorators: true,
            automaticLayout: true, // 启用自动布局
            formatOnType: true,
            minimap: {
                enabled: false // 關閉迷你地圖
            }
        });
        // 监听 HTML 编辑器内容变化
        this.htmlEditor.onDidChangeModelContent(() => {
            this.htmlCode = this.htmlEditor.getValue();
            this.updateOutput();
        });
        // 初始化 CSS 编辑器
        this.cssEditor = monaco.editor.create(this.$refs.cssEditorContainer, {
            value: '',
            language: 'css',
            theme: 'vs-dark',
            codeLens: false,
            colorDecorators: true,
            fontSize: 10,
            automaticLayout: true, // 启用自动布局
            formatOnType: true,
            minimap: {
                enabled: false // 關閉迷你地圖
            }
        });
        // 监听 CSS 编辑器内容变化
        this.cssEditor.onDidChangeModelContent(() => {
            this.cssCode = this.cssEditor.getValue();
            this.updateOutput();
        });
        // 初始化 JavaScript 编辑器
        this.jsEditor = monaco.editor.create(this.$refs.jsEditorContainer, {
            value: `console.log('Hello, world!');`,
            language: 'javascript',
            theme: 'vs-dark',
            automaticLayout: true, // 启用自动布局
            formatOnType: true,
            minimap: {
                enabled: false // 關閉迷你地圖
            }
            
        });
        // 监听 JavaScript 编辑器内容变化
        this.jsEditor.onDidChangeModelContent(() => {
            this.jsCode = this.jsEditor.getValue();
            this.updateOutput();
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
    
}

</script>


<style scoped>
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
    height: 61vh;;
    border: solid 2px #ccc;
}
iframe {
    width: 100%;
    height: 60vh;;
    background: #ffffff;;
    border: none;
}
</style>