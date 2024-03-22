import { Meta, StoryObj } from '@storybook/react';

import MantineBtn from './MantineBtn'; 

const meta: Meta<typeof MantineBtn> = {
    title: 'Components/MantineBtn',
    component: MantineBtn,
    parameters: {
      layout: 'centered',
      backgrounds: {
        default: 'light'
      }
    },
    tags: ['autodocs'],
    argTypes: {
      size: { control: { type: "select", options: ["sm", "lg"] } }
    },
    args: { variant: "primary" },
  } satisfies Meta<typeof MantineBtn>;

// Define a template for your story
export default meta;

type Story = StoryObj<typeof MantineBtn>;

export const Primary: Story = {
    name: 'Primary Button',
    render: () => <MantineBtn children="Button"/>
    };

export const Large: Story = {
          args: {
            size: 'lg',
            children: 'Large Button', 
          },
        };
        
export const Small: Story = {
          args: {
            size: 'sm',
            children: 'Small Button',
          },
        };
