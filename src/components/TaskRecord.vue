<template>
    <div v-if="student == null">
        <div class="my-3 d-flex justify-content-between align-items-center">
            <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal">歷史任務</button>
            <div v-if="task !== null" >任務名稱: {{task.title}}</div>
        </div>
        <table v-if="task !== null" class="table mt-3 table-dark table-striped table-hover align-middle">
            <thead>
                <tr>
                <th scope="col">姓名</th>
                <th scope="col">學號</th>
                <th scope="col">進度</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(student, index) in ManyStudent" :key="index">
                    <td>{{student.name}}</td>
                    <td>{{student.studentID}}</td>
                    <td>{{ student.taskState }}</td>
                    <td><button type="button" class="btn btn-light" @click="checkStudent(student)">進入</button></td>
                </tr>
            </tbody>
        </table>
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                    <h5 class="modal-title text-black" id="exampleModalLabel">全部考券(點擊載入)</h5>
                    </div>
                    <div class="modal-body text-black ">
                        <table class="table  table-hover align-middle">
                            <thead>
                                <tr>
                                    <th scope="col">任務名稱</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(task, index) in history" :key="index"  @click="checkTask(task)" data-bs-dismiss="modal">
                                <td>{{task.title}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="my-3 d-flex justify-content-between align-items-center">
            <button type="button" class="btn btn-danger " @click="student = null" >返回</button>
        </div>
        <div class="p-2">
            <div class="card shadow-lg">
                <!-- {{ student }} -->
                <div class="d-flex justify-content-around align-items-center my-3">
                    <div v-if="student.task[0].state == 1" class="box" style="background-color: greenyellow;">
                        <div class="text-center d-flex justify-content-center align-items-center h-100 fs-3" >第一步</div>
                    </div>
                    <div v-else class="box">
                        <div class="text-center d-flex justify-content-center align-items-center h-100 fs-3" >第一步</div>
                    </div>
                    <div v-if="student.task[0].state == 1" >
                        <div class="arrow-right"></div>
                        <div class="arrow-right"></div>
                        <div class="arrow-right"></div>
                    </div>
                    <div v-if="student.task[0].state == 2" class="box" style="background-color: greenyellow;">
                        <div class="text-center d-flex justify-content-center align-items-center h-100 fs-3" >第二步</div>
                    </div>
                    <div v-else class="box">
                        <div class="text-center d-flex justify-content-center align-items-center h-100 fs-3" >第二步</div>
                    </div>
                    <div  v-if="student.task[0].state == 2">
                        <div class="arrow-right"></div>
                        <div class="arrow-right"></div>
                        <div class="arrow-right"></div>
                    </div>
                    <div v-if="student.task[0].state == 3" class="box" style="background-color: greenyellow;">
                        <div class="text-center d-flex justify-content-center align-items-center h-100 fs-3" >第三步</div>
                    </div>
                    <div v-else class="box">
                        <div class="text-center d-flex justify-content-center align-items-center h-100 fs-3" >第三步</div>
                    </div>
                    <div  v-if="student.task[0].state == 3">
                        <div class="arrow-right"></div>
                        <div class="arrow-right"></div>
                        <div class="arrow-right"></div>
                    </div>
                    <div v-if="student.task[0].state == 4" class="box" style="background-color: greenyellow;">
                        <div class="text-center d-flex justify-content-center align-items-center h-100 fs-3" >第四步</div>
                    </div>
                    <div v-else class="box">
                        <div class="text-center d-flex justify-content-center align-items-center h-100 fs-3" >第四步</div>
                    </div>
                    <div  v-if="student.task[0].state == 4">
                        <div class="arrow-right"></div>
                        <div class="arrow-right"></div>
                        <div class="arrow-right"></div>
                    </div>
                    <div  v-if="student.task[0].state == 5" class="box" style="background-color: greenyellow;">
                        <div class="text-center d-flex justify-content-center align-items-center h-100 fs-3" >第五步</div>
                    </div>
                    <div v-else class="box">
                        <div class="text-center d-flex justify-content-center align-items-center h-100 fs-3" >第五步</div>
                    </div>
                </div>
                <h3 class="text-center my-3">計畫</h3>
                <div class="d-flex justify-content-around align-items-center my-3">
                    <div class="card shadow-sm border-3" style="width: 300px; height: 500px;">
                        <table>

                        </table>
                    </div>
                    <div class="card shadow-sm border-3" style="width: 300px; height: 500px;"></div>
                    <div class="card shadow-sm border-3" style="width: 300px; height: 500px;"></div>
                </div>
                <h3 class="text-center my-3">實作結果</h3>
                <div class="d-flex justify-content-around align-items-center my-3">
                    <div class="card shadow-sm border-3" style="width: 90%; height: 500px;"></div>
                </div>
                <h3 class="text-center my-3">實作問題</h3>
                <div class="d-flex justify-content-around align-items-center my-3">
                    <div class="card shadow-sm border-3" style="width: 90%; height: 500px;"></div>
                </div>
                <h3 class="text-center my-3">心得</h3>
                <div class="d-flex justify-content-around align-items-center my-3">
                    <div class="card shadow-sm border-3" style="width: 90%; height: 500px;"></div>
                </div>
                <h3 class="text-center my-3">動作紀錄</h3>
                <div class="d-flex justify-content-around align-items-center my-3">
                    <div class="card shadow-sm border-3" style="width: 90%; height: 500px;"></div>
                </div>
                <h3 class="text-center my-3">老師評價</h3>
                <div class="d-flex justify-content-around align-items-center my-3">
                    <div class="card shadow-sm border-3" style="width: 90%; height: 500px;"></div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    data() {
        return {
            history: [],
            students: [],
            task: null,
            student: null,
        }
    },
    computed: {
        ManyStudent() {
            return this.students.map(student => {
                const filteredTasks = student.task.filter(task => task.taskId._id === this.task._id);
                
                if (filteredTasks.length > 0) {
                    if(filteredTasks[0].state <6){
                        return { ...student, taskState: `未完成 進度: ${filteredTasks[0].state}` , task: filteredTasks};
                    }else{
                        return { ...student, taskState: '已完成' , task: filteredTasks};
                    }
                }
                
                return null;
            }).filter(student => student !== null);
        }
    },
    methods: {
        getHistory() {
            const yourToken = localStorage.getItem('token');
            this.$axios.get('/task/students/task', {
                headers: {
                'Authorization': `Bearer ${yourToken}`,
                'Content-Type': 'application/json',
                }
            })
            .then(res => {
                this.history = res.data.tasks;
                const students = [];
                res.data.students.forEach(student => {
                    students.push({
                        name: student.name,
                        studentID: student.studentID,
                        task: student.Task,
                    })
                });
                this.students = students;
            })
        },
        checkTask(task) {
            this.task = task;
        },
        checkStudent(studentID) {
            this.student = studentID;
        },
    },
    mounted() {
        this.getHistory();
        
    }
}

</script>


<style scoped>
.box {
    width: 150px;
    height: 100px;
    border: 5px solid #000;
    border-radius: 10%;
    padding: 10px;
    margin: 10px;
}

.arrow-right {
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid black;
    opacity: 0; 
    animation: slide-in 1s forwards infinite;
}

/* 定义动画 */
@keyframes slide-in {
    0% {
        opacity: 0;
        transform: translateX(-20px); /* 从左边滑入 */
    }
    100% {
        opacity: 1;
        transform: translateX(0); /* 最终位置 */
    }
}

/* .arrow-right:nth-child(1) {
    animation-delay: 1s;
}

.arrow-right:nth-child(2) {
    animation-delay: 1s;
}

.arrow-right:nth-child(3) {
    animation-delay: 1s;
} */
</style>