import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import { createRef } from "react";
import * as stories from "./index.stories";
import { Input } from ".";

const testCases = Object.values(composeStories(stories)).map((Story) => [Story.storyName, Story]);

describe("Input", () => {
  describe("snapshotテスト", () => {
    test.each(testCases)("%s storyのレンダリング結果", async (_storyName, Story) => {
      const tree = await render(<Story />);
      expect(tree.baseElement).toMatchSnapshot();
    });
  });

  test("refをInputコンポーネントに渡すことができる", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInTheDocument();
  });
});
