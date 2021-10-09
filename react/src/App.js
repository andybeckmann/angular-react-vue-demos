import { React, Component, createRef } from 'react';
import logo from './logo.svg';
import './App.scss';
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			todos: [],
			input: ''
		}
		this.description = createRef();
		this.add = this.add.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount () {
		const storedItems = localStorage.getItem('todos');
		this.setState({
			todos: storedItems ? JSON.parse(storedItems) : []
		})
	}

	add () {
		this.props.onButtonClick(this.state.value);
		this.setState({ input: '' })
	}

	onChange (e) {
		this.SetState({ input: e.target.value })
	}

	addItem (event) {
		event.preventDefault();
		const newItem = {
			description: this.description.current.value,
			completed: false
		};
		const list = [...this.state.todos, newItem]
		this.setState({
			todos: list
		})
		localStorage.setItem('todos', JSON.stringify(list));
		this.setState({
			input: ''
		})
	}

	deleteItem(index) {
		this.state.todos.splice(index, 1);
		const list = [...this.state.todos]
		this.setState({
			todos: list
		})
		localStorage.setItem('todos', JSON.stringify(list));
	}

	toggleItemStatus(index) {
		const list = [...this.state.todos]
		list[index][1] = !list[index][1];
		this.setState({
			todos: list
		})
		localStorage.setItem('todos', JSON.stringify(list));
	}

	render() {
		return (
			<div className="app">
				<div className="app--main">
					<img src={logo} className="app--logo" alt="Logo" />
					<form className="app--main--add-item" onSubmit={(e) => this.addItem(e)}>
						<label>Add a task</label>
						<div>
							<input 
								ref={this.description}
								onChange={e => this.setState({ input: e.target.value })} 
								value={this.state.input}
								placeholder="So, what's next?" />
							<button 
								disabled={!this.state.input}
							>
								Add
							</button>
						</div>
					</form>
					<ul className="app--main--items">
						{this.state.todos.map((item, index) => (
						<li key={index} className={ item[1] ? "completed" : ''}>
							<button
								onClick={() => this.toggleItemStatus(index)}
								>
							</button>
							<div className="app--main--items-item-text">
								{item.description}
							</div> 
							<button 
								className="delete"
								onClick={() => this.deleteItem(index)}
							>
								&times;
							</button>
						</li>
						))}
					</ul>
				</div>
			</div>
		)
	}
}
