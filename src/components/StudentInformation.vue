<template>
    <div>
      <div class="d-flex justify-content-between mt-4" style="height: 40px;">
        <button type="button" class="btn btn-primary text-nowrap">
          <label for="file">新增學生</label>
          <input type="file" name="file" id="file" @change="handleFileUpload" />
        </button>
        <select class="form-select w-25" aria-label="Default select example" v-model="selectedSession">
          <option value="" >屆數</option>
          <option v-for="session in uniqueSessions" :key="session" :value="session">{{ session }}</option>
        </select>
      </div>
      <table class="table mt-3 table-dark table-striped table-hover align-middle">
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
          <tr v-for="(student, index) in filteredStudents" :key="student.studentID" @click="goToStudentDetail(student)">
            <th scope="row">{{ index + 1 }}</th>
            <td>{{ student.name }}</td>
            <td>{{ student.studentID }}</td>
            <td>{{ student.session }}</td>
            <td><button class="btn btn-danger" @click.stop="deleteStudent(student)">刪除</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import readXlsxFile from 'read-excel-file';
  
  export default {
    data() {
      return {
        students: [],
        data: [],
        sessions: [],
        selectedSession: ''
      };
    },
    computed: {
      uniqueSessions() {
        return [...new Set(this.sessions)];
      },
      filteredStudents() {
        if (this.selectedSession) {
          return this.students.filter(student => student.session === this.selectedSession);
        }
        return this.students;
      }
    },
    methods: {
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
      pushDataInBatches(data) {
        const batchSize = 10; // 定義每批次的大小
        const totalBatches = Math.ceil(data.length / batchSize);
        let currentBatch = 0;
  
        const sendNextBatch = () => {
          if (currentBatch < totalBatches) {
            const batch = data
              .slice(currentBatch * batchSize, (currentBatch + 1) * batchSize)
              .map(row => ({
                name: row[0],
                studentID: String(row[1]),
                password: '123456',
                session: row[2]
              }));
  
            const promises = batch.map(student =>
              this.$axios.post('/auth/signUp', {
                name: student.name,
                studentID: student.studentID,
                password: student.password,
                session: student.session
              })
            );
  
            Promise.all(promises)
              .then(() => {
                currentBatch++;
                sendNextBatch();
              })
              .catch(err => {
                console.error('Error pushing data batch:', err);
                this.$swal.fire({
                  title: '新增失敗',
                  text: '批次註冊學生時發生錯誤',
                  icon: 'error'
                });
              });
          } else {
            this.$swal.fire({
              title: '新增成功',
              text: '已成功新增所有學生',
              icon: 'success'
            });
          }
        };
  
        sendNextBatch();
      },
      goToStudentDetail(student) {
        this.$router.push(`/student/${student._id}`);
      },
      deleteStudent(student) {
        let yourToken = localStorage.getItem('token');
        this.$axios.delete(`/auth/student/${student._id}`,{
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${yourToken}`, 
          }
        })
        .then(() => {
          this.$swal.fire({
            title: '刪除成功',
            text: '已成功刪除學生',
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
          console.error('Error deleting student:', err);
          this.$swal.fire({
            title: '刪除失敗',
            text: '刪除學生時發生錯誤',
            icon: 'error'
          });
        });
      }
    },
    mounted() {
      this.$axios
        .get('/auth/students')
        .then(res => {
          this.students = res.data.data.students;
          this.sessions = this.students.map(student => student.session);
        })
        .catch(err => {
          console.error('Error fetching students:', err);
        });
    }
  };
  </script>
  
  <style scoped>
  input[type='file'] {
    display: none;
  }
  </style>
  