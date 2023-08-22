import styles from "./styles.module.css"
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TodoList = ({todoList, handleDeleteTodo}) => {
  return (
    <ul className={styles.list}>
      {todoList.map(todo => (
        <li className={styles.todo} key={todo.id}>
          <span className={styles.task}>{todo.title}</span>
          <div className={styles.far}>
            <FontAwesomeIcon
            icon={faTrashCan}
            size="lg"
            onClick={() => {handleDeleteTodo(todo.id, todo.title)}}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

