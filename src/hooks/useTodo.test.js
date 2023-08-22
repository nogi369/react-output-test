import { describe, test } from "node:test";

describe("【Hooksテスト】useApp test", () => {
  describe("【関数テスト】onChangeAddInputValue", () => {
    test("【正常系】addInputValueを更新できること", () => {
      // 変数
      const expectValue = "テスト"
      // 引数
      const eventObject = {
        target: {
          value: expectValue,
        },
      }
      const { result } = renderHook
    })
  })
})