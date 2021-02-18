import { Checkbox, Typography } from '@material-ui/core';
import { ChevronRight, KeyboardArrowDown } from '@material-ui/icons';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import React, { useEffect, useState } from 'react';
import { fetchTimeseriesfullNames } from '../..';

interface TreeViewProps {
  dataSources: any;
  token: string;
}

const DHITreeView = (props: TreeViewProps) => {
  const { dataSources, token } = props;
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState([]);

  const fetchTopLevelTreeView = (group = '') => {
    fetchTimeseriesfullNames(dataSources, token, group.replace(/\/$/, '')).subscribe(
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
  };

  const fetchTreeViewChildren = (group) => {
    fetchTimeseriesfullNames(dataSources, token, group.replace(/\/$/, '')).subscribe(
      (res) => {
        const children = addChildren(res);
        list.map((item) => recursive(item, group, children));

        setLoading(false);
        setList(list);
      },
      (error) => console.log(error),
    );
  };

  const addChildren = (childrenList) => {
    return childrenList.map((child) => ({
      value: child,
      label: child,
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

  const recursive = (item: any, group: string, children: any) => {
    setLoading(true);

    if (item.value === group) {
      item.children = children;
    }

    Array.isArray(item.children) && item.children.map((item) => recursive(item, group, children));
  };

  const handleExpanded = (event, nodeIds) => {
    const difference = nodeIds.filter((x) => !expanded.includes(x));
    setExpanded(nodeIds);

    if (difference.length > 0) {
      setLoading(true);
      fetchTreeViewChildren(difference[0]);
    }
  };

  const checkBoxClicked = (event, checked, id) => {
    const existing = selected.some((item) => item === id);

    if (existing) {
      const removeSelection = selected.filter((item) => item !== id);
      setSelected([...removeSelection]);
    } else {
      setSelected([...selected, id]);
      fetchTopLevelTreeView(event.target.id);
    }
  };

  const structureLevel = (treeViewList) => {
    const elements = [];

    treeViewList?.forEach((treeList, i) => {
      const { value, children } = treeList;

      if (i.length !== 0) {
        const label = (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Checkbox
              id={value}
              color="primary"
              checked={selected.some((item) => item === value)}
              onChange={(event, checked) => checkBoxClicked(event, checked, value)}
            />

            <Typography variant="caption">{treeList.label.replace('/', '')}</Typography>
          </div>
        );

        elements.push(
          children && children.length > 0 ? (
            <TreeItem
              key={`${value}_${i}`}
              nodeId={value}
              label={label}
              // onLabelClick={handleLabelClicked}
              // onIconClick={handleIconClicked}
            >
              {structureLevel(children)}
            </TreeItem>
          ) : (
            <>
              <TreeItem
                key={`${value}_${i}`}
                nodeId={value}
                label={label}
                // onLabelClick={handleLabelClicked}
                // onIconClick={handleIconClicked}
              />
            </>
          ),
        );
      } else if (children) {
        elements.push(structureLevel(children));
      }
    });

    return elements;
  };

  const handleLabelClicked = (e) => {
    console.log('Label');
    console.log({ e });
    console.log(e.nodeId);
  };

  const handleIconClicked = (e) => {
    console.log('Icon');
    console.log({ e });
    console.log(e.nodeId);
  };

  const handleSelection = (e, value) => {
    const existing = selected.some((item) => item === value[0]);

    if (existing) {
      const removeSelection = selected.filter((item) => item !== value[0]);
      setSelected([...removeSelection]);
    } else {
      setSelected([...selected, value[0]]);
    }

    fetchTopLevelTreeView(value[0]);
  };

  useEffect(() => {
    fetchTopLevelTreeView();
  }, []);

  return (
    <>
      <TreeView
        onNodeToggle={handleExpanded}
        // onNodeSelect={handleSelection}
        multiSelect
        selected={selected}
        defaultCollapseIcon={<KeyboardArrowDown />}
        defaultExpandIcon={<ChevronRight />}
        expanded={expanded}
      >
        {structureLevel(list)}
      </TreeView>
    </>
  );
};

export default DHITreeView;
