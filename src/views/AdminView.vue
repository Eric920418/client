<template>
<div>
    <nav>
    <button class="btn btn-outline-secondary border-0" @click="changeFocus('student')">學生資料</button>
    <button class="btn btn-outline-secondary border-0" @click="changeFocus('exam')">考試系統</button>
    <button class="btn btn-outline-secondary border-0" @click="">成績查詢</button>
    <button class="btn btn-outline-danger border-0 ms-auto" @click="restartServer">重啟伺服器</button>
    </nav>
    <div class="mx-auto " style="width: 90%; height: 100%;">
        <div  v-if="focus === 'exam'">
            <exam></exam>
        </div>
        <div  v-if="focus === 'student'">
            <student></student>
        </div>
    </div>
</div>
</template>

<script>
import student from '../components/StudentInformation.vue';
import exam from '../components/ExamSystem.vue';

export default {
components: {
    student,
    exam
},
data() {
    return {
        focus: "student",
        serverRestart: false,
        waitSec: 10
    }
},
methods: {
    changeFocus(section) {
        this.focus = section;
    },
    restartServer() {
        let countdown = this.waitSec;
        this.$axiox.post('restart')
        .then((res) => {
            this.$swal.fire({
                title: '重啟伺服器',
                text: `伺服器正在重啟，請稍候...`,
                icon: 'success',
                confirmButtonText: `倒數${countdown}秒`,
                allowOutsideClick: false,
                didOpen: () => {
                    // 禁用確認按鈕
                    this.$swal.getConfirmButton().setAttribute('disabled', 'disabled');

                    const interval = setInterval(() => {
                        if (countdown > 0) {
                            countdown -= 1;
                            this.$swal.update({
                                confirmButtonText: `倒數${countdown}秒`
                            });
                        } else {
                            clearInterval(interval);
                            // 倒數結束後重新啟用確認按鈕
                            this.$swal.getConfirmButton().removeAttribute('disabled');
                            this.$swal.update({
                                confirmButtonText: '確定'
                            });
                        }
                    }, 1000);
                }
            });
        }).catch((err) => {
            console.log(err);
        });
    }
},
mounted() {
    var storedToken = localStorage.getItem('identity');
    if (storedToken !== "admin") {
    this.$router.push('/home');
    }
},
}
</script>

<style scoped>
nav {
display: flex;
align-items: center;
background-color: #000;
padding: 10px;
width: 100%;
height: 70px;
}

</style>
