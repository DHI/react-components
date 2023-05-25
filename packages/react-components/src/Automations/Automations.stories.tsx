import { Meta } from '@storybook/react/types-6-0.d';
import React from 'react';
import AutomationsList from './AutomationsList/AutomationsList';

export default {
  title: 'Automations Components',
  component: AutomationsList,
} as Meta;

const disabledColumns = ['fullName', 'updated', 'taskId']

export const AutomationsStory = () => {
  return (
    <AutomationsList disabledColumns={disabledColumns} />
  );
};
