import React, { memo, useEffect, useState, FC } from 'react';
import { Typography, Box, Divider } from '@mui/material';
// #region Local imports
import { ChildRef, SideNavProps } from './types';
import RootBoxStyled from './RootBox.styled';
import WrapperBoxStyled from './WrapperBox.styled';
// #endregion

const itemNameHeading = 'nav-item-';

const getDimensions = (ele: HTMLElement) => {
  const { height } = ele.getBoundingClientRect();
  const { offsetTop } = ele;
  const offsetBottom = offsetTop + height;

  return {
    height,
    offsetTop,
    offsetBottom,
  };
};

const scrollStopListener = (
  element: {
    addEventListener: (arg0: string, arg1: () => void) => void;
    removeEventListener: (arg0: string, arg1: () => void) => void;
  },
  callback: (...args: unknown[]) => void,
  timeout?: number
) => {
  let removed = false;
  let handle: number | null = null;

  const onScroll = () => {
    if (handle) {
      clearTimeout(handle);
    }
    handle = window.setTimeout(callback, timeout || 150); // in ms
  };

  element.addEventListener('scroll', onScroll);

  return () => {
    if (removed) {
      return;
    }
    removed = true;
    if (handle) {
      clearTimeout(handle);
    }
    element.removeEventListener('scroll', onScroll);
  };
};

const SideNav: FC<SideNavProps> = ({ data, contentList }) => {
  const [selectedItem, setSelectedItem] = useState<ChildRef>();
  const [navClicked, setNavClicked] = useState<boolean>(false);
  useEffect(() => {
    const destroyListener = scrollStopListener(window, () => {
      const scrollPosition = window.scrollY;
      const selected = contentList.find(({ id, element }) => {
        const ele = element.current;
        if (ele) {
          if (navClicked) {
            return id === selectedItem.id;
          }
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return scrollPosition > offsetTop && scrollPosition < offsetBottom;
        }
        return null;
      });

      if (selected && selected !== selectedItem) {
        setSelectedItem(selected);
      } else if (!selected) {
        setSelectedItem(undefined);
      }

      setNavClicked(false);
    });
    return () => destroyListener();
  }, [selectedItem, navClicked, contentList]);

  const handleItemClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const { id } = e.target as HTMLElement;
    const selected = contentList.find((cl) => cl.id === id);

    setSelectedItem(selected);
    setNavClicked(true);

    selected?.element.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <RootBoxStyled>
      <WrapperBoxStyled>
        <Box>
          <Typography variant="h5">Contents</Typography>
        </Box>
        <Box id="sidenavContent">
          <ul>
            {data?.map((item) => (
              <div key={`li-wrapper-${item.title}`}>
                <li
                  className={
                    selectedItem?.id
                      ? `${itemNameHeading}${item.title}` && 'nav-selected'
                      : ''
                  }
                  id={`${itemNameHeading}${item.title}`}
                  aria-hidden="true"
                  onClick={handleItemClick}
                >
                  {item.title}
                </li>
                {item.pinned ? (
                  <Divider
                    sx={{
                      mx: 2,
                      my: 1,
                    }}
                  />
                ) : null}
              </div>
            ))}
          </ul>
        </Box>
      </WrapperBoxStyled>
    </RootBoxStyled>
  );
};

export default memo(SideNav);
