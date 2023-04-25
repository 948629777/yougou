<template>
	<view class="pay">
		<view class="shop">
			<!-- <uni-icons type="shop" size="30"></uni-icons> -->
			<p>店铺</p>
		</view>
		<view class="shopcar">
			<!-- <uni-icons type="contact" size="30"></uni-icons> -->
			<!-- <uni-badge class="uni-badge-left-margin" text="1" /> -->
			<p>购物车</p>
		</view>
		<view class="btn">
			<view class="addcar">
				加入购物车
			</view>
			<view class="">
				立即购买
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"paynav",
		data() {
			return {
				goods:{}
			};
		},
		methods:{
			
		}
	}
</script>

<style lang="scss">
.pay{
	display: flex;
	>view{
		flex: 1;
	}
	>view:{}
}
</style>