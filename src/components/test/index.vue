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
            this.$ajax({
                url:`/conference/rest/v1/answer/exam/${this.examId}`,
                type: 'get',
                success(res){
                    let now = new Date().valueOf();
                    let date = JSON.parse(res);
                    this.exam = date;
                    if(now < date.startTime){
                        G.UI.say('考试还未开始');
                    }else if(now > date.endTime){
                        G.UI.say('考试已经结束');
                    }
                },
                error(err){
                    G.UI.say();
                }
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