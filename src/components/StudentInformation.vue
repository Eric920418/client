<template>

    <button type="button" class="btn btn-primary mt-4"><label for="file">新增學生</label><input type="file" name="file" id="file" @change="handleFileUpload" ></button>
    <table class="table mt-3 table-dark">
        <thead>
            <tr>
            <th scope="col"></th>
            <th scope="col">姓名</th>
            <th scope="col">學號</th>
            <th scope="col">屆數</th>
            <th scope="col">內容</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(student,index) in students" :key="student.studentID">
            <th scope="row">{{ index+1 }}</th>
                <td>{{ student.name }}</td>
                <td>{{ student.studentID }}</td>
                <td>{{ student.session }}</td>
                <td></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import readXlsxFile from 'read-excel-file'

export default {
    data() {
        return {
        students: [],
        data: []
        }
    },
    methods: {
        handleFileUpload(event) {
        const file = event.target.files[0]
        if (file) {
            readXlsxFile(file).then((rows) => {
            this.data = rows.slice(1)
            this.pushDataInBatches(this.data)
            }).catch(err => {
            console.error('Error reading Excel file:', err)
            this.$swal.fire({
                title: '讀取失敗',
                text: '讀取Excel文件時發生錯誤',
                icon: 'error'
            })
            })
        } else {
            this.$swal.fire({
            title: '新增失敗',
            text: "未選擇文件",
            icon: 'error'
            })
        }
        },
        pushDataInBatches(data) {
        const batchSize = 10  // 定義每批次的大小
        const totalBatches = Math.ceil(data.length / batchSize)
        let currentBatch = 0

        const sendNextBatch = () => {
            if (currentBatch < totalBatches) {
                const batch = data.slice(currentBatch * batchSize, (currentBatch + 1) * batchSize).map(row => ({
                    name: row[0],
                    studentID: String(row[1]),
                    password: '123456',
                    session: row[2],
                }));

                const promises = batch.map(student => 
                    this.$axios.post('/auth/signUp', {
                        name: student.name,
                        studentID: student.studentID,
                        password: student.password,
                        session: student.session
                    })
                );

                Promise.all(promises).then(() => {
                    currentBatch++;
                    sendNextBatch();
                }).catch(err => {
                    console.error('Error pushing data batch:', err);
                    this.$swal.fire({
                        title: '新增失敗',
                        text: '批次註冊學生時發生錯誤',
                        icon: 'error'
                    });
                });
            }else {
            this.$swal.fire({
                title: '新增成功',
                text: '已成功新增所有學生',
                icon: 'success'
            })
            }
        }

        sendNextBatch()
        }
    },
    mounted() {
        this.$axios.get('/auth/students').then(res => {
        this.students = res.data.data.students
        }).catch(err => {
        console.log(err)
        })
    }
}
</script>

<style scoped>
input[type="file"] {
    display: none;
}
</style>