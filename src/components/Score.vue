<template>
    <div class="my-3 d-flex justify-content-between align-items-center">
        <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#exampleModal">歷史考券</button>
        <div>考券名稱: {{exam}}</div>
    </div>
    <table v-if="exam !== null" class="table mt-3 table-dark table-striped table-hover align-middle">
        <thead>
            <tr>
            <th scope="col">姓名</th>
            <th scope="col">學號</th>
            <th scope="col">成績</th>
            <th scope="col">答案</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(student, index) in students" :key="index">
                <td>{{student.name}}</td>
                <td>{{student.studentID}}</td>
                <td>{{student.score}}</td>
                <td>{{student.answer }}</td>
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
                                <th scope="col">考券名稱</th>
                                <th scope="col">題數</th>
                                <th scope="col">發布時間</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(exam, index) in history" :key="index"  @click="checkExam(exam)" data-bs-dismiss="modal">
                            <td>{{exam.examId.name}}</td>
                            <td>{{exam.examId.HowMany}}</td>
                            <td>{{exam.examId.createdAt}}</td>
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
export default {
    data() {
        return {
            history: [],
            students: [],
            exam: null
        }
    },
    methods: {
        getHistory() {
            const yourToken = localStorage.getItem('token');
            this.$axios.get('/auth/students/examTicket', {
                headers: {
                'Authorization': `Bearer ${yourToken}`,
                'Content-Type': 'application/json',
                }
            })
            .then(res => {
                    const uniqueExamIds = new Set();
                    const filteredHistory = [];
                    const filteredStudents = [];

                    // 筛选唯一的 examTicket
                    res.data.data.students.forEach(student => {
                        student.ExamTicket.forEach(ticket => {
                            if (!uniqueExamIds.has(ticket.examId._id)) {
                                uniqueExamIds.add(ticket.examId._id);
                                filteredHistory.push(ticket);
                            }
                        });
                    });

                    // 处理学生信息
                    res.data.data.students.forEach(student => {
                        let newStudent = {
                            name: student.name,
                            studentID: student.studentID,
                            score: null,
                            answer: [],
                        };

                        const specificTicket = student.ExamTicket.find(ticket => ticket.examId.name === this.exam);
                        if (specificTicket) {
                            newStudent.score = specificTicket.score;
                            newStudent.answer = specificTicket.answer;
                        }
                        
                        filteredStudents.push(newStudent);
                    });

                    this.students = filteredStudents;
                    this.history = filteredHistory;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        checkExam(exam) {
            this.exam = exam.examId.name;
            this.getHistory();
        }
    },
    mounted() {
        this.getHistory();
    }
}
</script>


<style scoped>

</style>