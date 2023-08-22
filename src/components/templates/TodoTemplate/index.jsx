import { AddTodo } from "../../organisms/AddTodo"
import { TodoList } from "../../organisms/TodoList"
import { InputForm } from "../../atoms/InputForm"
import { useTodo } from "../../../hooks/useTodo"
import styles from "./styles.module.css"

export const TodoTemplate = () => {
    const [
      { showTodoList, addInputValue, searchKeyword },
      {
        onChangeAddInputValue, 
        handleAddTodo,
        handleDeleteTodo,
        handleChangeSearchKeyword
      }
    ] = useTodo();
  
  // onChangeAddInputValue ＝ onChangeTodoだけ属性名に変更がある => onChangeAddInputValue は値ではなく処理だから
  // https://web-engineer-wiki.com/javascript/react/react-error02/
  // titleは、TodoPageに書くのではなく、こちらに書く
  return (
    <div className={styles.container} >
      <h1 className={styles.title}>Todo List</h1>
      <section className={styles.common}>
      <AddTodo
      addInputValue={addInputValue}
      onChangeTodo={onChangeAddInputValue}
      handleAddTodo={handleAddTodo}
      />
      </section >
      <section  className={styles.common}>
      <InputForm
      inputValue={searchKeyword}
      handleChangeValue={handleChangeSearchKeyword}
      placeholder={"Search Keyword"}
      />
      </section>
      <section  className={styles.common}>
      <TodoList
      todoList={showTodoList}
      handleDeleteTodo={handleDeleteTodo}
      />
      </section>
    </div>
  )
}
