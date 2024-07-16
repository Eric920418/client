<template>
<div>
    <nav>
    <button class="btn btn-outline-secondary border-0" @click="changeFocus('student')">學生資料</button>
    <button class="btn btn-outline-secondary border-0" @click="changeFocus('exam')">考試系統</button>
    <button class="btn btn-outline-secondary border-0" @click="changeFocus('score')">成績查詢</button>
    <button class="btn btn-outline-secondary border-0" @click="changeFocus('practice')">練習系統</button>
    <button v-if="state === 1"  class="btn btn-outline-warning border-0 ms-auto" @click="stop" >暫停伺服器</button>  
    <button v-if="state === 0"  class="btn btn-outline-success border-0 ms-auto" @click="stop" >啟動伺服器</button>
    <button class="btn btn-outline-danger border-0 ms-1" @click="restartServer">重啟伺服器</button>
    </nav>
    <div class="mx-auto admin" style="width: 95%; height: 100%;">
        <div  v-if="focus === 'exam'">
            <exam></exam>
        </div>
        <div  v-if="focus === 'student'">
            <student></student>
        </div>
        <div  v-if="focus === 'score'">
            <score></score>
        </div>
        <div  v-if="focus === 'practice'">
            <practice></practice>
        </div>
    </div>
</div>
</template>

<script>
import student from '../components/StudentInformation.vue';
import exam from '../components/ExamSystem.vue';
import score from '../components/Score.vue';
import practice from '../components/Practice.vue';
export default {
components: {
    student,
    exam,
    score,
    practice
},
data() {
    return {
        focus: "student",
        serverRestart: false,
        waitSec: 15,
        socket: null,
        state: 1,
    }
},
methods: {
    changeFocus(section) {
        this.focus = section;
    },
    restartServer() {
        let countdown = this.waitSec;
        var storedToken = localStorage.getItem('token');
        this.$axios.post('/restart', {
            headers: {
                'Authorization': `Bearer ${storedToken}`,
                'Content-Type': 'application/json',
            }
        })
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
    },
    stop() {
        if (this.state === 1) {
            this.state = 0;
            this.$swal.fire({
                title: '暫停伺服器',
                text: `伺服器正在暫停`,
                icon: 'success',
                confirmButtonText: `確定`,
            })
            this.$axios.post('/code/stop', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
        } else {
            this.state = 1;
            this.$swal.fire({
                title: '啟動伺服器',
                title: '啟動伺服器',
                text: `伺服器正在啟動`,
                icon: 'success',
                confirmButtonText: `確定`,
            })
            this.$axios.post('/code/begin', { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } })
        }
        
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
