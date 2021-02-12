import React, { useEffect, useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import { fetchTimeseriesfullNames } from '../../DataServices/DataServices';

const nodes = [
  {
    value: '/app',
    label: 'app',
    children: [
      {
        value: '/app/Http',
        label: 'Http',
        children: [
          {
            value: '/app/Http/Controllers',
            label: 'Controllers',
            children: [
              {
                value: '/app/Http/Controllers/WelcomeController.js',
                label: 'WelcomeController.js',
              },
            ],
          },
          {
            value: '/app/Http/routes.js',
            label: 'routes.js',
          },
        ],
      },
      {
        value: '/app/Providers',
        label: 'Providers',
        children: [
          {
            value: '/app/Providers/EventServiceProvider.js',
            label: 'EventServiceProvider.js',
          },
        ],
      },
    ],
  },
];

interface TreeViewProps {
  dataSources: any;
  token: string;
}

const DHITreeViewWidget = (props: TreeViewProps) => {
  const { dataSources, token } = props;
  const [list, setList] = useState([]);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const fetchListOfTimeseriesFullnames = (group = '') => {
    fetchTimeseriesfullNames(dataSources, token, group.replace(/\/$/, '')).subscribe((res) => {
      if (!group) {
        const data = res.map((d) => ({
          value: d,
          label: d,
        }));
        setList(data);
      } else {
        updateDataList(res, group);
      }
    });
  };

  const updateDataList = (res, group) => {
    const children = res.map((item) => ({
      value: item,
      label: item.replace(group, ''),
    }));

    recursive(null, list, group, children);
  };

  const recursive = (parent, obj, group, childList) => {
    console.log({ obj });
    console.log(group);
    console.log({ childList });
    console.log('recurisve called');

    let updatedList = [];

    for (const k in obj) {
      const parObj = parent == null ? obj : parent.children;

      if (!parObj.find((x) => x.value === group) || parObj[k].value === group) {
        if (obj[k].children) {
          console.log('Children');
          recursive(obj[k], obj[k].children, group, childList);
          // if (typeof obj[k] === 'object' && obj[k] !== null) eachRecursive(obj[k], group, children);
          // do something...
        } else {
          console.log('no children');

          updatedList = parObj.map((item) =>
            item.value === group
              ? {
                  ...item,
                  children: childList,
                }
              : { ...item },
          );

          console.log(updatedList);
        }
      }
    }

    setList(updatedList);
  };

  const handleOnCheck = (checked, e) => {
    setChecked(checked);
    fetchListOfTimeseriesFullnames(e.value);

    console.log({ e });
  };

  useEffect(() => {
    fetchListOfTimeseriesFullnames();
  }, []);

  return (
    <CheckboxTree
      nodes={list}
      checked={checked}
      expanded={expanded}
      onCheck={(checked, e) => handleOnCheck(checked, e)}
      onExpand={(expanded) => setExpanded(expanded)}
    />
  );
};

export default DHITreeViewWidget;
