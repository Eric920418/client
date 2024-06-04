<template>
    <button class="btn btn-danger m-3" @click="$router.push('/admin')">返回</button>
    <div class="container mt-2">
        <div class="card shadow-lg mb-5">
            <div class="card-body">
                <h5 class="card-title text-primary">學生詳細信息</h5>
                <div v-if="data"> 
                    <div class="form-group my-3">
                        <label for="name" class="form-label">姓名:</label> 
                        <input type="text" id="name" v-model="data.name" class="form-control">
                    </div>
                    <div class="form-group my-3">
                        <label for="studentID" class="form-label">學號:</label> 
                        <input type="text" id="studentID" v-model="data.studentID" class="form-control">
                    </div>
                    <div class="form-group my-3">
                        <label for="session" class="form-label">學期:</label> 
                        <input type="text" id="session" v-model="data.session" class="form-control">
                    </div>
                    <div class="form-group my-3">
                        <label for="password" class="form-label">密碼 (有需要更改在輸入):</label> 
                        <input type="password" id="password" v-model="data.password" class="form-control">
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <button class="btn btn-success" @click="saveData">儲存</button>
                </div>
            </div>
        </div>
        <div class="card shadow-lg mb-5">
            <div class="card-body">
            <h5 class="card-title">聊天記錄</h5>
            <div class="messages p-3 border rounded" style="height: 300px; overflow-y: scroll;">
                <div v-for="(message, index) in chat" :key="index" class="message mb-2">
                <p><strong>{{ message.sender }}:</strong> {{ message.text }}</p>
                </div>
            </div>
            </div>
        </div>
        <div v-if=" data.code" class="card shadow-lg mb-5">
            <div class="card-body">
                <h5 class="card-title">Code</h5>
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
                <tr v-for="(code, index) in data.code" :key="code._id">
                    <td>{{ code.createdAt }}</td>
                    <td class="sm" v-html="code.html"></td>
                    <td class="sm" v-html="code.css"></td>
                    <td class="sm" v-html="code.js"></td>
                </tr>
                </tbody>
            </table>
            </div>
        </div>
    </div>
</template>
    
<script>
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
export default {
    props: ['id'],
    data() {
        return {
            studentID: this.id,
            data: {
                name: '',
                studentID: '',
                session: '',
                password: '',
                chat: [],
                code: [] 
            },
        };
    },
    methods: {
        saveData() {
            const yourToken = localStorage.getItem('token');
            const payload = {
                name: this.data.name,
                studentID: this.data.studentID,
                session: this.data.session,
                chat: this.data.chat,
                code: this.data.code
            };

            if (this.data.password) {
                payload.password = this.data.password;
            }

            this.$axios.put(`/auth/student/${this.studentID}`, payload, {
                headers: {
                    'Authorization': `Bearer ${yourToken}`
                }
            })
            .then(res => {
                this.$swal.fire({
                title: '變更成功',
                text: '已成功更新學生資料',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: 'ok',
                cancelButtonText: '關閉'
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    } else if (result.isDismissed) {
                        console.log('Modal closed')
                    }
                })
            }).catch(err => {
                const errorMessage = err.response.data.message || '更新失敗，請重試';
                this.$swal.fire({
                    title: '更新失敗',
                    text: '更新學生資料時發生錯誤',
                    text: errorMessage,
                    icon: 'error'
                });
            });
        },
        setCode(code) {
            return `<pre><code class="hljs">${hljs.highlightAuto(code).value}</code></pre>`;
        },
    },
    mounted() {
        const yourToken = localStorage.getItem('token');
        this.$axios.get(`/auth/student/${this.studentID}`, {
            headers: {
            'Authorization': `Bearer ${yourToken}`
            }
        })
            .then(res => {
                this.data.name = res.data.data.name;
                this.data.studentID = res.data.data.studentID;
                this.data.session = res.data.data.session;
                this.data.password = res.data.data.password;
                this.data.chat = res.data.data.chat;
            })
            .catch(error => {
                console.error(error);
            });
        this.$axios.get(`/code/${this.studentID}`)
            .then(res => {
                res.data.data.forEach((item) => {
                    const code = {
                        html: this.setCode(item.html),
                        css: this.setCode(item.css),
                        js: this.setCode(item.js),
                        createdAt: item.createdAt
                    };

                    this.data.code.push(code);
                });
            })
            .catch(err => {
                console.log(err);
            });
    }
};
</script>

<style scoped>
.code-block {
    white-space: pre-wrap;
}
</style>
