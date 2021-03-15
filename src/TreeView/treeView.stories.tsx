import React, { useEffect, useState } from 'react';
import { fetchToken } from '../api';
import { fetchTimeseriesFullNames } from '../DataServices/DataServices';
import { recursive } from '../utils/Utils';
import TreeView from './TreeView';

export default {
  title: 'Tree View Components',
  component: TreeView,
};

export const TreeViewStory = () => {
  const host = process.env.ENDPOINT_URL;
  const [token, setToken] = useState('');
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const dataSources = [
    {
      host: 'https://domainservices.dhigroup.com',
      connection: 'mclite-timeseries',
    },
  ];

  const fetchTreeViewChildren = (group) => {
    setLoading(true);

    if (group.slice(-1) === '/') {
      fetchTimeseriesFullNames(dataSources, token, group.replace(/\/$/, '')).subscribe(
        (res) => {
          const children = addChildren(res, group);
          list.map((item) => recursive(item, group, children));

          setList(list);
          setLoading(false); // in place to forceUpdate after the recursive fn updates the object.
        },
        (error) => console.log(error),
      );
    }

    fetchTimeseriesFullNames(dataSources, token, group.replace(/\/$/, '')).subscribe(
      (res) => {
        const children = addChildren(res, group);
        list.map((item) => recursive(item, group, children));

        setList(list);
        setLoading(false); // in place to forceUpdate after the recursive fn updates the object.
      },
      (error) => console.log(error),
    );
  };

  const addChildren = (childrenList, group) => {
    return childrenList.map((child) => ({
      value: child,
      label: child.replace(group, ''),
      ...(child.slice(-1) === '/' && {
        children: [
          {
            value: '',
            label: '',
          },
        ],
      }),
    }));
  };

  const fetchOnCheck = (checked) => {
    console.log({ checked });
  };

  useEffect(() => {
    fetchToken(host, {
      id: process.env.USERUSER,
      password: process.env.USERPASSWORD,
    }).subscribe(
      (res) => {
        setToken(res.accessToken.token);

        fetchTimeseriesFullNames(dataSources, res.accessToken.token, '').subscribe(
          (res) => {
            const data = res.map((d) => ({
              value: d,
              label: d,
              topLevel: true,
              ...(d.slice(-1) === '/' && {
                children: [
                  {
                    value: '',
                    label: '',
                  },
                ],
              }),
            }));

            setList(data);
          },
          (err) => console.log(err),
        );
      },
      (err) => {
        console.log(err);
      },
    );
  }, []);

  return (
    list && (
      <TreeView
        list={list}
        onExpand={(expand) => fetchTreeViewChildren(expand)}
        onChecked={(checked) => fetchOnCheck(checked)}
      />
    )
  );
};
