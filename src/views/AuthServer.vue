<template>
<div v-if="status" class="w-100 d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="form d-flex justify-content-center">
    <div  style="width: 250px; height: 150px; margin-top: 55px;">
        <div class=" position-relative">
            <i class="bi bi-person-square position-absolute z-3 fs-5 text-black" style="top:4px; right:217px; "></i>
            <input class="d-flex form-control mb-2 position-relative ps-5 " type="text" placeholder="學號" v-model="studentID">
        </div>
        <div class=" position-relative ">
            <i class="bi bi-lock-fill position-absolute z-3 fs-5 text-black"  style="top:4px; right:217px;"></i>
            <input class="d-flex  form-control mt-2 position-relative ps-5 " type="password" placeholder="密碼" v-model="password" ref="pas">
            <i v-if="eye==false" class="bi bi-eye-fill position-absolute z-3 fs-5 text-black" style="top:5px; right:10px" @click="see" ></i>
            <i v-else-if="eye==true" class="bi bi-eye-slash-fill position-absolute z-3 fs-5 text-black" style="top:5px; right:10px" @click="see" ></i>
        </div>
        <div class="d-flex justify-content-center mt-2">
            <button class="btn btn-primary mt-2 w-25 me-3" @click="login">登入</button>
            <button class="btn btn-danger mt-2 w-25 ms-3" @click="status = false">註冊</button>
        </div>
    </div>
    </div>
</div>
<div v-if="!status" class="w-100 d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="form d-flex justify-content-center">
    <div  style="width: 250px; height: 150px; margin-top: 50px;">
        <div class=" position-relative">
            <i class="bi bi-person-vcard-fill position-absolute z-3 fs-5 text-black" style="top:4px; right:217px; "></i>
            <input class="d-flex form-control mb-2 position-relative ps-5 " type="text" placeholder="姓名" v-model="name">
        </div>
        <div class=" position-relative">
            <i class="bi bi-person-square position-absolute z-3 fs-5 text-black" style="top:4px; right:217px; "></i>
            <input class="d-flex form-control mb-2 position-relative ps-5 " type="text" placeholder="學號" v-model="studentID">
        </div>
        <div class=" position-relative ">
            <i class="bi bi-lock-fill position-absolute z-3 fs-5 text-black"  style="top:4px; right:217px;"></i>
            <input class="d-flex  form-control mt-2 position-relative ps-5 " type="password" placeholder="密碼" v-model="password" ref="pas">
            <i v-if="eye==false" class="bi bi-eye-fill position-absolute z-3 fs-5 text-black" style="top:5px; right:10px" @click="see" ></i>
            <i v-else-if="eye==true" class="bi bi-eye-slash-fill position-absolute z-3 fs-5 text-black" style="top:5px; right:10px" @click="see" ></i>
        </div>
        <div class="d-flex justify-content-center mt-2">
            <button class="btn btn-danger  mt-2 w-25 me-3" @click="signup">註冊</button>
            <button class="btn  btn-primary mt-2 w-50 ms-3 text-nowrap" @click="status = true">返回登入</button>
        </div>
    </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            name: "",
            studentID:"" ,
            password:"",
            eye: false,
            token: "",
            status: true
        }
    },
    watch: {
        passwordOK() {
            setTimeout(() => {
                this.passwordOK = true;
            }, 3000);
        }
    },
    methods: {
        login() {
            this.$axios.post('/auth/login', { studentID: this.studentID, password: this.password })
            .then( res => { 
                this.token = res.data.user.token;
                localStorage.setItem('token', this.token);
                this.studentID = "";
                this.password = "";
                var storedToken = localStorage.getItem('token');

                if (storedToken) {
                    const jwtParts = storedToken.split(".");
                    const payload = JSON.parse(atob(jwtParts[1]));
                    this.$cookies.set('id', payload.id)
                    this.$cookies.set('name', payload.name)
                    this.$swal.fire({
                    title: '登入成功',
                    text: '',
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonText: '進入頁面',
                    cancelButtonText: '關閉'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.$router.push('/home');
                        } else if (result.isDismissed) {
                            console.log('Modal closed')
                        }
                    })
                } 
            })

            .catch(err => {
                const errorMessage = err.response.data.message || '登入失敗，請重試';
                this.$swal.fire({
                title: '登入失敗',
                text: errorMessage,
                icon: 'error'
                })
            })
        },
        signup() {
            this.$axios.post('/auth/signUp', {
                name: this.name,
                studentID: this.studentID,
                password: this.password
            })
            .then(res => {
                this.$swal.fire({
                title: '恭喜你註冊成功',
                text: '',
                icon: 'success',
                showCancelButton: true,
                confirmButtonText: '進入登入頁面',
                cancelButtonText: '關閉'
                }).then((result) => {
                if (result.isConfirmed) {
                    this.$router.push('/')
                    this.status = true;
                } else if (result.isDismissed) {
                    console.log('Modal closed')
                }
                })
                this.status = true;
            })
            .catch(err => {
                const errorMessage = err.response.data.message || '註冊失敗，請重試';
                this.$swal.fire({
                title: '註冊失敗',
                text: errorMessage,
                icon: 'error'
                })
            })
        },
        see(){
            this.eye = !this.eye;
            this.$refs.pas.type = this.eye ? 'text' : 'password';
        }
    }, 
}
</script>
<style>
.form {
width: 550px;
height: 280px;
background-color: black;
border: 2px solid white;
border-radius: 2%;
}
</style>