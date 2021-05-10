// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';
import React, { useEffect, useState } from 'react';
import Box from '@material-ui/core/Box';
import { Typography } from '@material-ui/core';

// #region Local imports
import ThemeProvider from './ThemeProvider';
import { IProps } from './types';
import ComponentsMui from './ComponentsMui/ComponentsMui';
import Syntax from '../Syntax/Syntax';
import jsonData from './ComponentsMui/components-mui-data.json';
import { ComponentList } from './ComponentsMui/types';
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

  const [componentDataList, setComponentDataList] = useState<ComponentList[]>();

  useEffect(() => {
    const newList: ComponentList[] = [];
    setComponentDataList(Object.assign(newList, jsonData));
  }, []);

  return (
    <ThemeProvider {...args}>
      <div className={classes.root}>
        <Typography variant="h1">Theme Provider</Typography>
        <div className={classes.header}>
          <Typography variant="h4">
            <span className={classes.highlightText}>Theme Provider</span> is
            theming that built on top of Material-Ui styles and overridden based
            on DHI official design guidelines styles. Here is the concept.
          </Typography>
        </div>
        <main className={classes.mainContainer}>
          <div className={classes.content}>
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
              code={`<ThemeProvider>
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
</ThemeProvider>`}
            />
          </div>
          <div className={classes.sidenav}>
            <div className={classes.component}>
              <div className={classes.sidenavHeader}>
                <Typography variant="h5">Contents</Typography>
              </div>
              <div className={classes.sidenavContent}>
                <ul>
                  {componentDataList &&
                    componentDataList.map((item) => (
                      <li className={classes.item}>{item.title}</li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
          <ComponentsMui dataList={componentDataList} />
        </main>
      </div>
    </ThemeProvider>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
