<template>
    <div class="login">
        <div class="box">
            <input type="text" class="userName" v-model="mobile" placeholder="手机号"/>
            <input type="password" placeholder="密码" v-model="password" /><br/>
            <span class="toforget" @click="toForget">找回密码</span>
            <span class="tosign" @click="toSign">注册</span>
            <div class="submit" @click="submit">登陆</div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            mobile: '',
            password: ''
        }
    },
    methods: {
        toForget(){
            this.$router.push({
                path: '/forget'
            })
        },
        toSign(){
            this.$router.push({
                path: '/signin'
            })
        },
        submit(){
            if(this.mobile === ''){
                this.$tip.say("请输入手机号")
            }
            else if(this.password === ''){
                this.$tip.say("请输入密码")
            }
            else{
                this.$ajax.get(`/rest/start/signin?loginName=${this.mobile}&password=${this.password}`,{
                }).then(res=>{
                    if(res.login){
                        this.$tip.say("登录成功");
                        localStorage.setItem("memberId",res.memberId);
                        this.$router.push({path:'/firstPage'});
                    }
                }).catch(err=>{
                    this.$tip.say("密码不正确");
                })
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .login{
        width: 100%;
        height: 100%;
        background-image: url(../../assets/images/bg.jpg);
        background-size: cover;
        .box{
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.3);
            text-align: center;
            padding-top: 45%;
        }
        input{
            width: 90%;
            height: 75px;
            border: 2px solid #e3e3e3;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 10px;
            font-size: 3.6rem;
            text-indent: 1rem;
            color: #838383fd;
        }
        .userName{
            margin-bottom: 40px;
        }
        .toforget{
            float: left;
            font-size: 3.5rem;
            margin-left: 5%;
            color: #fff;
            line-height: 4rem;
        }
        .tosign{
            float: right;
            font-size: 3.5rem;
            margin-right: 5%;
            color: #fff;
            line-height: 4rem;
        }
        .submit{
            width: 40%;
            height: 80px;
            margin: 0 auto;
            font-size: 4rem;
            line-height: 80px;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 15px;
            color: #fff;
            margin-top: 35%;
        }
    }
</style>