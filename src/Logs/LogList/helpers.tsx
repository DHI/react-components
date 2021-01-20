import { TableFilterRow, VirtualTable } from '@devexpress/dx-react-grid-material-ui';
import { FormControl, InputLabel, MenuItem, Select, TableCell, Tooltip } from '@material-ui/core';
import { blueGrey, red, yellow } from '@material-ui/core/colors';
import {
  BugReportOutlined,
  ErrorOutlineOutlined,
  HelpOutline,
  InfoOutlined,
  NewReleases,
  WarningOutlined,
} from '@material-ui/icons';
import React from 'react';

export const LogLevelFilterCell = ({ filter, onFilter, column }) => (
  <TableCell>
    <FormControl style={{ width: '100%' }}>
      <InputLabel id="select-label" style={{ marginTop: -16 }}>
        Select
      </InputLabel>
      <Select
        style={{ marginTop: 0 }}
        fullWidth
        labelId="select-label"
        value={filter ? filter.value : ''}
        id="filter"
        onChange={(e) =>
          onFilter(e.target.value ? { value: e.target.value, operation: 'contains', columnType: column.type } : null)
        }
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Debug">Debug</MenuItem>
        <MenuItem value="Information">Information</MenuItem>
        <MenuItem value="Error">Error</MenuItem>
        <MenuItem value="Warning">Warning</MenuItem>
        <MenuItem value="Critical">Critical</MenuItem>
      </Select>
    </FormControl>
  </TableCell>
);

export const FilterCellRow = (props) => {
  const { column } = props;

  if (column.name === 'logLevel') {
    return <LogLevelFilterCell {...props} />;
  }

  return <TableFilterRow.Cell {...props} />;
};

export const LevelIconCell = (props: any) => {
  const { row, column } = props;
  let cellIcon;

  if (column.name === 'logLevel') {
    switch (row.logLevel) {
      case 'Debug':
        cellIcon = <BugReportOutlined style={{ color: yellow[900] }} />;
        break;
      case 'Information':
        cellIcon = <InfoOutlined style={{ color: blueGrey[500] }} />;
        break;
      case 'Error':
        cellIcon = <ErrorOutlineOutlined style={{ color: red[900] }} />;
        break;
      case 'Warning':
        cellIcon = <WarningOutlined style={{ color: yellow[900] }} />;
        break;
      case 'Critical':
        cellIcon = <NewReleases style={{ color: red[900] }} />;
        break;
      default:
        cellIcon = <HelpOutline style={{ color: yellow[900] }} />;
        break;
    }

    return (
      <td style={{ borderBottom: '1px solid rgba(224, 224, 224, 1)', paddingLeft: 10 }}>
        <Tooltip title={row.logLevel}>{cellIcon}</Tooltip>
      </td>
    );
  } else {
    return <VirtualTable.Cell {...props} />;
  }
};
