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
            <div class="code-block p-3 bg-light border rounded" style="height: 300px; overflow-y: scroll;">
                <div class="d-flex justify-content-between">
                <div>
                    <h6 class="card-subtitle mb-2 text-muted">HTML</h6>
                    <div v-for="(line, index) in data.code" :key="'html-' + index">
                    <div class="card mb-3" style="width: 25rem;">
                        <div class="card-body">
                        <pre><code>{{ line.html }}</code></pre>
                        </div>
                        <div class="card-footer">
                        <small class="text-muted">{{ line.time }}</small>
                        </div>
                    </div>
                    </div>
                </div>
                <div>
                    <h6 class="card-subtitle mb-2 text-muted">CSS</h6>
                    <div v-for="(line, index) in data.code" :key="'css-' + index">
                    <div class="card mb-3" style="width: 25rem;">
                        <div class="card-body">
                        <pre><code>{{ line.css }}</code></pre>
                        </div>
                        <div class="card-footer">
                        <small class="text-muted">{{ line.time }}</small>
                        </div>
                    </div>
                    </div>
                </div>
                <div>
                    <h6 class="card-subtitle mb-2 text-muted">JavaScript</h6>
                    <div v-for="(line, index) in data.code" :key="'js-' + index">
                    <div class="card mb-3" style="width: 25rem;">
                        <div class="card-body">
                        <pre><code>{{ line.js }}</code></pre>
                        </div>
                        <div class="card-footer">
                        <small class="text-muted">{{ line.time }}</small>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </template>
    
    <script>
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
            }
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
                this.data.code = res.data.data.code;
            })
            .catch(error => {
                console.error(error);
            });
        }
    };
    </script>
    
    <style scoped>
    .code-block {
        white-space: pre-wrap;
    }
    </style>
    