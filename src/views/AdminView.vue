<template>
    <nav>
        <button class="btn btn-outline-secondary border-0">學生資料</button>
    </nav>
    <div class=" mx-auto  " style="width: 80%;">
        <student></student>
    </div>

</template>

<script>
import student from '../components/StudentInformation.vue'
export default {
    components: {
        student
    },
    data() {
        return {
        }
    },
    mounted() {
        var storedToken = localStorage.getItem('identity');
        if( storedToken != "admin"){
        this.$router.push('/home');
        }
    },
}
</script>

<style scoped>
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #000;
    padding: 10px;
    width: 100%;
    height: 70px;
}
</style>