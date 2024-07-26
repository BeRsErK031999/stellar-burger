import React from 'react';
import OrderDetailsUI from '../components/ui/order-details/order-details'; // Используем импорт по умолчанию
import type { Meta, StoryObj } from '@storybook/react';
import { TOrder, TIngredient } from '../utils/types';

const meta = {
  title: 'Example/OrderDetails',
  component: OrderDetailsUI,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen'
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 'fit-content',
          margin: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof OrderDetailsUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultOrderDetails: Story = {
  args: {
    order: {
      _id: '1',
      number: 12345,
      name: 'Test Order',
      ingredients: ['ingredient1', 'ingredient2'],
      status: 'done',
      createdAt: '2022-01-01T00:00:00.000Z',
      updatedAt: '2022-01-01T00:00:00.000Z'
    } as TOrder,
    ingredients: [
      {
        _id: 'ingredient1',
        name: 'Ingredient 1',
        type: 'bun',
        proteins: 10,
        fat: 5,
        carbohydrates: 20,
        calories: 100,
        price: 100,
        image: 'image1.jpg',
        image_mobile: 'image1.jpg',
        image_large: 'image1.jpg',
        __v: 0
      },
      {
        _id: 'ingredient2',
        name: 'Ingredient 2',
        type: 'main',
        proteins: 20,
        fat: 10,
        carbohydrates: 30,
        calories: 200,
        price: 200,
        image: 'image2.jpg',
        image_mobile: 'image2.jpg',
        image_large: 'image2.jpg',
        __v: 0
      }
    ] as TIngredient[]
  }
};
