import { IconButton, Menu, MenuItem as MenuItemUI } from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import React, { useState } from 'react';
import { MenuItem, Scenario } from '../types';
import ScenarioMenuProps from './types';
import mikeColors from '../../ThemeProvider/mikeColors';

const ScenarioMenu = ({
  onContextMenuClick,
  scenario,
  menu,
  showReportButton,
  showEditButton,
  onClick,
}: ScenarioMenuProps) => {
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

  return (
    <div style={{ position: 'relative', right: 5, color: mikeColors.BRANDBLUE_DEFAULT }}>
      {showReportButton && (
        <IconButton
          aria-owns={showMenu ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={handlePDF}
          style={{ color: mikeColors.BRANDBLUE_DEFAULT }}
        >
          <InsertDriveFileOutlinedIcon />
        </IconButton>
      )}
      {showEditButton && (
        <IconButton
          aria-owns={showMenu ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={handleEdit}
          style={{ color: mikeColors.BRANDBLUE_DEFAULT }}
        >
          <CreateOutlinedIcon />
        </IconButton>
      )}
      <IconButton
        aria-owns={showMenu ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={(e) => setShowMenu(true, e.currentTarget)}
        style={{ color: mikeColors.BRANDBLUE_DEFAULT }}
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
