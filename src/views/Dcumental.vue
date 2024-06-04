<template>
    <button class="btn btn-danger m-3" @click="$router.push('/home')">返回</button>
    <div class="container mt-2">
        <div class="card shadow-lg mb-5">
            <div class="card-body">
                <h5 class="card-title text-primary">編譯紀錄</h5>
            </div>

            <table class="table mt-3 table-sm  table-hover align-middle table-borderless">
                <thead>
                <tr>
                    <th scope="col">時間</th>
                    <th scope="col">html</th>
                    <th scope="col">css</th>
                    <th scope="col">js</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(code, index) in code" :key="code._id" @click="goToDemo(this.beginCode[index])">
                    <td>{{ code.createdAt }}</td>
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
import {sharedCode} from "../components/sharedCode.js"
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
            sharedCode.setCode({
                html: code.html,
                css: code.css,
                js: code.js
            });
            this.$router.push('/home');
        }
    },
    mounted() {
        let userId = this.getCookie('id');
        this.$axios.get(`/code/${userId}`)
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
                        js: item.js
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
</style>