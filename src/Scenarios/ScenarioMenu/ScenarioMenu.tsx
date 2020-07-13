import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import { IMenuItem, IScenario } from '../types';
import IScenarioMenuProps from './types';

const ScenarioMenu = (props: IScenarioMenuProps) => {
  const { onContextMenuClick, scenario, menu } = props;
  const [showMenu, setShowMenuState] = useState(false);
  const [showElement, setshowElementState] = useState();

  const setShowMenu = (isShow: boolean, elementId: any) => {
    setShowMenuState(isShow);

    if (isShow) {
      setshowElementState(elementId);
    }
  };

  const setContextMenu = (menuItem: IMenuItem, scenario: IScenario) => {
    onContextMenuClick(menuItem, scenario);
    setShowMenuState(false);
  };

  return (
    <div style={{ marginLeft: 'auto' }}>
      <IconButton
        aria-owns={showMenu ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={(e) => setShowMenu(true, e.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu id="simple-menu" anchorEl={showElement} open={showMenu} onClose={() => setShowMenuState(false)}>
        {menu.map((menuItem) => (
          <MenuItem key={menuItem.id} id={menuItem.id} onClick={() => setContextMenu(menuItem, scenario)}>
            {menuItem.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ScenarioMenu;
