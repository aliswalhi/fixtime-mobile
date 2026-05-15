import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ServiceCard from '../components/ServiceCard';

test('renders service title and handles press', () => {
  const onPressMock = jest.fn();

  const { getByText } = render(
    <ServiceCard
      title="Cleaning"
      icon="🧹"
      onPress={onPressMock}
    />
  );

  fireEvent.press(getByText('Cleaning'));

  expect(getByText('Cleaning')).toBeTruthy();
  expect(onPressMock).toHaveBeenCalledTimes(1);
});