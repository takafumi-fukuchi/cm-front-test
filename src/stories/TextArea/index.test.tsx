import { composeStories } from "@storybook/react";
import { render } from "@testing-library/react";
import { createRef } from "react";
import * as stories from "./index.stories";
import { TextArea } from ".";

const testCases = Object.values(composeStories(stories)).map((Story) => [Story.storyName, Story]);

describe("TextArea", () => {
  describe("snapshotテスト", () => {
    test.each(testCases)("%s storyのレンダリング結果", async (_storyName, Story) => {
      const tree = await render(<Story />);
      expect(tree.baseElement).toMatchSnapshot();
    });
  });

  test("refをTextAreaコンポーネントに渡すことができる", () => {
    const ref = createRef<HTMLTextAreaElement>();
    render(<TextArea ref={ref} />);
    expect(ref.current).toBeInTheDocument();
  });
});
