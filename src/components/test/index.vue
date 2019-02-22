<template>
    <div class="question">
        <transition name="slide-fade">
            <router-view class="router-view"></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    data(){ 
        return {
            rangeData: {},
            exam: {},
            examId: ''
        }
    },
    computed:{ 
    },
    methods: {
        getExam(){
            var memberId = localStorage.getItem("memberId");
            this.$ajax.get(`/rest/v1/answer/exam/${this.examId}?memberId=${memberId}`,{
            }).then(res => {
                let now = new Date().valueOf();
                this.exam = res;
                if(now < res.startTime){
                    this.$tip.say('考试还未开始');
                }else if(now > res.endTime){
                    this.$tip.say('考试已经结束');
                }
            }).catch(err => {
                console.log(err);
            })
        },
    },
    created(){
        this.examId = this.$route.query.examId;
        this.getExam();
    }
}
</script>
<style lang="less" scoped>
    .question{
        width: 100%;
        height: 100%;
        .router-view{
			transition: all 0.6s ease-in-out;
		}
    }
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .6s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to {
        opacity: 0;
    }
</style>