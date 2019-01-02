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
	</div>
</template>
<script type="text/javascript">
	export default{
		props:{},
		components:{
		},
		data(){
			return {
				list: [{
					icon:"https://imoss.yonyoucloud.com/upesn/esn/385628/20180810/1712/49050970-b1af-4ef1-a28b-cfbc3b3b3b5e.png",
					name:"大会指南",
					url:"#/conferenceGuide?conferenceId=5be42c33e92f19001bba0371"
					},{
					icon:"https://imoss.yonyoucloud.com/upesn/esn/385628/20180810/1712/69aa4d2c-63e5-4840-8be7-d087d8f452cf.png",
					name:"我的信息",
					url:"#/conferenceMy?conferenceId=5be42c33e92f19001bba0371"
					},{
					icon:"https://imoss.yonyoucloud.com/upesn/esn/385628/20180810/1712/f7b26e9e-5795-4c2f-b502-8f352cd6aaa9.png",
					name:"大会奖品",
					url:"#/conferencePrize?conferenceId=5be42c33e92f19001bba0371"
					},{
					icon:"https://imoss.yonyoucloud.com/upesn/esn/385628/20180810/1712/b9cd6cbe-6070-4c0e-978d-83274992be3b.png",
					name:"大会签到",
					url:"#/conferenceSign"
					},{
					icon:"https://imoss.yonyoucloud.com/upesn/esn/385628/20180810/1713/a05c861a-7458-4717-afa9-283699898d62.png",
					name:"帮他签到",
					url:"#/conferenceHelpSign"
					},{
					icon:"https://ykj-yyim-test.oss-cn-beijing.aliyuncs.com/conference/2018/09/29/09/42/483b5bed-209c-423b-93ac-68fce72fc59d.png",
					name:"集颜值",
					url:"http://172.20.1.177:6058/conference/app/assets/activity/collect.html?conferenceId=5be42c33e92f19001bba0371"
				}]
			}
		},
		methods:{
			// 根据id 获取列表 ;
			getList( conferenceId ){
				this.$ajax({
					url:`/conference/rest/v1/client/conference/${conferenceId}/app`,
					success(res){
						res=JSON.parse(res);
						if( res.apps ){
							this.list = res.apps ;
						};
					},
					error(){
					}
				})
			},
			toPage(v){
				if( v.url.indexOf('/conferenceSign')>0 ){
					G.BRIDGE.scanQRCode();
					return ;
				}
				if( v.url[0]=='#' ){
					let p = v.url.split('#')[1];
					this.$router.push( p );
				}else if( v.url.indexOf('http://')>-1||v.url.indexOf('https://')>-1 ){
					location.href = v.url + '&qzId=' + qzId + '&lang=' + lang;
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
			height: 260px;
			background: url('~Assets/images/sy8.png') no-repeat;
			background-size: cover;
			background-position: 0 -3rem;
		}
		.part2{
			position: absolute;
			top: 220px;
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
					height: 160px;
					width: 33.3%;
					float: left;
					text-align: center;
					img{
						width: 70px;
					}
					p{
						font-size: 3rem;
						color: #666;
						margin-top: 20px;
					}
				}
			}
		}
	}
</style>