import { renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { useTodo } from "./useTodo";
import { act } from "react-dom/test-utils";
import { INIT_TODO_LIST } from "../constants/data";

describe("【Hooksテスト】useApp test", () => {
  describe("【関数テスト】onChangeAddInputValue", () => {
    test("【正常系】addInputValueを更新できること", () => {
      // 予測値
      const expectValue = "テスト";
      // 引数
      const eventObject = {
        target: {
          value: expectValue,
        },
      };
      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      expect(result.current[0].addInputValue).toBe("");
      // hooks関数の実行
      act(() => result.current[1].onChangeAddInputValue(eventObject));
      expect(result.current[0].addInputValue).toBe(expectValue);
    });
  });

  describe("【関数テスト】handleAddTodo", () => {
    // 期待値
    let expectTodoList = [];
    // 引数
    let eventObject = {
      target: {
        value: "テスト",
      },
      key: "Enter",
    };
    // 引数の初期化処理(test関数が実行される前に毎回実行される)
    // (条件) EnterKeyを押された かつ 入力値が空文字でないこと
    beforeEach(() => {
      eventObject = {
        target: {
          value: "テスト",
        },
        key: "Enter",
      };
    });

    test("【正常系】todoList, uniqueIdが更新されること、addInputValueがリセットされること", () => {
      // 1
      const expectTodoTitle = "Todo3";
      expectTodoList = INIT_TODO_LIST.concat({
        // concat = 配列の結合
        id: 3,
        title: expectTodoTitle,
      });
      eventObject.target.value = expectTodoTitle; // "テスト" => "Todo3"

      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      expect(result.current[0].addInputValue).toBe("");
      // hooks関数の実行(addInputValueを更新)
      act(() => result.current[1].onChangeAddInputValue(eventObject));
      expect(result.current[0].addInputValue).toBe(expectTodoTitle);

      // hooks関数の実行: handleAddTodoの実行
      act(() => result.current[1].handleAddTodo(eventObject));
      expect(result.current[0].showTodoList).toEqual(expectTodoList); // todoListが更新される
      expect(result.current[0].addInputValue).toBe(""); // 入力値がリセットされる
    });
    test("【正常系】エンターキーを押していない場合、処理が発生しないこと", () => {
      // 2
      // 予測値
      const expectTodoTitle = "Todo4"; // 同じ値が重複しないように値の名前を変える
      expectTodoList = INIT_TODO_LIST.concat({
        // expectTodoListは同じものを使いまわし
        id: 3,
        title: expectTodoTitle,
      });
      eventObject.target.value = expectTodoTitle;
      eventObject.key = "";
      const { result } = renderHook(() => useTodo());
      // addInputValue
      expect(result.current[0].addInputValue).toBe("");
      act(() => result.current[1].onChangeAddInputValue(eventObject));
      expect(result.current[0].addInputValue).toBe(expectTodoTitle);
      // handleAddTodo
      act(() => result.current[1].handleAddTodo(eventObject));
      expect(result.current[0].showTodoList).not.toEqual(expectTodoList);
      expect(result.current[0].addInputValue).not.toBe("");
    });
    test("【正常系】入力値がない場合、処理が発生しないこと", () => {
      // 3
      // 予測値
      const expectTodoTitle = "Todo5";
      expectTodoList = INIT_TODO_LIST.concat({
        id: 3,
        title: expectTodoTitle,
      });
      eventObject.target.value = "";
      const { result } = renderHook(() => useTodo());
      // addInputValue
      expect(result.current[0].addInputValue).toBe("");
      act(() => result.current[1].onChangeAddInputValue(eventObject));
      // expect(result.current[0].addInputValue).not.toBe(expectTodoTitle);
      expect(result.current[0].addInputValue).toBe(""); // 処理が発生しない = そのままでOK
      // handleAddTodo
      act(() => result.current[1].handleAddTodo(eventObject));
      expect(result.current[0].showTodoList).not.toEqual(expectTodoList);
      // expect(result.current[0].addInputValue).toBe(""); // addInputValueで確認できてるから書く必要がない
    });

    test("【正常系】検索キーワードがある場合", () => {
      // ４
      // TODO: 確認1: 検索結果でshowTodoListが更新されること
    });

    describe("【関数テスト】handleDeleteTodo", () => {
      let expectTodoList = [];
      beforeEach(() => {
        expectTodoList = [];
      });
      test("【正常系】todoが削除されること", () => {
        const targetId = 1;
        const targetTitle = "テスト";
        // mock化
        window.confirm = vi.fn().mockReturnValueOnce(true); // 「はい」を押す = true
        // 予測値
        expectTodoList = INIT_TODO_LIST.filter((todo) => todo.id !== targetId);

        const { result } = renderHook(() => useTodo());
        // handleDeleteTodo
        act(() => result.current[1].handleDeleteTodo(targetId, targetTitle)); // handleDeleteTodoの引数を渡す
        expect(result.current[0].showTodoList).toEqual(expectTodoList); // expectTodoList = []
      });
    });
  });
});
