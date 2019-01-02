<template>
	<div class="conference-my scroll">
		<div class="part1">
			<div class="avatar-wrap">
				
				<p class="elli">{{userInfo.name}}</p>
			</div>
		</div>
		<ul class="part2">
			<li>
				<span class="sp">手机号</span>
				<span class="tel">{{userInfo.mobile}}</span>
				<img src="~Assets/images/tlf.png"/>
			</li>
			<li @click="showRq_fun">
				<span class="sp">二维码</span>
				<img src="~Assets/images/rwm.png" />
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">

	export default{
		data(){
			return {
				userInfo: {
					name: 'aaa',
					mobile: '12312312312'
				}
			}
		},
		methods:{
			showRq_fun(){
				this.$router.push(`/conferenceMyQr?activityId=${this.activityId}`)
			},
			getActivityId(){
				let conferenceId = this.$route.query.conferenceId;
				this.$ajax({
					url:`/conference/rest/v1/client/conference/${conferenceId}/primary/activity`,
					success(res){
						res=JSON.parse(res);
						this.activityId = res.id
					},
					error(){
						
					}
				})
			}
		}
	}
</script>
<style lang="less" scoped>
	.conference-my{
		position: relative;
		height: 100%;
		.part1{
			height: 200px;
			background: url('~Assets/images/mybg2.png') no-repeat;
			background-size: cover;
			.avatar-wrap{
				padding-top: 50px;
				p{
					font-size: 5rem;
					color: white;
					margin-top: 5px;
				}
			}
		}
		.part2{
			padding-left: 20px;
			background: #fff;
			li{
				height: 70px;
				line-height: 70px;
				border-bottom: 1px solid #E9E9E9;/*no*/
				border-bottom: 0.5px solid #E9E9E9;/*no*/
				padding: 0 15px 0 0;
				background: white;
				position: relative;
				font-size: 0;
				img{
					width: 50px;
					position: absolute;
					right: 15px;
					top: 10px;
				}
				.sp{
					color:#333;
					font-size: 3rem;
				}
				.tel{
					color: #999999;
					font-size: 3rem;
					margin-left: 15px;
				}
			}
		}
	}
</style>			
