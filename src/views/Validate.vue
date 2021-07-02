<template>
	<div>
		name：<input type="text" v-model="form.name"><br>
		age：<input type="number" v-model="form.age"><br>
		<button @click="handleSubmit">submit</button>
	</div>
</template>

<script>
import schema from 'async-validator'
const descriptor = {
	name: {
		require: true,
		validator: (rule, value) => value === 'Joe',
		transform(val) {
			return val.trim()
		},
		message: '姓名出错'
	},
	age: {
		type: 'number',
		require: true,
		message: '年龄出错',
		validator(rule, value) {
			console.log('rule', rule);
			console.log('value', value);
		},
		transform(val) {
			console.log(val);
			return Number.parseInt(val)
		}
	},
}
const validator = new schema(descriptor);
export default {
	data() {
		return {
			form: {
				name: '',
				age: null,
			}
		}
	},
	methods: {
	handleSubmit() {
		this.form.age = Number.parseInt(this.form.age)
		console.log(typeof this.form.age);
		validator.validate(this.form,{first: true}, (err, fileds) => {
			if(err) {
				err.forEach((item) => {
					alert(item.message)
				})
			}
		})
		.then(res => {
			console.log(res);
		})
		.catch((err) => {
			console.log(err);
		})
	}
	},
	mounted() {
	}
}
</script>

<style lang='' scoped>

</style>