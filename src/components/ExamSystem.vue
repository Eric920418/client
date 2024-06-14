<template>
    <div class="container mt-2">
        <div class="d-flex my-3">
            <button type="button" class="btn btn-primary text-nowrap">
                <label for="file">匯入題目</label>
                <input type="file" name="file" id="file" @change="handleFileUpload" />
            </button>
            <button v-if="!oldExamTicket.type" class="btn btn-success ms-3" @click="saveTicket">儲存考券</button>
            <button v-if="oldExamTicket.type" class="btn btn-success ms-3" @click="saveOldTicket">儲存舊考券</button>
            <button v-if="oldExamTicket.type" class="btn btn-secondary ms-3" @click="this.oldExamTicket = {}">新考券</button>
            <button class="btn btn-warning ms-3" data-bs-toggle="modal" data-bs-target="#exampleModal">考券檔案</button>
        </div>
        <div class="card shadow-lg mb-5">
            <div v-if="!oldExamTicket" class="card-body">
                <h1 class="card-title text-info">考券表單</h1>
                <input type="text" class="form-control mx-3 fs-5 w-25 my-3 " v-model="ExamTicket.name" placeholder="考券名稱">
                <div class="d-flex my-4">
                    <div class="form-check mx-3 fs-5">
                        <input class="form-check-input" type="radio" name="selectVersion" id="selectVersion1" v-model="ExamTicket.type" value="0">
                        <label class="form-check-label" for="selectVersion1">
                            選擇題
                        </label>
                    </div>
                    <div class="form-check mx-3 fs-5">
                        <input class="form-check-input" type="radio" name="selectVersion" id="flexRadioDefault2" v-model="ExamTicket.type" value="1">
                        <label class="form-check-label" for="flexRadioDefault2">
                            問答題
                        </label>
                    </div>
                </div>
                <div class="mx-3 mt-4 w-50 fs-5">
                    <label for="customRange2" class="form-label">難度:
                        <div v-if="ExamTicket.difficulty == 0" class="d-inline ms-1 text-success">簡單</div>
                        <div v-if="ExamTicket.difficulty == 1" class="d-inline ms-1 text-primary">普通</div>
                        <div v-if="ExamTicket.difficulty == 2" class="d-inline ms-1 text-secondary">困難</div>
                        <div v-if="ExamTicket.difficulty == 3" class="d-inline ms-1 text-warning">非常困難</div>
                        <div v-if="ExamTicket.difficulty == 4" class="d-inline ms-1 text-danger">超級困難</div>
                    </label>
                    <input type="range" class="form-range" min="0" max="4" id="customRange2" v-model="ExamTicket.difficulty">
                </div>
                <label for="inputState" class="mx-3 mt-2 w-50 form-label fs-5">期限</label>
                <div class="d-flex">
                    <input type="date" class="form-control mx-3 my-2 w-25 fs-5" v-model="ExamTicket.date">
                    <input type="time" class="form-control mx-3 my-2 w-25 fs-5" v-model="ExamTicket.time">
                </div>
                <label for="inputState" class="mx-3 mt-2 w-50 form-label fs-5">題數</label>
                <select id="inputState" class="form-select mx-3 w-50" aria-label="Default select example" v-model="ExamTicket.HowMany">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                </select>
                <div  class="d-flex flex-wrap justify-content-center mt-4">
                    <div class="card m-2 border-3" style="width: 90%;" v-for="(q, index) in ExamTicket.question" :key="index">
                        <div class="card-body border-0">
                            <input type="text" class="form-control" placeholder="題目" v-model="q.title">
                            <div v-for="(option, optionIndex) in q.options" :key="optionIndex">
                                <input v-if="q.types == 'multiple-choice'" type="text" class="form-control my-2" :placeholder="'選項' + (optionIndex + 1)" v-model="q.options[optionIndex]">
                            </div>
                            <input v-if="q.types == 'short-answer'" type="text" class="form-control my-2" placeholder="答案" v-model="q.answer">
                            <div class="d-flex">
                                <select  class="form-select me-1" style="width: 100px;" aria-label="Default select example" v-model="q.types">
                                    <option value="multiple-choice">選擇題</option>
                                    <option value="short-answer">問答題</option>
                                </select>
                                <button v-if="q.types == 'multiple-choice'" class="btn btn-primary me-1" @click="addOption(index)">加一個選項</button>
                                <select v-if="q.types == 'multiple-choice'" class="form-select mx-1" style="width: 150px;" aria-label="Default select example" v-model="q.answer">
                                        <option selected>選擇答案</option>
                                        <option v-for="(option, optionIndex) in q.options" :key="optionIndex" :value="optionIndex">{{option}}</option>
                                </select>
                                <input type="number" class="form-control ms-1" style="width: 150px;" placeholder="配分" v-model="q.score">
                                <div class="ms-auto">
                                    <button class="btn btn-primary me-1">插入題目</button>
                                    <button class="btn btn-danger" @click="clearQuestion(index)">清空</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <button class="btn btn-success" @click="saveData">發送考券</button>
                </div>
            </div>
            <div v-if="oldExamTicket" class="card-body">
                <h1 class="card-title text-info">考券表單</h1>
                <input type="text" class="form-control mx-3 fs-5 w-25 my-3 " v-model="oldExamTicket.name" placeholder="考券名稱">
                <div class="d-flex my-4">
                    <div class="form-check mx-3 fs-5">
                        <input class="form-check-input" type="radio" name="selectVersion" id="selectVersion1" v-model="oldExamTicket.type" value="0">
                        <label class="form-check-label" for="selectVersion1">
                            選擇題
                        </label>
                    </div>
                    <div class="form-check mx-3 fs-5">
                        <input class="form-check-input" type="radio" name="selectVersion" id="flexRadioDefault2" v-model="oldExamTicket.type" value="1">
                        <label class="form-check-label" for="flexRadioDefault2">
                            問答題
                        </label>
                    </div>
                </div>
                <div class="mx-3 mt-4 w-50 fs-5">
                    <label for="customRange2" class="form-label">難度:
                        <div v-if="oldExamTicket.difficulty == 0" class="d-inline ms-1 text-success">簡單</div>
                        <div v-if="oldExamTicket.difficulty == 1" class="d-inline ms-1 text-primary">普通</div>
                        <div v-if="oldExamTicket.difficulty == 2" class="d-inline ms-1 text-secondary">困難</div>
                        <div v-if="oldExamTicket.difficulty == 3" class="d-inline ms-1 text-warning">非常困難</div>
                        <div v-if="oldExamTicket.difficulty == 4" class="d-inline ms-1 text-danger">超級困難</div>
                    </label>
                    <input type="range" class="form-range" min="0" max="4" id="customRange2" v-model="oldExamTicket.difficulty">
                </div>
                <label for="inputState" class="mx-3 mt-2 w-50 form-label fs-5">期限</label>
                <div class="d-flex">
                    <input type="date" class="form-control mx-3 my-2 w-25 fs-5" v-model="oldExamTicket.date">
                    <input type="time" class="form-control mx-3 my-2 w-25 fs-5" v-model="oldExamTicket.time">
                </div>
                <label for="inputState" class="mx-3 mt-2 w-50 form-label fs-5">題數</label>
                <select id="inputState" class="form-select mx-3 w-50" aria-label="Default select example" v-model="oldExamTicket.HowMany">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                </select>
                <div  class="d-flex flex-wrap justify-content-center mt-4">
                    <div class="card m-2 border-3" style="width: 90%;" v-for="(q, index) in oldExamTicket.question" :key="index">
                        <div class="card-body border-0">
                            <input type="text" class="form-control" placeholder="題目" v-model="q.title">
                            <div v-for="(option, optionIndex) in q.options" :key="optionIndex">
                                <input v-if="q.types == 'multiple-choice'" type="text" class="form-control my-2" :placeholder="'選項' + (optionIndex + 1)" v-model="q.options[optionIndex]">
                            </div>
                            <input v-if="q.types == 'short-answer'" type="text" class="form-control my-2" placeholder="答案" v-model="q.answer">
                            <div class="d-flex">
                                <select  class="form-select me-1" style="width: 100px;" aria-label="Default select example" v-model="q.types">
                                    <option value="multiple-choice">選擇題</option>
                                    <option value="short-answer">問答題</option>
                                </select>
                                <button v-if="q.types == 'multiple-choice'" class="btn btn-primary me-1" @click="addOption(index)">加一個選項</button>
                                <select v-if="q.types == 'multiple-choice'" class="form-select mx-1" style="width: 150px;" aria-label="Default select example" v-model="q.answer">
                                        <option selected>選擇答案</option>
                                        <option v-for="(option, optionIndex) in q.options" :key="optionIndex" :value="optionIndex">{{option}}</option>
                                </select>
                                <input type="number" class="form-control ms-1" style="width: 150px;" placeholder="配分" v-model="q.score">
                                <div class="ms-auto">
                                    <button class="btn btn-primary me-1">插入題目</button>
                                    <button class="btn btn-danger" @click="clearQuestion(index)">清空</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <button class="btn btn-success" @click="pushTicket">發送考券</button>
                </div>
            </div>
        </div>
    </div>

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
                            <th scope="col">考券名稱</th>
                            <th scope="col">題數</th>
                            <th scope="col">期限</th>
                            <th scope="col">難度</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(exam, index) in AllExamTicket" :key="index"  @click="checkExam(exam)" data-bs-dismiss="modal">
                        <td>{{exam.name}}</td>
                        <td>{{exam.HowMany}}</td>
                        <td>{{exam.date}}</td>
                        <td>{{exam.difficulty}}</td>
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
</template>

<script>
import readXlsxFile from 'read-excel-file';

export default {
    data() {
        return {
            ExamTicket: {
                name: "考券名稱",
                type: 0,
                difficulty: 2,
                HowMany: 0,
                date: "",
                time: "",
                question: []
            },
            oldExamTicket: {
            },
            examType: "multiple-choice",
            score: 100,

            AllExamTicket: [],
            
        };
    },
    watch: {
        'ExamTicket.type': function(val) {
            if (val == 0) {
                this.examType = "multiple-choice";
                this.ExamTicket.question.forEach((q) => {
                    q.types = "multiple-choice";
                    q.title = "題目";
                    q.options = ["選項1", "選項2", "選項3", "選項4"];
                    q.answer = "選擇答案";
                    q.score = "配分";
                });
            } else if ( val == 1) {
                this.examType = "short-answer";
                this.ExamTicket.question.forEach((q) => {
                    q.types = "short-answer";
                    q.title = "題目";
                    q.options = ["選項1", "選項2", "選項3", "選項4"];
                    q.answer = "輸入答案";
                    q.score = "配分";
                });
            }   
        },
        'ExamTicket.HowMany': function(val) {
            this.ExamTicket.question = [];
            for (let i = 0; i < val; i++) {
                this.ExamTicket.question.push({
                    types: this.examType,
                    title: "題目",
                    options: ["選項1", "選項2", "選項3", "選項4"],
                    answer: "選擇答案",
                    score: "配分",
                });
            }
        },

    },
    methods: {
        addOption(index) {
            const newOption = "選項" + (this.ExamTicket.question[index].options.length + 1);
            this.ExamTicket.question[index].options.push(newOption);
        },
        clearQuestion(index) {
            this.ExamTicket.question[index] = {
                types: "multiple-choice",
                title: "題目",
                options: ["選項1", "選項2", "選項3", "選項4"],
                answer: "選擇答案",
                score: "配分",
            };
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                readXlsxFile(file)
                .then(rows => {
                    this.data = rows.slice(1);
                    this.pushDataInBatches(this.data);
                })
                .catch(err => {
                    console.error('Error reading Excel file:', err);
                    this.$swal.fire({
                    title: '讀取失敗',
                    text: '讀取Excel文件時發生錯誤',
                    icon: 'error'
                    });
                });
            } else {
                this.$swal.fire({
                title: '新增失敗',
                text: '未選擇文件',
                icon: 'error'
                });
            }
        },
        saveTicket() {
                const { name, date, time, HowMany, question } = this.ExamTicket;
                if (name === "考券名稱" || date === "" || time === "" || HowMany === 0 || question.length === 0) {
                    this.$swal.fire({
                        title: '儲存失敗',
                        text: '請填寫完整資料',
                        icon: 'error'
                    });
                    return;
                }
                let totalScore = 0;
                for (let q of question) {
                    if (q.types === "multiple-choice") {
                        if (q.title === "題目" || q.answer === "選擇答案" || q.score === "配分") {
                            this.$swal.fire({
                                title: '儲存失敗',
                                text: '考題資料不完整',
                                icon: 'error'
                            });
                            return;
                        }
                        for (let option of q.options) {
                            if (option === "選項1" || option === "選項2" || option === "選項3" || option === "選項4") {
                                this.$swal.fire({
                                    title: '儲存失敗',
                                    text: '考題選項不完整',
                                    icon: 'error'
                                });
                                return;
                            }
                        }
                        totalScore += parseInt(q.score);
                    } else if (q.types === "short-answer") {
                        if (q.title === "題目" || q.answer === "選擇答案" || q.score === "配分") {
                            this.$swal.fire({
                                title: '儲存失敗',
                                text: '考題資料不完整',
                                icon: 'error'
                            });
                            return;
                        }
                        totalScore += parseInt(q.score);
                    }
                }
                if (totalScore !== 100) {
                    this.$swal.fire({
                        title: '儲存失敗',
                        text: '考題配分不等於100',
                        icon: 'error'
                    });
                    return;
                }
                this.$axios.post('/exam/save', this.ExamTicket)
                .then(res => {
                    this.$swal.fire({
                        title: '儲存成功',
                        text: '考券已成功儲存',
                        icon: 'success'
                    });
                }).catch(err => {
                    console.error(err);
                    console.log(this.ExamTicket)
                    this.$swal.fire({
                        title: '儲存失敗',
                        text: '儲存考券時發生錯誤',
                        icon: 'error'
                    });
                });
        },
        saveOldTicket() {
                const { name, date, time, HowMany, question } = this.oldExamTicket;
                if (name === "考券名稱" || date === "" || time === "" || HowMany === 0 || question.length === 0) {
                    this.$swal.fire({
                        title: '儲存失敗',
                        text: '請填寫完整資料',
                        icon: 'error'
                    });
                    return;
                }
                let totalScore = 0;
                for (let q of question) {
                    if (q.types === "multiple-choice") {
                        if (q.title === "題目" || q.answer === "選擇答案" || q.score === "配分") {
                            this.$swal.fire({
                                title: '儲存失敗',
                                text: '考題資料不完整',
                                icon: 'error'
                            });
                            return;
                        }
                        for (let option of q.options) {
                            if (option === "選項1" || option === "選項2" || option === "選項3" || option === "選項4") {
                                this.$swal.fire({
                                    title: '儲存失敗',
                                    text: '考題選項不完整',
                                    icon: 'error'
                                });
                                return;
                            }
                        }
                        totalScore += parseInt(q.score);
                    } else if (q.types === "short-answer") {
                        if (q.title === "題目" || q.answer === "選擇答案" || q.score === "配分") {
                            this.$swal.fire({
                                title: '儲存失敗',
                                text: '考題資料不完整',
                                icon: 'error'
                            });
                            return;
                        }
                        totalScore += parseInt(q.score);
                    }
                }
                if (totalScore !== 100) {
                    this.$swal.fire({
                        title: '儲存失敗',
                        text: '考題配分不等於100',
                        icon: 'error'
                    });
                    return;
                }
                this.$axios.put(`/exam/${this.oldExamTicket._id}`, this.oldExamTicket)
                .then(res => {
                    this.$swal.fire({
                        title: '更新考券成功',
                        text: '考券已成功儲存',
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
                    console.error(err);
                    console.log(this.ExamTicket)
                    this.$swal.fire({
                        title: '儲存失敗',
                        text: '儲存考券時發生錯誤',
                        icon: 'error'
                    });
                });
        },
        pushTicket() {
                const { name, date, time, HowMany, question } = this.oldExamTicket;
                if (name === "考券名稱" || date === "" || time === "" || HowMany === 0 || question.length === 0) {
                    this.$swal.fire({
                        title: '儲存失敗',
                        text: '請填寫完整資料',
                        icon: 'error'
                    });
                    return;
                }
                let totalScore = 0;
                for (let q of question) {
                    if (q.types === "multiple-choice") {
                        if (q.title === "題目" || q.answer === "選擇答案" || q.score === "配分") {
                            this.$swal.fire({
                                title: '儲存失敗',
                                text: '考題資料不完整',
                                icon: 'error'
                            });
                            return;
                        }
                        for (let option of q.options) {
                            if (option === "選項1" || option === "選項2" || option === "選項3" || option === "選項4") {
                                this.$swal.fire({
                                    title: '儲存失敗',
                                    text: '考題選項不完整',
                                    icon: 'error'
                                });
                                return;
                            }
                        }
                        totalScore += parseInt(q.score);
                    } else if (q.types === "short-answer") {
                        if (q.title === "題目" || q.answer === "選擇答案" || q.score === "配分") {
                            this.$swal.fire({
                                title: '儲存失敗',
                                text: '考題資料不完整',
                                icon: 'error'
                            });
                            return;
                        }
                        totalScore += parseInt(q.score);
                    }
                }
                if (totalScore !== 100) {
                    this.$swal.fire({
                        title: '儲存失敗',
                        text: '考題配分不等於100',
                        icon: 'error'
                    });
                    return;
                }
                this.$axios.post('/exam', this.oldExamTicket)
                .then(res => {
                    this.$swal.fire({
                        title: '儲存成功',
                        text: '考券已成功儲存',
                        icon: 'success'
                    });
                }).catch(err => {
                    console.error(err);
                    console.log(this.ExamTicket)
                    this.$swal.fire({
                        title: '儲存失敗',
                        text: '儲存考券時發生錯誤',
                        icon: 'error'
                    });
                });
        },
        checkExam(event) {
            this.oldExamTicket.name = event.name;
            this.oldExamTicket.type = event.type;
            this.oldExamTicket.difficulty = event.difficulty;
            this.oldExamTicket.HowMany = event.HowMany;
            this.oldExamTicket.date = event.date;
            this.oldExamTicket.time = event.time;
            this.oldExamTicket.question = JSON.parse(JSON.stringify(event.question));
            this.oldExamTicket._id = event._id;
        },
    },
    mounted() {
        this.$axios.get('/exam/allExam')
        .then(res => {
            res.data.exam.forEach((exam) => {
                this.AllExamTicket.push(exam);
            });
        }).catch(err => {
            console.error(err);
        });
    }
};
</script>

<style scoped>
input[type='file'] {
  display: none;
}

</style>
