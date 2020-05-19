import React, { FC, useState } from 'react';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import { MoreVert as MoreVertIcon } from '@material-ui/icons';

interface IScenarioProps {
  //functions: any;
  menu: {
    name: string;
    field: string;
  }[];
  //scenario: any;
}

const ScenarioMenu: FC<IScenarioProps> = (PropData: IScenarioProps) => {
  const [showMenu, setShowMenuState] = useState(null);

  //   handleMenu = (e, menuItem) => {
  //     const { functions, scenario } = this.props;
  //     this.closeMenu();
  //     switch (e.currentTarget.id) {
  //       case 'Action':
  //         return functions.action(scenario, menuItem);
  //       case 'Edit':
  //         return functions.edit(scenario, menuItem);
  //       case 'Execute':
  //         return functions.execute(scenario, menuItem);
  //       case 'Delete':
  //         return functions.delete(scenario, menuItem);
  //       case 'Clone':
  //         return functions.clone(scenario, menuItem);
  //       case 'Terminate':
  //         return functions.terminate(scenario, menuItem);
  //       default:
  //         return this.closeMenu();
  //     }
  //   };

  return (
    <div style={{ marginLeft: 'auto' }}>
      <IconButton
        aria-owns={showMenu ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={event => setShowMenuState(event.currentTarget)}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={showMenu}
        open={Boolean(showMenu)}
        onClose={() => setShowMenuState(null)}
      >
        {PropData.menu.map(menuItem => (
          <MenuItem
            key={menuItem.name}
            id={menuItem.field}
            //onClick={e => this.handleMenu(e, menuItem)}
          >
            {menuItem.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export { IScenarioProps, ScenarioMenu };
