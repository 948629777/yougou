<template>
	<view class="main">
		<scroll-view scroll-y class="leftNav" :style="'height:'+boxHeight+'px;'">
			<view v-for="item,index in cateList" :key="index" :class="{'left_item':true,'active':index==active}" @click="showCur(index)">
				{{item.cat_name}}
				
				<scroll-view scroll-y class="right" :style="'height:'+boxHeight+'px;'" v-if="index==active">
					<view class="title">
						<view v-for="item1,index1 in item.children" :key="index1">
							<view :class="{'titleText':true,'active':index1==active1}" @click.stop="show2(index1)">
								{{item1.cat_name}}
							</view>
							<view class="right_main">
								<view class="right_item" v-for="item2,index2 in item1.children" :key="index2" v-if="index1==active1">
									{{item2.cat_name}}
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</scroll-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				boxHeight:0,
				cateList: [],
				active:0,
				active1:0
			};
		},
		methods: {
			async getCateList() {
				const res = await uni.$http.get('/api/public/v1/categories')
				console.log(res.data);
				this.cateList = res.data.message
			},
			// 大标题显示判断
			showCur(i){
				this.active = i
				this.active1 = 0
			},
			// 二级标题显示判断
			show2(i){
				this.active1 = i
			}
		},
		mounted() {
			// 设置盒子高度
			this.boxHeight =  uni.getSystemInfoSync().windowHeight
			this.getCateList()
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
	}
	.main {
		.leftNav {
			width:200rpx;
			box-sizing: border-box;
			font-size: 14px;
			height: 100rpx;
			text-align: center;
			line-height: 100rpx;
			.right{
				position: fixed;
				top: 0;
				left: 200rpx;
				.title{
					box-sizing: border-box;
					width: 550rpx;
					display: flex;
					flex-wrap: wrap;
					position: relative;
					>view{
						width: 25%;
						text-align: center;
						.right_main{
							width: 550rpx;
							position: absolute;
							bottom: 0;
							transform:translateY(100%);
							left: 0;
							display: flex;
							flex-wrap: wrap;
						}
					}
				}
			}
		}
	}
	.left_item.active{
		border-left: 3px solid red;
	}
	.titleText.active{
		border-bottom: 2px solid red;
	}
	.right_item{
			width: 33%;
			text-align: center;
			flex: none;
	}
</style>
