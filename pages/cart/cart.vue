<template>
	<view>
		<view class="main" v-if="goods.length!=0">
			<address-com></address-com>
			<view class="borderImage">
				<image src="../../static/cart_border@2x.png"></image>
			</view>
			<view class="carIcon">
				<uni-icons class="icon" type="shop" size="30"></uni-icons> 购物车
			</view>
			<view class="carGoods">
				<view class="item" v-for="item,index in goods" :key="item.goods_id" :style="'left:'+item.width+'px;'"
					@touchend="touchend($event,item,index)" @touchstart="touchstart($event)"
					@touchmove="touchmove($event,item,index)">
					<view class="radio">
						<radio style="transform:scale(0.7)" color="red" @click='selectR(item)'
							:checked="item.isChecked" />
					</view>
					<view class="">
						<image :src="item.goods_small_logo"></image>
					</view>
					<view class="">
						<p>{{item.goods_name}}</p>
						<view class="">
							<view class="">
								￥{{item.goods_price.toFixed(2)}}
							</view>
							<view class="">
								<uni-number-box v-model="item.num" :min="1" :max="100" @change="changeValue" />
							</view>
						</view>
					</view>
					<view class="delete" @click="removeGoods(index)">
						删除
					</view>
				</view>
			</view>
			<view class="bottomPay">
					<view class="">
						<label class="radio">
							<radio :checked="allCheck" style="transform:scale(0.7)" color="red" @click="allCheckChange"/><text>全选</text>
						</label>
					</view>
					<view class="">
						合计:<span style="color: red;">￥{{pirceSum.toFixed(2)}}</span>
					</view>
					<view class="">
						<span>结算（{{checkSum}}）</span>
					</view>
			</view>
		</view>
		<view class="emprt" v-else>
			<image src="../../static/cart_empty@2x.png"></image>
			<p>空空如也~~~</p>
		</view>
	</view>
</template>

<script>
	import mix from '@/mixins/mixins'
	import {mapGetters} from 'vuex'
	export default {
		mixins: [mix],
		data() {
			return {
				goods: [],
				checkedTimer:undefined,
				allCheckTimer:undefined,
				numChangeTimer:undefined,
				touchFn: {
					start: '',
					end: ''
				},
				listPosition: []
			};
		},
		computed:{ 
			...mapGetters(['checkSum','pirceSum','allCheck'])
		},
		onShow() {
			uni.getStorage({
				key: 'goodsData',
				success: res => {
					this.goods = res.data
				}
			})
		},
		mounted() {
			this.updataGoods()
		},
		methods: {
			// 获取缓存的购物车商品数据
			updataGoods(){
				uni.getStorage({
					key: 'goodsData',
					success: res => {
						this.goods = res.data
					}
				})
			},
			// 单选框点击事件
			selectR(item) {
				item.isChecked = !item.isChecked
				if(this.checkedTimer){
					clearTimeout(checkedTimer)
				}
				this.checkedTimer = setTimeout(_=>{
					  uni.setStorage({
					  	key:'goodsData',
					  	data:this.goods
					  })
					  this.checkedTimer = undefined
					  this.$store.commit('changeSum')
				},200)
			},
			// 计数器change事件
			changeValue(e) {
				if(this.numChangeTimer){
					clearTimeout(this.numChangeTimer)
				}
				this.numChangeTimer = setTimeout(_=>{
					uni.setStorage({
						key:'goodsData',
						data:this.goods
					})
					this.numChangeTimer = undefined
					this.$store.commit('changeSum')
				},500)
			},
			// 滑动显示删除↓
			touchstart(e) {
				this.touchFn.start = e.changedTouches[0].pageX
			},
			touchmove(e, item, i) {
				if (this.touchFn.start - e.changedTouches[0].pageX <= 80 && this.touchFn.start - e.changedTouches[0]
					.pageX > 0) {
					item.width = -(this.touchFn.start - e.changedTouches[0].pageX)
					this.goods.splice(i, 1, item)
				} else if (this.touchFn.start - e.changedTouches[0].pageX >= -80&&this.touchFn.start - e.changedTouches[0].pageX < 0) {
					item.width = -80 - (this.touchFn.start - e.changedTouches[0].pageX)
					this.goods.splice(i, 1, item)
				}
			},
			touchend(e, item, i) {
				if (this.touchFn.start - e.changedTouches[0].pageX >= 0) {
					if(this.touchFn.start - e.changedTouches[0].pageX >= 40){
						item.width = -80
						this.goods.splice(i, 1, item)
					}else{
						item.width = 0
						this.goods.splice(i, 1, item)
					}
				} else if (this.touchFn.start - e.changedTouches[0].pageX < 0) {
					item.width = 0
					this.goods.splice(i, 1, item)
				}
			},
			// 删除按钮的动画代码结束↑
			// 全选按钮操作
			allCheckChange(){
					this.goods.forEach(item=>{
						item.isChecked = !this.allCheck
					})
				if(this.allCheckTimer){
					clearTimeout(allCheckTimer)
				}
				this.allCheckTimer = setTimeout(_=>{
					uni.setStorage({
						key:'goodsData',
						data:this.goods
					})
					this.allCheckTimer = undefined
					this.$store.commit('changeSum')
				},200)
			},
			// 删除
			removeGoods(i){
				this.goods.splice(i,1)
				uni.setStorage({
					key:'goodsData',
					data:this.goods
				})
				this.$store.commit('changeSum')
			}
		}
	}
</script>

<style lang="scss"> 
	.main{
		overflow-x: hidden;
	}
	.borderImage {
		width: 100%;
		height: 10px;
		margin-bottom: 15px;

		>image {
			width: 100%;
			height: 5px;
		}
	}
	.carIcon{
		vertical-align: middle;
		font-size: 12px;
		>.icon{
			margin: 5px 10px 5px 5px;
			vertical-align: middle;
		}
	}
	.carGoods{
		margin-bottom: 40px;
	}
	.carGoods>.item {
		border: 1px solid rgba(128, 128, 128, 0.5);
		margin-top: -1px;
		display: flex;
		width: 100%;
		height: 200rpx;
		position: relative;

		>.delete {
			width: 80px;
			height: 100%;
			background-color: red;
			font-size: 16px;
			text-align: center;
			line-height: 200rpx;
			position: absolute;
			color: white;
			top: 0;
			right: 0;
			transform: translateX(100%);
		}

		>view:nth-child(1) {
			flex: 2;
			text-align: center;
			line-height: 200rpx;
		}

		>view:nth-child(2) {
			flex: 5;
			width: 200rpx;
			height: 200rpx;
			text-align: center;
			padding-top: 10rpx;

			>image {
				width: 180rpx;
				height: 180rpx;
			}
		}

		>view:nth-child(3) {
			flex: 12;
			padding: 0 10px;

			>p {
				height: 130rpx;
				font-size: 12px;
			}

			>view {
				display: flex;
				justify-content: space-between;

				>view:nth-child(1) {
					color: red;
				}
			}
		}
	}

	.emprt {
		width: 200rpx;
		height: 300rpx;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);

		>image {
			width: 100%;
			height: 200rpx;
		}

		>p {
			text-align: center;
			font-size: 12px;
			color: rgba(128, 128, 128, 0.6);
		}
	}
	.bottomPay{
		width: 100%;
		display: flex;
		height: 40px;
		justify-content: space-between;
		line-height: 40px;
		font-size: 14px;
		position: fixed;
		bottom: 0;
		background-color: white;
		>view:nth-child(3){
			width: 100px;
			height: 40px;
			background-color: red;
			color: white;
			text-align: center;
			line-height: 40px;
		}
	}
</style>
