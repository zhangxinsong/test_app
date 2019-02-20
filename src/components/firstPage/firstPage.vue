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
					icon:"https://imoss.yonyoucloud.com/upesn/esn/385628/20180810/1712/69aa4d2c-63e5-4840-8be7-d087d8f452cf.png",
					name:"我的信息",
					url:"#/conferenceMy"
					},{
					icon:"https://imoss.yonyoucloud.com/upesn/esn/385628/20180810/1712/f7b26e9e-5795-4c2f-b502-8f352cd6aaa9.png",
					name:"排行榜",
					url:"#/rank"
					},{
					icon:"https://imoss.yonyoucloud.com/upesn/esn/385628/20180810/1712/b9cd6cbe-6070-4c0e-978d-83274992be3b.png",
					name:"答题闯关",
					url:"#/test"
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
			height: 340px;
			background: url('~Assets/images/sy8.png') no-repeat;
			background-size: cover;
		}
		.part2{
			position: absolute;
			top: 300px;
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
					margin-bottom: 25px;
					img{
						width: 90px;
					}
					p{
						font-size: 3.3rem;
						color: #666;
						margin-top: 20px;
					}
				}
			}
		}
	}
</style>