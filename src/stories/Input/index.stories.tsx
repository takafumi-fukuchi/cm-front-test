import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import { Input } from ".";

const meta = {
  title: "@columbus-front/ui/Input",
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
  },
};
