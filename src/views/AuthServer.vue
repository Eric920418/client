<script>
export default {
	data() {
		return {
            name: "",
            studentID: "",
            password: "",
            eye: false,
            token: "",
            status: true,
		}
	},
	computed: {
		pageStatus() {
			return {
				'/login': '木木苑登入',
				'/login/signin': '木木苑註冊',
				'/login/forget': '密碼找回'
			}[this.$route.path]
		}
	},
	methods: {
        login() {
            this.$axios.post('/auth/login', { studentID: this.studentID, password: this.password })
                .then(res => {
                    this.token = res.data.user.token;
                    localStorage.setItem('token', this.token);
                    localStorage.setItem('identity', res.data.user.identity);
                    localStorage.setItem('loginNumber' , res.data.user.loginNumber)
                    this.studentID = "";
                    this.password = "";
                    var storedToken = localStorage.getItem('token');
                    var storedIdentity = localStorage.getItem('identity');

                    if (storedToken) {
                        if (storedIdentity == 'admin') {
                            this.$swal.fire({
                                title: '登入成功',
                                text: '老師您好',
                                icon: 'success',
                                showCancelButton: true,
                                confirmButtonText: '進入頁面',
                                cancelButtonText: '關閉'
                            }).then((result) => {
                                if (result.isConfirmed) {
                                    this.$router.push('/admin');
                                } else if (result.isDismissed) {
                                    console.log('Modal closed');
                                }
                            })
                        } else {
                            const jwtParts = storedToken.split(".");
                            const payload = JSON.parse(atob(jwtParts[1]));
                            this.$cookies.set('id', payload.id);
                            this.$cookies.set('name', payload.name);
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
                                    console.log('Modal closed');
                                }
                            })
                        }
                    }
                })
                .catch(err => {
                    this.$swal.fire({
                        title: '登入失敗',
                        text: '登入失敗，請重試',
                        icon: 'error'
                    });
                });
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
                            this.$router.push('/');
                            this.status = true;
                        } else if (result.isDismissed) {
                            console.log('Modal closed');
                        }
                    });
                    this.status = true;
                })
                .catch(err => {
                    const errorMessage = err.response.data.message || '註冊失敗，請重試';
                    this.$swal.fire({
                        title: '註冊失敗',
                        text: errorMessage,
                        icon: 'error'
                    });
                });
        },
        see() {
            this.eye = !this.eye;
            this.$refs.pas.type = this.eye ? 'text' : 'password';
        }
    },
}
</script>

<template>
<!-- <div class="signinContent overflow-hidden" ref="scene" data-friction-x="0.1" data-friction-y="0.1"
    data-scalar-x="10" data-scalar-y="10">
    <div class="w-100 h-100 position-absolute" data-depth="0.4">
        <img class="position-absolute" style="top:60%;left:30%" src="/html.png"  />
    </div>
    <div class="w-100 h-100 position-absolute" data-depth="0.15">
        <img class="position-absolute" style="top:80%;left:80%" src="/css.png"  />
    </div>
    <div class="w-100 h-100 position-absolute" data-depth="0.4">
        <img class="position-absolute" style="top:20%;left:20%" src="/js.png"  />
    </div>
    <div class="w-100 h-100 position-absolute" data-depth="0.3">
        <img class="position-absolute" style="top:90%;left:10%" src="/html.png"  />
    </div>
    <div class="w-100 h-100 position-absolute" data-depth="0.25">
        <img class="position-absolute" style="top:15%;left:75%" src="/css.png"  />
    </div>
    <div class="w-100 h-100 position-absolute" data-depth="0.3">
        <img class="position-absolute" style="top:80%;left:50%" src="/js.png"  />
    </div>
    <div class="w-100 h-100 position-absolute" data-depth="0.3">
        <img class="position-absolute" style="top:5%;left:95%" src="/html.png"  />
    </div>
    <div class="w-100 h-100 position-absolute" data-depth="0.2">
        <img class="position-absolute" style="top:90%;left:90%" src="/css.png"  />
    </div>
    <div class="w-100 h-100 position-absolute" data-depth="0.2">
        <img class="position-absolute" style="top:60%;left:10%" src="/js.png"  />
    </div>
    <div class="w-100 h-100 position-absolute" data-depth="0.4">
        <img class="position-absolute" style="top:50%;left:70%" src="/html.png"  />
    </div>
    <div class="w-100 h-100 position-absolute" data-depth="0.3">
        <img class="position-absolute" style="top:10%;left:50%" src="/css.png"  />
    </div>
    <div class="w-100 h-100 position-absolute" data-depth="0.4">
        <img class="position-absolute" style="top:30%;left:90%" src="/js.png"  />
    </div>
    <div class="w-100 h-100 position-absolute" data-depth="0.2">
        <img class="position-absolute" style="top:10%;left:5%" src="/html.png"  />
    </div>
    <div class="w-100 h-100 position-absolute" data-depth="0.3">
        <img class="position-absolute" style="top:10%;left:40%" src="/css.png"  />
    </div>
</div> -->
	<div class="row login mx-0">
        <div class="stars"></div>
        <div class="twinkling"></div>
        <div class="clouds"></div>
    
        <div class="position-absolute top-50 start-50 translate-middle col-md-6 px-3" style="max-width: 400px; z-index: 1000;">
            <div v-if="status" class="w-100 d-flex justify-content-center align-items-center" style="height: 100vh;">
                <div class="form d-flex justify-content-center">
                    <div style="width: 250px; height: 150px; margin-top: 55px;">
                        <div class="position-relative">
                            <i class="bi bi-person-square position-absolute z-3 fs-5 text-black" style="top:4px; right:217px;"></i>
                            <input class="d-flex form-control mb-2 position-relative ps-5" type="text" placeholder="學號" v-model="studentID">
                        </div>
                        <div class="position-relative">
                            <i class="bi bi-lock-fill position-absolute z-3 fs-5 text-black" style="top:4px; right:217px;"></i>
                            <input class="d-flex form-control mt-2 position-relative ps-5" type="password" placeholder="密碼" v-model="password" ref="pas">
                            <i v-if="eye==false" class="bi bi-eye-fill position-absolute z-3 fs-5 text-black" style="top:5px; right:10px" @click="see"></i>
                            <i v-else-if="eye==true" class="bi bi-eye-slash-fill position-absolute z-3 fs-5 text-black" style="top:5px; right:10px" @click="see"></i>
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
                    <div style="width: 250px; height: 150px; margin-top: 50px;">
                        <div class="position-relative">
                            <i class="bi bi-person-vcard-fill position-absolute z-3 fs-5 text-black" style="top:4px; right:217px;"></i>
                            <input class="d-flex form-control mb-2 position-relative ps-5" type="text" placeholder="姓名" v-model="name">
                        </div>
                        <div class="position-relative">
                            <i class="bi bi-person-square position-absolute z-3 fs-5 text-black" style="top:4px; right:217px;"></i>
                            <input class="d-flex form-control mb-2 position-relative ps-5" type="text" placeholder="學號" v-model="studentID">
                        </div>
                        <div class="position-relative">
                            <i class="bi bi-lock-fill position-absolute z-3 fs-5 text-black" style="top:4px; right:217px;"></i>
                            <input class="d-flex form-control mt-2 position-relative ps-5" type="password" placeholder="密碼" v-model="password" ref="pas">
                            <i v-if="eye==false" class="bi bi-eye-fill position-absolute z-3 fs-5 text-black" style="top:5px; right:10px" @click="see"></i>
                            <i v-else-if="eye==true" class="bi bi-eye-slash-fill position-absolute z-3 fs-5 text-black" style="top:5px; right:10px" @click="see"></i>
                        </div>
                        <div class="d-flex justify-content-center mt-2">
                            <button class="btn btn-danger mt-2 w-25 me-3" @click="signup">註冊</button>
                            <button class="btn btn-primary mt-2 w-50 ms-3 text-nowrap" @click="status = true">返回登入</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
	</div>
</template>

<style scoped >
.login {
	cursor: default;

	.signinContent {
		min-height: calc(100vh);
	}
}

.form {
    width: 550px;
    height: 280px;
    background-color: black;
    border: 2px solid white;
    
    border-radius: 2%;
}

* {
    margin: 0;
    padding: 0;
}
header {
    background-color:rgba(33, 33, 33, 0.9);
    color:#ffffff;
    display:block;
    font: 14px/1.3 Arial,sans-serif;
    height:50px;
    position:relative;
    z-index:5;
}
h2{
    margin-top: 30px;
    text-align: center;
}
header h2{
    font-size: 22px;
    margin: 0 auto;
    padding: 10px 0;
    width: 80%;
    text-align: center;
}
header a, a:visited {
    text-decoration:none;
    color:#fcfcfc;
}

@keyframes move-twink-back {
    from {background-position:0 0;}
    to {background-position:-10000px 5000px;}
}
@-webkit-keyframes move-twink-back {
    from {background-position:0 0;}
    to {background-position:-10000px 5000px;}
}
@-moz-keyframes move-twink-back {
    from {background-position:0 0;}
    to {background-position:-10000px 5000px;}
}
@-ms-keyframes move-twink-back {
    from {background-position:0 0;}
    to {background-position:-10000px 5000px;}
}

@keyframes move-clouds-back {
    from {background-position:0 0;}
    to {background-position:10000px 0;}
}
@-webkit-keyframes move-clouds-back {
    from {background-position:0 0;}
    to {background-position:10000px 0;}
}
@-moz-keyframes move-clouds-back {
    from {background-position:0 0;}
    to {background-position:10000px 0;}
}
@-ms-keyframes move-clouds-back {
    from {background-position: 0;}
    to {background-position:10000px 0;}
}

.stars, .twinkling, .clouds {
  position:absolute;
  top:0;
  left:0;
  right:0;
  bottom:0;
  width:100%;
  height:100%;
  display:block;
}

.stars {
  background:#000 url(http://www.script-tutorials.com/demos/360/images/stars.png) repeat top center;
  z-index:0;
}

.twinkling{
  background:transparent url(http://www.script-tutorials.com/demos/360/images/twinkling.png) repeat top center;
  z-index:1;

  -moz-animation:move-twink-back 200s linear infinite;
  -ms-animation:move-twink-back 200s linear infinite;
  -o-animation:move-twink-back 200s linear infinite;
  -webkit-animation:move-twink-back 200s linear infinite;
  animation:move-twink-back 200s linear infinite;
}

.clouds{
    background:transparent url(http://www.script-tutorials.com/demos/360/images/clouds3.png) repeat top center;
    z-index:3;

  -moz-animation:move-clouds-back 200s linear infinite;
  -ms-animation:move-clouds-back 200s linear infinite;
  -o-animation:move-clouds-back 200s linear infinite;
  -webkit-animation:move-clouds-back 200s linear infinite;
  animation:move-clouds-back 200s linear infinite;
}

</style>
