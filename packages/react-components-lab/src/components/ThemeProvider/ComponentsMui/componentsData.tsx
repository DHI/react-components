import React from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Switch,
  Typography,
  FormControlLabel,
  Fab,
  Radio,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import { Add, PermIdentity } from '@material-ui/icons';

// #region Local imports
import { ComponentList } from './types';
import getPalette from '../getPallete';

const mikePalette = getPalette('light');

const whiteColor = {
  color: '#FFF',
};
// #endregion

// make sure that the title value is the same as the name of the exported component from @material-ui/core.
const ComponentsData: ComponentList[] = [
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
              <div style={{ textAlign: 'center' }}>
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
              <Button variant="contained" size="small">
                Default small
              </Button>
            ),
            codeExample:
              "<Button variant='contained' size='small'>\n\tDefault\n</Button>",
          },
          {
            component: (
              <Button variant="contained" size="large">
                Default large
              </Button>
            ),
            codeExample:
              "<Button variant='contained' size='large'>\n\tDefault\n</Button>",
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
            component: <Button size="large">Default large</Button>,
            codeExample: '<Button size="large">\n\tDefault\n</Button>',
          },
          {
            component: <Button size="small">Default small</Button>,
            codeExample: '<Button size="small">\n\tDefault\n</Button>',
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
          {
            component: (
              <Button variant="outlined" color="primary" size="small">
                Primary small
              </Button>
            ),
            codeExample:
              "<Button variant='outlined' color='primary' size='medium'>\n\tPrimary\n</Button>",
          },
          {
            component: (
              <Button variant="outlined" color="primary" size="large">
                Primary large
              </Button>
            ),
            codeExample:
              "<Button variant='outlined' color='primary' size='large'>\n\tPrimary\n</Button>",
          },
        ],
      },
    ],
  },
  {
    title: 'Switch',
    description: 'This allows you to toggle the state on or off (true / false)',
    sub: [
      {
        title: 'Basic',
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
          {
            component: <Switch color="primary" disabled />,
            codeExample: '<Switch color="secondary" disabled/>',
          },
          {
            component: <Switch color="secondary" disabled />,
            codeExample: '<Switch color="secondary" disabled/>',
          },
          {
            component: <Switch color="primary" disabled checked />,
            codeExample: '<Switch color="secondary" disabled checked/>',
          },
          {
            component: <Switch color="secondary" disabled checked />,
            codeExample: '<Switch color="secondary" disabled checked />',
          },
        ],
      },
      {
        title: 'With label',
        description: '',
        components: [
          {
            component: (
              <FormControlLabel control={<Switch />} label="Default" />
            ),
            codeExample:
              '<FormControlLabel control={<Switch />} label="Default" />',
          },
          {
            component: (
              <FormControlLabel
                control={<Switch color="primary" />}
                label="Color primary"
              />
            ),
            codeExample:
              '<FormControlLabel control={<Switch color="primary" />} label="Color primary" />',
          },
          {
            component: (
              <FormControlLabel
                control={<Switch color="secondary" />}
                label="Color secondary"
              />
            ),
            codeExample:
              '<FormControlLabel control={<Switch color="secondary" />} label="Color secondary" />',
          },
          {
            component: (
              <FormControlLabel
                control={<Switch disabled />}
                label="Disabled"
              />
            ),
            codeExample:
              '<FormControlLabel control={<Switch disabled />} label="Disabled" />',
          },
        ],
      },
      {
        title: 'Sizes',
        description: '',
        components: [
          {
            component: (
              <FormControlLabel
                control={<Switch size="small" />}
                label="Small secondary"
              />
            ),
            codeExample:
              '<FormControlLabel control={<Switch size="small" />} label="Small" />',
          },
          {
            component: (
              <FormControlLabel
                control={<Switch size="small" color="primary" />}
                label="Small primary"
              />
            ),
            codeExample:
              '<FormControlLabel control={<Switch size="small"  color="primary" />} label="Small primary" />',
          },
          {
            component: (
              <FormControlLabel
                control={<Switch size="small" color="primary" disabled />}
                label="Small primary disabled"
              />
            ),
            codeExample:
              '<FormControlLabel control={<Switch size="small" color="primary" disabled />} label="Small primary disabled" />',
          },
          {
            component: (
              <FormControlLabel
                control={<Switch color="primary" size="medium" />}
                label="Medium"
              />
            ),
            codeExample:
              '<FormControlLabel control={<Switch color="primary" size="medium" />} label="Medium" />',
          },
        ],
      },
    ],
  },
  {
    title: 'Button Group',
    description: 'This can be used to group related buttons',
    sub: [
      {
        title: 'Basic',
        description: '',
        components: [
          {
            component: (
              <ButtonGroup color="primary">
                <Button>Default 1</Button>
                <Button>Default 2</Button>
                <Button>Default 3</Button>
              </ButtonGroup>
            ),
            codeExample:
              '<ButtonGroup color="primary">\n\t' +
              '<Button>Default 1</Button>\n\t<Button>Default 2</Button>\n\t<Button>Default 3</Button>\n' +
              '</ButtonGroup>',
          },
          {
            component: (
              <ButtonGroup variant="contained" color="primary">
                <Button>Contained 1</Button>
                <Button>Contained 2</Button>
                <Button>Contained 3</Button>
              </ButtonGroup>
            ),
            codeExample:
              '<ButtonGroup variant="contained" color="primary">\n\t' +
              '<Button>Contained 1</Button>\n\t' +
              '<Button>Contained 2</Button>\n\t' +
              '<Button>Contained 3</Button>\n' +
              '</ButtonGroup>',
          },
          {
            component: (
              <ButtonGroup variant="text" color="primary">
                <Button>Text 1</Button>
                <Button>Text 2</Button>
                <Button>Text 3</Button>
              </ButtonGroup>
            ),
            codeExample:
              '<ButtonGroup variant="text" color="primary">\n\t' +
              '<Button>Text 1</Button>\n\t' +
              '<Button>Text 2</Button>\n\t' +
              '<Button>Text 3</Button>\n' +
              '</ButtonGroup>',
          },
        ],
      },
      {
        title: 'Sizes and Colors',
        description: '',
        components: [
          {
            component: (
              <ButtonGroup size="small">
                <Button>Small 1</Button>
                <Button>Small 2</Button>
                <Button>Small 3</Button>
              </ButtonGroup>
            ),
            codeExample:
              '<ButtonGroup size="small">\n\t' +
              '<Button>Small 1</Button>\n\t' +
              '<Button>Small 2</Button>\n\t' +
              '<Button>Small 3</Button>\n' +
              '</ButtonGroup>',
          },
          {
            component: (
              <ButtonGroup color="secondary">
                <Button>Default 1</Button>
                <Button>Default 2</Button>
                <Button>Default 3</Button>
              </ButtonGroup>
            ),
            codeExample:
              '<ButtonGroup color="secondary">\n\t' +
              '<Button>Default 1</Button>\n\t' +
              '<Button>Default 2</Button>\n\t' +
              '<Button>Default 3</Button>\n' +
              '</ButtonGroup>',
          },
          {
            component: (
              <ButtonGroup size="large" color="primary">
                <Button>Large 1</Button>
                <Button>Large 2</Button>
                <Button>Large 3</Button>
              </ButtonGroup>
            ),
            codeExample:
              '<ButtonGroup size="large" color="primary">\n\t' +
              '<Button>Large 1</Button>\n\t' +
              '<Button>Large 2</Button>\n\t' +
              '<Button>Large 3</Button>\n' +
              '</ButtonGroup>',
          },
        ],
      },
      {
        title: 'Vertical group',
        description: '',
        components: [
          {
            component: (
              <ButtonGroup orientation="vertical" color="primary">
                <Button>Default 1</Button>
                <Button>Default 2</Button>
                <Button>Default 3</Button>
              </ButtonGroup>
            ),
            codeExample:
              '<ButtonGroup orientation="vertical" color="primary">\n\t' +
              '<Button>Default 1</Button>\n\t' +
              '<Button>Default 2</Button>\n\t' +
              '<Button>Default 3</Button>\n' +
              '</ButtonGroup>',
          },
          {
            component: (
              <ButtonGroup
                orientation="vertical"
                color="primary"
                variant="contained"
              >
                <Button>Contained 1</Button>
                <Button>Contained 2</Button>
                <Button>Contained 3</Button>
              </ButtonGroup>
            ),
            codeExample:
              '<ButtonGroup orientation="vertical" color="primary" variant="contained">\n\t' +
              '<Button>Contained 1</Button>\n\t' +
              '<Button>Contained 2</Button>\n\t' +
              '<Button>Contained 3</Button>\n' +
              '</ButtonGroup>',
          },
          {
            component: (
              <ButtonGroup
                orientation="vertical"
                color="primary"
                variant="text"
              >
                <Button>Text 1</Button>
                <Button>Text 2</Button>
                <Button>Text 3</Button>
              </ButtonGroup>
            ),
            codeExample:
              '<ButtonGroup orientation="vertical" color="primary" variant="text">\n\t' +
              '<Button>Text 1</Button>\n\t' +
              '<Button>Text 2</Button>\n\t' +
              '<Button>Text 3</Button>\n' +
              '</ButtonGroup>',
          },
        ],
      },
    ],
  },
  {
    title: 'Checkbox',
    description: 'This allows you to select one or more items from a set.',
    sub: [
      {
        title: 'Basic',
        description: '',
        components: [
          {
            component: <Checkbox />,
            codeExample: '<Checkbox />',
          },
          {
            component: <Checkbox defaultChecked />,
            codeExample: '<Checkbox defaultChecked />',
          },
          {
            component: <Checkbox defaultChecked color="primary" />,
            codeExample: '<Checkbox defaultChecked color="primary" />',
          },
          {
            component: <Checkbox disabled />,
            codeExample: '<Checkbox disabled />',
          },
          {
            component: <Checkbox disabled defaultChecked />,
            codeExample: '<Checkbox disabled defaultChecked />',
          },
          {
            component: <Checkbox defaultChecked indeterminate />,
            codeExample: '<Checkbox defaultChecked indeterminate />',
          },
          {
            component: <Checkbox defaultChecked color="default" />,
            codeExample: '<Checkbox defaultChecked color="default" />',
          },
        ],
      },
      {
        title: 'With label',
        description: '',
        components: [
          {
            component: (
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Default"
              />
            ),
            codeExample:
              '<FormControlLabel control={<Checkbox defaultChecked />} label="Default" />',
          },
          {
            component: (
              <FormControlLabel
                control={<Checkbox defaultChecked color="primary" />}
                label="Color primary"
              />
            ),
            codeExample:
              '<FormControlLabel control={<Checkbox defaultChecked color="primary" />} label="Color primary" />',
          },
          {
            component: (
              <FormControlLabel
                control={<Checkbox defaultChecked color="secondary" />}
                label="Color secondary"
              />
            ),
            codeExample:
              '<FormControlLabel control={<Checkbox defaultChecked color="secondary" />} label="Color secondary" />',
          },
          {
            component: (
              <FormControlLabel
                control={<Checkbox defaultChecked color="default" />}
                label="Color default"
              />
            ),
            codeExample:
              '<FormControlLabel control={<Checkbox defaultChecked color="default" />} label="Color default" />',
          },
          {
            component: (
              <FormControlLabel
                control={<Checkbox defaultChecked disabled />}
                label="Disabled"
              />
            ),
            codeExample:
              '<FormControlLabel control={<Checkbox defaultChecked disabled />} label="Disabled" />',
          },
        ],
      },
      {
        title: 'Label placement',
        description: '',
        components: [
          {
            component: (
              <FormControlLabel
                labelPlacement="top"
                control={<Checkbox defaultChecked />}
                label="Top"
              />
            ),
            codeExample:
              '<FormControlLabel labelPlacement="top" control={<Checkbox defaultChecked />} label="Top" />',
          },
          {
            component: (
              <FormControlLabel
                labelPlacement="bottom"
                control={<Checkbox defaultChecked />}
                label="Bottom"
              />
            ),
            codeExample:
              '<FormControlLabel labelPlacement="bottom" control={<Checkbox defaultChecked />} label="Bottom" />',
          },
          {
            component: (
              <FormControlLabel
                labelPlacement="start"
                control={<Checkbox defaultChecked />}
                label="Start"
              />
            ),
            codeExample:
              '<FormControlLabel labelPlacement="start" control={<Checkbox defaultChecked />} label="Start" />',
          },
          {
            component: (
              <FormControlLabel
                labelPlacement="end"
                control={<Checkbox defaultChecked />}
                label="End (default)"
              />
            ),
            codeExample:
              '<FormControlLabel labelPlacement="end" control={<Checkbox defaultChecked />} label="End" />',
          },
        ],
      },
      {
        title: 'Sizes',
        description: '',
        components: [
          {
            component: (
              <FormControlLabel
                control={<Checkbox defaultChecked size="small" />}
                label="Small"
              />
            ),
            codeExample:
              '<FormControlLabel control={<Checkbox defaultChecked size="small" />} label="Small" />',
          },
          {
            component: (
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Default"
              />
            ),
            codeExample:
              '<FormControlLabel control={<Checkbox defaultChecked />} label="Default" />',
          },
          {
            component: (
              <FormControlLabel
                control={<Checkbox defaultChecked size="medium" />}
                label="Medium"
              />
            ),
            codeExample:
              '<FormControlLabel control={<Checkbox defaultChecked size="medium" />} label="Medium" />',
          },
        ],
      },
    ],
  },
  {
    title: 'Fab',
    description: '',
    sub: [
      {
        title: 'Basic',
        description: '',
        components: [
          {
            component: (
              <Fab color="primary">
                <Add style={{ ...whiteColor }} />
              </Fab>
            ),
            codeExample:
              '<Fab color="primary">\n\t<Add style={{ ...whiteColor }} />\n</Fab>',
          },
          {
            component: (
              <Fab color="secondary">
                <Add style={{ ...whiteColor }} />
              </Fab>
            ),
            codeExample:
              '<Fab color="secondary">\n\t<Add style={{ ...whiteColor }} />\n</Fab>',
          },
          {
            component: (
              <Fab variant="extended">
                <Add style={{ ...whiteColor }} />
                Extended
              </Fab>
            ),
            codeExample:
              '<Fab variant="extended">\n\t<Add style={{ ...whiteColor }} />\n</Fab>',
          },
          {
            component: (
              <Fab disabled>
                <Add style={{ ...whiteColor }} />
              </Fab>
            ),
            codeExample:
              '<Fab disabled>\n\t<Add style={{ ...whiteColor }} />\n</Fab>',
          },
        ],
      },
      {
        title: 'Sizes',
        description: '',
        components: [
          {
            component: (
              <Fab color="primary" size="small">
                <Add style={{ ...whiteColor }} />
              </Fab>
            ),
            codeExample:
              '<Fab color="primary" size="small">\n\t<Add style={{ ...whiteColor }} />\n</Fab>',
          },
          {
            component: (
              <Fab color="primary" size="medium">
                <Add style={{ ...whiteColor }} />
              </Fab>
            ),
            codeExample:
              '<Fab color="primary" size="medium">\n\t<Add style={{ ...whiteColor }} />\n</Fab>',
          },
          {
            component: (
              <Fab color="primary" size="large">
                <Add style={{ ...whiteColor }} />
              </Fab>
            ),
            codeExample:
              '<Fab variant="extended" size="large">\n\t<Add style={{ ...whiteColor }} />\n</Fab>',
          },
          {
            component: (
              <Fab color="primary" size="small" variant="extended">
                <Add style={{ ...whiteColor }} />
                Small
              </Fab>
            ),
            codeExample:
              '<Fab color="primary" size="small" variant="extended">\n\t<Add style={{ ...whiteColor }} />\n</Fab>',
          },
          {
            component: (
              <Fab color="primary" size="medium" variant="extended">
                <Add style={{ ...whiteColor }} />
                Medium
              </Fab>
            ),
            codeExample:
              '<Fab color="primary" size="medium" variant="extended">\n\t<Add style={{ ...whiteColor }} />\n</Fab>',
          },
          {
            component: (
              <Fab color="primary" size="large" variant="extended">
                <Add style={{ ...whiteColor }} />
                Large
              </Fab>
            ),
            codeExample:
              '<Fab variant="extended" size="large" variant="extended">\n\t<Add style={{ ...whiteColor }} />\n</Fab>',
          },
        ],
      },
    ],
  },
  {
    title: 'Radio',
    description: 'This allows you to select only one item from a set.',
    sub: [
      {
        title: 'Basic',
        description: '',
        components: [
          {
            component: <Radio />,
            codeExample: '<Radio />',
          },
          {
            component: <Radio defaultChecked color="default" />,
            codeExample: '<Radio defaultChecked color="default" />',
          },
          {
            component: <Radio defaultChecked color="primary" />,
            codeExample: '<Radio defaultChecked color="primary" />',
          },
          {
            component: <Radio defaultChecked color="secondary" />,
            codeExample: '<Radio defaultChecked color="secondary" />',
          },
        ],
      },
      {
        title: 'With label',
        description: '',
        components: [
          {
            component: (
              <FormControlLabel
                control={<Radio defaultChecked />}
                label="Default"
              />
            ),
            codeExample:
              '<FormControlLabel control={<Radio defaultChecked />} label="Default" />',
          },
          {
            component: (
              <FormControlLabel
                control={<Radio defaultChecked color="primary" />}
                label="Color primary"
              />
            ),
            codeExample:
              '<FormControlLabel control={<Radio defaultChecked color="primary" />} label="Primary" />',
          },
          {
            component: (
              <FormControlLabel
                control={<Radio defaultChecked color="secondary" />}
                label="Color secondary"
              />
            ),
            codeExample:
              '<FormControlLabel control={<Radio defaultChecked color="secondary" />} label="Secondary" />',
          },
          {
            component: (
              <FormControlLabel
                control={<Radio defaultChecked color="default" />}
                label="Color default"
              />
            ),
            codeExample:
              '<FormControlLabel control={<Radio defaultChecked color="default" />} label="Color default" />',
          },
          {
            component: (
              <FormControlLabel
                control={<Radio defaultChecked disabled />}
                label="Disabled"
              />
            ),
            codeExample:
              '<FormControlLabel control={<Radio defaultChecked disabled />} label="Disabled" />',
          },
        ],
      },
      {
        title: 'Label placement',
        description: '',
        components: [
          {
            component: (
              <FormControlLabel
                labelPlacement="top"
                control={<Radio defaultChecked />}
                label="Top"
              />
            ),
            codeExample:
              '<FormControlLabel labelPlacement="top" control={<Radio defaultChecked />} label="Top" />',
          },
          {
            component: (
              <FormControlLabel
                labelPlacement="bottom"
                control={<Radio defaultChecked />}
                label="Bottom"
              />
            ),
            codeExample:
              '<FormControlLabel labelPlacement="bottom" control={<Radio defaultChecked />} label="Bottom" />',
          },
          {
            component: (
              <FormControlLabel
                labelPlacement="start"
                control={<Radio defaultChecked />}
                label="Start"
              />
            ),
            codeExample:
              '<FormControlLabel labelPlacement="start" control={<Radio defaultChecked />} label="Start" />',
          },
          {
            component: (
              <FormControlLabel
                labelPlacement="end"
                control={<Radio defaultChecked />}
                label="End (default)"
              />
            ),
            codeExample:
              '<FormControlLabel labelPlacement="end" control={<Radio defaultChecked />} label="End" />',
          },
        ],
      },
    ],
  },
  {
    title: 'Text Field',
    description: 'This allows you to input / edit text.',
    sub: [
      {
        title: 'Basic',
        description: '',
        components: [
          {
            component: <TextField label="Default" />,
            codeExample: '<TextField label="Default" />',
          },
          {
            component: <TextField variant="filled" label="Filled" />,
            codeExample: '<TextField variant="filled" label="Filled" />',
          },
          {
            component: <TextField variant="outlined" label="Outlined" />,
            codeExample: '<TextField variant="outlined" label="Outlined" />',
          },
        ],
      },
      {
        title: 'Disabled',
        description: '',
        components: [
          {
            component: <TextField label="Default" disabled />,
            codeExample: '<TextField label="Default" disabled />',
          },
          {
            component: <TextField variant="filled" label="Filled" disabled />,
            codeExample:
              '<TextField variant="filled" label="Filled" disabled />',
          },
          {
            component: (
              <TextField variant="outlined" label="Outlined" disabled />
            ),
            codeExample:
              '<TextField variant="outlined" label="Outlined" disabled />',
          },
        ],
      },
      {
        title: 'With icon',
        description: '',
        components: [
          {
            component: (
              <TextField
                label="Pre icon"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentity />
                    </InputAdornment>
                  ),
                }}
              />
            ),
            codeExample:
              '<TextField label="Pre icon"' +
              'InputProps={{' +
              'startAdornment: (' +
              '<InputAdornment position="start">' +
              '<PermIdentity />' +
              '</InputAdornment>' +
              '),' +
              '}}' +
              '/>',
          },
          {
            component: (
              <TextField
                label="Post icon"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PermIdentity />
                    </InputAdornment>
                  ),
                }}
              />
            ),
            codeExample:
              '<TextField label="Post icon"' +
              'InputProps={{' +
              'endAdornment: (' +
              '<InputAdornment position="end">' +
              '<PermIdentity />' +
              '</InputAdornment>' +
              '),' +
              '}}' +
              '/>',
          },
          {
            component: (
              <TextField
                label="Pre icon"
                variant="filled"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentity />
                    </InputAdornment>
                  ),
                }}
              />
            ),
            codeExample:
              '<TextField label="Pre icon" variant="filled"' +
              'InputProps={{' +
              'startAdornment: (' +
              '<InputAdornment position="start">' +
              '<PermIdentity />' +
              '</InputAdornment>' +
              '),' +
              '}}' +
              '/>',
          },
          {
            component: (
              <TextField
                label="Post icon"
                variant="filled"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PermIdentity />
                    </InputAdornment>
                  ),
                }}
              />
            ),
            codeExample:
              '<TextField label="Post icon" variant="filled"' +
              'InputProps={{' +
              'endAdornment: (' +
              '<InputAdornment position="end">' +
              '<PermIdentity />' +
              '</InputAdornment>' +
              '),' +
              '}}' +
              '/>',
          },
          {
            component: (
              <TextField
                label="Pre icon"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PermIdentity />
                    </InputAdornment>
                  ),
                }}
              />
            ),
            codeExample:
              '<TextField label="Pre icon" variant="outlined"' +
              'InputProps={{' +
              'startAdornment: (' +
              '<InputAdornment position="start">' +
              '<PermIdentity />' +
              '</InputAdornment>' +
              '),' +
              '}}' +
              '/>',
          },
          {
            component: (
              <TextField
                label="Post icon"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PermIdentity />
                    </InputAdornment>
                  ),
                }}
              />
            ),
            codeExample:
              '<TextField label="Post icon" variant="outlined"' +
              'InputProps={{' +
              'endAdornment: (' +
              '<InputAdornment position="end">' +
              '<PermIdentity />' +
              '</InputAdornment>' +
              '),' +
              '}}' +
              '/>',
          },
        ],
      },
      {
        title: 'With color',
        description: '',
        components: [
          {
            component: <TextField label="Default" />,
            codeExample: '<TextField label="Default" />',
          },
          {
            component: <TextField label="Primary" color="primary" />,
            codeExample: '<TextField label="Primary" color="primary" />',
          },
          {
            component: <TextField label="Secondary" color="secondary" />,
            codeExample: '<TextField label="Secondary" color="secondary" />',
          },
          {
            component: <TextField label="Default" variant="filled" />,
            codeExample: '<TextField label="Default" variant="filled" />',
          },
          {
            component: (
              <TextField label="Primary" color="primary" variant="filled" />
            ),
            codeExample:
              '<TextField label="Primary" color="primary" variant="filled" />',
          },
          {
            component: (
              <TextField label="Secondary" color="secondary" variant="filled" />
            ),
            codeExample:
              '<TextField label="Secondary" color="secondary" variant="filled" />',
          },
          {
            component: <TextField label="Default" variant="outlined" />,
            codeExample: '<TextField label="Default" variant="outlined" />',
          },
          {
            component: (
              <TextField label="Primary" color="primary" variant="outlined" />
            ),
            codeExample:
              '<TextField label="Primary" color="primary" variant="outlined" />',
          },
          {
            component: (
              <TextField
                label="Secondary"
                color="secondary"
                variant="outlined"
              />
            ),
            codeExample:
              '<TextField label="Secondary" color="secondary" variant="outlined" />',
          },
        ],
      },
      {
        title: 'Sizes',
        description: '',
        components: [
          {
            component: <TextField label="Small" size="small" />,
            codeExample: '<TextField label="Small" size="small" />',
          },
          {
            component: (
              <TextField label="Small" size="small" variant="filled" />
            ),
            codeExample:
              '<TextField label="Small" size="small" variant="filled" />',
          },
          {
            component: (
              <TextField label="Small" size="small" variant="outlined" />
            ),
            codeExample:
              '<TextField label="Small" size="small" variant="outlined" />',
          },
          {
            component: <TextField label="Default" />,
            codeExample: '<TextField label="Small" />',
          },
          {
            component: <TextField label="Default" variant="filled" />,
            codeExample: '<TextField label="Default" variant="filled" />',
          },
          {
            component: <TextField label="Default" variant="outlined" />,
            codeExample: '<TextField label="Default" variant="outlined" />',
          },
        ],
      },
    ],
  },
];

export default ComponentsData;
