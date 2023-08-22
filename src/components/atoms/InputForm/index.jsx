import styles from "./styles.module.css"

export const InputForm = (props) => {
  const { inputValue, handleChangeValue, handleKeyDown, placeholder } = props;

  return (
    <input
      type="text"
      className={styles.input}
      value={inputValue}
      onChange={handleChangeValue}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
    />
  )
}