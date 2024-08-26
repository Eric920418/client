<template>
  <div class="mt-2">
    <div class="card shadow-lg mb-5">
      <button
        class="btn btn-danger ms-auto"
        style="width: 50px"
        @click="closeModel"
      >
        X
      </button>
      <table class="table mt-3 table-sm table-hover table-borderless">
        <thead>
          <tr>
            <th
              class="text-center"
              ref="thTime"
              style="width: 170px"
              scope="col"
            >
              時間
              <p class="text-danger m-0"></p>
            </th>
            <th class="text-center" ref="thHtml" scope="col-1">html</th>
            <th class="text-center" ref="thCss" scope="col-1">css</th>
            <th class="text-center" ref="thJs" scope="col-1">js</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(code, index) in code" :key="code._id">
            <th ref="time" scope="row">
              <div class="d-flex flex-column align-items-center">
                <p class="mt-2 text-center">{{ code.createdAt }}</p>
                <button
                  class="btn btn-primary btn-sm"
                  @click="goToDemo(this.beginCode[index])"
                >
                  Demo <i class="fas fa-play"></i>
                </button>
              </div>
            </th>
            <td class="sm" ref="html">
              <pre
                @mouseover="showCode('html')"
                @mouseleave="DontShowCode()"
                v-html="code.html"
              ></pre>
            </td>
            <td class="sm" ref="css">
              <pre
                @mouseover="showCode('css')"
                @mouseleave="DontShowCode()"
                v-html="code.css"
              ></pre>
            </td>
            <td class="sm" ref="js">
              <pre
                @mouseover="showCode('js')"
                @mouseleave="DontShowCode()"
                v-html="code.js"
              ></pre>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { jwtDecode } from "jwt-decode";
export default {
  data() {
    return {
      code: [],
      beginCode: [],
      action: [],
    };
  },
  methods: {
    setCode(code) {
      return `<code class="hljs">${hljs.highlightAuto(code).value}</code>`;
    },
    goToDemo(code) {
      action.pushAction({
        action: `讀取了${code.createdAt}這個時間儲存的程式碼`,
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
      this.action.push(newAction);
      this.$emit("update-action", this.action);
      this.$emit("go-to-demo", code);
    },
    closeModel() {
      this.$emit("close-model");
    },
    showCode(refName) {
      if (refName === "html") {
        this.$refs.html.forEach((el) => (el.style.fontSize = "20px"));
        this.$refs.js.forEach((el) => el.classList.add("d-none"));
        this.$refs.css.forEach((el) => el.classList.add("d-none"));
        this.$refs.time.forEach((el) => el.classList.add("d-none"));

        this.$refs.thTime.classList.add("d-none");
        this.$refs.thCss.classList.add("d-none");
        this.$refs.thJs.classList.add("d-none");
      } else if (refName === "css") {
        this.$refs.css.forEach((el) => (el.style.fontSize = "20px"));
        this.$refs.html.forEach((el) => el.classList.add("d-none"));
        this.$refs.js.forEach((el) => el.classList.add("d-none"));
        this.$refs.time.forEach((el) => el.classList.add("d-none"));

        this.$refs.thTime.classList.add("d-none");
        this.$refs.thHtml.classList.add("d-none");
        this.$refs.thJs.classList.add("d-none");
      } else if (refName === "js") {
        this.$refs.js.forEach((el) => (el.style.fontSize = "13px"));
        this.$refs.html.forEach((el) => el.classList.add("d-none"));
        this.$refs.css.forEach((el) => el.classList.add("d-none"));
        this.$refs.time.forEach((el) => el.classList.add("d-none"));

        this.$refs.thTime.classList.add("d-none");
        this.$refs.thCss.classList.add("d-none");
        this.$refs.thHtml.classList.add("d-none");
      }
    },
    DontShowCode() {
      const allRefs = ["html", "css", "js", "time"];

      this.$refs.thCss.classList.remove("d-none");
      this.$refs.thHtml.classList.remove("d-none");
      this.$refs.thJs.classList.remove("d-none");
      this.$refs.thTime.classList.remove("d-none");

      allRefs.forEach((ref) => {
        const refElements = this.$refs[ref];
        refElements.forEach((el) => el.classList.remove("d-none"));
        refElements.forEach((el) => (el.style.fontSize = "4.375px"));
      });

      this.$refs.time.forEach((el) => (el.style.fontSize = "15px"));
    },
  },
  mounted() {
    var storedToken = localStorage.getItem("token");
    const { id } = jwtDecode(storedToken);
    this.$axios
      .get(`/code/${id}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        res.data.data.forEach((item) => {
          const code = {
            html: this.setCode(item.html),
            css: this.setCode(item.css),
            js: this.setCode(item.js),
            createdAt: item.createdAt,
          };
          const beginCode = {
            html: item.html,
            css: item.css,
            js: item.js,
            createdAt: item.createdAt,
          };
          this.beginCode.push(beginCode);
          this.code.push(code);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
.sm {
  font-size: 5px;
  font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
  overflow: auto;
  height: 100%;
}

.doc-collapsed {
  width: 0;
  overflow: hidden;
}
</style>
