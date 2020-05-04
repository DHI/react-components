import React, { useState } from 'react';
import { withKnobs, number } from '@storybook/addon-knobs';

import { DebInput } from '../src';

export default {
  title: 'Debounced Input',
  component: DebInput,
  decorators: [withKnobs],
};

export const searchItWithFnProp = () => {
  const [inputTxt, setInputTxt] = useState('');

  const inputFn = (searchStr: string) => {
    console.log(`Using Search string: "${searchStr}"`);
    setInputTxt(searchStr);
  };

  return (
    <div>
      <DebInput inputFn={inputFn} />
      <p>Debouncing keyboard input using component's default value of 500ms.</p>

      <p>Text you entered is displayed here: "{inputTxt}"</p>
    </div>
  );
};

export const searchItDebouncePropSet = () => {
  const [inputTxt, setInputTxt] = useState('');
  const [debounceMs, setDebounceMs] = useState(2000);

  const inputFn = (searchStr: string, dbValue: number) => {
    setDebounceMs(dbValue);
    setInputTxt(searchStr.toUpperCase());
  };

  return (
    <div>
      <DebInput
        inputFn={inputFn}
        debounce={number('debounce time ms', debounceMs)}
      />
      <p>Input function transforms text to upper case.</p>
      <p>
        Debouncing keyboard input using a debounce value of {debounceMs}ms. You
        can change debounce value via Knobs tab{' '}
      </p>

      <p>Text entered is displayed here: "{inputTxt}"</p>
    </div>
  );
};
