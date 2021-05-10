// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';
import React from 'react';
import { Typography, Box } from '@material-ui/core';

// #region Local imports
import ThemeProvider from './ThemeProvider';
import { IProps } from './types';
import ComponentItem from './ComponentsMui/ComponentItem';
import Syntax from '../Syntax/Syntax';
import componentDataList from './ComponentsMui/componentsData';
import useStyles from './styles';
// #endregion

export default {
  title: 'Example/ThemeProvider',
  component: ThemeProvider,
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: 'This is theme provider based on DHI official guidelines.',
      },
    },
  },
} as Meta;

const Template: Story<IProps> = (args) => {
  const classes = useStyles();

  return (
    <ThemeProvider {...args}>
      <Box className={classes.root}>
        <Typography variant="h1">Theme Provider</Typography>
        <Box className={classes.header}>
          <Typography variant="h4">
            <span className={classes.highlightText}>Theme Provider</span> is the
            theming built on top of Material-Ui styles and overridden based on
            DHI official CVI. Here is the concept.
          </Typography>
        </Box>
        <main className={classes.mainContainer}>
          <Box className={classes.content}>
            <Box bgcolor="primary.main" margin={1} padding={2}>
              <Typography variant="h2" color="textSecondary">
                Theme Provider
              </Typography>
              <Box bgcolor="primary.light" margin={1} padding={2}>
                <Typography variant="body1">Your Application</Typography>
                <Box bgcolor="primary.main" margin={1} padding={2}>
                  <Typography variant="body1" color="textSecondary">
                    Your components
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Syntax
              code={`import { ThemeProvider } from "@dhi/react-components-lab"\n\n<ThemeProvider>\n \t{children}\n</ThemeProvider>`}
            />
            {componentDataList?.map((item) => (
              <ComponentItem item={item} />
            ))}
          </Box>
          <Box className={classes.sidenav}>
            <Box className={classes.component}>
              <Box className={classes.sidenavHeader}>
                <Typography variant="h5">Contents</Typography>
              </Box>
              <Box className={classes.sidenavContent}>
                <ul>
                  {componentDataList?.map((item) => (
                    <li className={classes.item}>
                      <a className={classes.tabItem} href={`#${item.title}`}>
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </Box>
            </Box>
          </Box>
        </main>
      </Box>
    </ThemeProvider>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
