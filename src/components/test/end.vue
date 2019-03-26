<template>
    <div class="question-end">
        <img class="endImg" src='../../assets/images/question/score-bg.png'>
        <span class="beatnum" v-if="this.$parent.exam.examType == 'SPEED'">
            您本次用时 <span>{{ (time/1000).toFixed(2) }}</span> s
            <br>
            <br>
            历史最短用时 <span>{{(mintime/1000).toFixed(2)}}</span> s
            <br>
            <br>
            共击败了 <span>{{ num }}</span> 人
        </span>
        <span class="beatnum" v-if="this.$parent.exam.examType == 'SCORE'">
            您本次得分 <span>{{ score }}</span>
            <br>
            <br>
            历史最高得分 <span>{{bestScore}}</span>
            <br>
            <br>
            共击败了 <span>{{ num }}</span> 人
        </span>
        <img class="challengeAgain" @click="tryAgain" src='../../assets/images/question/challenge_again.png'>
        <img class="close" @click="close" src='../../assets/images/question/dead_line_close_btn.png'>
    </div>
</template>
<script>
export default {
    data(){
        return {
            time: 0,
            mintime: null,
            num: 0,
            score: 0,
            bestScore: null
        }
    },
    computed:{
        sequence(){
            return this.$route.query.sequence;
        }
    },
    methods: {
        getExamData(){
            var memberId = localStorage.getItem("memberId");
            this.$ajax.get(`/rest/v1/answer/exam/result/${this.$parent.examId}?sequence=${this.sequence}&memberId=${memberId}`,{
            }).then(res => {
                this.time = res.totalTime;
                this.score = res.totalScore;
            }).catch(err => {

            })
        },
        getExamBest(){
            var memberId = localStorage.getItem("memberId");
            if(this.$parent.exam.examType == 'SCORE'){
                this.$ajax.get(`/rest/v1/answer/exam/result/${this.$parent.examId}/score/grade?sequence=${this.sequence}&memberId=${memberId}`,{
                }).then(res => {
                    this.num = res.beatNumber;
                    this.bestScore = res.bestScore;
                }).catch(err => {

                })
            }else{
                this.$ajax.get(`/rest/v1/answer/exam/result/${this.$parent.examId}/speed/grade?sequence=${this.sequence}&memberId=${memberId}`,{
                }).then(res => {
                    this.num = res.beatNumber;
                    this.mintime = res.minTime;
                }).catch(err => {

                })
            } 
        },
        tryAgain(){
            this.$router.back();
        },
        close(){
            this.$router.go(-2);
        }
    },
    mounted(){
        this.getExamData();
        this.getExamBest();
    }
}
</script>
<style lang="less" scoped>
    .question-end{
        width: 100%;height: 100%;
        background: url('../../assets/images/question/exam-bg-2018.png');
        background-size: 100% 100%;
        position: relative;
        .endImg{
            position: absolute;
            top: 150px;left: 50%;
            width: 200px;
            transform: translateX(-50%);
        }
        .beatnum{
            position: absolute;
            top: 400px;left: 50%;
            transform: translateX(-50%);
            width: 60%;
            text-align: center;
            color: #fff;
            font-size: 3.6rem;
            span{
                color: #f1b42a;
                font-size: 4rem;
                font-weight: 600; 
            }
        }
        .challengeAgain{
            position: absolute;
            left: 50%;bottom: 220px;
            width: 200px;height: 80px;
            transform: translateX(-50%);
        }
        .close{
            position: absolute;
            bottom: 100px;left: 50%;
            width: 200px;height: 80px;
            transform: translateX(-50%);
        }
    }
</style>