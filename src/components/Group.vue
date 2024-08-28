<template>
  <div class="m-2 mt-4 d-flex justify-content-between">
    <select
      class="form-select w-25"
      aria-label="Default select example"
      v-model="selectedClassNum"
    >
      <option value="">班級</option>
      <option
        v-for="ClassNum in uniqueClassNum"
        :key="ClassNum"
        :value="ClassNum"
      >
        {{ ClassNum }}
      </option>
    </select>

    <button
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      批量分班
    </button>
  </div>
  <table class="table mt-3 table-dark table-striped table-hover align-middle">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">姓名</th>
        <th scope="col">學號</th>
        <th scope="col">班級</th>
        <th scope="col">分配</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(student, index) in filteredStudents" :key="student.studentID">
        <th scope="row">{{ index + 1 }}</th>
        <td>{{ student.name }}</td>
        <td>{{ student.studentID }}</td>
        <td>{{ student.classNum }}</td>
        <td>
          <select
            class="form-select w-25"
            @change="saveData(student)"
            v-model="select"
          >
            <option value="重新分班">重新分班</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </td>
      </tr>
    </tbody>
  </table>

  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body">
          <table class="table mt-3 table-striped table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">姓名</th>
                <th scope="col">學號</th>
                <th scope="col">分配</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(student, index) in NoClassNumStudents"
                :key="student.studentID"
              >
                <td>{{ student.name }}</td>
                <td>{{ student.studentID }}</td>
                <td>
                  <select
                    class="form-select w-100"
                    v-model="NoClassNumStudents[index].classNum"
                  >
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            關閉
          </button>
          <button type="button" class="btn btn-primary" @click="saveManyData()">
            存檔
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      students: [],
      NoClassNumStudents: [],
      selectedClassNum: "",
      select: "重新分班",
    };
  },
  computed: {
    uniqueClassNum() {
      const classSet = new Set();
      this.students.forEach((student) => {
        if (!student.classNum) {
          classSet.add("未分班");
        } else {
          classSet.add(student.classNum);
        }
      });
      return Array.from(classSet);
    },
    filteredStudents() {
      if (this.selectedClassNum === "未分班") {
        console.log(this.selectedClassNum);
        return this.students.filter((student) => !student.classNum);
      } else if (this.selectedClassNum) {
        return this.students.filter(
          (student) => student.classNum === this.selectedClassNum
        );
      }
      return this.students;
    },
  },

  methods: {
    saveData(student) {
      const yourToken = localStorage.getItem("token");
      const payload = {
        classNum: this.select,
      };
      this.$axios
        .put(`/auth/student/${student._id}`, payload, {
          headers: {
            Authorization: `Bearer ${yourToken}`,
          },
        })
        .then((res) => {
          this.$swal
            .fire({
              title: "變更成功",
              text: "已成功更新學生資料",
              icon: "success",
              showCancelButton: true,
              confirmButtonText: "ok",
              cancelButtonText: "關閉",
            })
            .then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              } else if (result.isDismissed) {
                console.log("Modal closed");
              }
            });
        })
        .catch((err) => {
          const errorMessage = err.response.data.message || "更新失敗，請重試";
          this.$swal.fire({
            title: "更新失敗",
            text: "更新學生資料時發生錯誤",
            text: errorMessage,
            icon: "error",
          });
        });
    },
    saveManyData() {
      const yourToken = localStorage.getItem("token");
      this.$axios
        .put(`/auth/students`, this.NoClassNumStudents, {
          headers: {
            Authorization: `Bearer ${yourToken}`,
          },
        })
        .then((res) => {
          console.log(res);
          this.$swal
            .fire({
              title: "變更成功",
              text: "已成功更新學生資料",
              icon: "success",
              showCancelButton: true,
              confirmButtonText: "ok",
              cancelButtonText: "關閉",
            })
            .then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              } else if (result.isDismissed) {
              }
            });
        });
    },
  },

  mounted() {
    var storedToken = localStorage.getItem("token");
    this.$axios
      .get("/auth/students", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        res.data.data.students.forEach((student) => {
          if (!student.classNum) {
            this.NoClassNumStudents.push({
              name: student.name,
              studentID: student.studentID,
              classNum: student.classNum,
              _id: student._id,
            });
          }
          this.students.push({
            name: student.name,
            studentID: student.studentID,
            classNum: student.classNum,
            _id: student._id,
          });
        });
        this.sessions = this.students.map((student) => student.session);
      })
      .catch((err) => {
        console.error("Error fetching students:", err);
      });
  },
};
</script>

<style scoped></style>
