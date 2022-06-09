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
import { Typography, Box } from '@mui/material';

// #region Local imports
import { useDarkMode } from 'storybook-dark-mode';
import ThemeProvider from './ThemeProvider';
import { ThemeProviderProps } from './types';
import ComponentItem from './ComponentsMui/ComponentItem';
import Syntax from '../Syntax/Syntax';
import getComponentsData from './ComponentsMui/componentsData';
import SideNav from './SideNav/SideNav';
import { ComponentList } from './ComponentsMui/types';
// #endregion

export default {
  title: 'Components/ThemeProvider',
  component: ThemeProvider,
  argTypes: {},
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
    viewMode: 'canvas',
  },
} as Meta;

interface ChildRefState {
  id: string;
  index: number;
  element: RefObject<HTMLElement>;
  isSelected: boolean;
}
const Template: Story<ThemeProviderProps> = () => {
  const isDarkMode = useDarkMode();
  const [dataList, setDataList] = useState<ComponentList[]>([]);
  const [childRefState, setChildRefState] = useState<ChildRefState[]>([]);
  const ComponentsData = useMemo(
    () => getComponentsData(isDarkMode ? 'dark' : 'light'),
    [isDarkMode]
  );
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
  }, [ComponentsData]);

  const childRefs = useMemo(() => childRefState, [childRefState]);
  return (
    <>
      <Box sx={{ ml: { xs: 0, sm: 4 } }}>
        <Typography variant="h1">Theme Provider</Typography>
        <Box
          sx={{ width: { xs: '100%', md: 'calc(100% - 230px)' } }}
          display="flex"
          pt={2}
          pb={1}
        >
          <Typography
            sx={{
              lineHeight: '1.5',
            }}
            variant="h5"
          >
            <Box
              component="span"
              sx={{
                backgroundColor: 'primary.light',
                borderRadius: 5,
                py: 0.5,
                px: 1,
              }}
            >
              Theme Provider
            </Box>
            is the theming built on top of Material-Ui styles and overridden
            based on DHI official CVI. Here is the concept.
          </Typography>
        </Box>
        <Box
          component="main"
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
        >
          <Box
            flexBasis={0}
            flexGrow={300}
            sx={{
              minWidth: { xs: '100%', md: '40%' },
            }}
          >
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
              code={`import { ThemeProvider } from '@dhi/react-components-lab'\n\n<ThemeProvider type={${
                isDarkMode ? '"dark"' : '"light"'
              }} overrides={{}}>\n\t{children}\n</ThemeProvider>`}
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
        </Box>
      </Box>
    </>
  );
};

export const Primary = Template.bind({});
Primary.args = {};
