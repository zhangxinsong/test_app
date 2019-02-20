<template>
    <div class="forget">
        <div class="box">
            <input type="text" v-model="mobile" class="mb" placeholder="手机号"/>
            <input type="text" v-model="yzm" class="yzm mb" placeholder="验证码" />
            <button class="getYzm" @click="getYzm" :disabled="eachClick">{{yzmContent}}</button>
            <input type="password" v-model="password" class="mb" placeholder="新密码" />
            <input type="password" v-model="password1" class="mb" placeholder="确认密码" />
            <div class="save" @click="submit">保存</div>
        </div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return {
            mobile: '',
            password: '',
            password1: '',
            yzm: '',
            eachClick: false,
            yzmTimer: 60,
            yzmContent: '验证码'
        }
    },
    methods: {
        getYzm(){
            if(this.mobile === ''){
                this.$tip.say("请输入手机号")
            }
            else if(!(/^1[34578]\d{9}$/.test(this.mobile))){
                this.$tip.say("请输入正确的手机号")
            }
            else{
                this.yzmTimerUpdate();
            }
        },
        yzmTimerUpdate(){  //验证码倒计时
            if(!this.eachClick){
                this.eachClick = true;
                this.yzmContent = '('+ this.yzmTimer + 's)';
                let timer = setInterval(()=>{
                    if(this.yzmTimer > 0){
                        this.yzmTimer--;
                        this.yzmContent = '('+ this.yzmTimer + 's)';
                    }else{
                        this.eachClick = false;
                        this.yzmTimer = 60;
                        this.yzmContent = "验证码";
                        clearInterval(timer);
                    }
                },1000);
            }
        },
        submit(){
            if(this.mobile === ''){
                this.$tip.say("请输入手机号")
            }
            else if(this.yzm === ''){
                this.$tip.say("请输入验证码")
            }
            else if(this.password === ''){
                this.$tip.say("请输入新密码")
            }
            else if(this.password1 === ''){
                this.$tip.say("请输入确认密码")
            }
            else if(this.password != this.password1){
                this.$tip.say("两次密码不一样")
            }
            else{

            }
        }
    }
}
</script>
<style lang="less" scoped>
    .forget{
        width: 100%;
        height: 100%;
        background-image: url(../../assets/images/bg.jpg);
        background-size: cover;
        .box{
            width: 100%;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.4);
            text-align: center;
            padding-top: 10%;
        }
        input{
            width: 90%;
            height: 75px;
            border: 2px solid #e3e3e3;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            font-size: 3.6rem;
            text-indent: 1rem;
            color: #838383fd;
        }
        .mb{
            margin-bottom: 20px;
        }
        .yzm{
            width: 60%;
        }
        .getYzm{
            width: 25%;
            height: 75px;
            float: right;
            margin-right: 5%;
            border: 2px solid #e3e3e3;
            border-radius: 10px;
            font-size: 3.6rem;
            color: #838383fd;
        }
        .save{
            width: 40%;
            height: 80px;
            margin: 0 auto;
            font-size: 4rem;
            line-height: 80px;
            background-color: rgba(255, 255, 255, 0.5);
            border-radius: 15px;
            color: #fff;
            margin-top: 10%;
        }
    }
</style>