import React, { useState } from "react";
import { Meta,StoryObj } from '@storybook/react';
import MantineModal from "./MantineModal";


const meta: Meta<typeof MantineModal>={
  title: "Components/MantineModal",
  component: MantineModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    showModal: { control: "boolean" },
    onClose: { action: "closed" },
    children: { control: "text" },
    modalHeadText: { control: "text" },
    modalHeadSubText: { control: "text" },
    size: { control: { type: "select", options: ["xs", "sm", "md", "lg", "xl"] } },
    fullScreen: { control: "boolean" },
  
  }, 
  args: { },
}satisfies Meta<typeof MantineModal>;

export default meta;
type Story = StoryObj<typeof MantineModal>;

export const ExtraSmall: Story = {
  args: {
    size: 'xs',
    children: 'Extra Small Button', 
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button', 
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button', 
  },
};

export const Large: Story = {
      args: {
        size: 'lg',
        children: 'Large Button', 
      },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: 'Extra Large Button', 
  },
};
    


