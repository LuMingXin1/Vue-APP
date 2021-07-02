<template>
	<div class="signature-board">
		<div class="board">
			<vue-esign ref="esign" :width="width" :height="height" />
		</div>
		<div class="signature-buttons">
			<button @click="handleReset">清空画板</button> 
			<button @click="handleGenerate">生成图片</button>
		</div>
	</div>
</template>

<script>

export default {
	data(){
		return {
			width: 0,
			height: 0,
		}
	},
	methods: {
		// 清空画板
		handleReset() {
			this.$refs.esign.reset()
		},
		// 生成图片
		handleGenerate() {
			this.$refs.esign.generate()
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			})
		}
	},
	
	created() {
		this.width = document.documentElement.clientWidth
		this.height = document.documentElement.clientHeight
		window.addEventListener('resize', function() {
			console.log('?');
			console.log(document.documentElement.clientWidth,
									document.documentElement.clientHeight);
			this.width = document.documentElement.clientWidth
			this.height = document.documentElement.clientHeight
		})
	}
}
</script>

<style scoped>
.signature-board {
	width: 100vw;
	height: 100vh;
	position: relative;
}
.signature-buttons {
	position: absolute;
	width: 100vw;
	display: flex;
	justify-content: space-around;
}
.board {
	border: 1px solid #000;
}
</style>