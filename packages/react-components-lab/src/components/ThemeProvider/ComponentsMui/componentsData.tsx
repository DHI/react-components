import React from 'react';
import { Button, Switch } from '@material-ui/core';
import { ComponentList } from './types';

// make sure that the title value is the same as the name of the exported component from @material-ui/core.
const componentList: ComponentList[] = [
  {
    title: 'Button',
    description: 'This is Button description',
    components: [
      {
        component: <Button>Boom</Button>,
        codeExample: "<Button>\n \t{'Primary'}\n</Button>",
      },
      {
        component: (
          <Button variant="contained" color="primary">
            Boom
          </Button>
        ),
        codeExample:
          "<Button variant='contained' color='primary'>\n \t{'Primary'}\n</Button>",
      },
      {
        component: (
          <Button variant="outlined" color="primary">
            Boom
          </Button>
        ),
        codeExample:
          "<Button variant='outlined' color='primary'>\n \t{'Primary'}\n</Button>",
      },
      {
        component: (
          <Button variant="contained" color="secondary">
            Boom
          </Button>
        ),
        codeExample:
          "<Button variant='contained' color='secondary'>\n \t{'Primary'}\n</Button>",
      },
      {
        component: (
          <Button variant="outlined" color="secondary">
            Boom
          </Button>
        ),
        codeExample:
          "<Button variant='outlined' color='secondary'>\n \t{'Primary'}\n</Button>",
      },
    ],
  },
  {
    title: 'Switch',
    description: 'This is switch description',
    components: [
      {
        component: <Switch />,
        codeExample: '<Switch />',
      },
      {
        component: <Switch checked />,
        codeExample: '<Switch checked/>',
      },
      {
        component: <Switch color="primary" />,
        codeExample: '<Switch color="primary" />',
      },
      {
        component: <Switch color="secondary" />,
        codeExample: '<Switch color="secondary" />',
      },
    ],
  },
];

export default componentList;
