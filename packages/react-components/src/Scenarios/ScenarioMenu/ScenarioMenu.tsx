import { IconButton, Menu, MenuItem as MenuItemUI } from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import React, { useState } from 'react';
import { MenuItem, Scenario } from '../types';
import ScenarioMenuProps from './types';

const ScenarioMenu = ({ onContextMenuClick, scenario, menu, onClick }: ScenarioMenuProps) => {
  const [showMenu, setShowMenuState] = useState(false);
  const [showElement, setshowElementState] = useState();

  const setShowMenu = (isShow: boolean, elementId: any) => {
    setShowMenuState(isShow);
    onClick(scenario);

    if (isShow) {
      setshowElementState(elementId);
    }
  };

  const setContextMenu = (menuItem: MenuItem, scenario: Scenario) => {
    onContextMenuClick(menuItem, scenario);
    setShowMenuState(false);
  };

  const handleEdit = () => {
    const edit = menu.filter((item) => item.id === 'edit');

    if (edit.length > 0) {
      setContextMenu(edit[0], scenario);
    }
  };

  const handlePDF = () => {
    const pdf = menu.filter((item) => item.id === 'openPdf');

    if (pdf.length > 0) {
      setContextMenu(pdf[0], scenario);
    }
  };

  if (scenario.fullName === 'scenario-20210713020117-f517-12f6-2d0c-8603-24146c697467') {
    console.log(menu[1]);
  }

  return (
    <div style={{ position: 'relative', right: 5, color: '#0B4566' }}>
      {menu.some((item) => item.id === 'openPdf') && (
        <IconButton
          aria-owns={showMenu ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={handlePDF}
          style={{ color: '#0B4566' }}
        >
          <InsertDriveFileOutlinedIcon />
        </IconButton>
      )}
      {menu.some((item) => item.id === 'edit') && (
        <IconButton
          aria-owns={showMenu ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={handleEdit}
          style={{ color: '#0B4566' }}
        >
          <CreateOutlinedIcon />
        </IconButton>
      )}
      <IconButton
        aria-owns={showMenu ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={(e) => setShowMenu(true, e.currentTarget)}
        style={{ color: '#0B4566' }}
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
