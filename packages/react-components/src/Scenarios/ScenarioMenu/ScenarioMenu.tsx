import { IconButton, Menu, MenuItem as MenuItemUI } from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';
import React, { useState } from 'react';
import { MenuItem, Scenario } from '../types';
import ScenarioMenuProps from './types';

const ScenarioMenu = (props: ScenarioMenuProps) => {
  const { onContextMenuClick, scenario, menu } = props;
  const [showMenu, setShowMenuState] = useState(false);
  const [showElement, setshowElementState] = useState();

  const setShowMenu = (isShow: boolean, elementId: any) => {
    setShowMenuState(isShow);

    if (isShow) {
      setshowElementState(elementId);
    }
  };

  const setContextMenu = (menuItem: MenuItem, scenario: Scenario) => {
    onContextMenuClick(menuItem, scenario);
    setShowMenuState(false);
  };

  return (
    <div style={{ marginLeft: 'auto', position: 'absolute', top: '30%', right: 5 }}>
      <IconButton
        aria-owns={showMenu ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={(e) => setShowMenu(true, e.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu id="simple-menu" anchorEl={showElement} open={showMenu} onClose={() => setShowMenuState(false)}>
        {menu.map((menuItem) => (
          <MenuItemUI key={menuItem.id} onClick={() => setContextMenu(menuItem, scenario)} {...menuItem}>
            {menuItem.label}
          </MenuItemUI>
        ))}
      </Menu>
    </div>
  );
};

export { ScenarioMenuProps, ScenarioMenu };
