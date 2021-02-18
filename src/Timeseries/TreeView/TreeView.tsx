import { Checkbox, CircularProgress, Typography } from '@material-ui/core';
import { ChevronRight, KeyboardArrowDown } from '@material-ui/icons';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import React, { useEffect, useState } from 'react';
import { fetchTimeseriesfullNames } from '../..';
import { TreeViewStyles } from './styles';

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
  const classes = TreeViewStyles();

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
        const children = addChildren(res, group);
        list.map((item) => recursive(item, group, children));

        setLoading(false);
        setList(list);
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

  const recursive = (item: any, group: string, children: any) => {
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
      fetchTreeViewChildren(event.target.id);
    }
  };

  const structureLevel = (treeViewList) => {
    const elements = [];

    treeViewList?.forEach((treeList, i) => {
      const { value, children } = treeList;

      if (i.length !== 0) {
        const label = (
          <div className={classes.root}>
            {treeList.label === '' ? (
              <CircularProgress size={20} />
            ) : (
              <>
                {!children && (
                  <Checkbox
                    id={value}
                    color="primary"
                    checked={selected.some((item) => item === value)}
                    onChange={(event, checked) => checkBoxClicked(event, checked, value)}
                  />
                )}

                <Typography variant="body2" className={classes.typography}>
                  {treeList.label.replace('/', '')}
                </Typography>
              </>
            )}
          </div>
        );

        elements.push(
          children && children.length > 0 ? (
            <TreeItem
              key={`${value}_${i}`}
              nodeId={value}
              label={label}
              // onLabelClick={(e) => handleLabelClicked(e, value)}
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

  const handleLabelClicked = (e, value) => {
    console.log('Label');
    console.log({ e });
    console.log(value);
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
