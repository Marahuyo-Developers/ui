import type { Meta, StoryObj } from '@storybook/react';
import { useAppForm } from '../components/forms';

const meta: Meta<unknown> = {
  component: () => {
    const form = useAppForm({
      defaultValues: {
        inputTextValue: '',
        inputTextAreaValue: '',
        singleSelectValue: '',
        multiSelectValue: '',
        dateInputValue: new Date(),
        fileUploadValue: [] as File[],
      },
    });

    return (
      <div>
        <form action="" className="grid grid-cols-1 gap-2.5">
          <form.AppForm>
            <form.AppField name="inputTextValue">
              {(field) => (
                <field.TextInputField
                  labelProps={{ children: 'Input text' }}
                  inputProps={{ placeholder: 'Input text here' }}
                />
              )}
            </form.AppField>
            <form.AppField name="inputTextAreaValue">
              {(field) => (
                <field.TextAreaInputField
                  labelProps={{ children: 'Textarea' }}
                  textAreaProps={{ placeholder: 'Input text here' }}
                />
              )}
            </form.AppField>
            <form.AppField name="singleSelectValue">
              {(field) => (
                <field.SingleSelectField
                  labelProps={{ children: 'Single select' }}
                  placeHolder="Select option"
                  options={[
                    { label: 'Option 1', value: 'option-1' },
                    { label: 'Option 2', value: 'option-2' },
                    { label: 'Option 3', value: 'option-3' },
                  ]}
                />
              )}
            </form.AppField>
            <form.AppField name="multiSelectValue">
              {(field) => (
                <field.MultiSelectField
                  labelProps={{ children: 'Multi select' }}
                  placeHolder="Select option"
                  options={[
                    { label: 'Option 1', value: 'option-1' },
                    { label: 'Option 2', value: 'option-2' },
                    { label: 'Option 3', value: 'option-3' },
                    { label: 'Option 4', value: 'option-4' },
                    { label: 'Option 5', value: 'option-5' },
                  ]}
                />
              )}
            </form.AppField>
            <form.AppField name="dateInputValue">
              {(field) => (
                <field.SingleDateInputField
                  labelProps={{ children: 'Date Input' }}
                />
              )}
            </form.AppField>
            <form.AppField name="fileUploadValue">
              {(field) => (
                <field.FileUploadField
                  labelProps={{ children: 'Date Input' }}
                  fileUploadProps={{ multiple: true, maxFiles: 1 }}
                />
              )}
            </form.AppField>

            <form.SubscribeButton buttonProps={{ children: 'Submit' }} />
          </form.AppForm>
        </form>
      </div>
    );
  },
};

export default meta;

type Story = StoryObj<unknown>;

export const VariantDefault: Story = {
  args: {
    variant: 'default',
    children: 'Button',
  },
};
