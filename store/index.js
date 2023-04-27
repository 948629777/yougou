import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		data: {
			checkGoods: []
		}
	},
	getters: {
		sum: state => {
			var sum = 0
			for (var i = 0; i < state.data.checkGoods.length; i++) {
				sum += state.data.checkGoods[i].num
			}
			return sum
		},
		checkSum:state=>{
			var sum = 0
			for (var i = 0; i < state.data.checkGoods.length; i++) {
				if(state.data.checkGoods[i].isChecked){
					sum += state.data.checkGoods[i].num
				}
			}
			return sum
		},
		pirceSum:state=>{
			var sum = 0
			for (var i = 0; i < state.data.checkGoods.length; i++) {
				if(state.data.checkGoods[i].isChecked){
					sum += state.data.checkGoods[i].num*state.data.checkGoods[i].goods_price
				}
			}
			return sum
		},
		allCheck:state=>{
			var sum = true
			for (var i = 0; i < state.data.checkGoods.length; i++) {
				if(!state.data.checkGoods[i].isChecked){
					sum = false 
					break
				}
			}
			return sum
		}
	},
	mutations: {
		changeSum(state, e) {
			uni.getStorage({
				key: 'goodsData',
				success: res => {
					state.data.checkGoods = res.data
				},
				fail: res => {}
			})
		}
	},
	actions: {

	},
	modules: {

	}
})
