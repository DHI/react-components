import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as ExComp } from '../stories/ExComp.stories';

describe('ExComp', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ExComp />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
