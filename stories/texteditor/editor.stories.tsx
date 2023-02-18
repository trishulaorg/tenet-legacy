import { Meta, Story } from '@storybook/react';
import { RichTextEditor, RichTextEditorProps } from '../../ui/texteditor/editor';

export default {
  title: 'texteditor/RichTextEditor',
  component: RichTextEditor,
} as Meta;

const Template: Story<RichTextEditorProps> = (args) => <RichTextEditor {...args} />;

export const Default = Template.bind({});
Default.args = {
};