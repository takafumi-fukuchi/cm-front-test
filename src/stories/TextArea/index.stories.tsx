import type { Meta, StoryObj } from "@storybook/react";
import type { ComponentProps } from "react";
import { TextArea } from ".";

const meta = {
  title: "@cm-front-test/ui/TextArea",
  component: TextArea,
} satisfies Meta<typeof TextArea>;

export default meta;

type Story = StoryObj<ComponentProps<typeof TextArea>>;

export const Sample: Story = {
  args: {
    placeholder: "記事の説明を入力してください",
  },
  render: (args) => <TextArea {...args} />,
};

export const WithDynamicCharacterCount: Story = {
  args: {
    ...Sample.args,
  },
  render: (args) => <TextArea {...args} />,
};

export const Invalid: Story = {
  args: {
    ...Sample.args,
    isInvalid: true,
    label: "本文",
    errorMessage: "2文字以上入力してください",
    maxLength:300,
    required:true,
  },
  render: (args) => <TextArea {...args} />,
};