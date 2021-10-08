import { useEffect, useState, useRef } from 'react';
import logo from './logo.svg';
import './App.scss';

function App() {
	const [todos, updateTodos] = useState([]);
	const itemDescription = useRef();

	useEffect(() => {
		const storedItems = localStorage.getItem('todos');
		updateTodos(storedItems ? JSON.parse(storedItems) : [])
	}, []);

	const todoList = todos.map((item, index) => 
		(
			<li key={index}>
				<button></button>
				<div className="app--main--items-item-text">
					{item.description}
				</div> 
				<button 
					className="delete"
					key={index}
					onClick={() => deleteItem(index)}
				>
					&times;
				</button>
			</li>
		)
	);
	

	/**
	 * Disable submit button for empty input
	 */
	function isButtonDisabled() {

	}

	/**
	 * Adds item to todos[]
	 */
	function addItem(event) {
		event.preventDefault();
		const newItem = {
			description: itemDescription.current.value,
			completed: false
		};
		const updatedList = [...todos, newItem];
		updateTodos(updatedList);
		localStorage.setItem('todos', JSON.stringify(updatedList));
		itemDescription.current.value = ''
	}

	/**
	 * Deletes item from todos[]
	 */
	async function deleteItem(index) {
		todos.splice(index, 1);
		updateTodos(todos);
		localStorage.setItem('todos', JSON.stringify(todos));
	}

	/**
	 * Mark item as complete in todos[]
	 */
	function toggleItemStatus(index) {
		//todos[index][1] = !todos[index][1]
	}

	return (
		<div className="app">
			<div className="app--main">
				<img src={logo} className="app--logo" alt="Logo" />
				<form className="app--main--add-item" onSubmit={addItem}>
					<label>Add a task</label>
					<div>
						<input ref={itemDescription} placeholder="So, what's next?" />
						<button>Add</button>
					</div>
				</form>
				<ul className="app--main--items">
					{todoList}
				</ul>
			</div>
		</div>
	);
}

export default App;
