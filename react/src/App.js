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

	function isButtonDisabled() {
		if (itemDescription.current.value = '') {
			return false
		} else {
			return true
		}
	}

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

	function deleteItem(index) {
		todos.splice(index, 1);
		const updatedList = [...todos]
		updateTodos(updatedList);
		localStorage.setItem('todos', JSON.stringify(updatedList));
	}

	function toggleItemStatus(index) {
		todos[index][1] = !todos[index][1]
		const updatedList = [...todos]
		updateTodos(updatedList);
		localStorage.setItem('todos', JSON.stringify(updatedList));
	}

	return (
		<div className="app">
			<div className="app--main">
				<img src={logo} className="app--logo" alt="Logo" />
				<form className="app--main--add-item" onSubmit={addItem}>
					<label>Add a task</label>
					<div>
						<input ref={itemDescription} placeholder="So, what's next?" />
						<button 
							disabled={itemDescription === ""}
						>
							Add
						</button>
					</div>
				</form>
				<ul className="app--main--items">
					{todos.map((item, index) => (
					<li key={index} className={ item[1] ? "completed" : ''}>
						<button
							onClick={() => toggleItemStatus(index)}
							>
						</button>
						<div className="app--main--items-item-text">
							{item.description}
						</div> 
						<button 
							className="delete"
							onClick={() => deleteItem(index)}
						>
							&times;
						</button>
					</li>
					))}
				</ul>
			</div>
		</div>
	);
}

export default App;
