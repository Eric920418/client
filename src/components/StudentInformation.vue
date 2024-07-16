<template>
  <div>

    <div class="d-flex justify-content-between mt-4" style="height: 40px;">
      <button type="button" class="btn btn-primary text-nowrap">
        <label for="file">新增學生</label>
        <input type="file" name="file" id="file" @change="handleFileUpload" />
      </button>
      <button type="button" class="btn btn-success text-nowrap" data-bs-toggle="modal" data-bs-target="#exampleModal" >
        <label>單一新增</label>
      </button>
      <button type="button" class="btn btn-secondary text-nowrap" @click="example()">
        <label >新增學生範例</label>
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
          <th scope="col">狀態</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in filteredStudents" :key="student.studentID" @click="goToStudentDetail(student)">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ student.name }}</td>
          <td>{{ student.studentID }}</td>
          <td>{{ student.session }}</td>
          <td> 
            <div v-if="student.state == 0" class="light" style="background-color: red;"></div>
            <div v-else class="light"></div>
          </td>
          <td class="d-flex justify-content-center"><button class="btn btn-danger" @click.stop="deleteStudent(student)">刪除</button></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-black" id="exampleModalLabel">單一新增學生表單</h5>
        </div>
        <div class="modal-body">
          <input type="text" class="form-control my-2" placeholder="姓名" aria-label="Recipient's username" aria-describedby="basic-addon2" v-model="name">
          <input type="text" class="form-control my-2" placeholder="學號" aria-label="Recipient's username" aria-describedby="basic-addon2" v-model="studentID">
          <input type="text" class="form-control my-2" placeholder="屆數" aria-label="Recipient's username" aria-describedby="basic-addon2" v-model="session">
          <input type="text" class="form-control my-2" placeholder="密碼" aria-label="Recipient's username" aria-describedby="basic-addon2" v-model="password">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
          <button type="button" class="btn btn-primary" @click="addStudent()">送出</button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import readXlsxFile from 'read-excel-file';
import * as XLSX from 'xlsx';
export default {
  data() {
    return {
      students: [],
      data: [],
      sessions: [],
      selectedSession: '',
      name: '',
      studentID: '',
      session: '',
      password: '',
      socket: null,
    };
  },
  computed: {
    uniqueSessions() {
      return [...new Set(this.sessions)];
    },
    filteredStudents() {
      if (this.selectedSession == '0') {
        return this.students.filter(student => student.session == '0');
      }
      if (this.selectedSession) {
        return this.students.filter(student => student.session === this.selectedSession);
      }
      return this.students;
    }
  },
  methods: {
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
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
    pushDataInBatches(data) {
      const batchSize = 10; 
      const totalBatches = Math.ceil(data.length / batchSize);
      let currentBatch = 0;
      const failedRecords = [];

      const sendNextBatch = () => {
        if (currentBatch < totalBatches) {
          const batch = data
            .slice(currentBatch * batchSize, (currentBatch + 1) * batchSize)
            .map(row => ({
              name: row[0],
              studentID: String(row[1]),
              password: String(row[3]),
              session: row[2]
            }));

          const promises = batch.map(student =>
            this.$axios.post('/auth/signUp', {
              name: student.name,
              studentID: student.studentID,
              password: student.password,
              session: student.session
            }).catch(err => {
              failedRecords.push(student);
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
          if (failedRecords.length > 0) {
            this.$swal.fire({
              title: '部分新增失敗',
              html: `<p>以下學生新增失敗：</p><ul>${failedRecords.map(record => `<li>${record.name} (ID: ${record.studentID})</li>`).join('')}</ul>`,
              icon: 'error'
            });
          } else {
            this.$swal.fire({
              title: '新增成功',
              text: '已成功新增所有學生',
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
            });
          }
        }
      };

      sendNextBatch();
    },
    goToStudentDetail(student) {
      this.$router.push(`/student/${student._id}`);
    },
    deleteStudent(student) {
      let yourToken = localStorage.getItem('token');
        this.$swal.fire({
          html: '<i class="fas fa-question-circle" style="font-size: 3em; height: 1.5em; color: #3085d6;"></i>',
          customClass: {
            icon: 'no-icon' // 這樣可以避免顯示預設的圖標
          },
          title: '是否刪除',
          showCancelButton: true,
          confirmButtonText: 'ok',
          cancelButtonText: '關閉'
          }).then((result) => {
              if (result.isConfirmed) {
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
                  });
                }).catch(err => {
                  console.error('Error deleting student:', err);
                  this.$swal.fire({
                    title: '刪除失敗',
                    text: '刪除學生時發生錯誤',
                    icon: 'error'
                  });
                });
              } else if (result.isDismissed) {
                  console.log('Modal closed')
              }
          })
    },
    example() {
      const data = [
        ["姓名", "學號", "屆數", "密碼"],
        ["eric", "123456", "123", "123"],
        ["alan", "56554", "555", "888"]
      ];

      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

      function s2ab(s) {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) {
          view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
      }

      const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = '學生範例.xlsx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    addStudent() {
      this.$axios.post('/auth/signUp', {
                name: this.name,
                studentID: this.studentID,
                password: this.password
            })
            .then(res => {
                this.$swal.fire({
                title: '註冊成功',
                text: '',
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
            })
            .catch(err => {
                const errorMessage = err.response.data.message || '註冊失敗，請重試';
                this.$swal.fire({
                title: '註冊失敗',
                text: errorMessage,
                icon: 'error'
                })
            })
    }
  },
  mounted() {
    var storedToken = localStorage.getItem('token');
    this.$axios.get('/auth/students', {
      headers: {
          'Authorization': `Bearer ${storedToken}`,
          'Content-Type': 'application/json',
      }
    })
    .then(res => {
      res.data.data.students.forEach(student => {
        this.students.push({
          name: student.name,
          studentID: student.studentID,
          session: student.session,
          _id: student._id,
          state: 0
        });
      });
      this.sessions = this.students.map(student => student.session);
    })
    .catch(err => {
      console.error('Error fetching students:', err);
    });
    let userId = this.getCookie('id');
    this.socket = new WebSocket('ws://140.138.147.12:3000');
    this.socket.onopen = () => {
      const userLogin = JSON.stringify({ type: 'open',userId: userId });
      this.socket.send(userLogin);
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type == 'userConnected') {
        this.students.forEach(student => {
          if (student._id == data.userId) {
            student.state = 1;
          }
        });
      }else if (data.type == 'userDisconnected') {
        this.students.forEach(student => {
          if (student._id == data.userId) {
            student.state = 0;
          }
        });
      }
    };

    this.socket.onclose = () => {
      console.log('Socket斷線');
    };
  },
};
</script>

<style scoped>
input[type='file'] {
  display: none;
}

.light{
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: greenyellow;
}

</style>
