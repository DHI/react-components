import {
  FilteringState,
  GroupingState,
  IntegratedFiltering,
  IntegratedGrouping,
  IntegratedSorting,
  SortingState,
} from '@devexpress/dx-react-grid';
import {
  ColumnChooser,
  Grid,
  TableColumnVisibility,
  TableFilterRow,
  TableHeaderRow,
  Toolbar,
  VirtualTable,
} from '@devexpress/dx-react-grid-material-ui';
import { Paper } from '@material-ui/core';
import { format, utcToZonedTime } from 'date-fns-tz';
import React, { useEffect, useState } from 'react';
import { fetchScalars } from '../../api';
import { DefaultColumnsTypeProvider } from '../../common/Table';
import ScalarListProps, { ScalarData } from './types';
const DEFAULT_COLUMNS = [
  { title: 'Name', name: 'fullName' },
  { title: 'Time', name: 'dateTime' },
  { title: 'Value', name: 'value' },
];

const ScalarList = (props: ScalarListProps) => {
  const [columns] = useState(DEFAULT_COLUMNS);
  const { dataSources, dateTimeFormat, token, frequency, timeZone } = props;
  const [scalarData, setScalarData] = useState<ScalarData[]>([]);
  const [pollingInterval, setPollingInterval] = useState<object>(null);
  const [defaultColumnsNameArray] = useState<string[]>(DEFAULT_COLUMNS.map((column) => column.name));
  const [tableColumnExtensions] = useState([{ columnName: 'dateTime', width: 200 }]);

  const fetchScalarsList = () => {
    fetchScalars(dataSources, token).subscribe(
      (res) => {
        setScalarData(
          res.map((s: { data: ScalarData }) => {
            s.data.dateTime = format(utcToZonedTime(s.data.dateTime, timeZone), dateTimeFormat);

            return s.data;
          }),
        );
      },
      (error) => {
        console.log(error);
      },
    );
  };

  useEffect(() => {
    setPollingInterval(setInterval(() => fetchScalarsList(), (frequency ?? 60) * 1000));
    fetchScalarsList();
  }, []);

  return (
    <div style={{ display: 'flex', position: 'relative' }}>
      <Paper style={{ position: 'relative' }}>
        <Grid rows={scalarData} columns={columns}>
          <FilteringState defaultFilters={[]} />
          <IntegratedFiltering />

          <SortingState defaultSorting={[{ columnName: 'fullName', direction: 'desc' }]} />
          <IntegratedSorting />

          <GroupingState />
          <IntegratedGrouping />

          <VirtualTable columnExtensions={tableColumnExtensions} />

          <DefaultColumnsTypeProvider for={defaultColumnsNameArray} />

          <TableHeaderRow />
          <TableFilterRow />

          <Toolbar />

          <TableColumnVisibility />
          <ColumnChooser />
        </Grid>
      </Paper>
    </div>
  );
};

export { ScalarListProps, ScalarList };
