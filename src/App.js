import React, { component } from "react";
import Todo from "./component/Todo";
import AddTodo from "./component/AddTodo";
import Header from"./component/Header";
import axios from "axios";

import "./App.css";

class App extends React.Component {
  state = {
    todos: [],
    isLoading: false
  };

  componentDidMount() {
    const context = this
    this.setState({isLoading: true}, () =>
    axios
    .get("http://murmuring-eyrie-68644.herokuapp.com/todos")
    .then(res =>
      context.setState({
      todos: res.data,
      isLoading: false
      })
    )
    )
}

markComplete = id => {
  this.setState({
    todos: this.state.todos.map(todo => {
      if(todo._id === id) {
        todo.status = !todo.status;
      }
      return todo;
    })
  });
};

AddTodo = kegiatan => {
  axios
    .post("http://murmuring-eyrie-68644.herokuapp.com/todos", {
      kegiatan,
      status: false
    })
    .then(res =>
      this.setState({
        todos: [...this.state.todos, res.data]
      })
      );
};

render() {
  return (
    <div className="App">
      <div className="containe">
        <Header />
        <AddTodo AddTodo={this.AddTodo} />{" "}
        {this.state.isLoading? <div>Lagi loading...</div>:
        
        <Todo
        todos={this.state.todos}
        markComplete={this.markComplete}
        />}
      </div>{" "}
      </div>
    );
  }
 }

export default App;
