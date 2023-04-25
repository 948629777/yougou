<template>
	<view>
		<view v-for="item in goods" :key="item.goods_id" class="goodsItem" @click="toDetail(item.goods_id)">
			<view class="logo">
				<image :src="item.goods_small_logo"></image>
			</view>
			<view class="right">
				<view class="title">
					{{item.goods_name}}
				</view>
				<view class="price">
					￥{{item.goods_price.toFixed(2)}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				total:1,
				goods: [],
				queryInfo: {
					query: '',
					cid: '',
					pagenum: 1,
					pagesize: 20
				}
			};
		},
		methods: {
			async getGoodsList() {
				const res = await uni.$http.get('/api/public/v1/goods/search', this.queryInfo)
				this.total = res.data.message.total
				this.goods = res.data.message.goods
				this.queryInfo.pagenum++
			},
			toDetail(id){
				uni.navigateTo({
					url: '/subpag/goods_detail/goods_detail?id='+id,
					success: res => {},
					fail: () => {},
					complete: () => {}
				});
			}
		},
		onLoad(op) { 
			this.queryInfo.query = op.query
			this.queryInfo.cid = op.cid
			this.getGoodsList()
		},
		onReachBottom() {
			if((this.queryInfo.pagenum-1)*this.queryInfo.pagesize>=this.total){
				uni.showToast({
					icon:'none',
					title: '数据已加载完'
				});
				return
			}
			this.getGoodsList()
		}
	}
</script>

<style lang="scss">
	.goodsItem {
		display: flex;
		border-bottom: 1px solid rgba(128, 128, 128, 0.4);
		padding: 8px;
	}
	.logo {
		flex: 1;
		>image{
			width: 80px;
			height: 80px;
		}
	}
	.right {
		flex: 3;
		font-size: 12px;
		>.title{
			
		}
		>.price{
			color: red;
			margin-top: 30px;
		}
	}
</style>
