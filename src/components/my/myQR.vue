<template>
	<div class="conference-my-qr">
		<div class="qr-wrap">
			<p class="p1">{{$t("my.show_qr_code")}}</p>
			<div id="qrcode-wrap">
				<!-- <div id="qrcode"></div> -->
			</div>

			<!-- <p class="p2">保存到本地</p> -->
		</div>
	</div>
</template>
<script type="text/javascript">

	export default{
		components:{

		},

		data(){
			return {
				
			}
		},

		mounted(){
			try{
				var dom = document.querySelector('#qrcode-wrap');
					dom.innerHTML='<div id="qrcode" style="width:100%;height:100%"></div>';
			}catch(e){};
			window.QRCode ? this.makeQR() : null ;
		},

		methods:{
		    makeQR () {
		    	var dom = document.querySelector('#qrcode');
		    	var w = dom.offsetWidth ;
				var h = dom.offsetHeight ;
				let activityId = this.$route.query.activityId

				var QR = new QRCode( dom ,{
					width  : w ,
					height : h
				});

				QR.makeCode((window.location.href).split("#")[0] + '#/conferencehelpSignInfo?memberId='+G.APP.userInfo.memberId + '&activityId='+activityId);
		    }
		}
	}
</script>
<style lang="less" scoped>
	.conference-my-qr{
		position: absolute;
		left: 0;right: 0;
		top: 0;bottom: 0;
		z-index: 1;
		background: #F5F5F5;
		box-shadow:0px 0px 30px 0px rgba(0,0,0,0.03);
		.qr-wrap{
			width: 315px;
			height: 330px;
			background: white;
			position: absolute;
			top: 40px;
			left: 50%;
			border-radius: 10px;
			transform: translateX(-50%);
			text-align: center;
			.p1{
				font-size: 16px;
				color: #666;
				margin-top: 30px;
				margin-bottom: 25px;
			}
			#qrcode-wrap{
				width: 224px;
				height: 224px;
				margin: 0 auto;
			}
			.p2{
				position: absolute;
				width: 250px;
				height: 44px;
				line-height: 44px;
				border-radius: 5px;
				background: #E14C46;
				color: white;
				font-size: 16px;
				left:50%;
				transform: translateX(-50%);
				bottom: 25px;
			}
		}
	}
</style>