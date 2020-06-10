import React, { FC, useState } from 'react';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';
import IScenarioMenuProps from './types';

const ScenarioMenu: FC<IScenarioMenuProps> = (props: IScenarioMenuProps) => {
  const { onContextMenuClick, scenario, menu } = props;
  const [showMenu, setShowMenuState] = useState(false);
  const [showElement, setshowElementState] = useState();

  const setShowMenu = (isShow: boolean, elementId: any) => {
    setShowMenuState(isShow);
    if (isShow) {
      setshowElementState(elementId);
    }
  };

  const setContextMenu = (elementId: string, scenario: any) => {
    onContextMenuClick(elementId, scenario);
    setShowMenuState(false);
  };

  return (
    <div style={{ marginLeft: 'auto' }}>
      <IconButton
        aria-owns={showMenu ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={e => setShowMenu(true, e.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={showElement}
        open={showMenu}
        onClose={() => setShowMenuState(false)}
      >
        {menu.map(menuItem => (
          <MenuItem
            key={menuItem.id}
            id={menuItem.id}
            onClick={() => setContextMenu(menuItem.id, scenario)}
          >
            {menuItem.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export { IScenarioMenuProps, ScenarioMenu };
