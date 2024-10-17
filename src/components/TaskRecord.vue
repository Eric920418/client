<template>
  <div v-if="student == null">
    <div class="my-3 d-flex justify-content-between align-items-center">
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        歷史任務
      </button>
      <div v-if="task !== null">任務名稱: {{ task.title }}</div>
    </div>
    <table
      v-if="task !== null"
      class="table mt-3 table-dark table-striped table-hover align-middle"
    >
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
          <td>{{ student.name }}</td>
          <td>{{ student.studentID }}</td>
          <td>{{ student.taskState }}</td>
          <td>
            <button
              type="button"
              class="btn btn-light"
              @click="checkStudent(student)"
            >
              進入
            </button>
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
          <div class="modal-header">
            <h5 class="modal-title text-black" id="exampleModalLabel">
              全部任務(點擊載入)
            </h5>
          </div>
          <div class="modal-body text-black">
            <table class="table table-hover align-middle">
              <thead>
                <tr>
                  <th scope="col">任務名稱</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(task, index) in history"
                  :key="index"
                  @click="checkTask(task)"
                  data-bs-dismiss="modal"
                >
                  <td>{{ task.title }}</td>
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
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="my-3 d-flex justify-content-between align-items-center">
      <button type="button" class="btn btn-danger" @click="student = null">
        返回
      </button>
    </div>
    <div class="p-2">
      <div class="card shadow-lg">
        <div class="d-flex justify-content-around align-items-center my-3">
          <div
            v-if="student.task[0].state == 1"
            class="box"
            style="background-color: greenyellow"
          >
            <div
              class="text-center d-flex justify-content-center align-items-center h-100 fs-3"
            >
              第一步
            </div>
          </div>
          <div v-else class="box">
            <div
              class="text-center d-flex justify-content-center align-items-center h-100 fs-3"
            >
              第一步
            </div>
          </div>
          <div v-if="student.task[0].state == 1">
            <div class="arrow-right"></div>
            <div class="arrow-right"></div>
            <div class="arrow-right"></div>
          </div>
          <div
            v-if="student.task[0].state == 2"
            class="box"
            style="background-color: greenyellow"
          >
            <div
              class="text-center d-flex justify-content-center align-items-center h-100 fs-3"
            >
              第二步
            </div>
          </div>
          <div v-else class="box">
            <div
              class="text-center d-flex justify-content-center align-items-center h-100 fs-3"
            >
              第二步
            </div>
          </div>
          <div v-if="student.task[0].state == 2">
            <div class="arrow-right"></div>
            <div class="arrow-right"></div>
            <div class="arrow-right"></div>
          </div>
          <div
            v-if="student.task[0].state == 3"
            class="box"
            style="background-color: greenyellow"
          >
            <div
              class="text-center d-flex justify-content-center align-items-center h-100 fs-3"
            >
              第三步
            </div>
          </div>
          <div v-else class="box">
            <div
              class="text-center d-flex justify-content-center align-items-center h-100 fs-3"
            >
              第三步
            </div>
          </div>
          <div v-if="student.task[0].state == 3">
            <div class="arrow-right"></div>
            <div class="arrow-right"></div>
            <div class="arrow-right"></div>
          </div>
          <div
            v-if="student.task[0].state == 4"
            class="box"
            style="background-color: greenyellow"
          >
            <div
              class="text-center d-flex justify-content-center align-items-center h-100 fs-3"
            >
              第四步
            </div>
          </div>
          <div v-else class="box">
            <div
              class="text-center d-flex justify-content-center align-items-center h-100 fs-3"
            >
              第四步
            </div>
          </div>
          <div v-if="student.task[0].state == 4">
            <div class="arrow-right"></div>
            <div class="arrow-right"></div>
            <div class="arrow-right"></div>
          </div>
          <div
            v-if="student.task[0].state == 5"
            class="box"
            style="background-color: greenyellow"
          >
            <div
              class="text-center d-flex justify-content-center align-items-center h-100 fs-3"
            >
              第五步
            </div>
          </div>
          <div v-else class="box">
            <div
              class="text-center d-flex justify-content-center align-items-center h-100 fs-3"
            >
              第五步
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-around align-items-center my-3">
          <div
            class="card shadow-sm border-3"
            style="width: 400px; height: 400px"
          >
            <h3 class="text-center my-3">計畫</h3>
            <table
              class="table table-hover align-middle"
              style="font-size: 17px; overflow-y: scroll"
            >
              <tbody>
                <tr
                  v-for="(option, index) in this.student.task[0].order"
                  :key="option.id"
                  @click="this.selectOrder = index"
                  :class="{ 'bg-success': selectOrder === index }"
                >
                  <td>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      {{ index + 1 }}. : {{ option.taskName }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            class="card shadow-sm border-3"
            style="width: 400px; height: 400px"
          >
            <h3 class="text-center my-3">策略</h3>
            <table
              class="table table-striped"
              style="font-size: 17px; overflow-y: scroll"
            >
              <tbody>
                <tr v-for="(option, index) in getStrategies" :key="option.id">
                  <td>
                    <div
                      class="d-flex justify-content-between align-items-center"
                    >
                      {{ index + 1 }}. : {{ option }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <h3 class="text-center my-3">實作結果</h3>
        <div class="d-flex justify-content-around align-items-center my-3">
          <div
            class="card shadow-sm border-3"
            style="width: 95%; height: 750px; position: relative"
          >
            <iframe id="output" ref="output"></iframe>
          </div>
        </div>
        <h3 class="text-center my-3">實作問題</h3>
        <div class="d-flex justify-content-around align-items-center my-3">
          <div
            class="card shadow-sm border-3"
            style="width: 95%; height: 500px; overflow-y: scroll"
          >
            <div
              v-for="(question, index) in student.task[0].taskId.question"
              :key="question.id"
              class="p-3"
            >
              <div class="d-flex">
                <label class="fs-4" :for="'question-' + index"
                  >問題 {{ index + 1 }} ：</label
                >
                <span class="fs-4">「{{ question }}」</span>
              </div>
              <div class="d-flex mt-2">
                <span class="fs-4">學生回答：</span>
                <span class="fs-4 ms-2">{{
                  student.task[0].answer[index]
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <h3 class="text-center my-3">心得</h3>
        <div class="d-flex justify-content-around align-items-center my-3">
          <div
            class="card shadow-sm border-3"
            style="width: 95%; height: 400px; overflow-y: scroll"
          >
            <div class="my-2 fs-3">
              任務檢查：{{ student.task[0].thoughts[0] }}
            </div>
            <div class="my-2 fs-3">
              學到什麼：{{ student.task[0].thoughts[1] }}
            </div>
            <div class="my-2 fs-3">
              遇到問題：{{ student.task[0].thoughts[2] }}
            </div>
            <div class="my-2 fs-3">
              覺得哪些需要改進：{{ student.task[0].thoughts[3] }}
            </div>
            <div class="my-2 fs-3">
              自我評估：{{ student.task[0].thoughts[4] }}
            </div>
          </div>
        </div>
        <h3 class="text-center my-3">動作時間</h3>
        <div class="d-flex justify-content-around align-items-center my-3">
          <div
            class="card shadow-sm border-3"
            style="width: 95%; height: 500px"
          >
            <apexchart
              width="100%"
              height="500"
              type="bar"
              :options="chartOptions"
              :series="series"
            ></apexchart>
          </div>
        </div>
        <h3 class="text-center my-3">動作時間</h3>
        <div class="d-flex justify-content-around align-items-center my-3">
          <div
            class="card shadow-sm border-3"
            style="width: 95%; height: 700px"
          >
            <apexchart
              width="100%"
              height="700"
              type="bubble"
              :options="chartOptions2"
              :series="series2"
            ></apexchart>
          </div>
        </div>
        <h3 class="text-center my-3">動作紀錄</h3>
        <div class="d-flex justify-content-around align-items-center my-3">
          <div
            class="card shadow-sm border-3"
            style="width: 95%; height: 500px; overflow-y: scroll"
          >
            <div class="card-herder d-flex align-items-center">
              <select
                class="form-select m-2"
                style="width: 100px; height: 40px; font-size: 15px; z-index: 1"
                v-model="selectedState"
              >
                <option selected value="1">步驟一</option>
                <option value="2">步驟二</option>
                <option value="3">步驟三</option>
                <option value="4">步驟四</option>
                <option value="5">步驟五</option>
              </select>

              <button
                class="btn btn-success p-0 px-2"
                style="height: 25px; font-size: 11px"
                @click="exportToExcel"
              >
                匯出Excel
              </button>
            </div>

            <div class="card-body">
              <table
                style="width: 50%"
                class="table m-1 table-sm align-middle table-borderless"
              >
                <thead>
                  <tr>
                    <th
                      style="width: 100%"
                      class="fs-4 bold text-danger text-nowrap"
                    >
                      動作
                    </th>
                    <th
                      style="width: 100%"
                      class="fs-4 bold text-primary text-nowrap"
                    >
                      時間
                    </th>
                  </tr>
                </thead>
                <tbody style="height: 200px; overflow-y: auto">
                  <tr
                    v-for="(action, index) in filteredTask"
                    :key="index"
                    style="width: 100%"
                  >
                    <td style="width: 100%" class="fs-5 text-nowrap">
                      {{ action.action }}
                    </td>
                    <td style="width: 100%" class="fs-5 text-nowrap">
                      {{ action.timestamp }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <h3 class="text-center my-3">老師評價</h3>
        <div class="d-flex justify-content-around align-items-center my-3">
          <div
            class="card shadow-sm border-3"
            style="width: 95%; height: 500px"
          >
            <textarea
              class="mx-auto mt-2 form-control"
              name=""
              id=""
              style="height: 450px; width: 90%"
              v-model="student.task[0].teacherTalk"
              placeholder="請輸入評價"
            ></textarea>
            <button
              class="btn btn-primary m-2 ms-auto"
              style="width: 10%"
              @click="save"
            >
              存檔
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
export default {
  data() {
    return {
      history: [],
      students: [],
      task: null,
      student: null,
      selectOrder: null,

      selectedState: "1",
      chartOptions: {
        chart: {
          id: "vuechart-example",
          type: "bar",
          height: 350,
        },
        xaxis: {
          categories: ["步驟一", "步驟二", "步驟三", "步驟四", "步驟五"],
        },
        plotOptions: {
          bar: {
            borderRadius: 1,
            borderRadiusApplication: "end",
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        theme: {
          palette: "palette6",
        },
        tooltip: {
          y: {
            formatter: (value) => this.formatTime(value), // 使用箭头函数绑定 Vue 实例的 formatTime
          },
        },
      },
      series: [
        {
          name: "秒數",
          data: [],
        },
      ],
      // 第一格 時間 第二格 事件 第三格 固定

      chartOptions2: {
        chart: {
          type: "bubble",
        },
        dataLabels: {
          enabled: false,
        },
        fill: {
          opacity: 0.8,
        },
        title: {
          text: "",
        },
        xaxis: {
          type: "datetime",
          labels: {
            format: "MM-dd HH:mm", // 显示为 "09-02 17:58" 格式
          },
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              const events = ["一", "二", "三", "四", "五"];
              return events[value - 1]; // 根据你设置的事件顺序返回事件名称
            },
          },
          min: 0,
          max: 5,
          tickAmount: 5, // 根据事件数量设置刻度数量
        },
      },
      series2: [
        {
          name: "動作",
          data: [],
        },
      ],
    };
  },
  computed: {
    ManyStudent() {
      return this.students
        .map((student) => {
          const filteredTasks = student.task.filter(
            (task) => task.taskId._id === this.task._id
          );

          if (filteredTasks.length > 0) {
            if (filteredTasks[0].state < 6) {
              if (filteredTasks[0].state == 5) {
                return {
                  ...student,
                  taskState: `未完成 進度: ${filteredTasks[0].state} (待批改)`,
                  task: filteredTasks,
                };
              } else {
                return {
                  ...student,
                  taskState: `未完成 進度: ${filteredTasks[0].state}`,
                  task: filteredTasks,
                };
              }
            } else {
              return { ...student, taskState: "已完成", task: filteredTasks };
            }
          }

          return null;
        })
        .filter((student) => student !== null);
    },
    getStrategies() {
      if (this.selectOrder !== undefined && this.selectOrder !== null) {
        return this.student.task[0].order[this.selectOrder].strategy;
      } else {
        // 如果 selectOrder 是空的，返回一个空数组或其他默认值
        return [];
      }
    },
    filteredTask() {
      const index = this.selectedState; // 假設 selectedState 是你想篩選的 state 值

      const filteredActions = this.student.task[0].finishTime
        .filter((item) => item && item.state == index && item.actions) // 根據 state 進行篩選
        .flatMap((item) => item.actions); // 提取 actions 並展平為單一數組

      return filteredActions;
    },
  },
  methods: {
    getHistory() {
      const yourToken = localStorage.getItem("token");
      this.$axios
        .get("/task/students/task", {
          headers: {
            Authorization: `Bearer ${yourToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.history = res.data.tasks;
          const students = [];
          res.data.students.forEach((student) => {
            students.push({
              name: student.name,
              studentID: student.studentID,
              task: student.Task,
              id: student._id,
            });
          });
          this.students = students;
        });
    },
    checkTask(task) {
      this.task = task;
    },
    checkStudent(studentID) {
      this.student = studentID;
      setTimeout(() => {
        this.updateOutput();
        this.updateChart();
      }, 1000);
    },
    updateOutput() {
      const iframe = this.$refs.output;
      if (iframe && this.student.task.length > 0) {
        const documentContent = `
                    <html>
                    <head>
                        <style>${this.student.task[0].css}</style>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js"><\/script>

                    </head>
                    <body>
                        ${this.student.task[0].html}
                        <script>${this.student.task[0].js}<\/script>
                    </body>
                    </html>
                `;
        iframe.srcdoc = documentContent;
      } else {
      }
    },
    save() {
      let task = {
        state: 6,
        taskId: this.student.task[0].taskId._id,
        teacherTalk: this.student.task[0].teacherTalk,
      };
      console.log(task);
      var storedToken = localStorage.getItem("token");
      this.$axios
        .patch(`/task/state/${this.student.id}`, task, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.$swal.fire({
            title: "任務批改完成",
            icon: "success",
          });
        });
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${minutes}分${secs}秒`;
    },
    updateChart() {
      const finishTimes = this.student?.task[0]?.finishTime || [];

      let stateTimes = {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      };
      // 遍历 finishTimes，根据不同的 state 进行时间加总
      finishTimes.forEach((item) => {
        if (item && item.state && item.time) {
          stateTimes[item.state] += item.time;
        }
      });

      // 更新 series.data
      this.series[0].data = [
        stateTimes[1],
        stateTimes[2],
        stateTimes[3],
        stateTimes[4],
        stateTimes[5],
      ];

      let FilterData = [];
      const data = this.student.task[0].finishTime.filter(
        (item) => item && item.actions.length > 0
      );
      const mergedFinishTimes = new Map();
      data.forEach((task) => {
        let NewActions = [];
        task.actions.forEach((action) => {
          NewActions.push({
            state: task.state,
            timestamp: action.timestamp,
          });
        });
        mergedFinishTimes.set(task.state, {
          actions: NewActions,
          state: task.state,
          time: task.time,
        });
      });

      const sortedMergedFinishTimes = Array.from(
        mergedFinishTimes.values()
      ).sort((a, b) => a.state - b.state);
      // const eventMapping = {
      //   跑程式碼: 1,
      //   開啟HTML編輯器: 2,
      //   開啟CSS: 3,
      //   開啟JavaScript: 4,
      //   存程式碼: 5,
      //   打開程式碼紀錄: 6,
      //   關閉程式碼紀錄: 7,
      //   編寫html: 8,
      //   編寫css: 9,
      //   編寫JavaScript: 10,
      //   開啟聊天室: 11,
      //   關閉聊天室: 12,
      //   打開程式碼: 13,
      //   關閉程式碼: 14,
      //   讀取了: 15,
      //   發送問題: 16,
      //   關閉考試視窗: 17,
      //   打開考試視窗: 18,
      // };

      let newData = []; // 用來存放所有生成的 data

      sortedMergedFinishTimes.forEach((item) => {
        item.actions.forEach((action) => {
          const data = [
            new Date(action.timestamp).getTime(), // 时间戳
            action.state, // 狀態
            10, // 固定值
          ];
          newData.push(data); // 將每個 data 推入 newData 陣列
        });
      });

      console.log(newData);
      this.series2[0].data = newData;

      // 更新 chartOptions 的 tooltip 和 dataLabels
      this.chartOptions.tooltip.y.formatter = (value) => this.formatTime(value); // 再次赋值确保正确绑定
      this.chartOptions.dataLabels.formatter = (value) =>
        this.formatTime(value); // 再次赋值确保正确绑定

      // 渲染图表
      if (this.chart) {
        this.chart.destroy(); // 销毁之前的图表实例
        this.chart.render();
      }
    },
    exportToExcel() {
      const header = ["姓名", "學號", "步驟", "動作", "對話內容", "時間"];

      let FilterData = [];

      const data = this.student.task[0].finishTime.filter(
        (item) => item && item.actions.length > 0
      );

      const mergedFinishTimes = new Map();

      data.forEach((task) => {
        let NewActions = [];
        task.actions.forEach((action) => {
          let talkContent = "";

          if (action.action && action.action.includes("發送問題")) {
            const contentMatch = action.action.match(/發送問題 問題內容：(.*)/);
            if (contentMatch && contentMatch[1]) {
              talkContent = contentMatch[1];
              action.action = "發送問題";
            }
          }

          NewActions.push({
            action: action.action,
            timestamp: action.timestamp,
            talkContent: talkContent,
          });
        });

        mergedFinishTimes.set(task.state, {
          actions: NewActions,
          state: task.state,
          time: task.time,
          name: this.student.name,
          studentID: this.student.studentID,
        });
      });

      mergedFinishTimes.forEach((task) => {
        if (task && task.actions) {
          const stepData = task.actions.map((action) => [
            task.name,
            task.studentID,
            task.state,
            action.action,
            action.talkContent,
            action.timestamp,
          ]);
          FilterData.push(...stepData);
        }
      });
      FilterData = FilterData.reverse();
      const ws_data = [header, ...FilterData];
      const ws = XLSX.utils.aoa_to_sheet(ws_data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet JS");

      XLSX.writeFile(wb, "學生動作紀錄.xlsx");
    },
  },

  mounted() {
    this.getHistory();
  },
};
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
iframe {
  width: 100%;
  height: 100vh;
  border: none;
  background-color: #fff;
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
