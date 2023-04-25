<template>
	<view>
		<swiper autoplay indicator-dots indicator-color="white" indicator-active-color="red" circular interval="2000">
			<swiper-item class="swiperitem" v-for="item in goodsDetail.pics" :key="item.pics_id">
				<image :src="item.pics_big"></image>
			</swiper-item>
		</swiper>
		<view class="title">
				<p>￥{{goodsDetail.goods_price}}</p>
				<view class="">
					<p>
					{{goodsDetail.goods_name}}
					</p>
					<view class="">
						<uni-icons class="icon" type="star" size="20"></uni-icons>
						<p>收藏</p>
					</view>
				</view>
				<p>快递：免运费</p>
		</view>
		<rich-text :nodes="goodsDetail.goods_introduce"></rich-text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				goodsDetail: {
					goods_name:'',
					goods_price:''
				}
			};
		},
		onLoad(op) {
			this.id = op.id
			this.getGoods()
		},
		methods: {
			async getGoods() {
				const res = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id: this.id
				})
				console.log(res.data);
				this.goodsDetail = res.data.message
			}
		}
	}
</script>

<style lang="scss">
	swiper{
		height: 750rpx;
	}
	.swiperitem {
		width: 100%;
		height: 750rpx;
		>image {
			width: 100%;
			height: 750rpx;
		}
	}
	.title{
		font-size: 12px;
		padding-left: 15px;
		margin-bottom: 50px;
		>p:nth-child(1){
			font-size: 16px;
			color: red;
			margin: 15px 0;
		}
		>view:nth-child(2){
			display: flex;
			>p{
				flex: 10;
			}
			>view:nth-child(2){
				flex: 1;
				text-align: center;
			}
		}
		>p:nth-child(3){
			color: rgba(128, 128, 128, 0.5);
		}
	}
</style>
