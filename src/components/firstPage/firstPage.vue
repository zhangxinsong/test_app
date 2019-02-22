<template>
	<div class="first-page scroll">
		<div class="part1"></div>
		<div class="part2">
			<ul v-if="list.length>0">
				<li v-for="(v,k) in list" @click="toPage(v)" :key="k">
					<img :src="v.icon">
					<p>{{v.name}}</p>
				</li>
			</ul>
		</div>
		<div class="cover" v-show="isShow">
			<div class="title">考试列表
				<span class="close" @click="closeShow">X</span>
			</div>
			<div class="box">
				<div class="testBox" v-for="(item,index) in test" :key="index" @click="toTest(item.id,item.examType)">
					<p class="testName">{{item.name}}</p>
					<p class="testTime">{{formatDate(item.startTime)}}--{{formatDate(item.endTime)}}</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
import util from "../../global-ui/util.js"
	export default{
		data(){
			return {
				list: [{
					icon:"https://imoss.yonyoucloud.com/upesn/esn/385628/20180810/1712/69aa4d2c-63e5-4840-8be7-d087d8f452cf.png",
					name:"我的信息",
					url:"#/my"
					},{
					icon:"https://imoss.yonyoucloud.com/upesn/esn/385628/20180810/1712/f7b26e9e-5795-4c2f-b502-8f352cd6aaa9.png",
					name:"排行榜",
					url:"rank"
					},{
					icon:"https://imoss.yonyoucloud.com/upesn/esn/385628/20180810/1712/b9cd6cbe-6070-4c0e-978d-83274992be3b.png",
					name:"答题闯关",
					url:"test"
				}],
				isShow: false,
				test: [],
				toRouter: 'rank'
			}
		},
		created(){
			this.getTest();
		},
		methods:{
			formatDate(date){
				return util.formatDate(new Date(date),"YYYY--MM-DD");
			},
			getTest(){
				this.$ajax.get(`/rest/v1/answer/exam`,{
				}).then(res => {
					this.test = res;
					console.log(res)
				})
			},
			closeShow(){
				this.isShow = !this.isShow;
			},
			toTest(examId,examType){
				if(this.toRouter === "rank"){
					this.$router.push({
						path: '/rank',
						query: {
							"examId": examId,
							"examType": examType
						}
					})
				}else{
					this.$router.push({
						path: '/test',
						query: {
							"examId": examId
						}
					})
				}
			},
			toPage(v){
				if( v.url[0]=='#' ){
					let p = v.url.split('#')[1];
					this.$router.push( p );
				}
				else if(v.url.indexOf("rank") > -1){
					this.toRouter = "rank";
					this.isShow = true;
				}
				else if(v.url.indexOf("test") > -1){
					this.toRouter = "test";
					this.isShow = true;
				}
			},
		}
	}
</script>
<style lang="less" scoped>
	.first-page{
		width: 100%;height: 100%;
		position: relative;
		.part1{
			height: 300px;
			background: url('~Assets/images/sy8.png') no-repeat;
			background-size: cover;
		}
		.part2{
			position: absolute;
			top: 260px;
			left: 25px;
			right: 25px;
			background: white;
			border-radius: 8px;
			overflow: hidden;
			box-shadow:0px 1px 5px 0.5px rgba(0,0,0,0.08);
			ul{
				padding-top: 50px;
				overflow: hidden;
				li{
					height: 140px;
					width: 33.3%;
					float: left;
					text-align: center;
					margin-bottom: 25px;
					img{
						width: 80px;
					}
					p{
						font-size: 3.2rem;
						color: #666;
						margin-top: 20px;
					}
				}
			}
		}
		.cover{
			float: left;
			position: absolute;
			left: 10%;right: 10%;
			top: 20%;bottom: 20%;
			background: #fff;
			border-radius: 10px;
			overflow: hidden;
			z-index: 2;
			.title{
				width: 100%;
				height: 50px;
				background-color: #e3e3e3;
				font-size: 3.6rem;
				line-height: 50px;
				color: #f86767;
				.close{
					float: right;
					font-size: 4rem;
					margin-right: 20px;
				}
			}
			.box{
				overflow: auto;
				height: 90%;
				.testBox{
					width: 80%;
					margin : 20px auto;
					padding: 30px 0;
					background: #f86767;
					border-radius: 6px;
					text-align: center;
					color: #fff;
					.testName{
						font-size: 3.3rem;
						font-weight: 600;
					}
					.testTime{
						margin-top: 25px;
						font-size: 2.8rem;
					}
				}
			}
		}
	}
</style>