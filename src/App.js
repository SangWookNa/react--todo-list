import React, { Component } from 'react';
import TodoListTemplate from './components/TodoListTemplate';
import Form from './components/Form';
import TodoItemList from './components/TodoItemList';
import Palette from './components/Palette';

class App extends Component {

  id = 3

  state = {
    input : '',
    todos : [
      { id : 0, text : 'react', checked : false , color : '#343a40'},
      { id : 1, text : 'react', checked : true ,  color : '#f03e3e' },
      { id : 2, text : 'react', checked : false,  color : '#12b886' }
    ],
    palette : [
      { id : 0, color : '#343a40', checked : false },
      { id : 1, color : '#f03e3e', checked : false },
      { id : 2, color : '#12b886', checked : false },
      { id : 3, color : '#228ae6', checked : false }
    ],
    color : ''
  }

  handleChange = (e) => {
    this.setState({
      input : e.target.value 
    });
  }

  handleCreate = () => {
    const { input, todos ,color }=this.state;
    this.setState({
      input : '',
      // concat 을 사용하여 배열에 추가하였습니다다다다
      todos : todos.concat({
        id : this.id++,
        text : input,
        checked : false,
        color : color
      })
    });
  }

  handleKeyPress = (e) => {
    //눌려진 키가 Enter 면 handleCreate 호출하였습니다
    if(e.key === 'Enter'){
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const { todos } =  this.state;

    // 파라메터로 받은 id를 가지고 몇번째 아이템인지 찾습니다.
    const index = todos.findIndex(todo => todo.id === id);
    const selected = todos[index]; //선택한 객체

    const nextTodos = [...todos]; //배열을 복사

    //기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextTodos[index] = {
      ...selected,
      checked : !selected.checked
    }

    this.setState({
      todos : nextTodos
    });
  }

  handleRemove = (id) => {
    const { todos } = this.state;
    this.setState({
      todos : todos.filter(todo => todo.id !== id)
    });
  }

  handlePaletteClick = (id) => {
    const { palette } =  this.state;
    // 파라메터로 받은 id를 가지고 몇번째 아이템인지 찾음
    const index = palette.findIndex(palette => palette.id === id);
    const selected = palette[index]; //선택한 객체    

    this.setState({
      palette : palette.map(
        //새 객체를 만들어서 기존값과 전달받은data를덮음
        info => index === info.id ? { ...selected, checked : true } 
          : { ...info, checked : false }  //기존값 그대로 유지
      )
    })
    this.setState({
      color : selected.color
    })

  }

  render() {
    const { input,todos,palette,color } = this.state;
      
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
      handleRemove,
      handlePaletteClick
    } = this;

    return (
      <TodoListTemplate form={(
        <Form
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
          color ={color}
        />
      )}
      palette = {(
        <Palette
          palette={palette}  
          onClick = {handlePaletteClick}
      />
      )}

      >
        <TodoItemList todos={ todos } onToggle= { handleToggle } onRemove={handleRemove}/>
      </TodoListTemplate>
    );
  }
}

export default App;
