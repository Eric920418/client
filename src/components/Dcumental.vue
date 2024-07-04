<template>
    <div class=" mt-2" >
        <div class="card shadow-lg mb-5">
            <button class="btn btn-danger ms-auto" style="width: 50px;" @click="closeModel">X</button>
            <table class="table mt-3 table-sm  table-hover align-middle table-borderless">
                <thead>
                <tr>
                    <th class="text-center" style="width: 170px;" scope="col">時間<p class="text-danger m-0">(點擊時間載入程式碼)</p></th>
                    <th class="text-center" scope="col">html</th>
                    <th class="text-center" scope="col">css</th>
                    <th class="text-center" scope="col">js</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(code, index) in code" :key="code._id"  title="點擊時間載入程式碼" >
                    <td @click="goToDemo(this.beginCode[index])">{{ code.createdAt }}</td>
                    <td class="sm" v-html="code.html"></td>
                    <td class="sm" v-html="code.css"></td>
                    <td class="sm" v-html="code.js"></td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import {action} from "../components/action.js"
export default {

    data() {
        return {
            code: [],
            beginCode: []
        }
    },
    methods: {
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        },
        setCode(code) {
            return `<pre><code class="hljs">${hljs.highlightAuto(code).value}</code></pre>`;
        },
        goToDemo(code) {
            action.pushAction({
                action: `讀取了${code.createdAt}這個時間儲存的程式碼`,
                timestamp: new Date().toLocaleString('zh-TW', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }).replace(/\//g, '-').replace(',', '')
            });
            this.$emit('go-to-demo', code); 
        },
        closeModel() {
            this.$emit('close-model');
        }
    },
    mounted() {
        let userId = this.getCookie('id');
        var storedToken = localStorage.getItem('token');
        this.$axios.get(`/code/${userId}`,{
            headers: {
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
            }
            })
            .then(res => {
                res.data.data.forEach((item) => {
                    const code = {
                        html: this.setCode(item.html),
                        css: this.setCode(item.css),
                        js: this.setCode(item.js),
                        createdAt: item.createdAt
                    };
                    const beginCode = {
                        html: item.html,
                        css: item.css,
                        js: item.js,
                        createdAt: item.createdAt
                    };
                    this.beginCode.push(beginCode);
                    this.code.push(code);
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
}
</script>

<style scoped>

.sm {
    font-size: 5px;
    font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
    overflow: auto;
    height: 100%;
}

.sm:hover{
    margin: 0;
    padding: 0;
    background-color: #f5f5f5;;
    font-size: 30px;
}

.doc-collapsed {
  width: 0;
  overflow: hidden;
}

</style>