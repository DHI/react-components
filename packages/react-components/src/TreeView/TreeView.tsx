import { Checkbox, CircularProgress, Typography } from '@material-ui/core';
import { ChevronRight, KeyboardArrowDown } from '@material-ui/icons';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import React, { useEffect, useState } from 'react';
import { TreeViewStyles } from './styles';
import { TreeViewProps } from './types';

const DHITreeView = ({ list, onExpand, onChecked }: TreeViewProps) => {
  const [selected, setSelected] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const classes = TreeViewStyles();

  const handleExpanded = (event, nodeIds) => {
    const difference = nodeIds.filter((x) => !expanded.includes(x));
    setExpanded(nodeIds);

    if (difference.length > 0) {
      onExpand(difference[0]);
    }
  };

  const checkBoxClicked = (event, checked, id) => {
    const existing = selected.some((item) => item === id);

    if (existing) {
      const removeSelection = selected.filter((item) => item !== id);
      setSelected([...removeSelection]);
    } else {
      setSelected([...selected, id]);
      onExpand(event.target.id);
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
                    className={classes.checkbox}
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
            <TreeItem key={value} nodeId={value} label={label}>
              {structureLevel(children)}
            </TreeItem>
          ) : (
            <>
              <TreeItem key={value} nodeId={value} label={label} />
            </>
          ),
        );
      } else if (children) {
        elements.push(structureLevel(children));
      }
    });

    return elements;
  };

  useEffect(() => {
    onChecked(selected);
  }, [selected]);

  return (
    <TreeView
      onNodeToggle={handleExpanded}
      multiSelect
      selected={selected}
      defaultCollapseIcon={<KeyboardArrowDown />}
      defaultExpandIcon={<ChevronRight />}
      expanded={expanded}
    >
      {structureLevel(list)}
    </TreeView>
  );
};

export default DHITreeView;
