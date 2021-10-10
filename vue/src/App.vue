<template>
	<div id="app">
		<div class="app--main">
			<img src="./logo.svg" class="app--logo" />
			<form class="app--main--add-item" @submit.prevent="addItem">
				<label>Add a task</label>
				<div>
					<input v-model="description" placeholder="So, what's next?">
					<button
						:class="{ 'disabled' : isButtonDisabled() }"
					>Add</button>
				</div>
			</form>
			<ul class="app--main--items">
				<li 
					v-for="(item, index) in todos" 
					:key="index" 
					:index="index"
					ref="item" 
					:class="{ 'completed' : item.completed }">
					<button 
						@click="toggleItemStatus(index, item.description, item.completed)" 
						:data-key="item" 
						:class="{ 'completed' : item.completed }"
					></button>
					<div class="app--main--items-item-text">
						{{ item.description }}
					</div>
					<button 
						class="delete"
						@click="deleteItem(index)" 
						:data-key="item"
					>&times;
					</button>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				description: '',
				todos: []
			}
		},

		methods: {
			isButtonDisabled () {
				if (this.description == '') {
					return true
				} else {
					return false
				}
			},

			addItem () {
				if (this.description != '') {
					this.todos.push(
						{ 
							description: this.description,
							completed: false
						}
					)
					this.description = ''
					localStorage.setItem('todos', JSON.stringify(this.todos));
				}
			},

			deleteItem (index) {
				this.todos.splice(index, 1)
				localStorage.setItem('todos', JSON.stringify(this.todos));
			},

			toggleItemStatus (index, description) {
				this.todos[index]['description'] = description
				this.todos[index]['completed'] = !this.todos[index]['completed']
				localStorage.setItem('todos', JSON.stringify(this.todos));
			}
		},

		mounted () {
			const storedItems = localStorage.getItem('todos')
			this.todos = JSON.parse(storedItems)
		}
	}
</script>

<style lang="scss">
	* {
		box-sizing: border-box;
	}

	.app--main {
		font-family: sans-serif;
		max-width: 712px;
		margin: 0 auto;
		padding: 25px;
		border-radius: 4px;
	}

	.app--logo {
		width: 200px;
		margin: 0 auto 50px;
		display: block;
	}

	label {
		text-transform: uppercase;
		font-size: 14px;
		font-weight: bold;
		display: inline-block;
		text-align: center;
		width: 100%;
		margin-bottom: 5px;
		padding: 10px 0;
	}

	input {
		font-size: 20px;
		line-height: 30px;
		padding: 15px 20px;
		margin: 0 5px 10px 0;
		outline: none;
		background: #ffffff;
		width: 100%;
		border-radius: 4px;
		border: 1px solid #cccccc;
		box-shadow: inset 0px 5px 5px #f0f0f0;
		display: inline-block;

		&:focus {
			border: 1px solid #aaaaaa;
		}
	}

	button {
		font-size: 20px;
		line-height: 30px;
		padding: 15px 20px;
		margin: 0;
		outline: none;
		color: #ffffff;
		font-weight: bold;
		background: #273849;
		border: 1px solid #273849;
		transition: .5s ease background;
		cursor: pointer;
		width: 100%;
		top: -5px;
		position: relative;
		border-radius: 4px;
		-webkit-appearance: none;

		@media (min-width: 768px) {
			width: auto;
		}

		&.disabled {
			opacity: 0.25;
			cursor: not-allowed;
		}
	}

	.app--main--add-item {
		text-align: center;
		margin-bottom: 20px;

		@media (min-width: 768px) {
			display: flex;
			flex-flow: wrap;
		}

		div {
			@media (min-width: 768px) {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 100%;
			}
		}
	}

	.app--main--items {
		margin: 0;
		padding: 0;
		list-style-type: none;
		display: flex;
		flex-flow: column-reverse;

		li {
			padding: 15px 15px 15px 75px;
			box-shadow: 0 0px 10px rgb(0 0 0 / 10%);
			border-radius: 4px;
			font-size: 22px;
			line-height: 33px;
			margin: 0;
			position: relative;
			margin-bottom: 5px;
			transition: .5s ease opacity;

			&.completed {
				opacity: 0.25;

				button {
					background: #000000;
				}

				.app--main--items-item-text::before {
					width: 100%;
				}
			}

			.app--main--items-item-text {
				position: relative;
				display: inline;

				&:before {
					content: '';
					width: 0;
					transition: .5s ease width;
					border-bottom: 2px solid #000000;
					position: absolute;
					top: 12px;
				}
			}

			button {
				position: absolute;
				left: 25px;
				top: 20px;
				border-radius: 50%;
				width: 25px;
				height: 25px;
				display: block;
				padding: 0;
				border: 4px solid #000000;
				background: transparent;

				&.completed {
					background: #000000;
				}

				&.delete {
					right: 25px;
					left: unset;
					background: transparent;
					color: #ccc;
					border: 0;
					top: 16px;
					font-size: 30px;
					width: auto;
					height: auto;
				}
			}
		}
	}
</style>
