<template>
	<div class="my scroll">
		<div class="part1">
			<div class="avatar-wrap">
				<p class="elli">{{userInfo.loginName}}</p>
			</div>
		</div>
		<ul class="part2">
			<li >
				<span class="sp">真实姓名</span>
				<span class="tel">{{userInfo.name}}</span>
				<img src="~Assets/images/rwm.png" />
			</li>
			<li>
				<span class="sp">手机号</span>
				<span class="tel">{{userInfo.mobile}}</span>
				<img src="~Assets/images/tlf.png"/>
			</li>
			<li >
				<span class="sp">邮箱</span>
				<span class="tel">{{userInfo.email}}</span>
				<img src="~Assets/images/rwm.png" />
			</li>
			<li >
				<span class="sp">性别</span>
				<span class="tel">{{userInfo.sex}}</span>
				<img src="~Assets/images/rwm.png" />
			</li>
			<li >
				<span class="sp">生日</span>
				<span class="tel">{{showBirthday}}</span>
				<img src="~Assets/images/rwm.png" />
			</li>
		</ul>
		<div class="edit" @click="edit">
			编辑
		</div>
		<div class="logout" @click="logout">
			退出
		</div>
	</div>
</template>
<script type="text/javascript">
import util from "../../global-ui/util.js"
	export default{
		data(){
			return {
				userInfo: {}
			}
		},
		computed: {
			showBirthday(){
				return util.formatDate(new Date(this.userInfo.birthday),"YYYY-MM-DD");
			}
		},
		methods:{
			getUserInfo(){
				var memberId = localStorage.getItem("memberId")
				this.$ajax.get(`/rest/v1/client/user/info?memberId=${memberId}`,{
				}).then(res => {
					this.userInfo = res.inAPIUser;
				}).catch(err => {
					console.log(err);
				})
			},
			edit(){
				this.$router.push({
					path: '/myEdit'
				})
			},
			logout(){
				this.$router.push({
					path: '/login'
				})
			}
		},
		created(){
			this.getUserInfo();
		}
	}
</script>
<style lang="less" scoped>
	.my{
		position: relative;
		height: 100%;
		.part1{
			height: 200px;
			background: url('~Assets/images/mybg2.png') no-repeat;
			background-size: cover;
			.avatar-wrap{
				padding-top: 70px;
				p{
					text-align: center;
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
					width: 18%;
					display: inline-block;
				}
				.tel{
					color: #999999;
					font-size: 3rem;
					margin-left: 15px;
				}
			}
		}
		.edit{
			width: 36%;
			height: 60px;
			background-color: #f05555;
			border-radius: 6px;
			color: #fff;
			margin: 20px auto 0 auto;
			font-size: 3.2rem;
			text-align: center;
			line-height: 60px;
		}
		.logout{
			width: 36%;
			height: 60px;
			background-color: #a7a7a7;
			border-radius: 6px;
			color: #fff;
			margin: 10px auto 0 auto;
			font-size: 3.2rem;
			text-align: center;
			line-height: 60px;
		}
	}
</style>			
