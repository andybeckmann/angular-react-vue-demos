import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {
	todos: Array<any> = [];
	input: String = '';

	ngOnInit() {
		const storedData = localStorage.getItem('todos');
		this.todos = JSON.parse(storedData as string) || []
	}

	addItem () {
		const newItem = {
			description: this.input,
			completed: false
		};
		this.todos.push(newItem)
		localStorage.setItem('todos', JSON.stringify(this.todos));
		this.input = ''
	}

	deleteItem(index: number) {
		this.todos.splice(index, 1);
		localStorage.setItem('todos', JSON.stringify(this.todos));
	}

	toggleItemStatus(index: number) {
		this.todos[index][1] = !this.todos[index][1];
		localStorage.setItem('todos', JSON.stringify(this.todos));
	}
}
