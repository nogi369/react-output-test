import { InputForm } from "../../atoms/InputForm";
import styles from "./styles.module.css"

export const AddTodo = (props) => {
  const { addInputValue, onChangeTodo, handleAddTodo } = props;

  return (
    <>
      <h2 className={styles.subTitle}>ADD TODO</h2>
      <InputForm
      inputValue={addInputValue}
      handleChangeValue={onChangeTodo}
      handleKeyDown={handleAddTodo}
      placeholder={"New Todo"}
      />
    </>
  )
}