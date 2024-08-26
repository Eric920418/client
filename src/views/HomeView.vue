<template>
  <div class="main" ref="main">
    <div class="containers" ref="code">
      <div>
        <button
          class="toggle-btn btn btn-danger"
          id="html"
          style="font-size: 50px; top: 0%"
          @click="toggleHtml"
        >
          <i class="fa-brands fa-html5 m-0 p-0"></i>
          <div class="icon-text">
            HTML
            <div style="position: absolute; top: 5%; left: 87%">
              <span style="display: block">H</span>
              <span style="display: block">T</span>
              <span style="display: block">M</span>
              <span style="display: block">L</span>
            </div>
          </div>
        </button>
      </div>
      <div>
        <button
          class="toggle-btn btn btn-primary"
          id="css"
          style="font-size: 50px; top: 11.5%"
          @click="toggleCss"
        >
          <i class="fa-brands fa-css3-alt"></i>
          <div class="icon-text">CSS</div>
        </button>
      </div>
      <div>
        <button
          class="toggle-btn btn btn-warning"
          id="js"
          style="font-size: 50px; top: 23.5%"
          @click="toggleJs"
        >
          <i class="fa-brands fa-square-js m-0 p-0"></i>
          <div class="icon-text" style="font-size: 12px">JavaScript</div>
        </button>
      </div>
      <div>
        <button
          class="toggle-btn btn"
          id="code"
          style="font-size: 23px; background-color: #454545; top: 40%"
          @click.stop="runOutput"
          ref="run"
        >
          執行
        </button>
      </div>
      <div>
        <button
          class="toggle-btn btn"
          id="save"
          style="font-size: 23px; background-color: #454545; top: 45.5%"
          @click.stop="saveButton"
          ref="save"
        >
          儲存
        </button>
      </div>
      <div>
        <button
          class="toggle-btn btn btn-light"
          id="restart"
          style="font-size: 50px; top: 59%"
          @click="restart"
        >
          <i class="fa-solid fa-rotate-left"></i>
        </button>
      </div>
      <div>
        <button
          class="toggle-btn btn practiceBtn"
          id="practice"
          ref="tip"
          style="font-size: 50px; top: 70%"
          @click="startPractice"
        >
          <i class="fa-solid fa-laptop-code"></i>
          <span v-html="badgeHtml"></span>
        </button>
      </div>

      <div
        v-if="this.focusTaskIndex != null"
        ref="nav"
        class=""
        style="
          position: fixed;
          top: 20px;
          left: 50%;
          width: 96%;
          transform: translate(-50%, -50%);
          z-index: 10;
          background-color: #f8f9fa;
          transition: all 0.5s ease-in-out;
        "
      >
        <div
          class="d-flex justify-content-between align-items-center"
          style="height: 100%"
        >
          <div
            class="w-100 text-center sidebar"
            ref="one"
            @click="changeFocus(1)"
            style="font-size: 15px; z-index: 30; color: #d0d0d0"
          >
            體驗情境
          </div>
          <div
            class="w-100 text-center sidebar"
            ref="two"
            @click="changeFocus(2)"
            style="font-size: 15px; z-index: 30; color: #d0d0d0"
          >
            學習目標
          </div>
          <div
            class="w-100 text-center sidebar"
            ref="three"
            @click="changeFocus(3)"
            style="font-size: 15px; z-index: 30; color: #d0d0d0"
          >
            制定計劃
          </div>
          <div
            class="w-100 text-center sidebar"
            ref="four"
            @click="changeFocus(4)"
            style="font-size: 15px; z-index: 30; color: #d0d0d0"
          >
            執行計畫
          </div>
          <div
            class="w-100 text-center sidebar"
            ref="five"
            @click="changeFocus(5)"
            style="font-size: 15px; z-index: 30; color: #d0d0d0"
          >
            評估與反思
          </div>
        </div>
      </div>
      <div class="practice" ref="practice">
        <div
          ref="practiceCard"
          class="card w-100 h-100"
          style="background-color: #f8f9fa; position: relative"
        >
          <h5 class="card-title text-center task-title">任務欄</h5>
          <select
            class="form-select top-0 start-0 m-1"
            style="
              width: 150px;
              height: 40px;
              font-size: 15px;
              position: absolute;
            "
            name=""
            id=""
            v-model="selectedState"
          >
            <option value="">所有任務</option>
            <option value="0">未作任務</option>
            <option value="6">完成任務</option>
          </select>
          <div
            class="card-body d-flex justify-content-center"
            style="
              height: 90%;
              width: 100%;
              overflow-y: scroll;
              margin-top: 50px;
            "
          >
            <div class="row">
              <div
                v-for="(task, index) in filteredTask"
                :key="task.id"
                class="col-3"
              >
                <div
                  v-if="task.state != 6"
                  class="card my-2 taskCard"
                  style="height: 200px; width: 100%"
                >
                  <div
                    class="card-body front"
                    style="
                      height: 100%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <h5
                      class="card-title text-center fs-4"
                      style="width: 100px"
                    >
                      {{ task.title }}
                    </h5>
                  </div>
                  <div
                    class="card-body back"
                    style="
                      height: 100%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <button class="btn btn-primary" @click="watchExm(index)">
                      體驗
                    </button>
                  </div>
                </div>
                <div
                  v-else
                  class="card my-2 taskCard"
                  style="height: 200px; width: 100%; background-color: #00c78c"
                >
                  <div
                    class="card-body front"
                    style="
                      height: 100%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <h5
                      class="card-title text-center fs-4"
                      style="width: 100px"
                    >
                      {{ task.title }}
                    </h5>
                  </div>
                  <div
                    class="card-body back"
                    style="
                      height: 100%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    "
                  >
                    <button
                      class="btn btn-primary"
                      @click="watchTeacher(index)"
                    >
                      查看老師評語
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="this.focusTaskIndex != null"
          ref="practiceIframeCard"
          class="card d-none w-100 h-100"
          style="background-color: transparent; position: relative"
        >
          <iframe
            ref="practiceIframe"
            style="height: 100%; width: 100%"
          ></iframe>
          <div class="d-flex bottom-0 end-0 m-1" style="position: absolute">
            <button class="btn btn-danger mx-1" @click="backTask">返回</button>
            <button
              v-if="this.tasks[this.focusTaskIndex].state == 0"
              class="btn btn-primary mx-1"
              @click="accept"
            >
              接任務
            </button>
            <button v-else class="btn btn-primary mx-1" @click="accept">
              繼續任務
            </button>
          </div>
        </div>
        <div
          v-if="this.focusTaskIndex != null"
          ref="taskInformation"
          class="card d-none w-100 h-100"
          style="
            background-color: #f8f9fa;
            position: relative;
            align-self: center;
          "
        >
          <div class="d-flex justify-content-around" style="height: 100%">
            <div
              v-if="this.tasks[this.focusTaskIndex].ppt.length > 0"
              style="margin-top: 20px"
            >
              <h5 class="m-1 px-1">
                <div class="text-center t3 mx-auto">教材區</div>
              </h5>
              <div class="slides">
                <div class="slide" style="position: relative">
                  <img
                    :src="this.tasks[this.focusTaskIndex].ppt[currentSlide]"
                    alt="PDF Page"
                  />
                  <button
                    class="btn btn-secondary me-2"
                    style="position: absolute; top: 45%; left: 0%"
                    @click="prevSlide"
                    :disabled="currentSlide === 0"
                  >
                    <i class="bi bi-chevron-compact-left"></i>
                  </button>
                  <button
                    class="btn btn-secondary me-2"
                    style="position: absolute; top: 45%; left: 95.5%"
                    @click="nextSlide"
                    :disabled="
                      currentSlide ===
                      this.tasks[this.focusTaskIndex].ppt.length - 1
                    "
                  >
                    <i class="bi bi-chevron-compact-right"></i>
                  </button>
                </div>
              </div>
              <div
                style="text-align: center; margin-top: 10px; font-size: 30px"
              >
                <span
                  >{{ currentSlide + 1 }} /
                  {{ this.tasks[this.focusTaskIndex].ppt.length }}</span
                >
              </div>
            </div>
            <div class="px-3" style="width: 100%; margin-top: 20px">
              <h5 class="m-1 px-1">
                <div class="text-center t5 mx-auto">學習目標</div>
              </h5>
              <table
                class="table table-striped"
                style="font-size: 17px; overflow-y: scroll"
              >
                <tbody>
                  <tr
                    v-for="(option, index) in this.tasks[this.focusTaskIndex]
                      .guide"
                    :key="option.id"
                  >
                    <td
                      class="tr"
                      style="
                        transform: translateX(-100%);
                        opacity: 0;
                        transition: all 0.5s ease-in-out;
                      "
                    >
                      {{ option }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="d-flex bottom-0 end-0 m-1" style="position: absolute">
            <button class="btn btn-danger mx-1" @click="backTask">返回</button>
            <button class="btn btn-primary mx-1" @click="formulate">
              制定學習計畫
            </button>
          </div>
        </div>
        <div
          v-if="this.focusTaskIndex != null"
          ref="formulate"
          class="card d-none w-100 h-100"
          style="
            background-color: #f8f9fa;
            position: relative;
            align-self: center;
          "
        >
          <h5 class="text-center" style="font-size: 25px">制定目標</h5>
          <div class="row m-0 px-2">
            <div
              class="card p-0 border-0 col-3"
              style="background-color: #f8f9fa"
            >
              <div class="card-body">
                <div
                  class="card-title text-center py-1"
                  style="
                    font-size: 25px;
                    border: 1px solid black;
                    border-radius: 10px;
                    padding: 10px;
                  "
                >
                  子任務
                </div>
                <table
                  class="table table-striped my-1"
                  style="font-size: 17px; overflow-y: scroll"
                >
                  <tbody>
                    <tr
                      v-for="(option, index) in filterTaskTarget"
                      :key="option.id"
                    >
                      <td
                        class="ts"
                        style="
                          transform: translateX(-100%);
                          opacity: 0;
                          transition: all 0.5s ease-in-out;
                        "
                      >
                        <div
                          class="d-flex justify-content-between align-items-center"
                        >
                          {{ option }}
                          <button
                            class="btn btn-secondary btn-sm"
                            @click="addOrder(option, index)"
                          >
                            加入順序
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div
              class="card p-0 border-0 col-9"
              style="background-color: #f8f9fa"
            >
              <div class="card-body">
                <div
                  class="card-title text-center py-1"
                  style="
                    font-size: 25px;
                    border: 1px solid black;
                    border-radius: 10px;
                    padding: 10px;
                  "
                >
                  <div
                    class="d-flex justify-content-around align-items-center my-1"
                  >
                    <p class="m-0">任務順序</p>
                    <p class="m-0">策略</p>
                  </div>
                </div>
                <div class="row m-0 px-1">
                  <div class="col-6">
                    <div
                      class="card border-1 w-100"
                      style="height: 600px; border-radius: 0"
                    >
                      <table
                        class="table"
                        style="font-size: 17px; overflow-y: scroll"
                      >
                        <tbody>
                          <tr
                            v-for="(order, index) in tasks[this.focusTaskIndex]
                              .order"
                            :key="index"
                            style="height: 100px"
                          >
                            <td v-if="order.state != 1" class="p-0 px-4 order">
                              <div
                                class="d-flex align-items-center"
                                style="height: 99px"
                              >
                                <span
                                  class="mx-auto h-100 d-flex"
                                  style="font-size: 30px; align-items: center"
                                >
                                  {{ order.taskName }}
                                </span>
                                <button
                                  class="btn btn-secondary btn-sm me-2"
                                  @click="selectOrder(index)"
                                >
                                  策略
                                </button>
                                <button
                                  v-if="
                                    order != '' &&
                                    tasks[this.focusTaskIndex].state < 3
                                  "
                                  class="btn btn-secondary btn-sm"
                                  @click="removeOrder(order, index)"
                                >
                                  刪除
                                </button>
                              </div>
                            </td>
                            <td v-else class="p-0 px-4 order bg-success">
                              <div
                                class="d-flex align-items-center"
                                style="height: 99px"
                              >
                                <span
                                  class="mx-auto h-100 d-flex"
                                  style="font-size: 30px; align-items: center"
                                >
                                  {{ order.taskName }}
                                </span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div class="col-6">
                    <div
                      v-if="this.orderIndex != null"
                      class="card border-1 w-100"
                      style="height: 600px"
                    >
                      <div
                        v-for="(strategy, index) in tasks[this.focusTaskIndex]
                          .order[this.orderIndex].strategy"
                        :key="index"
                        :value="strategy"
                        class="d-flex justify-content-between align-items-center px-1"
                        style="height: 60px"
                      >
                        <div class="w-100">
                          <select
                            name="strategy"
                            class="form-select"
                            v-model="
                              tasks[this.focusTaskIndex].order[this.orderIndex]
                                .strategy[index]
                            "
                            id=""
                          >
                            <option value="環境結構">環境結構</option>
                            <option value="學習策略">學習策略</option>
                            <option value="時間管理">時間管理</option>
                            <option value="尋求協助">尋求協助</option>
                            <option value="自我評估">自我評估</option>
                          </select>
                        </div>
                        <div class="d-flex align-items-end">
                          <button
                            type="button"
                            class="btn btn-danger ms-2 py-2"
                            @click="remove(index)"
                          >
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                      <button
                        type="button"
                        class="btn btn-primary mx-auto py-2 w-50"
                        @click="add"
                      >
                        <i class="fa-solid fa-plus"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex bottom-0 end-0 m-1" style="position: absolute">
            <button class="btn btn-danger mx-1" @click="backTask">返回</button>
            <button class="btn btn-primary mx-1" @click="beginTodo">
              開始實作
            </button>
          </div>
        </div>
        <div
          v-if="this.focusTaskIndex != null"
          ref="todo"
          class="card d-none w-100 h-100"
          style="
            background-color: #f8f9fa;
            position: relative;
            align-self: center;
          "
        >
          <div class="row p-4" style="overflow-y: scroll">
            <div class="col-8">
              <h3 class="text-center">實作問題</h3>
              <div
                class="my-4"
                v-for="(question, index) in tasks[this.focusTaskIndex].question"
                :key="index"
              >
                <div class="form-label" style="font-size: 30px">
                  問題{{ index + 1 }}:{{ question }}
                </div>
                <textarea
                  class="form-control"
                  v-model="tasks[this.focusTaskIndex].answer[index]"
                  :placeholder="`回答${index + 1}`"
                ></textarea>
              </div>
            </div>
            <div class="col-4">
              <h3 class="text-center py-1">子任務</h3>
              <table
                class="table table-striped mt-5"
                style="font-size: 17px; overflow-y: scroll"
              >
                <tbody>
                  <tr
                    v-for="(option, index) in this.tasks[this.focusTaskIndex]
                      .order"
                    :key="option.id"
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
              <h3 class="text-center py-1 mt-5">策略</h3>
              <table
                class="table table-striped mt-5"
                style="font-size: 17px; overflow-y: scroll"
              >
                <tbody>
                  <tr
                    v-for="(option, index) in this.tasks[this.focusTaskIndex]
                      .order"
                    :key="option.id"
                  >
                    <td>
                      <div
                        class="d-flex justify-content-between align-items-center"
                      >
                        {{ index + 1 }}. : {{ option.strategy }}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div
            class="d-flex justify-content-between bottom-0 end-0 m-1"
            style="position: absolute; width: 38%"
          >
            <p class="text-danger p-0 m-0 mt-1" style="font-size: 20px">
              (當按下『繳交任務』會自動交出程式碼)
            </p>
            <button class="btn btn-danger mx-1" @click="backTask">返回</button>
            <button class="btn btn-primary" @click="finishTask">
              繳交任務
            </button>
          </div>
        </div>
        <div
          v-if="this.focusTaskIndex != null"
          ref="finish"
          class="card d-none w-100 h-100"
          style="
            background-color: #f8f9fa;
            position: relative;
            align-self: center;
          "
        >
          <div class="px-5 py-4">
            <div class="my-4">
              <div class="form-label" style="font-size: 30px">任務檢查</div>
              <label
                v-for="(option, index) in tasks[focusTaskIndex].order"
                class="mx-3"
                :for="'task-' + index"
                :key="'label-' + index"
              >
                {{ option.taskName }}
                <input
                  :key="'input-' + index"
                  :id="'task-' + index"
                  type="checkbox"
                  class="form-check-input"
                  @change="updateThought(index, $event.target.checked)"
                />
              </label>
            </div>
            <div class="my-4">
              <div class="form-label" style="font-size: 30px">學到什麼</div>
              <textarea
                name=""
                id=""
                class="form-control"
                v-model="tasks[this.focusTaskIndex].thought[1]"
              ></textarea>
            </div>
            <div class="my-4">
              <div class="form-label" style="font-size: 30px">遇到問題</div>
              <textarea
                name=""
                id=""
                class="form-control"
                v-model="tasks[this.focusTaskIndex].thought[2]"
              ></textarea>
            </div>
            <div class="my-4">
              <div class="form-label" style="font-size: 30px">
                覺得哪些需要改進
              </div>
              <textarea
                name=""
                id=""
                class="form-control"
                v-model="tasks[this.focusTaskIndex].thought[3]"
              ></textarea>
            </div>
            <div class="my-4">
              <div class="form-label" style="font-size: 30px">
                自我評估（分數）
              </div>
              <v-slider
                v-model="tasks[this.focusTaskIndex].thought[4]"
                :min="0"
                :max="100"
                :step="1"
                thumb-label
              ></v-slider>
            </div>
          </div>
          <div class="d-flex bottom-0 end-0 m-1" style="position: absolute">
            <button class="btn btn-danger mx-1" @click="backTask">返回</button>
            <button class="btn btn-primary mx-1" @click="sendFinish">
              送出
            </button>
          </div>
        </div>
        <div
          v-if="this.focusTaskIndex != null"
          ref="teacherCard"
          class="card d-none w-100 h-100"
          style="
            background-color: #f8f9fa;
            position: relative;
            align-self: center;
          "
        >
          <div class="top-0 start-0 m-1" style="font-size: 40px">老師評語:</div>
          <div
            class="p-3 mx-5"
            style="
              border: 3px solid black;
              height: calc(100% - 120px);
              font-size: 35px;
            "
          >
            {{ tasks[this.focusTaskIndex].teacherTalk }}
          </div>
          <button
            class="btn btn-danger bottom-0 start-0 m-1"
            style="position: absolute"
            @click="closeExample"
          >
            返回
          </button>
        </div>
      </div>

      <div>
        <div class="text-close" id="html-code" ref="html">
          <div class="editor-container" ref="htmlEditorContainer"></div>
        </div>
        <div class="text-close" id="css-code" ref="css">
          <div class="editor-container" ref="cssEditorContainer"></div>
        </div>
        <div class="text-close" id="js-code" ref="js">
          <div class="editor-container" ref="jsEditorContainer"></div>
        </div>
        <div id="iframe-container" class="text-close" ref="iframe">
          <iframe id="output" ref="output"></iframe>
        </div>
      </div>

      <button
        class="toggle-chat-btn btn"
        id="chatbot"
        style="
          font-size: large;
          background-color: #6c6c6c;
          width: 40px;
          top: 0%;
        "
        v-if="isCollapsed"
        @click="toggleChat"
        ref="chat"
      >
        開啟聊天
      </button>
      <button
        class="toggle-chat-btn btn btn-secondary"
        id="log"
        style="font-size: large; width: 40px; top: 13.5%"
        v-if="isOpenLog"
        @click="openLog"
        ref="log"
      >
        打開紀錄
      </button>
      <button
        class="toggle-chat-btn btn btn-secondary"
        id="test"
        style="font-size: large; width: 40px; top: 26.5%"
        v-if="isTest"
        @click="openTest"
      >
        開啟考試視窗
        <span
          class="position-absolute translate-middle badge rounded-pill bg-danger"
          style="left: -5px; top: 10px"
          >{{ exams.length }}</span
        >
      </button>
      <button
        class="toggle-chat-btn btn btn-light"
        id="document"
        style="font-size: large; width: 40px; top: 90%"
        @click="SignOut"
      >
        登出
      </button>
    </div>

    <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 11">
      <div
        id="liveToast"
        class="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header">
          <strong class="me-auto">通知～～</strong>
          <small class="text-muted">11 mins ago</small>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body" style="color: black">你有新的任務囉！</div>
      </div>
    </div>

    <div v-if="!isCollapsed">
      <button
        @click="toggleChat"
        class="toggle-chat-btn btn"
        style="
          font-size: large;
          background-color: #6c6c6c;
          width: 40px;
          top: 0%;
        "
      >
        關閉聊天
      </button>
      <chat @update-action="handleActionUpdate" class="chat"></chat>
    </div>
    <div v-if="!isOpenLog">
      <button
        @click="openLog"
        class="toggle-chat-btn btn btn-secondary"
        style="font-size: large; width: 40px; top: 13.5%"
      >
        關閉紀錄
      </button>
      <document
        @update-action="handleLogActionUpdate"
        @go-to-demo="handleGoToDemo"
        @close-model="openLog"
        class="document"
      ></document>
    </div>
    <div v-if="!isTest">
      <button
        @click="openTest"
        class="toggle-chat-btn btn btn-secondary"
        style="font-size: large; width: 40px; top: 26.5%"
      >
        關閉考試視窗
      </button>
      <div class="exam" style="height: 100vh; overflow-y: scroll">
        <div
          v-if="exams && !exam.examName && !isFinishExam.examName"
          v-for="exam in exams"
          :key="exam.id"
          class="card mt-3 cardBody"
          style="margin-bottom: 20px"
        >
          <div class="card-body">
            <button
              class="d-flex justify-content-start align-items-center btn btn-primary mb-2"
              @click="checkExam(exam)"
            >
              開始考試
            </button>
            <div class="d-flex justify-content-between align-items-center">
              <div>
                考券名稱:{{ exam.examName }} (類型: {{ exam.examType }})
              </div>
              <div>題數: {{ exam.questionCount }}題</div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div>難度: {{ exam.examDifficulty }}</div>
              <div>截止時間: {{ exam.examDate }} {{ exam.examTime }}以前</div>
            </div>
          </div>
        </div>
        <div
          v-if="finishExams && !exam.examName && !isFinishExam.examName"
          v-for="exam in finishExams"
          :key="exam.id"
          class="card mt-3 cardBody"
          style="margin-bottom: 20px"
        >
          <div class="card-body bg-success">
            <div class="d-flex justify-content-start align-items-center fs-3">
              已交卷
              <button
                class="btn btn-primary ms-4"
                @click="checkFinishExam(exam)"
              >
                查看結果
              </button>
            </div>
            <div class="my-2 fs-5">分數: {{ exam.examScore }}分</div>
            <div class="d-flex justify-content-between align-items-center">
              <div>
                考券名稱:{{ exam.examName }} (類型: {{ exam.examType }})
              </div>
              <div>題數: {{ exam.questionCount }}題</div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <div>難度: {{ exam.examDifficulty }}</div>

              <div>完成時間: {{ exam.examFinishTime }}</div>
            </div>
          </div>
        </div>
        <div v-else-if="exam.examName" class="container my-4">
          <div class="d-flex justify-content-between align-items-center">
            <h2 class="text-center text-black mb-4">{{ exam.examName }}</h2>
            <button class="btn btn-primary mb-4" @click="exam = ''">
              返回
            </button>
          </div>
          <div
            v-for="ques in exam.examQues.questions"
            :key="ques.id"
            class="card mb-4 shadow-sm"
          >
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-center my-2"
              >
                <h5 class="card-title">題目: {{ ques.title }}</h5>
                <span class="badge bg-primary">{{
                  ques.types == "short-answer" ? "問答題" : "選擇題"
                }}</span>
              </div>
              <div v-if="ques.types != 'short-answer'" class="my-3">
                <button
                  @click="ques.answer = '0'"
                  class="btn btn-outline-primary w-25 my-2 mx-2 text-black"
                >
                  選項A: {{ ques.options[0] }}
                </button>
                <button
                  @click="ques.answer = '1'"
                  class="btn btn-outline-primary w-25 my-2 mx-2 text-black"
                >
                  選項B: {{ ques.options[1] }}
                </button>
              </div>
              <div v-if="ques.types != 'short-answer'" class="my-3">
                <button
                  @click="ques.answer = '2'"
                  class="btn btn-outline-primary w-25 my-2 mx-2 text-black"
                >
                  選項C: {{ ques.options[2] }}
                </button>
                <button
                  @click="ques.answer = '3'"
                  class="btn btn-outline-primary w-25 my-2 mx-2 text-black"
                >
                  選項D: {{ ques.options[3] }}
                </button>
              </div>
              <div v-if="ques.types == 'short-answer'" class="my-3">
                <input
                  type="text"
                  class="form-control"
                  v-model="ques.answer"
                  placeholder="請輸入答案"
                />
              </div>
              <div
                class="d-flex justify-content-between align-items-center mt-4"
              >
                <span>答案: {{ getAnswer(ques.answer) }}</span>
                <span class="badge bg-success">{{ ques.score }}分</span>
              </div>
            </div>
          </div>
          <button
            class="btn btn-success d-flex justify-content-between align-items-center mt-4"
            @click="finishExam"
          >
            交券
          </button>
        </div>
        <div v-if="isFinishExam.examName" class="container my-4">
          <div class="d-flex justify-content-between align-items-center">
            <h2 class="text-center text-black mb-4">
              {{ isFinishExam.examName }}
            </h2>
            <button class="btn btn-primary mb-4" @click="isFinishExam = ''">
              返回
            </button>
          </div>
          <div
            v-for="ques in isFinishExam.examQues.questions"
            :key="ques.id"
            class="card mb-4 shadow-sm"
          >
            <div class="card-body">
              <div
                class="d-flex justify-content-between align-items-center my-2"
              >
                <h5 class="card-title">題目: {{ ques.title }}</h5>
                <span class="badge bg-primary">{{
                  ques.types == "short-answer" ? "問答題" : "選擇題"
                }}</span>
              </div>
              <div v-if="ques.types != 'short-answer'" class="my-3">
                <button
                  disabled
                  :class="
                    ques.answer == '0'
                      ? 'btn btn-outline-primary w-25 my-2 mx-2 text-black bg-success'
                      : 'btn btn-outline-primary w-25 my-2 mx-2 text-black'
                  "
                >
                  選項A: {{ ques.options[0] }}
                </button>
                <button
                  disabled
                  :class="
                    ques.answer == '1'
                      ? 'btn btn-outline-primary w-25 my-2 mx-2 text-black bg-success'
                      : 'btn btn-outline-primary w-25 my-2 mx-2 text-black'
                  "
                >
                  選項B: {{ ques.options[1] }}
                </button>
              </div>
              <div v-if="ques.types != 'short-answer'" class="my-3">
                <button
                  disabled
                  :class="
                    ques.answer == '2'
                      ? 'btn btn-outline-primary w-25 my-2 mx-2 text-black bg-success'
                      : 'btn btn-outline-primary w-25 my-2 mx-2 text-black'
                  "
                >
                  選項C: {{ ques.options[2] }}
                </button>
                <button
                  disabled
                  :class="
                    ques.answer == '3'
                      ? 'btn btn-outline-primary w-25 my-2 mx-2 text-black bg-success'
                      : 'btn btn-outline-primary w-25 my-2 mx-2 text-black'
                  "
                >
                  選項D: {{ ques.options[3] }}
                </button>
              </div>
              <div
                class="d-flex justify-content-between align-items-center mt-4"
              >
                <span
                  ><strong class="me-5"
                    >解答: {{ getAnswer(ques.answer) }}</strong
                  >
                  你的答案: {{ getAnswer(ques.userAnswer) }}</span
                >
                <span class="badge bg-success">{{ ques.score }}分</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as monaco from "monaco-editor";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import { DomHandler, Parser } from "htmlparser2";

import Chat from "../components/ChatMessage.vue";
import Document from "../components/Dcumental.vue";

import { marked } from "marked";
import { jwtDecode } from "jwt-decode";
import { Toast } from "bootstrap";

export default {
  name: "MonacoEditor",
  components: {
    Chat,
    Document,
  },
  data() {
    return {
      htmlCode: "",
      cssCode: "",
      jsCode: "",
      isCollapsed: true,
      actions: [],
      isActionPushed: false,
      isOpenLog: true,
      isTest: true,
      isStarted: false,
      exams: [],
      finishExams: [],
      exam: {},
      isFinishExam: {},

      badgeHtml: "",
      socket: null,

      tasks: [],
      focusTaskIndex: null,
      currentSlide: 0,
      orderIndex: null,

      selectedState: "",
      time: 0,
      timerInterval: null,
      action: [],

      NowState: 0,
    };
  },
  computed: {
    filteredTask() {
      if (this.selectedState == 6) {
        return this.tasks.filter((task) => task.state == 6);
      } else if (this.selectedState == "0") {
        return this.tasks.filter((task) => task.state != 6);
      } else if (this.selectedState == "") {
        return this.tasks;
      }
    },
    filterTaskTarget() {
      const focusTask = this.tasks[this.focusTaskIndex];
      const orderTaskNames = new Set(
        focusTask.order.map((order) => order.taskName)
      );
      return focusTask.target.filter((target) => !orderTaskNames.has(target));
    },
  },
  methods: {
    updateOutput() {
      const iframe = this.$refs.output;
      const documentContent = `
          <html>
            <head>
              <style>${this.cssCode}<\/style>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js"><\/script>
            </head>
            <body>
              ${this.htmlCode}
              <script>
                  ${this.jsCode}
              <\/script>
            </body>
          </html>
        `;
      iframe.srcdoc = documentContent;
    },
    runOutput() {
      if (this.time > 0) {
        this.action.push({
          action: "跑程式碼",
          timestamp: new Date()
            .toLocaleString("zh-TW", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .replace(/\//g, "-")
            .replace(",", ""),
        });
      }
      console.log(this.jsEditor.getValue());
      this.isActionPushed = false;
      let storedToken = localStorage.getItem("token");
      this.$axios
        .post(
          "/code/runCode",
          {
            htmlCode: this.htmlEditor.getValue(),
            cssCode: this.cssEditor.getValue(),
            jsCode: this.jsEditor.getValue(),
          },
          {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          this.jsCode = this.jsEditor.getValue();
          this.cssCode = this.cssEditor.getValue();
          this.htmlCode = this.htmlEditor.getValue();

          try {
            const originalWarn = console.warn;
            let warnings = [];

            console.warn = function (message) {
              warnings.push(message);
              originalWarn.apply(console, arguments);
            };

            this.updateOutput();
            console.warn = originalWarn;
            if (warnings.length > 0) {
              this.$swal.fire({
                title: "JavaScript 警告",
                text: warnings.join("\n"),
                icon: "warning",
              });
            }
            this.$refs.iframe.classList.add("text");
            this.$refs.html.classList.remove("text");
            this.$refs.css.classList.remove("text");
            this.$refs.js.classList.remove("text");
            this.$refs.iframe.classList.remove("text-close");
            this.$refs.html.classList.add("text-close");
            this.$refs.css.classList.add("text-close");
            this.$refs.js.classList.add("text-close");
            this.$refs.practice.style.top = "-50%";
            setTimeout(() => {
              this.$refs.nav.classList.add("d-none");
            }, 1000);
            this.isStarted = false;
          } catch (e) {
            this.$swal.fire({
              title: "未知错误",
              text: e,
              icon: "error",
            });
            console.warn = originalWarn;
          }
        })
        .catch((err) => {
          const errorMessage = err.response.data.message;
          this.$swal.fire({
            title: "執行失敗",
            text: errorMessage,
            icon: "error",
          });
        });
    },
    toggleChat() {
      this.isCollapsed = !this.isCollapsed;
      if (this.time > 0) {
        if (this.isCollapsed) {
          this.action.push({
            action: "關閉聊天室",
            timestamp: new Date()
              .toLocaleString("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
              .replace(/\//g, "-")
              .replace(",", ""),
          });
          this.isActionPushed = false;
        } else {
          this.action.push({
            action: "開啟聊天室",
            timestamp: new Date()
              .toLocaleString("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
              .replace(/\//g, "-")
              .replace(",", ""),
          });
          this.isActionPushed = false;
        }
      }
    },
    toggleHtml() {
      this.$refs.html.classList.add("text");
      this.$refs.css.classList.remove("text");
      this.$refs.js.classList.remove("text");
      this.$refs.iframe.classList.remove("text");
      this.$refs.html.classList.remove("text-close");
      this.$refs.css.classList.add("text-close");
      this.$refs.js.classList.add("text-close");
      this.$refs.iframe.classList.add("text-close");
      this.htmlEditor.layout();
      if (this.time > 0) {
        this.action.push({
          action: "開啟HTML編輯器",
          timestamp: new Date()
            .toLocaleString("zh-TW", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .replace(/\//g, "-")
            .replace(",", ""),
        });
      }
      this.isActionPushed = false;
    },
    toggleCss() {
      this.$refs.css.classList.add("text");
      this.$refs.html.classList.remove("text");
      this.$refs.js.classList.remove("text");
      this.$refs.iframe.classList.remove("text");
      this.$refs.css.classList.remove("text-close");
      this.$refs.html.classList.add("text-close");
      this.$refs.js.classList.add("text-close");
      this.$refs.iframe.classList.add("text-close");
      this.cssEditor.layout();
      if (this.time > 0) {
        this.action.push({
          action: "開啟CSS編輯器",
          timestamp: new Date()
            .toLocaleString("zh-TW", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .replace(/\//g, "-")
            .replace(",", ""),
        });
      }
      this.isActionPushed = false;
    },
    toggleJs() {
      this.$refs.js.classList.add("text");
      this.$refs.html.classList.remove("text");
      this.$refs.css.classList.remove("text");
      this.$refs.iframe.classList.remove("text");
      this.$refs.js.classList.remove("text-close");
      this.$refs.html.classList.add("text-close");
      this.$refs.css.classList.add("text-close");
      this.$refs.iframe.classList.add("text-close");
      this.jsEditor.layout();
      if (this.time > 0) {
        this.action.push({
          action: "開啟JavaScript編輯器",
          timestamp: new Date()
            .toLocaleString("zh-TW", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .replace(/\//g, "-")
            .replace(",", ""),
        });
      }
      this.isActionPushed = false;
    },
    toggleIframe() {
      this.$refs.iframe.classList.add("text");
      this.$refs.html.classList.remove("text");
      this.$refs.css.classList.remove("text");
      this.$refs.js.classList.remove("text");
      this.$refs.iframe.classList.remove("text-close");
      this.$refs.html.classList.add("text-close");
      this.$refs.css.classList.add("text-close");
      this.$refs.js.classList.add("text-close");
      if (this.time > 0) {
        this.action.push({
          action: "觀看結果",
          timestamp: new Date()
            .toLocaleString("zh-TW", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .replace(/\//g, "-")
            .replace(",", ""),
        });
      }
      this.isActionPushed = false;
    },
    startPractice() {
      if (!this.isStarted) {
        this.$refs.practice.style.top = "50%";
        if (this.focusTaskIndex) {
          setTimeout(() => {
            this.$refs.nav.classList.remove("d-none");
          }, 1000);
        }
        this.isStarted = true;
      } else {
        this.$refs.practice.style.top = "-50%";
        setTimeout(() => {
          this.$refs.nav.classList.add("d-none");
        }, 1000);
        this.isStarted = false;
      }
    },

    watchTeacher(index) {
      this.focusTaskIndex = index;
      this.$refs.practice.style.cssText = "left: -50%; top: 50%; opacity: 0;";
      setTimeout(() => {
        this.$refs.practice.style.cssText =
          "left: 150%; top: 50%; opacity: 0; ";
        this.$refs.practiceCard.classList.add("d-none");
        this.$refs.teacherCard.classList.remove("d-none");
      }, 400);
      setTimeout(() => {
        this.$refs.practice.style.cssText =
          "left: 50%; top: 50%; opacity: 1; transition: all 0.5s ease-in-out;";
      }, 800);
    },
    watchExm(index) {
      this.focusTaskIndex = index;
      if (this.tasks[this.focusTaskIndex].state == 0) {
        this.$swal
          .fire({
            title: "第一步",
            text: "體驗本次任務最終成果",
          })
          .then(() => {
            this.startTimer();
            this.NowState = 1;
            this.$refs.one.style.cssText =
              "font-size: 15px; width:30px; background-color: #6C6C6C; color: black;  transition: all 0.5s ease-in-out; :";
            this.$refs.practice.style.cssText =
              "left: -50%; top: 50%; opacity: 0;";
            setTimeout(() => {
              this.$refs.practice.style.cssText =
                "left: 150%; top: 50%; opacity: 0; ";
              this.$refs.practiceCard.classList.add("d-none");
              this.$refs.practiceIframeCard.classList.remove("d-none");
              this.$refs.nav.classList.remove("d-none");
            }, 400);
            this.$refs.practice.style.cssText =
              "left: 50%; top: 50%; opacity: 1; transition: all 0.5s ease-in-out;";
            setTimeout(() => {
              const iframe2 = this.$refs.practiceIframe;
              if (iframe2) {
                const documentContent = `
                  <html>
                    <head>
                      <style>${this.tasks[index].css}<\/style>
                      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js"><\/script>
                    </head>
                    <body>
                      ${this.tasks[index].html}
                      <script>
                          ${this.tasks[index].js}
                      <\/script>
                    </body>
                  </html>
                `;
                iframe2.srcdoc = documentContent;
              } else {
                console.error("Iframe reference is undefined");
              }
            }, 800);
          });
      } else {
        this.startTimer();
        this.NowState = 1;
        this.$refs.practice.style.cssText = "left: -50%; top: 50%; opacity: 0;";
        setTimeout(() => {
          this.$refs.practice.style.cssText =
            "left: 150%; top: 50%; opacity: 0; ";
          this.$refs.practiceCard.classList.add("d-none");
          this.$refs.practiceIframeCard.classList.remove("d-none");
          this.$refs.nav.classList.remove("d-none");
        }, 400);
        setTimeout(() => {
          this.$refs.practice.style.cssText =
            "left: 50%; top: 50%; opacity: 1; transition: all 0.5s ease-in-out;";
          this.$refs.one.style.cssText =
            "font-size: 15px; width:30px; background-color:  #6C6C6C; color: black;  transition: all 0.5s ease-in-out;";
          const iframe2 = this.$refs.practiceIframe;
          if (iframe2) {
            const documentContent = `
                  <html>
                    <head>
                      <style>${this.tasks[index].css}<\/style>
                      <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.10.4/gsap.min.js"><\/script>
                    </head>
                    <body>
                      ${this.tasks[index].html}
                      <script>
                          ${this.tasks[index].js}
                      <\/script>
                    </body>
                  </html>
                `;
            iframe2.srcdoc = documentContent;
          } else {
            console.error("Iframe reference is undefined");
          }
        }, 800);
      }
    },
    accept() {
      this.stopTimer();
      this.startTimer();
      this.NowState = 2;
      if (this.tasks[this.focusTaskIndex].state == 0) {
        let task = {
          state: 1,
          taskId: this.tasks[this.focusTaskIndex].taskId,
        };
        var storedToken = localStorage.getItem("token");
        const { id } = jwtDecode(storedToken);
        this.$axios
          .patch(`/task/state/${id}`, task, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            this.$swal
              .fire({
                title: "接受成功",
                text: "進入第二步,接下來會出現,教材簡報與本次任務目標,請仔細閱讀",
                icon: "success",
              })
              .then(() => {
                this.tasks[this.focusTaskIndex].state = 1;
                this.$refs.practice.style.cssText =
                  "left: -50%; top: 50%; opacity: 0;";
                setTimeout(() => {
                  this.$refs.practice.style.cssText =
                    "left: 150%; top: 50%; opacity: 0; ";
                  this.$refs.practiceIframeCard.classList.add("d-none");
                  this.$refs.taskInformation.classList.remove("d-none");
                }, 400);
                setTimeout(() => {
                  this.$refs.practice.style.cssText =
                    "left: 50%; top: 50%; opacity: 1; transition: all 0.5s ease-in-out;";
                }, 800);
                this.$refs.one.style.cssText =
                  "font-size: 15px; z-index: 30;background-color: #9D9D9D;transition: all 0.5s ease-in-out;";
                this.$refs.two.style.cssText =
                  "font-size: 15px; width:30px; background-color: #6C6C6C; color: black;  transition: all 0.5s ease-in-out;";
                setTimeout(() => {
                  document.querySelectorAll(".tr").forEach((tr, index) => {
                    setTimeout(() => {
                      tr.style.cssText =
                        "font-size: 20px;transform: translateX(0);opacity: 1;transition: all 0.5s ease-in-out;";
                    }, 500 * index);
                  });
                }, 1500);
              });
          });
      } else {
        this.$refs.practice.style.cssText = "left: -50%; top: 50%; opacity: 0;";
        setTimeout(() => {
          this.$refs.practice.style.cssText =
            "left: 150%; top: 50%; opacity: 0; ";
          this.$refs.practiceIframeCard.classList.add("d-none");
          this.$refs.taskInformation.classList.remove("d-none");
        }, 400);
        setTimeout(() => {
          this.$refs.practice.style.cssText =
            "left: 50%; top: 50%; opacity: 1; transition: all 0.5s ease-in-out;";
        }, 800);
        this.$refs.one.style.cssText =
          "font-size: 15px; z-index: 30;background-color: #9D9D9D;transition: all 0.5s ease-in-out;";
        this.$refs.two.style.cssText =
          "font-size: 15px; width:30px; background-color: #6C6C6C; color: black;  transition: all 0.5s ease-in-out;";
        setTimeout(() => {
          document.querySelectorAll(".tr").forEach((tr, index) => {
            setTimeout(() => {
              tr.style.cssText =
                "font-size: 20px;transform: translateX(0);opacity: 1;transition: all 0.5s ease-in-out;";
            }, 500 * index);
          });
        }, 1500);
      }
    },
    formulate() {
      this.stopTimer();
      setTimeout(() => {
        this.startTimer();
        this.NowState = 3;
      }, 0);
      if (this.tasks[this.focusTaskIndex].state == 1) {
        let task = {
          state: 2,
          taskId: this.tasks[this.focusTaskIndex].taskId,
        };
        var storedToken = localStorage.getItem("token");
        const { id } = jwtDecode(storedToken);
        this.$axios
          .patch(`/task/state/${id}`, task, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            this.$swal
              .fire({
                title: "完成第二步",
                text: "進入第三步,接下來會出現幾個小任務,請制定完成順序並寫下如何完成的策略",
                icon: "success",
              })
              .then(() => {
                this.tasks[this.focusTaskIndex].state = 2;
                this.$refs.practice.style.cssText =
                  "left: -50%; top: 50%; opacity: 0;";
                setTimeout(() => {
                  this.$refs.practice.style.cssText =
                    "left: 150%; top: 50%; opacity: 0; ";
                  this.$refs.taskInformation.classList.add("d-none");
                  this.$refs.formulate.classList.remove("d-none");
                }, 400);
                setTimeout(() => {
                  this.$refs.practice.style.cssText =
                    "left: 50%; top: 50%; opacity: 1; transition: all 0.5s ease-in-out;";
                }, 800);
                this.$refs.two.style.cssText =
                  "font-size: 15px; z-index: 30 ;background-color: #9D9D9D;transition: all 0.5s ease-in-out;";
                this.$refs.three.style.cssText =
                  "font-size: 15px; width:30px; background-color: #6C6C6C; color: black;  transition: all 0.5s ease-in-out;";
                setTimeout(() => {
                  document.querySelectorAll(".ts").forEach((tr, index) => {
                    setTimeout(() => {
                      tr.style.cssText =
                        "transform: translateX(0);opacity: 1;transition: all 0.5s ease-in-out;";
                    }, 500 * index);
                  });
                }, 1500);
              });
          });
      } else {
        this.$refs.practice.style.cssText = "left: -50%; top: 50%; opacity: 0;";
        setTimeout(() => {
          this.$refs.practice.style.cssText =
            "left: 150%; top: 50%; opacity: 0; ";
          this.$refs.taskInformation.classList.add("d-none");
          this.$refs.formulate.classList.remove("d-none");
        }, 400);
        setTimeout(() => {
          this.$refs.practice.style.cssText =
            "left: 50%; top: 50%; opacity: 1; transition: all 0.5s ease-in-out;";
        }, 800);
        this.$refs.two.style.cssText =
          "font-size: 15px; z-index: 30 ;background-color: #9D9D9D;transition: all 0.5s ease-in-out;";
        this.$refs.three.style.cssText =
          "font-size: 15px; width:30px; background-color: #6C6C6C; color: black;  transition: all 0.5s ease-in-out;";
        setTimeout(() => {
          document.querySelectorAll(".ts").forEach((tr, index) => {
            setTimeout(() => {
              tr.style.cssText =
                "transform: translateX(0);opacity: 1;transition: all 0.5s ease-in-out;";
            }, 500 * index);
          });
        }, 1500);
      }
    },
    beginTodo() {
      if (this.tasks[this.focusTaskIndex].state == 2) {
        if (this.tasks[this.focusTaskIndex].order.length != 0) {
          let task = {
            state: 3,
            order: this.tasks[this.focusTaskIndex].order,
            taskId: this.tasks[this.focusTaskIndex].taskId,
          };
          var storedToken = localStorage.getItem("token");
          const { id } = jwtDecode(storedToken);
          this.$axios
            .patch(`/task/state/${id}`, task, {
              headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              this.$swal
                .fire({
                  title: "完成第三步",
                  text: "進入第四步,接下來開始實作,請至『編輯器』撰寫程式碼,並回答本次的任務問題",
                  icon: "success",
                })
                .then(() => {
                  this.stopTimer(); // 停止當前計時器
                  setTimeout(() => {
                    this.startTimer(); // 啟動新的計時器
                    this.NowState = 4;
                  }, 0);
                  this.tasks[this.focusTaskIndex].state = 3;
                  this.orderIndex = null;
                  this.$refs.practice.style.cssText =
                    "left: -50%; top: 50%; opacity: 0;";
                  this.restart();
                  this.$refs.three.style.cssText =
                    "font-size: 15px; z-index:30; background-color: #9D9D9D;transition: all 0.5s ease-in-out;";
                  this.$refs.four.style.cssText =
                    "font-size: 15px; background-color: #6C6C6C; color: black; transition: all 0.5s ease-in-out;";
                  setTimeout(() => {
                    this.$refs.practice.style.cssText =
                      "left: 150%; top: 50%; opacity: 0; ";
                    this.$refs.formulate.classList.add("d-none");
                    this.$refs.todo.classList.remove("d-none");
                  }, 400);
                  setTimeout(() => {
                    this.$refs.practice.style.cssText =
                      "left: 50%; top: 50%; opacity: 1; transition: all 0.5s ease-in-out;";
                  }, 800);
                });
            });
        } else {
          this.$swal.fire({
            title: "有東西未填寫",
            text: "請先確認引導順序 與 策略",
            icon: "error",
          });
        }
      } else {
        let task = {
          order: this.tasks[this.focusTaskIndex].order,
          taskId: this.tasks[this.focusTaskIndex].taskId,
        };
        var storedToken = localStorage.getItem("token");
        const { id } = jwtDecode(storedToken);
        this.$axios
          .patch(`/task/state/${id}`, task, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            this.stopTimer(); // 停止當前計時器

            setTimeout(() => {
              this.startTimer(); // 啟動新的計時器
              this.NowState = 4;
            }, 0);
            this.orderIndex = null;
            this.$refs.practice.style.cssText =
              "left: -50%; top: 50%; opacity: 0;";
            this.$refs.three.style.cssText =
              "font-size: 15px; z-index:30;background-color: #9D9D9D; transition: all 0.5s ease-in-out;";
            this.$refs.four.style.cssText =
              "font-size: 15px; background-color: #6C6C6C; color: black; transition: all 0.5s ease-in-out;";
            this.restart();
            setTimeout(() => {
              this.$refs.practice.style.cssText =
                "left: 150%; top: 50%; opacity: 0; ";
              this.$refs.formulate.classList.add("d-none");
              this.$refs.todo.classList.remove("d-none");
            }, 400);
            setTimeout(() => {
              this.$refs.practice.style.cssText =
                "left: 50%; top: 50%; opacity: 1; transition: all 0.5s ease-in-out;";
            }, 800);
          });
      }
    },
    finishTask() {
      this.tasks[this.focusTaskIndex].order.forEach((item) => {
        item.state = 1;
      });
      if (
        this.tasks[this.focusTaskIndex].state == 3 &&
        this.tasks[this.focusTaskIndex].target.length != 0
      ) {
        let task = {
          html: this.htmlCode,
          css: this.cssCode,
          js: this.jsCode,
          order: this.tasks[this.focusTaskIndex].order,
          taskId: this.tasks[this.focusTaskIndex].taskId,
        };
        var storedToken = localStorage.getItem("token");
        const { id } = jwtDecode(storedToken);
        this.$axios
          .patch(`/task/state/${id}`, task, {
            headers: {
              Authorization: `Bearer ${storedToken}`,
              "Content-Type": "application/json",
            },
          })
          .then((response) => {
            this.$swal
              .fire({
                title: "完成",
                text: "繼續完成子任務",
                icon: "success",
              })
              .then(() => {
                this.stopTimer(); // 停止當前計時器
                setTimeout(() => {
                  this.startTimer(); // 啟動新的計時器
                  this.NowState = 5;
                }, 0);
                this.$refs.practice.style.cssText =
                  "left: 150%; top: 50%; opacity: 0;";
                setTimeout(() => {
                  this.$refs.practice.style.cssText =
                    "left: -50%; top: 50%; opacity: 0; ";
                  this.$refs.formulate.classList.remove("d-none");
                  this.$refs.todo.classList.add("d-none");
                }, 400);
                this.$refs.four.style.cssText =
                  "font-size: 15px; z-index:30;background-color: #9D9D9D; transition: all 0.5s ease-in-out;";
                this.$refs.three.style.cssText =
                  "font-size: 15px;  background-color:#6C6C6C; color: black;   transition: all 0.5s ease-in-out;";
                setTimeout(() => {
                  this.$refs.practice.style.cssText =
                    "left: 50%; top: 50%; opacity: 1; transition: all 0.5s ease-in-out;";
                }, 800);
              });
          });
      } else {
        if (this.tasks[this.focusTaskIndex].state == 4) {
          this.stopTimer(); // 停止當前計時器
          setTimeout(() => {
            this.startTimer(); // 啟動新的計時器
            this.NowState = 5;
          }, 0);
          this.$refs.practice.style.cssText =
            "left: -50%; top: 50%; opacity: 0;";
          setTimeout(() => {
            this.$refs.practice.style.cssText =
              "left: 150%; top: 50%; opacity: 0; ";
            this.$refs.todo.classList.add("d-none");
            this.$refs.finish.classList.remove("d-none");
          }, 400);
          this.$refs.four.style.cssText =
            "font-size: 15px; z-index:30;background-color: #9D9D9D; transition: all 0.5s ease-in-out;";
          this.$refs.five.style.cssText =
            "font-size: 15px;  background-color: #6C6C6C; color: black; transition: all 0.5s ease-in-out;";
          setTimeout(() => {
            this.$refs.practice.style.cssText =
              "left: 50%; top: 50%; opacity: 1; transition: all 0.5s ease-in-out;";
          }, 800);
        } else {
          if (
            this.tasks[this.focusTaskIndex].answer.length ==
            this.tasks[this.focusTaskIndex].question.length
          ) {
            let task = {
              state: 4,
              answer: this.tasks[this.focusTaskIndex].answer,
              taskId: this.tasks[this.focusTaskIndex].taskId,
            };
            var storedToken = localStorage.getItem("token");
            const { id } = jwtDecode(storedToken);
            this.$axios
              .patch(`/task/state/${id}`, task, {
                headers: {
                  Authorization: `Bearer ${storedToken}`,
                  "Content-Type": "application/json",
                },
              })
              .then((response) => {
                this.$swal
                  .fire({
                    title: "完成第四步",
                    text: "進入第五步,接下來寫下五個問題,不能空白",
                    icon: "success",
                  })
                  .then(() => {
                    this.stopTimer(); // 停止當前計時器
                    setTimeout(() => {
                      this.startTimer(); // 啟動新的計時器
                      this.NowState = 5;
                    }, 0);
                    this.tasks[this.focusTaskIndex].state = 4;
                    this.$refs.practice.style.cssText =
                      "left: -50%; top: 50%; opacity: 0;";
                    setTimeout(() => {
                      this.$refs.practice.style.cssText =
                        "left: 150%; top: 50%; opacity: 0; ";
                      this.$refs.todo.classList.add("d-none");
                      this.$refs.finish.classList.remove("d-none");
                    }, 400);
                    this.$refs.four.style.cssText =
                      "font-size: 15px; z-index:30;background-color: #9D9D9D; transition: all 0.5s ease-in-out;";
                    this.$refs.five.style.cssText =
                      "font-size: 15px; border: 2px solid white; background-color: #6C6C6C; color: black; transition: all 0.5s ease-in-out;";
                    setTimeout(() => {
                      this.$refs.practice.style.cssText =
                        "left: 50%; top: 50%; opacity: 1; transition: all 0.5s ease-in-out;";
                    }, 800);
                  });
              });
          } else {
            this.$swal.fire({
              title: "有東西未填寫",
              text: "每個問題都要回答",
              icon: "error",
            });
          }
        }
      }
    },
    sendFinish() {
      if (this.tasks[this.focusTaskIndex].state == 4) {
        if (
          this.tasks[this.focusTaskIndex].thought.every((item) => item !== "")
        ) {
          this.stopTimer();
          let task = {
            state: 5,
            thoughts: this.tasks[this.focusTaskIndex].thought,
            taskId: this.tasks[this.focusTaskIndex].taskId,
          };
          var storedToken = localStorage.getItem("token");
          const { id } = jwtDecode(storedToken);
          this.$axios
            .patch(`/task/state/${id}`, task, {
              headers: {
                Authorization: `Bearer ${storedToken}`,
                "Content-Type": "application/json",
              },
            })
            .then((response) => {
              this.$swal
                .fire({
                  title: "恭喜任務完成",
                  text: "返回任務欄等待老師評分",
                  icon: "success",
                })
                .then(() => {
                  this.tasks[this.focusTaskIndex].state = 5;
                  this.$refs.practice.style.cssText =
                    "left: 150%; top: 50%; opacity: 0;";
                  setTimeout(() => {
                    this.$refs.practice.style.cssText =
                      "left: -50%; top: 50%; opacity: 0; ";
                    this.$refs.practiceCard.classList.remove("d-none");
                    this.$refs.finish.classList.add("d-none");
                    this.$refs.nav.classList.add("d-none");
                  }, 400);
                  setTimeout(() => {
                    this.$refs.practice.style.cssText =
                      "left: 50%; top: 50%; opacity: 1; transition: all 0.5s ease-in-out;";
                    this.$refs.two.style.cssText =
                      "font-size: 15px; z-index:30; transition: all 0.5s ease-in-out;";
                    this.$refs.five.style.cssText =
                      "font-size: 15px; z-index:30; transition: all 0.5s ease-in-out;";
                    this.focusTaskIndex = null;
                  }, 800);
                });
            });
        } else {
          this.$swal.fire({
            title: "有東西未填寫",
            text: "每個問題都要回答",
            icon: "error",
          });
        }
      } else {
        this.$refs.practice.style.cssText = "left: 150%; top: 50%; opacity: 0;";
        setTimeout(() => {
          this.$refs.practice.style.cssText =
            "left: -50%; top: 50%; opacity: 0; ";
          this.$refs.practiceCard.classList.remove("d-none");
          this.$refs.finish.classList.add("d-none");
          this.$refs.nav.classList.add("d-none");
        }, 400);
        setTimeout(() => {
          this.$refs.practice.style.cssText =
            "left: 50%; top: 50%; opacity: 1; transition: all 0.5s ease-in-out;";
          this.$refs.two.style.cssText =
            "font-size: 15px; z-index:30;  transition: all 0.5s ease-in-out;";
          this.$refs.five.style.cssText =
            "font-size: 15px; z-index:30;  transition: all 0.5s ease-in-out;";
          this.focusTaskIndex = null;
        }, 800);
      }
    },
    changeFocus(index) {
      this.orderIndex = null;
      this.NowState = index;
      if (index == 1) {
        this.$refs.practice.style.cssText = "left: -50%; top: 50%; opacity: 0;";
        setTimeout(() => {
          this.$refs.practice.style.cssText =
            "left: 150%; top: 50%; opacity: 0; ";
          this.$refs.practiceIframeCard.classList.remove("d-none");
          this.$refs.taskInformation.classList.add("d-none");
          this.$refs.formulate.classList.add("d-none");
          this.$refs.todo.classList.add("d-none");
          this.$refs.finish.classList.add("d-none");
        }, 400);
        setTimeout(() => {
          this.$refs.practice.style.cssText =
            "left: 50%; top: 50%; opacity: 1; transition: all 0.5s ease-in-out;";
        }, 800);
      } else if (index == 2) {
        this.$refs.practice.style.cssText = "left: -50%; top: 50%; opacity: 0;";
        setTimeout(() => {
          this.$refs.practice.style.cssText =
            "left: 150%; top: 50%; opacity: 0; ";
          this.$refs.practiceIframeCard.classList.add("d-none");
          this.$refs.taskInformation.classList.remove("d-none");
          this.$refs.formulate.classList.add("d-none");
          this.$refs.todo.classList.add("d-none");
          this.$refs.finish.classList.add("d-none");
        }, 400);
        setTimeout(() => {
          this.$refs.practice.style.cssText =
            "left: 50%; top: 50%; opacity: 1; transition: all 0.5s ease-in-out;";
        }, 800);
      } else if (index == 3) {
        this.$refs.practice.style.cssText = "left: -50%; top: 50%; opacity: 0;";
        setTimeout(() => {
          this.$refs.practice.style.cssText =
            "left: 150%; top: 50%; opacity: 0; ";
          this.$refs.practiceIframeCard.classList.add("d-none");
          this.$refs.taskInformation.classList.add("d-none");
          this.$refs.formulate.classList.remove("d-none");
          this.$refs.todo.classList.add("d-none");
          this.$refs.finish.classList.add("d-none");
        }, 400);
        setTimeout(() => {
          this.$refs.practice.style.cssText =
            "left: 50%; top: 50%; opacity: 1; transition: all 0.5s ease-in-out;";
        }, 800);
      } else if (index == 4) {
        this.$refs.practice.style.cssText = "left: -50%; top: 50%; opacity: 0;";
        setTimeout(() => {
          this.$refs.practice.style.cssText =
            "left: 150%; top: 50%; opacity: 0; ";
          this.$refs.practiceIframeCard.classList.add("d-none");
          this.$refs.taskInformation.classList.add("d-none");
          this.$refs.formulate.classList.add("d-none");
          this.$refs.todo.classList.remove("d-none");
          this.$refs.finish.classList.add("d-none");
        }, 400);
        setTimeout(() => {
          this.$refs.practice.style.cssText =
            "left: 50%; top: 50%; opacity: 1; transition: all 0.5s ease-in-out;";
        }, 800);
      } else if (index == 5) {
        this.$refs.practice.style.cssText = "left: -50%; top: 50%; opacity: 0;";
        setTimeout(() => {
          this.$refs.practice.style.cssText =
            "left: 150%; top: 50%; opacity: 0; ";
          this.$refs.practiceIframeCard.classList.add("d-none");
          this.$refs.taskInformation.classList.add("d-none");
          this.$refs.formulate.classList.add("d-none");
          this.$refs.todo.classList.add("d-none");
          this.$refs.finish.classList.remove("d-none");
        }, 400);
        setTimeout(() => {
          this.$refs.practice.style.cssText =
            "left: 50%; top: 50%; opacity: 1; transition: all 0.5s ease-in-out;";
        }, 800);
      }
    },
    backTask() {
      this.stopTimer();
      this.orderIndex = null;
      this.NowState = 0;
      this.$refs.practice.style.cssText = "left: 150%; top: 50%; opacity: 0;";
      setTimeout(() => {
        this.$refs.practice.style.cssText =
          "left: -50%; top: 50%; opacity: 0; ";
        this.$refs.practiceCard.classList.remove("d-none");
        this.$refs.taskInformation.classList.add("d-none");
        this.$refs.practiceIframeCard.classList.add("d-none");
        this.$refs.formulate.classList.add("d-none");
        this.$refs.todo.classList.add("d-none");
        this.$refs.nav.classList.add("d-none");
      }, 400);
      setTimeout(() => {
        this.$refs.practice.style.cssText =
          "left: 50%; top: 50%; opacity: 1; transition: all 0.5s ease-in-out;";
        this.$refs.one.style.cssText =
          "font-size: 15px; z-index:30;  transition: all 0.5s ease-in-out;";
        this.$refs.two.style.cssText =
          "font-size: 15px; z-index:30;  transition: all 0.5s ease-in-out;";
        this.$refs.five.style.cssText =
          "font-size: 15px; z-index:30;  transition: all 0.5s ease-in-out;";
        this.$refs.three.style.cssText =
          "font-size: 15px; z-index:30;  transition: all 0.5s ease-in-out;";
        this.$refs.four.style.cssText =
          "font-size: 15px; z-index:30;  transition: all 0.5s ease-in-out;";
        this.focusTaskIndex = null;
      }, 800);
    },

    getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
    },
    saveButton() {
      let storedToken = localStorage.getItem("token");
      const { id } = jwtDecode(storedToken);
      let code = {
        html: this.htmlCode,
        css: this.cssCode,
        js: this.jsCode,
        user: id,
      };
      if (this.time > 0) {
        this.action.push({
          action: "存程式碼",
          timestamp: new Date()
            .toLocaleString("zh-TW", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })
            .replace(/\//g, "-")
            .replace(",", ""),
        });
      }
      this.isActionPushed = false;
      this.$axios
        .post("/code", code, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.$swal.fire({
            title: "儲存成功",
            text: "已成功儲存",
            icon: "success",
          });
        })
        .catch((error) => {
          console.error(error);
          this.$swal.fire({
            title: "儲存失敗",
            text: "儲存時發生錯誤",
            icon: "error",
          });
        });
    },
    openLog() {
      this.isOpenLog = !this.isOpenLog;
      if (this.time > 0) {
        if (this.isOpenLog) {
          this.action.push({
            action: "關閉程式碼紀錄",
            timestamp: new Date()
              .toLocaleString("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
              .replace(/\//g, "-")
              .replace(",", ""),
          });
          this.isActionPushed = false;
        } else {
          this.action.push({
            action: "打開程式碼紀錄",
            timestamp: new Date()
              .toLocaleString("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
              .replace(/\//g, "-")
              .replace(",", ""),
          });
          this.isActionPushed = false;
        }
      }
    },
    openTest() {
      this.isTest = !this.isTest;
      this.$refs.html.classList.add("text-close");
      this.$refs.css.classList.add("text-close");
      this.$refs.iframe.classList.add("text-close");
      this.$refs.js.classList.add("text-close");
      this.$refs.html.classList.remove("text");
      this.$refs.css.classList.remove("text");
      this.$refs.iframe.classList.remove("text");
      this.$refs.js.classList.remove("text");
      this.$refs.chat.disabled = true;
      this.$refs.log.disabled = true;
      this.$refs.run.disabled = true;
      this.$refs.save.disabled = true;
      this.$refs.tip.disabled = true;
      if (this.time > 0) {
        if (this.isTest) {
          this.action.push({
            action: "關閉考試視窗",
            timestamp: new Date()
              .toLocaleString("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
              .replace(/\//g, "-")
              .replace(",", ""),
          });
          this.isActionPushed = false;
          this.$refs.chat.disabled = false;
          this.$refs.log.disabled = false;
          this.$refs.run.disabled = false;
          this.$refs.save.disabled = false;
          this.$refs.tip.disabled = false;
        } else {
          this.action.push({
            action: "打開考試視窗",
            timestamp: new Date()
              .toLocaleString("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
              .replace(/\//g, "-")
              .replace(",", ""),
          });
          this.isActionPushed = false;
        }
      }
    },
    handleGoToDemo(code) {
      this.htmlEditor.setValue(code.html);
      this.cssEditor.setValue(code.css);
      this.jsEditor.setValue(code.js);
      this.htmlCode = code.html;
      this.cssCode = code.css;
      this.jsCode = code.js;
      this.isOpenLog = true;
      this.updateOutput();
    },
    checkExam(exam) {
      this.exam = exam;
    },
    checkFinishExam(exam) {
      this.isFinishExam = exam;
    },
    getAnswer(answer) {
      if (answer == 0) {
        return "A";
      } else if (answer == 1) {
        return "B";
      } else if (answer == 2) {
        return "C";
      } else if (answer == 3) {
        return "D";
      } else if (answer == 4) {
        return "E";
      } else if (answer == 5) {
        return "F";
      } else if (answer == 6) {
        return "G";
      } else if (answer == null) {
        return "未作答";
      } else {
        return answer;
      }
    },
    finishExam() {
      let storedToken = localStorage.getItem("token");
      const { id } = jwtDecode(storedToken);
      let exam = {
        examId: this.exam.examId,
        finishTime: new Date()
          .toLocaleString("zh-TW", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          })
          .replace(/\//g, "-")
          .replace(",", ""),
        answer: this.exam.examQues.questions.map((ques) => {
          return ques.answer;
        }),
        state: 1,
      };

      this.$axios
        .patch(`/auth/student/examTicket/${id}`, exam, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          this.$swal
            .fire({
              title: "交卷成功",
              text: "已成功交卷",
              icon: "success",
            })
            .then(() => {
              window.location.reload();
            });
        })
        .catch((error) => {
          console.error(error);
          console.log(exam);
          this.$swal.fire({
            title: "交卷失敗",
            text: error,
            icon: "error",
          });
        });
    },
    restart() {
      this.htmlEditor.setValue(
        `<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>Document</title>\n</head>\n<body>\n\t\n</body>\n</html>\n`
      );
      this.cssEditor.setValue(``);
      this.jsEditor.setValue(``);
      this.htmlCode = `<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<title>Document</title>\n</head>\n<body>\n\t\n</body>\n</html>\n`;
      this.cssCode = ``;
      this.jsCode = ``;
      this.updateOutput();
      this.$swal.fire({
        title: "重置成功",
        text: "已成功重置",
        icon: "success",
      });
    },
    firstLogin() {
      if (localStorage.getItem("loginNumber") == 0) {
        function animateElement(
          id,
          delay,
          fontSize,
          width = "",
          extraStyles = ""
        ) {
          setTimeout(() => {
            const element = document.getElementById(id);
            element.style.cssText = `transform: translateX(0); transition: all 0.3s ease;  font-size: ${fontSize}; top: ${
              element.style.top
            }; ${width ? `width: ${width};` : ""} ${extraStyles}`;
          }, delay);
        }

        function goBack(id, delay, fontSize, width = "", extraClass) {
          setTimeout(() => {
            const element = document.getElementById(id);
            element.style.cssText = `font-size: ${fontSize};  top: ${
              element.style.top
            }; ${width ? `width: ${width};` : ""}`;
            element.classList.add(extraClass);
          }, delay);
        }

        function changeText(content, delay) {
          setTimeout(() => {
            const text = output.contentWindow.document.getElementById("text");
            text.style.cssText = "transition: all 0.3s ease; opacity: 0;";
            setTimeout(() => {
              text.style.opacity = "1";
              text.innerHTML = content;
            }, 300);
          }, delay);
        }

        document.getElementById("output").onload = function () {
          this.contentWindow.document.getElementById(
            "demo-canvas"
          ).style.cssText =
            "backdrop-filter:blur(8px); -webkit-backdrop-filter:blur(8px);background:rgba(255, 255, 255, 0.37);";

          const messages = [
            "大家好 歡迎第一次登陸這個編譯網站<br>現在開始我要慢慢介紹功能按鈕",
            "這是撰寫HTML的地方 點擊後會出現編輯器",
            "這是撰寫CSS的地方 點擊後會出現編輯器",
            "這是JavaScript的地方 點擊後會出現編輯器",
            "這是跑程式碼的地方 點擊後會出現程式碼結果",
            "這是儲存的地方 可以按下crtl+s快速儲存代碼",
            "這是清空代碼的地方 點擊後會清空所有代碼",
            "這是任務欄的地方 點擊後會出現任務卡片",
            "這是聊天室的地方 點擊可以打開聊天室<br>與gpt機器人交流",
            "這是程式碼紀錄的地方 可以查看自己的程式碼紀錄<br>點擊Demo可以還原程式碼",
            "這是考試視窗的地方 可以進行考試",
            "歡迎 來到編譯網站",
            "準備好開始學習",
          ];

          messages.forEach((message, index) =>
            changeText(message, index * 4000)
          );
        };

        const elements = [
          { id: "html", delay: 4500, fontSize: "50px", class: "toggle-btn" },
          { id: "css", delay: 8500, fontSize: "50px", class: "toggle-btn" },
          { id: "js", delay: 12500, fontSize: "50px", class: "toggle-btnJS" },
          { id: "code", delay: 16500, fontSize: "23px", class: "toggle-btn" },
          { id: "save", delay: 20500, fontSize: "23px", class: "toggle-btn" },
          {
            id: "restart",
            delay: 24500,
            fontSize: "50px",
            class: "toggle-btn",
          },
          {
            id: "practice",
            delay: 28500,
            fontSize: "50px",
            class: "toggle-btn",
          },
          {
            id: "chatbot",
            delay: 32500,
            fontSize: "large",
            width: "40px",
            class: "toggle-chat-btn",
          },
          {
            id: "log",
            delay: 36500,
            fontSize: "large",
            width: "40px",
            class: "toggle-chat-btn",
          },
          {
            id: "test",
            delay: 40500,
            fontSize: "large",
            width: "40px",
            class: "toggle-chat-btn",
          },
          // { id: 'document', delay: 44500, fontSize: 'large', width: '40px', class: 'toggle-chat-btn' }
        ];

        elements.forEach((element) => {
          animateElement(
            element.id,
            element.delay,
            element.fontSize,
            element.width ? `width: ${element.width};` : ""
          );
          goBack(
            element.id,
            element.delay + 3000,
            element.fontSize,
            element.class
          );
        });

        const buttons = [
          "html",
          "css",
          "js",
          "restart",
          "practice",
          "code",
          "save",
          "chatbot",
          "log",
          "test",
        ];
        buttons.forEach((id) => (document.getElementById(id).disabled = true));

        setTimeout(() => {
          localStorage.setItem("loginNumber", 1);
          window.location.reload();
        }, 54000);
      } else {
        return;
      }
    },
    closeSocket() {
      var storedToken = localStorage.getItem("token");
      const { studentID } = jwtDecode(storedToken);
      const userClose = JSON.stringify({ type: "close", userId: studentID });
      this.socket.send(userClose);
      this.socket.close();
    },
    SignOut() {
      this.closeSocket();
      localStorage.removeItem("token");
      localStorage.removeItem("identity");
      localStorage.removeItem("loginNumber");
      window.location.href = "/";
    },
    getTask() {
      var storedToken = localStorage.getItem("token");
      const { id } = jwtDecode(storedToken);
      this.$axios
        .get(`/task/student/${id}`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          let tasks = [];
          response.data.data.forEach((element) => {
            let task = {
              title: element.taskId.title,
              target: element.taskId.guide,
              guide: element.taskId.target,
              question: element.taskId.question,
              ppt: element.taskId.ppt,
              html: element.taskId.html,
              css: element.taskId.css,
              js: element.taskId.js,
              taskId: element.taskId._id,

              state: element.state,
              answer: element.answer,
              order: element.order ? element.order : [],
              teacherTalk: element.teacherTalk,
              thought: element.thought ? element.thought : [[], "", "", "", ""],
              finishTime: element.finishTime,
            };
            tasks.push(task);
          });
          this.tasks = tasks;
        });
    },
    add() {
      this.tasks[this.focusTaskIndex].order[this.orderIndex].strategy.push("");
    },
    remove(index) {
      this.tasks[this.focusTaskIndex].order[this.orderIndex].strategy.splice(
        index,
        1
      );
    },
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide -= 1;
      }
    },
    nextSlide() {
      if (this.currentSlide < this.tasks[this.focusTaskIndex].ppt.length - 1) {
        this.currentSlide += 1;
      }
    },
    selectOrder(index) {
      this.orderIndex = index;
    },
    addOrder(option, index) {
      this.tasks[this.focusTaskIndex].order.push({
        taskName: option,
        state: 0,
        strategy: [],
      });
      this.tasks[this.focusTaskIndex].target.splice(index, 1);
    },
    removeOrder(option, index) {
      this.orderIndex = null;
      this.tasks[this.focusTaskIndex].target.push(option.taskName);
      this.tasks[this.focusTaskIndex].order.splice(index, 1);
      this.$forceUpdate();
      this.$nextTick(() => {
        document.querySelectorAll(".ts").forEach((tr) => {
          tr.style.cssText =
            "font-size: 20px; transform: translateX(0); opacity: 1; transition: all 0.5s ease-in-out;";
        });
      });
    },
    updateThought(index, value) {
      this.tasks[this.focusTaskIndex].thought[0].push(value);
    },
    startTimer() {
      if (!this.timerInterval) {
        this.timerInterval = setInterval(() => {
          this.time++;
        }, 1000);
      }
    },
    stopTimer() {
      let task = {
        finishTime: {
          actions: this.action,
          time: this.time,
          state: this.NowState,
        },
        taskId: this.tasks[this.focusTaskIndex].taskId,
      };
      console.log(task);
      var storedToken = localStorage.getItem("token");
      const { id } = jwtDecode(storedToken);
      this.$axios
        .patch(`/task/state/${id}`, task, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          // clearInterval(this.timerInterval);
          this.timerInterval = null;
          this.time = 0;
        });
    },
    handleActionUpdate(updatedAction) {
      if (this.time > 0) {
        this.action.push(updatedAction);
      }
    },
    handleLogActionUpdate(updatedAction) {
      if (this.time > 0) {
        this.logAction.push(updatedAction);
      }
    },
  },
  mounted() {
    this.firstLogin();
    this.toggleIframe();
    var storedToken = localStorage.getItem("token");
    if (storedToken == null) {
      this.$router.push("/");
    }
    if (this.getCookie("state") == 0) {
      this.$swal({
        title: "目前暫停操作",
        text: "請等待老師指示",
        icon: "warning",
        confirmButtonText: "確定",
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: false,
        stopKeydownPropagation: false,
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        showDenyButton: false,
      });
    }
    ////////////////////////////////////////////////////////////
    document.addEventListener("keydown", (event) => {
      if (
        (event.ctrlKey && event.key === "s") ||
        (event.metaKey && event.key === "s")
      ) {
        event.preventDefault();
        this.saveButton();
      }
      if (
        (event.ctrlKey && event.key === "g") ||
        (event.metaKey && event.key === "g")
      ) {
        event.preventDefault();
        this.runOutput();
      }
    });
    ////////////////////////////////////////////////////////////
    this.$refs.htmlEditorContainer.MonacoEnvironment = {
      getWorkerUrl: (moduleId, label) => {
        return new htmlWorker();
      },
    };
    this.$refs.cssEditorContainer.MonacoEnvironment = {
      getWorkerUrl: (moduleId, label) => {
        return new cssWorker();
      },
    };
    this.$refs.jsEditorContainer.MonacoEnvironment = {
      getWorkerUrl: (moduleId, label) => {
        return new tsWorker();
      },
    };
    // 初始化 HTML 编辑器
    this.htmlEditor = monaco.editor.create(this.$refs.htmlEditorContainer, {
      value: `
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
<body>
      <div id="large-header" class="large-header">
        <canvas id="demo-canvas"></canvas>
            <h1 class="main-title" id="text"></h1>
        </div>
</body>
</html>
        `,
      language: "html",
      theme: "vs-dark",
      fontSize: 17,
      colorDecorators: true,
      automaticLayout: true, // 启用自动布局
      formatOnType: true,
      minimap: {
        enabled: false, // 關閉迷你地圖
      },
    });
    // 监听 HTML 编辑器内容变化
    this.htmlEditor.onDidChangeModelContent(() => {
      if (!this.isActionPushed) {
        this.htmlCode = this.htmlEditor.getValue();
        if (this.time > 0) {
          this.action.push({
            action: "編寫html",
            timestamp: new Date()
              .toLocaleString("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
              .replace(/\//g, "-")
              .replace(",", ""),
          });
        }

        this.isActionPushed = true;
      }
    });
    // 初始化 CSS 编辑器
    this.cssEditor = monaco.editor.create(this.$refs.cssEditorContainer, {
      value:
        "body {\n\tfont-family: Arial, sans-serif;\n\tmargin: 0;\n}\n.large-header {\n\tposition: relative;\n\twidth: 100%;\n\tbackground: #333;\n\toverflow: hidden;\n\tbackground-size: cover;\n\tbackground-position: center center;\n\tz-index: 1;\n}\n#large-header {\n\tbackground-image: url('https://www.marcoguglie.it/Codepen/AnimatedHeaderBg/demo-1/img/demo-1-bg.jpg');\n}\n.main-title {\n\tposition: absolute;\n\tmargin: 0;\n\tpadding: 0;\n\tcolor: #f9f1e9;\n\ttext-align: center;\n\ttop: 50%;\n\tleft: 50%;\n\t-webkit-transform: translate3d(-50%,-50%,0);\n\ttransform: translate3d(-50%,-50%,0);\n}\n.demo-1 .main-title {\n\ttext-transform: uppercase;\n\tfont-size: 4.2em;\n\tletter-spacing: 0.1em;\n}\n.main-title .thin {\n\tfont-weight: 200;\n}\n@media only screen and (max-width : 768px) {\n\t.demo-1 .main-title {\n\t\tfont-size: 3em;\n\t}\n}\nh1 {\n\tmargin-top: 50px;\n\tz-index: 10;\n\ttext-align: center;\n}\n.content{\n\tdisplay: flex;\n\tflex-direction: column;\n\tmargin: 0 0 0 40px;\n}",
      language: "css",
      theme: "vs-dark",
      codeLens: false,
      fontSize: 17,
      colorDecorators: true,
      automaticLayout: true, // 启用自动布局
      formatOnType: true,
      minimap: {
        enabled: false, // 關閉迷你地圖
      },
    });
    // 监听 CSS 编辑器内容变化
    this.cssEditor.onDidChangeModelContent(() => {
      if (!this.isActionPushed) {
        this.cssCode = this.cssEditor.getValue();
        if (this.time > 0) {
          this.action.push({
            action: "編寫css",
            timestamp: new Date()
              .toLocaleString("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
              .replace(/\//g, "-")
              .replace(",", ""),
          });
        }
        this.isActionPushed = true;
      }
    });
    // 初始化 JavaScript 编辑器
    this.jsEditor = monaco.editor.create(this.$refs.jsEditorContainer, {
      value: `
        document.addEventListener('DOMContentLoaded', () => {
            (function() {
                var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;

                // Main
                initHeader();
                initAnimation();
                addListeners();

                function initHeader() {
                    width = window.innerWidth;
                    height = window.innerHeight;
                    target = {x: width/2, y: height/2};

                    largeHeader = document.getElementById('large-header');
                    largeHeader.style.height = height+'px';

                    canvas = document.getElementById('demo-canvas');
                    canvas.width = width;
                    canvas.height = height;
                    ctx = canvas.getContext('2d');

                    // create points
                    points = [];
                    for(var x = 0; x < width; x = x + width/20) {
                        for(var y = 0; y < height; y = y + height/20) {
                            var px = x + Math.random()*width/20;
                            var py = y + Math.random()*height/20;
                            var p = {x: px, originX: px, y: py, originY: py };
                            points.push(p);
                        }
                    }

                    // for each point find the 5 closest points
                    for(var i = 0; i < points.length; i++) {
                        var closest = [];
                        var p1 = points[i];
                        for(var j = 0; j < points.length; j++) {
                            var p2 = points[j];
                            if(!(p1 == p2)) {
                                var placed = false;
                                for(var k = 0; k < 5; k++) {
                                    if(!placed) {
                                        if(closest[k] == undefined) {
                                            closest[k] = p2;
                                            placed = true;
                                        }
                                    }
                                }

                                for(var k = 0; k < 5; k++) {
                                    if(!placed) {
                                        if(getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                            closest[k] = p2;
                                            placed = true;
                                        }
                                    }
                                }
                            }
                        }
                        p1.closest = closest;
                    }

                    // assign a circle to each point
                    for(var i in points) {
                        var c = new Circle(points[i], 2+Math.random()*2, 'rgba(255,255,255,0.3)');
                        points[i].circle = c;
                    }
                }

                // Event handling
                function addListeners() {
                    if(!('ontouchstart' in window)) {
                        window.addEventListener('mousemove', mouseMove);
                    }
                    window.addEventListener('scroll', scrollCheck);
                    window.addEventListener('resize', resize);
                }

                function mouseMove(e) {
                    var posx = posy = 0;
                    if (e.pageX || e.pageY) {
                        posx = e.pageX;
                        posy = e.pageY;
                    } else if (e.clientX || e.clientY) {
                        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
                    }
                    target.x = posx;
                    target.y = posy;
                }

                function scrollCheck() {
                    if(document.body.scrollTop > height) animateHeader = false;
                    else animateHeader = true;
                }

                function resize() {
                    width = window.innerWidth;
                    height = window.innerHeight;
                    largeHeader.style.height = height+'px';
                    canvas.width = width;
                    canvas.height = height;
                }

                // animation
                function initAnimation() {
                    animate();
                    for(var i in points) {
                        shiftPoint(points[i]);
                    }
                }

                function animate() {
                    if(animateHeader) {
                        ctx.clearRect(0,0,width,height);
                        for(var i in points) {
                            // detect points in range
                            if(Math.abs(getDistance(target, points[i])) < 4000) {
                                points[i].active = 0.3;
                                points[i].circle.active = 0.6;
                            } else if(Math.abs(getDistance(target, points[i])) < 20000) {
                                points[i].active = 0.1;
                                points[i].circle.active = 0.3;
                            } else if(Math.abs(getDistance(target, points[i])) < 40000) {
                                points[i].active = 0.02;
                                points[i].circle.active = 0.1;
                            } else {
                                points[i].active = 0;
                                points[i].circle.active = 0;
                            }

                            drawLines(points[i]);
                            points[i].circle.draw();
                        }
                    }
                    requestAnimationFrame(animate);
                }

                function shiftPoint(p) {
                    gsap.to(p, {duration: 1 + Math.random(), x: p.originX - 50 + Math.random() * 100, y: p.originY - 50 + Math.random() * 100, ease: "power1.inOut", onComplete: function() {
                        shiftPoint(p);
                    }});
                }

                // Canvas manipulation
                function drawLines(p) {
                    if(!p.active) return;
                    for(var i in p.closest) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p.closest[i].x, p.closest[i].y);
                        ctx.strokeStyle = 'rgba(156,217,249,'+ p.active+')';
                        ctx.stroke();
                    }
                }

                function Circle(pos,rad,color) {
                    var _this = this;

                    // constructor
                    (function() {
                        _this.pos = pos || null;
                        _this.radius = rad || null;
                        _this.color = color || null;
                    })();

                    this.draw = function() {
                        if(!_this.active) return;
                        ctx.beginPath();
                        ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
                        ctx.fillStyle = 'rgba(156,217,249,'+ _this.active+')';
                        ctx.fill();
                    };
                }

                // Util
                function getDistance(p1, p2) {
                    return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
                }
            })();
        });
        `,
      language: "javascript",
      theme: "vs-dark",
      automaticLayout: true, // 启用自动布局
      formatOnType: true,
      fontSize: 17,
      minimap: {
        enabled: false, // 關閉迷你地圖
      },
    });
    // 监听 JavaScript 编辑器内容变化
    this.jsEditor.onDidChangeModelContent(() => {
      this.jsCode = this.jsEditor.getValue();

      // function captureConsoleOutput() {
      //   const originalLog = console.log;
      //   const consoleOutput = document.getElementById("console-output");

      //   console.log = function (message) {
      //     consoleOutput.innerHTML += `<div>${message}</div>`;
      //     originalLog.apply(console, arguments);
      //   };

      //   return function resetConsole() {
      //     console.log = originalLog;
      //   };
      // }

      // const consoleOutput = document.getElementById("console-output");
      // consoleOutput.innerHTML = "";
      // const resetConsole = captureConsoleOutput();

      // try {
      //   eval(this.jsCode);
      // } catch (e) {}

      // resetConsole();
      if (!this.isActionPushed) {
        if (this.time > 0) {
          this.action.push({
            action: "編寫JavaScript",
            timestamp: new Date()
              .toLocaleString("zh-TW", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
              .replace(/\//g, "-")
              .replace(",", ""),
          });
        }
        this.isActionPushed = true;
      }
    });
    ///////////////////////////////////////////////////////////
    // monaco.languages.html.htmlDefaults.setOptions({
    // suggest: { html5: true },
    // });
    // monaco.languages.css.cssDefaults.setOptions({
    //   validate: true,
    //   lint: {
    //     compatibleVendorPrefixes: 'ignore',
    //     vendorPrefix: 'warning',
    //   },
    // });
    // monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    //   target: monaco.languages.typescript.ScriptTarget.ES6,
    //   allowNonTsExtensions: true,
    // });
    ///////////////////////////////////////////////////////////
    this.htmlCode = this.htmlEditor.getValue();
    this.cssCode = this.cssEditor.getValue();
    this.jsCode = this.jsEditor.getValue();
    this.updateOutput();
    //////////////////////////////////////////////////////////////
    const { id } = jwtDecode(storedToken);
    this.$axios
      .get(`/auth/student/examTicket/${id}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        response.data.data.ExamTicket.forEach((element) => {
          if (element.state == 1) {
            let ticket = {
              examScore: element.score,
              examAns: element.answer,
              examType: element.examId.type == 0 ? "選擇題" : "問答題",
              examName: element.examId.name,
              questionCount: element.examId.HowMany,
              examDifficulty:
                element.examId.difficulty == 0
                  ? "簡單"
                  : element.examId.difficulty == 1
                  ? "普通"
                  : element.examId.difficulty == 2
                  ? "困難"
                  : element.examId.difficulty == 3
                  ? "超難"
                  : element.examId.difficulty == 4
                  ? "地獄"
                  : "未知",
              examFinishTime: element.finishTime,
              examQues: {
                questions: element.examId.question.map((ques, index) => {
                  return {
                    types: ques.types,
                    title: ques.title,
                    options: ques.options,
                    score: ques.score,
                    answer: ques.answer,
                    userAnswer: element.answer[index],
                  };
                }),
              },
            };
            this.finishExams.push(ticket);
          }
          if (element.state == 0) {
            const currentDate = new Date();
            const examDateStr = element.examId.date;
            const examTimeStr = element.examId.time;
            const examDateTimeStr = `${examDateStr}T${examTimeStr}`;
            const examDateTime = new Date(examDateTimeStr);
            if (examDateTime < currentDate) {
              let storedToken = localStorage.getItem("token");
              const { id } = jwtDecode(storedToken);
              let exam = {
                examId: element._id,
                finishTime: new Date()
                  .toLocaleString("zh-TW", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })
                  .replace(/\//g, "-")
                  .replace(",", ""),
                answer: [],
                state: 1,
              };

              this.$axios.patch(`/auth/student/examTicket/${id}`, exam, {
                headers: {
                  Authorization: `Bearer ${storedToken}`,
                  "Content-Type": "application/json",
                },
              });
            } else {
              let ticket = {
                examType: element.examId.type == 0 ? "選擇題" : "問答題",
                examName: element.examId.name,
                questionCount: element.examId.HowMany,
                examDifficulty:
                  element.examId.difficulty == 0
                    ? "簡單"
                    : element.examId.difficulty == 1
                    ? "普通"
                    : element.examId.difficulty == 2
                    ? "困難"
                    : element.examId.difficulty == 3
                    ? "超難"
                    : element.examId.difficulty == 4
                    ? "地獄"
                    : "未知",
                examDate: element.examId.date,
                examTime: element.examId.time,
                examQues: {
                  questions: element.examId.question.map((ques) => {
                    return {
                      types: ques.types,
                      title: ques.title,
                      options: ques.options,
                      score: ques.score,
                    };
                  }),
                  answer: "",
                },
                examId: element._id,
              };
              this.exams.push(ticket);
            }
          }
        });
      });
    this.getTask();
    this.socket = new WebSocket("ws://140.138.147.12:3000");
    this.socket.onopen = () => {
      const { studentID } = jwtDecode(storedToken);
      const userLogin = JSON.stringify({ type: "open", userId: studentID });
      this.socket.send(userLogin);
    };
    this.socket.onmessage = (event) => {
      try {
        if (event.data[0] != "{") return;
        const jsonObject = JSON.parse(event.data);
        const type = jsonObject.type;

        if (type === "practice") {
          this.badgeHtml =
            '<span class="position-absolute translate-middle badge rounded-pill bg-danger" style="left: 90px; top: 10px; font-size: 15px;">!</span>';
          this.getTask();
          var toastElement = document.getElementById("liveToast");
          var toast = new Toast(toastElement);
          toast.show();
        }

        if (type === "stop") {
          this.$cookies.set("state", 0);

          this.$swal({
            title: "目前暫停操作",
            text: "請等待老師指示",
            icon: "warning",
            confirmButtonText: "確定",
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            stopKeydownPropagation: false,
            showCloseButton: false,
            showCancelButton: false,
            showConfirmButton: false,
            showDenyButton: false,
          });
        }

        if (type === "begin") {
          this.$swal.close();
          this.$cookies.set("state", 1);
        }
      } catch (error) {
        console.error("JSON 解析错误:", error);
      }
    };
    this.socket.onclose = () => {};
  },
  beforeUnmount() {
    if (this.htmlEditor) {
      this.htmlEditor.dispose();
    }
    if (this.cssEditor) {
      this.cssEditor.dispose();
    }
    if (this.jsEditor) {
      this.jsEditor.dispose();
    }
  },
  beforeDestroy() {
    this.SignOut();
  },
};
</script>

<style scoped>
#iframe-container {
  width: 100%;
  height: 100%;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.37);
}
iframe {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100vh;
  border: none;
  background-color: #fff;
}
label i {
  margin-left: 10px;
  margin-right: 10px;
}
.main {
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  background-color: #454545;
  color: #fff;
  margin: 0;
  padding: 0;
  transition: transform 0.3s ease;
}
.row {
  width: 100%;
}
.toggle-chat-btn {
  position: fixed;
  right: 0;
  width: 40px;
  z-index: 1000;
  transform: translateX(85%);
  transition: all 0.3s ease;
}
.toggle-chat-btn:hover {
  transform: translateX(0);
  transition: all 0.3s ease;
}
.text {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  transition: all 0.5s ease, opacity 0.5s ease;
  opacity: 1;
}
.text-close {
  flex: 0;
  transition: all 0.5s ease, opacity 0.5s ease;
  opacity: 0;
}
.toggle-btn {
  position: fixed;
  z-index: 1000;
  width: 6%;
  transform: translateX(-85%);
  transition: all 0.5s ease;
}
.toggle-btn:hover {
  transform: translateX(0);
  transition: all 0.3s ease;
}
.chat {
  position: fixed;
  right: 8px;
  top: 0;
  z-index: 999;
  width: 400px;
}
.document {
  position: fixed;
  top: 0;
  z-index: 999;
  padding: 0 30px;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
}
.exam {
  position: fixed;
  top: 0;
  z-index: 999;
  padding: 0 50px;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  background: #fff;
}
.document::-webkit-scrollbar {
  width: 0;
}
.document::-webkit-scrollbar-track {
  background-color: transparent;
}
.text .editor-container {
  width: 100%;
  height: 100vh;
}
.text-close {
  display: none;
}
.exam::-webkit-scrollbar {
  width: 0;
}
.exam::-webkit-scrollbar-track {
  background-color: transparent;
}
.cardBody:hover {
  background-color: #aaaaaa;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.checkbox:hover {
  background-color: #aaaaaa;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
#console-output {
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #f9f9f9;
  color: #454545;
  position: absolute;
  top: calc(
    100vh - 200px
  ); /* Adjust to place it 200px above the bottom of the viewport */
  left: 0;
  right: 0;
  width: 100%;
  height: 200px; /* Adjust this value as needed */
  z-index: 1000;
  overflow: auto; /* Add overflow to make it scrollable if needed */
}
.practice {
  position: fixed;
  z-index: 10;
  left: 50%;
  top: -50%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  width: 95%;
  height: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease;
}
.practiceBtn {
  background-color: #292421;
}
.practiceBtn:hover {
  background-color: #292421;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.icon-text {
  color: #fff;
  font-size: 15px;
  margin-top: -10px;
  padding: 0;
}
@keyframes rotate {
  0%,
  100% {
    transform: translateY(10px);
  }
  50% {
    transform: translateY(20px);
  }
}
@keyframes rainbow {
  0% {
    color: rgb(54, 54, 54);
  }
  50% {
    color: rgb(36, 31, 21);
  }
  100% {
    color: rgb(152, 152, 152);
  }
}
.task-title {
  font-size: 25px;
  animation: rotate 3s linear infinite, rainbow 1s linear infinite;
  display: inline-block;
  transform-style: preserve-3d; /* 保持子元素的3D转换 */
}
@keyframes rotate2 {
  0% {
    opacity: 0;
    transform: rotateY(180deg);
  }
  100% {
    opacity: 1;
    transform: rotateY(0deg);
  }
}
@keyframes rotateBack {
  0% {
    opacity: 0;
    transform: rotateY(180deg);
  }
  100% {
    opacity: 1;
    transform: rotateY(0deg);
  }
}
.order:hover {
  background-color: #aaaaaa;
}
.taskCard:hover {
  transition: all 0.5s ease-in-out;
  cursor: pointer;
}
.card-body {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 50;
  left: 50;
}
.front {
  opacity: 1;
}
.back {
  opacity: 0;
}
.taskCard:hover {
  animation: rotate2 0.5s forwards;
  .back {
    opacity: 1;
  }
  .front {
    opacity: 0;
  }
}
.taskCard:not(:hover) {
  animation: rotateBack 0.5s forwards;
  .back {
    opacity: 0;
  }
  .front {
    opacity: 1;
  }
}
.pdf-container {
  text-align: center;
}

.slides {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.slide img {
  width: 1080px;
  border: 1px solid #ddd;
  padding: 1px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.sidebar:hover {
  background-color: #5b5b5b !important;
}
</style>
