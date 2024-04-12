import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import { Input } from ".";

const meta = {
  title: "@cm-front-test/ui/Input",
  component: Input,
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultArgs: ComponentProps<typeof Input> = {
  placeholder: "ユーザー名",
};
export const Sample: Story = {
  args: defaultArgs,
};

export const Invalid: Story = {
  args: {
    ...defaultArgs,
    isInvalid: true,
    label:"タイトル",
    errorMessage:"2文字以上",
    showCharacterCount:true,
    maxLength:200
  },
};
