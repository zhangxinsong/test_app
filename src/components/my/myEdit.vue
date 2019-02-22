<template>
	<div class="myEdit scroll">
		<div class="part1">
			<div class="avatar-wrap">
				<p class="elli">个人资料</p>
			</div>
		</div>
		<div class="part2">
			<ul>
				<li>
					<span>用户名</span>
					<div class="birthday">{{loginName}}</div>
				</li>
				<li>
					<span>真实姓名</span>
					<input type="text" v-model="name" placeholder="请输入姓名">
				</li>
				<li>
					<span>手机号</span>
					<input type="text" v-model="mobile" placeholder="请输入手机号">
				</li>
				<li>
					<span>邮箱</span>
					<input type="text" v-model="email" placeholder="请输入邮箱">
				</li>
				<li>
					<span>性别</span>
					<input type="text" v-model="sex" placeholder="请输入邮箱">
				</li>
				<li>
					<span>生日</span>
					<div class="birthday" @click="openDate">{{birthday&&showBirthday||"点击选择日期"}}</div>
				</li>
			</ul>
		</div>
		<div class="edit" @click="saveUserInfo">保存</div>
		<mt-datetime-picker
			ref="picker"
			type="date"
			v-model="birthday">
		</mt-datetime-picker>
	</div>
</template>
<script type="text/javascript">
import util from "../../global-ui/util.js"
	export default{
		data(){
			return {
				loginName: '',
				name: '',
				mobile: '',
				email: '',
				birthday: '',
				sex: ''
			}
		},
		computed: {
			showBirthday(){
				return util.formatDate(new Date(this.birthday),"YYYY-MM-DD");
			}
		},
		created(){
			this.getUserInfo();
		},
		methods:{
			getUserInfo(){
				var memberId = localStorage.getItem("memberId");
				this.$ajax.get(`/rest/v1/client/user/info?memberId=${memberId}`,{
				}).then(res => {
					this.loginName = res.inAPIUser.loginName;
					this.name = res.inAPIUser.name;
					this.mobile = res.inAPIUser.mobile;
					this.email = res.inAPIUser.email;
					this.birthday = new Date(res.inAPIUser.birthday);
					this.sex = res.inAPIUser.sex;
				}).catch(err => {
					console.log(err);
				})
			},
			saveUserInfo(){
				var memberId = localStorage.getItem("memberId");
				this.$ajax.put(`/rest/start/signin/update/${memberId}`,{
					birthday: this.birthday,
					email: this.email,
					mobile: this.mobile,
					name: this.name,
					sex: this.sex
				}).then(res => {
					this.$tip.say("保存成功")
					this.$router.back();
				}).catch(err => {
					console.log(err);
				})
			},
			openDate(){
				this.$refs.picker.open();
			}
		}
	}
</script>
<style lang="less" scoped>
	.myEdit{
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
			width: 100%;
			li{
				width: 100%;
				height: 70px;
				line-height: 70px;
				border-bottom: 1px solid #E9E9E9;/*no*/
				border-bottom: 0.5px solid #E9E9E9;/*no*/
				padding: 0 15px 0 0;
				background: white;
				position: relative;
				font-size: 3rem;
				span{
					display: inline-block;
					width: 30%;
					padding-left: 20px;
				}
				input{
					width: 60%;
					height: 60px;
					border: none;
					text-align: right;
					font-size: 3.2rem;
				}
				.birthday{
					display: inline-block;
					width: 60%;
					text-align: right;
					color: #adadad;
				}
			}
		}
		.edit{
			width: 36%;
			height: 60px;
			background-color: #f05555;
			border-radius: 6px;
			color: #fff;
			margin: 40px auto 0 auto;
			font-size: 3.2rem;
			text-align: center;
			line-height: 60px;
		}
	}
</style>