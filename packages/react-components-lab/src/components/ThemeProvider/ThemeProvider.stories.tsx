// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// eslint-disable-next-line import/no-extraneous-dependencies
import { Meta, Story } from '@storybook/react/types-6-0';
import React, {
  createRef,
  RefObject,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Typography, Box } from '@material-ui/core';

// #region Local imports
import { useDarkMode } from 'storybook-dark-mode';
import ThemeProvider from './ThemeProvider';
import { IProps } from './types';
import ComponentItem from './ComponentsMui/ComponentItem';
import Syntax from '../Syntax/Syntax';
import ComponentsData from './ComponentsMui/componentsData';
import SideNav from './SideNav/SideNav';
import useStyles from './styles';
import { ComponentList } from './ComponentsMui/types';
// #endregion

export default {
  title: 'Components/ThemeProvider',
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

interface ChildRefState {
  id: string;
  index: number;
  element: RefObject<HTMLElement>;
  isSelected: boolean;
}
const Template: Story<IProps> = (args) => {
  const classes = useStyles();
  const [dataList, setDataList] = useState<ComponentList[]>([]);
  const [childRefState, setChildRefState] = useState<ChildRefState[]>([]);

  useEffect(() => {
    // Separate pinned and unpinned item(s) and call some sort method
    // this is useful to separate between non component and component elements.
    const pinnedData = ComponentsData.filter((item) => item.pinned).sort(
      (a, b) => (a.title > b.title ? 1 : -1)
    );
    const nonPinnedData = ComponentsData.filter((item) => !item.pinned).sort(
      (a, b) => (a.title > b.title ? 1 : -1)
    );
    const newDataList = pinnedData.concat(nonPinnedData);
    const newChildRefState: ChildRefState[] = newDataList.map(
      (item, i): ChildRefState => ({
        id: `nav-item-${item.title}`,
        index: i,
        element: createRef<HTMLElement>(),
        isSelected: false,
      })
    );

    setDataList(newDataList);
    setChildRefState(newChildRefState);
  }, []);

  const childRefs = useMemo(() => childRefState, [childRefState]);
  const isDarkMode = useDarkMode();
  return (
    <ThemeProvider {...args} type={isDarkMode ? 'dark' : 'light'}>
      <Box className={classes.root}>
        <Typography variant="h1">ThemeProvider</Typography>
        <Typography variant="h4">
          This page is not fully maintained, even if the ThemeProvider component
          itself is.
        </Typography>
        <Box className={classes.header}>
          <Typography variant="h5">
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
              code={`import { ThemeProvider } from '@dhi/react-components-lab'\n\n<ThemeProvider>\n\t{children}\n</ThemeProvider>`}
            />
            {childRefs &&
              dataList?.map((item, i) => (
                <ComponentItem
                  {...{ ref: childRefs[i].element }}
                  key={item.title}
                  item={item}
                />
              ))}
          </Box>
          <SideNav data={dataList} contentList={childRefs} />
        </main>
      </Box>
    </ThemeProvider>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
