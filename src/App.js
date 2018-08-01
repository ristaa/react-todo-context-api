import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const ToDoContext = React.createContext();

class ToDoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [
        {
          todo: "clean the house"
        },
        {
          todo: "buy milk"
        }
      ],
      todo: ""
    };
  }

  createNewToDoItem = () => {
    this.setState(({ list, todo }) => ({
      list: [
        ...list,
        {
          todo: todo
        }
      ],
      todo: ""
    }));
  };

  deleteItem = indexToDelete => {
    this.setState(({ list }) => ({
      list: list.filter((ToDoList, index) => index !== indexToDelete)
    }));
  };

  handleKeyPress = e => {
    if (e.target.value !== "") {
      if (e.key === "Enter") {
        this.createNewToDoItem();
      }
    }
  };

  handleInput = e => {
    this.setState({
      todo: e.target.value
    });
  };

  render() {
    return (
      <ToDoContext.Provider
        value={{ list: this.state.list, deleteItem: this.deleteItem }}
      >
        <div className="ToDo">
          <h1 className="ToDo-Header">
            Simple To-Do App using React Context API
          </h1>
          <div className="ToDo-Container">
            <input
              type="text"
              value={this.state.todo}
              onChange={this.handleInput}
              onKeyPress={this.handleKeyPress}
            />

            <button className="ToDo-Add" onClick={this.createNewToDoItem}>
              ADD ITEM
            </button>
          </div>
        </div>

        {this.props.children}
      </ToDoContext.Provider>
    );
  }
}

class ToDoItems extends React.Component {
  render() {
    return (
      <ToDoContext.Consumer>
        {({ list, deleteItem }) =>
          list.map((item, key) => {
            return (
              <div key={key}>
                {item.todo}
                <button
                  className="ToDoItem-Delete"
                  onClick={deleteItem.bind(this, key)}
                >
                  REMOVE
                </button>
              </div>
            );
          })
        }
      </ToDoContext.Consumer>
    );
  }
}

class App extends Component {
  render() {
    return (
        <div className="App">
		  <ToDoList>
			<ToDoItems />
		  </ToDoList>
		</div>
    );
  }
}

export default App;
