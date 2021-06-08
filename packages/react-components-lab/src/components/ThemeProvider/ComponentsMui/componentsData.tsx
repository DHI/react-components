import React from 'react';
import { Box, Button, Switch, Typography } from '@material-ui/core';

// #region Local imports
import { ComponentList } from './types';
import mikePalette from '../mikePallete';
// #endregion

// make sure that the title value is the same as the name of the exported component from @material-ui/core.
const componentsData: ComponentList[] = [
  {
    title: 'Color',
    description:
      'Colors collection that we used based on DHI official color palette',
    pinned: true,
    sub: [
      {
        title: 'Primary Colors',
        description: '',
        components: [
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box margin={1} padding={1} bgcolor={mikePalette.primary.main}>
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Main
                  </Typography>
                </Box>
                <Typography variant="body2">#0B4566</Typography>
              </div>
            ),
          },
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box margin={1} padding={1} bgcolor={mikePalette.primary.dark}>
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Dark
                  </Typography>
                </Box>
                <Typography variant="body2">#09334B</Typography>
              </div>
            ),
          },
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box margin={1} padding={1} bgcolor={mikePalette.primary.light}>
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Light
                  </Typography>
                </Box>
                <Typography variant="body2">#93C4D4</Typography>
              </div>
            ),
          },
        ],
      },
      {
        title: 'Secondary Colors',
        description: '',
        components: [
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box
                  margin={1}
                  padding={1}
                  bgcolor={mikePalette.secondary.main}
                >
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Main
                  </Typography>
                </Box>
                <Typography variant="body2">#00A4EC</Typography>
              </div>
            ),
          },
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box
                  margin={1}
                  padding={1}
                  bgcolor={mikePalette.secondary.dark}
                >
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Dark
                  </Typography>
                </Box>
                <Typography variant="body2">#008BEC</Typography>
              </div>
            ),
          },
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box
                  margin={1}
                  padding={1}
                  bgcolor={mikePalette.secondary.light}
                >
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Light
                  </Typography>
                </Box>
                <Typography variant="body2">#97DBF9</Typography>
              </div>
            ),
          },
        ],
      },
      {
        title: 'Error Colors',
        description: '',
        components: [
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box margin={1} padding={1} bgcolor={mikePalette.error.main}>
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Main
                  </Typography>
                </Box>
                <Typography variant="body2">#FD3F75</Typography>
              </div>
            ),
          },
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box margin={1} padding={1} bgcolor={mikePalette.error.dark}>
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Dark
                  </Typography>
                </Box>
                <Typography variant="body2">#D40D57</Typography>
              </div>
            ),
          },
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box margin={1} padding={1} bgcolor={mikePalette.error.light}>
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Light
                  </Typography>
                </Box>
                <Typography variant="body2">#FFB1C8</Typography>
              </div>
            ),
          },
        ],
      },
      {
        title: 'Warning Colors',
        description: '',
        components: [
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box margin={1} padding={1} bgcolor={mikePalette.warning.main}>
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Main
                  </Typography>
                </Box>
                <Typography variant="body2">#FFC20A</Typography>
              </div>
            ),
          },
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box margin={1} padding={1} bgcolor={mikePalette.warning.dark}>
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Dark
                  </Typography>
                </Box>
                <Typography variant="body2">#FFC20A</Typography>
              </div>
            ),
          },
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box margin={1} padding={1} bgcolor={mikePalette.warning.light}>
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Light
                  </Typography>
                </Box>
                <Typography variant="body2">#FFE300</Typography>
              </div>
            ),
          },
        ],
      },
      {
        title: 'Info Colors',
        description: '',
        components: [
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box margin={1} padding={1} bgcolor={mikePalette.info.main}>
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Main
                  </Typography>
                </Box>
                <Typography variant="body2">#00A4EC</Typography>
              </div>
            ),
          },
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box margin={1} padding={1} bgcolor={mikePalette.info.dark}>
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Dark
                  </Typography>
                </Box>
                <Typography variant="body2">#008BEC</Typography>
              </div>
            ),
          },
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box margin={1} padding={1} bgcolor={mikePalette.info.light}>
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Light
                  </Typography>
                </Box>
                <Typography variant="body2">#97DBF9</Typography>
              </div>
            ),
          },
        ],
      },
      {
        title: 'Success Colors',
        description: '',
        components: [
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box margin={1} padding={1} bgcolor={mikePalette.success.main}>
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Main
                  </Typography>
                </Box>
                <Typography variant="body2">#61C051</Typography>
              </div>
            ),
          },
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box margin={1} padding={1} bgcolor={mikePalette.success.dark}>
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Dark
                  </Typography>
                </Box>
                <Typography variant="body2">#3EB22A</Typography>
              </div>
            ),
          },
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box margin={1} padding={1} bgcolor={mikePalette.success.light}>
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Light
                  </Typography>
                </Box>
                <Typography variant="body2">#BFE7B7</Typography>
              </div>
            ),
          },
        ],
      },
      {
        title: 'Dark Grey Colors',
        description: '',
        components: [
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box margin={1} padding={1} bgcolor={mikePalette.darkGrey.main}>
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Main
                  </Typography>
                </Box>
                <Typography variant="body2">#86A2B3</Typography>
              </div>
            ),
          },
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box margin={1} padding={1} bgcolor={mikePalette.darkGrey.dark}>
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Dark
                  </Typography>
                </Box>
                <Typography variant="body2">#557A8F</Typography>
              </div>
            ),
          },
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box
                  margin={1}
                  padding={1}
                  bgcolor={mikePalette.darkGrey.light}
                >
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Light
                  </Typography>
                </Box>
                <Typography variant="body2">#CFDBE2</Typography>
              </div>
            ),
          },
        ],
      },
      {
        title: 'Medium Grey Colors',
        description: '',
        components: [
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box
                  margin={1}
                  padding={1}
                  bgcolor={mikePalette.mediumGrey.main}
                >
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Main
                  </Typography>
                </Box>
                <Typography variant="body2">#DBE4E9</Typography>
              </div>
            ),
          },
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box
                  margin={1}
                  padding={1}
                  bgcolor={mikePalette.mediumGrey.dark}
                >
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Dark
                  </Typography>
                </Box>
                <Typography variant="body2">#CFDBE2</Typography>
              </div>
            ),
          },
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box
                  margin={1}
                  padding={1}
                  bgcolor={mikePalette.mediumGrey.light}
                >
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Light
                  </Typography>
                </Box>
                <Typography variant="body2">#F2F5F7</Typography>
              </div>
            ),
          },
        ],
      },
      {
        title: 'Light Grey Colors',
        description: '',
        components: [
          {
            component: (
              <div style={{ textAlign: 'center', backgroundColor: '#000' }}>
                <Box
                  margin={1}
                  padding={1}
                  bgcolor={mikePalette.lightGrey.main}
                >
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Main
                  </Typography>
                </Box>
                <Typography variant="body2">#F8F8F8</Typography>
              </div>
            ),
          },
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box
                  margin={1}
                  padding={1}
                  bgcolor={mikePalette.lightGrey.dark}
                >
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Dark
                  </Typography>
                </Box>
                <Typography variant="body2">#F8F8F8</Typography>
              </div>
            ),
          },
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box
                  margin={1}
                  padding={1}
                  bgcolor={mikePalette.lightGrey.light}
                >
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Light
                  </Typography>
                </Box>
                <Typography variant="body2">#F8F8F8</Typography>
              </div>
            ),
          },
        ],
      },
      {
        title: 'Ultimate Colors',
        description: '',
        components: [
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box margin={1} padding={1} bgcolor={mikePalette.ultimate.main}>
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Main
                  </Typography>
                </Box>
                <Typography variant="body2">#61C051</Typography>
              </div>
            ),
          },
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box margin={1} padding={1} bgcolor={mikePalette.ultimate.dark}>
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Dark
                  </Typography>
                </Box>
                <Typography variant="body2">#3EB22A</Typography>
              </div>
            ),
          },
          {
            component: (
              <div style={{ textAlign: 'center' }}>
                <Box
                  margin={1}
                  padding={1}
                  bgcolor={mikePalette.ultimate.light}
                >
                  <Typography variant="body1" style={{ color: '#fff' }}>
                    Light
                  </Typography>
                </Box>
                <Typography variant="body2">#BFE7B7</Typography>
              </div>
            ),
          },
        ],
      },
    ],
  },
  {
    title: 'Button',
    description: 'Allows users to take actions with a single click / tap.',
    sub: [
      {
        title: 'Contained Buttons',
        description:
          '`Contained buttons` is a button with rectangular shape with filled color.',
        components: [
          {
            component: <Button variant="contained">Default</Button>,
            codeExample: "<Button variant='contained'>\n\tDefault\n</Button>",
          },
          {
            component: (
              <Button variant="contained" color="primary">
                Primary
              </Button>
            ),
            codeExample:
              "<Button variant='contained' color='primary'>\n\tPrimary\n</Button>",
          },
          {
            component: (
              <Button variant="contained" color="secondary">
                Secondary
              </Button>
            ),
            codeExample:
              "<Button variant='contained' color='secondary'>\n\tSecondary\n</Button>",
          },
          {
            component: (
              <Button variant="contained" disabled>
                Disabled
              </Button>
            ),
            codeExample:
              "<Button variant='contained' disabled>\n\tDisabled\n</Button>",
          },
        ],
      },
      {
        title: 'Text Buttons',
        description: '`Text buttons` is a button with text only style.',
        components: [
          {
            component: <Button>Default</Button>,
            codeExample: '<Button>\n\tDefault\n</Button>',
          },
          {
            component: <Button color="primary">Primary</Button>,
            codeExample: "<Button color='primary'>\n\tPrimary\n</Button>",
          },
          {
            component: <Button color="secondary">Secondary</Button>,
            codeExample: "<Button color='secondary'>\n\tSecondary\n</Button>",
          },
          {
            component: <Button disabled>Disabled</Button>,
            codeExample: '<Button disabled>\n\tDisabled\n</Button>',
          },
        ],
      },
      {
        title: 'Outlined Buttons',
        description:
          '`Outlined buttons` is a button with rectangular shape without filled color.',
        components: [
          {
            component: <Button variant="outlined">Default</Button>,
            codeExample: "<Button variant='outlined'>\n\tDefault\n</Button>",
          },
          {
            component: (
              <Button variant="outlined" color="primary">
                Primary
              </Button>
            ),
            codeExample:
              "<Button variant='outlined' color='primary'>\n\tPrimary\n</Button>",
          },
          {
            component: (
              <Button variant="outlined" color="secondary">
                Secondary
              </Button>
            ),
            codeExample:
              "<Button variant='outlined' color='secondary'>\n\tSecondary\n</Button>",
          },
          {
            component: (
              <Button variant="outlined" disabled>
                Disabled
              </Button>
            ),
            codeExample:
              "<Button variant='outlined' disabled>\n\tDisabled\n</Button>",
          },
        ],
      },
    ],
  },
  {
    title: 'Switch',
    description: 'This is switch description',
    sub: [
      {
        title: 'Basic switches',
        description: '',
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
    ],
  },
];

export default componentsData;
