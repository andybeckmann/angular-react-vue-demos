# Angular-Vue-React-demos

This repository contains a sample todo list application built three times using Angular.js, Vue.js, and React.js. Each app uses the same CSS styles and HTML markup, and saves the data to localStorage.

## Vue

| Measurement  | Data |
|:--|:--|
| JavaScript & HTML | 89 lines |
| Total packages | 1337 packages |
| Project install tim | 17s |
| Project build time | 5s |

*This example uses the Options API instead of the Composition API*

### Screenshot

![Vue Todo App Screenshot](/screenshot-vue.png?raw=true)

### Code (1 file)

[…/vue/src/app.vue](https://github.com/andybeckmann/angular-vue-react/blob/main/vue/src/App.vue)

```vue
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
```

## React

| Measurement  | Data |
|:--|:--|
| JavaScript & HTML | 110 lines |
| Total packages | 1996 packages |
| Project install time | 26s |
| Project build time | 9s |

*This example uses class-based components instead of function-based components*

### Screenshot

![React Todo App Screenshot](/screenshot-react.png?raw=true)

### Code (2 files)

1. […/react/src/app.js](https://github.com/andybeckmann/angular-vue-react/blob/main/react/src/App.js)

```jsx
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
```

2. […/react/src/app.scss](https://github.com/andybeckmann/angular-vue-react/blob/main/react/src/App.js)

## Angular

| Measurement  | Data |
|:--|:--|
| JavaScript & HTML	| 98 lines |
| Total packages | 0 packages |
| Project install time | 0s |
| Project build time | 0s |

### Screenshot

![Angular Todo App Screenshot](/screenshot-angular.png?raw=true)

### Code (4 files)

1. [./angular/src/app/app.module.ts](https://github.com/andybeckmann/angular-vue-react-demos/blob/main/angular/src/app.app.component.ts)

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

2. [./angular/src/app/app.component.ts](https://github.com/andybeckmann/angular-vue-react/blob/main/angular/src/app/app.component.ts)

```typescript
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
```

3. [./angular/src/app/app.component.html](https://github.com/andybeckmann/angular-vue-react/blob/main/angular/src/app/app.component.html)

```html
<div class="app">
  <div class="app--main">
    <img src="/assets/logo.svg" class="app--logo" alt="Logo" />
    <form class="app--main--add-item" (ngSubmit)="addItem()">
      <label>Add a task</label>
      <div>
        <input
          name="input"
          [(ngModel)]="input"
          placeholder="So, what's next?"
        >
        <button
          [disabled]="!(input.length>0)"
        >
        Add
        </button>
      </div>
    </form>
    <ul class="app--main--items">
      <li 
        *ngFor="let item of todos; let i = index"
        [attr.data-index]="i" 
        [ngClass]="{ 'completed' : item[1] == true }"
      >
        <button
          (click)="toggleItemStatus(i)"
        ></button>
        <div class="app--main--items-item-text">
           {{ item.description }}
        </div>
        <button
          class="delete"
          (click)="deleteItem(i)"
        &times;
        </button>
      </li>
    </ul>
  </div>
</div>
```

4. […/angular/src/app/app.component.scss](https://github.com/andybeckmann/angular-vue-react/blob/main/angular/src/app/app.component.scss)

