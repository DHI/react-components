import { Checkbox, Typography } from '@material-ui/core';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import _ from 'lodash';
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

  const fetchListOfTimeseriesFullnames = (group = '', topLevel: boolean) => {
    fetchTimeseriesfullNames(dataSources, token, group.replace(/\/$/, '')).subscribe(
      (res) => {
        if (!group) {
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
          console.log({ data });
        } else {
          const children = res.map((item) => ({
            value: item,
            label: item.replace(group, ''),
            ...(item.slice(-1) === '/' && {
              children: [
                {
                  value: '',
                  label: '',
                },
              ],
            }),
          }));

          const newList = recursive(list, group, children);
          // const testList = recurse(list, group, children);
          // console.log('recursive Out');
          setList(newList);
        }
      },
      (err) => console.log(err),
    );
  };

  const recurse = (originalList, group, children) => {
    let finalResult;
    // console.log('out');
    console.log(originalList);

    const parent = _.chain(originalList)
      .map('children') // pluck all elements from data
      .flatten() // flatten the elements into a single array
      .filter({ value: group }) // exatract elements with a prop of 'foo'
      .value();

    const newList = parent.length === 0 ? originalList : parent;
    finalResult = originalList;

    for (const k in newList) {
      if (newList[k].children) {
        // console.log('in');
        // list[k].children = children;
        console.log(newList[k]);

        finalResult = newList.map((item) =>
          item.value === group
            ? {
                ...item,
                children,
              }
            : { ...item },
        );

        // console.log({ finalResult });

        return recurse(originalList[k].children, group, children);
      } else {
        // stop calling recurse()
        return finalResult;
      }
    }

    console.group('Final Obj');
    console.log(originalList);
    console.log(group);
    const topLevel = search(originalList, group);
    console.log({ topLevel });

    console.log('Final', finalResult);
    console.groupEnd();
  };

  const search = (array, keyword) => {
    const regExp = new RegExp(keyword, 'gi');

    const check = (obj) => {
      if (obj !== null && typeof obj === 'object') {
        return Object.values(obj).some(check);
      }
      if (Array.isArray(obj)) {
        return obj.some(check);
      }

      return (typeof obj === 'string' || typeof obj === 'number') && regExp.test(obj);
    };

    return array.filter(check);
  };

  const recursive = (original, group, childList) => {
    let updatedList = [];

    const parent = _.chain(original)
      .map('children') // pluck all elements from data
      .flatten() // flatten the elements into a single array
      .filter({ value: group }) // exatract elements with a prop of 'foo'
      .value();

    for (const k in original) {
      const parObj = parent.length === 0 ? original : parent;

      if (!parObj.find((x) => x.value === group) || parObj[k].value === group) {
        if (!parObj[k].children) {
          const parentIn = list.find((item) => item.value === group);
          // parObj[k].children = recursive(parentIn, original[k].children, group, childList);
          console.log('recursive In');
          setLoading(false);

          console.log({ original });
          console.log({ parObj });

          return original;
        } else {
          updatedList = parObj.map((item) =>
            item.value === group
              ? {
                  ...item,
                  children: childList,
                }
              : { ...item },
          );

          console.log({ updatedList });

          return updatedList;
        }
      }
    }
  };

  const handleExpanded = (event, nodeIds) => {
    const difference = nodeIds.filter((x) => !expanded.includes(x));
    console.log('diff: ', difference);
    setExpanded(nodeIds);

    if (difference.length > 0) {
      setLoading(true);
      fetchListOfTimeseriesFullnames(difference[0], true);
    }
  };

  const checkBoxClicked = (event, checked, id) => {
    const existing = selected.some((item) => item === id);

    if (existing) {
      const removeSelection = selected.filter((item) => item !== id);
      setSelected([...removeSelection]);
    } else {
      setSelected([...selected, id]);
      fetchListOfTimeseriesFullnames(event.target.id);
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
              key={value}
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
                key={value}
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

    fetchListOfTimeseriesFullnames(value[0]);
  };

  useEffect(() => {
    fetchListOfTimeseriesFullnames();
  }, []);

  return (
    <>
      <TreeView
        onNodeToggle={handleExpanded}
        // onNodeSelect={handleSelection}
        multiSelect
        selected={selected}
        defaultCollapseIcon={<KeyboardArrowUp />}
        defaultExpandIcon={<KeyboardArrowDown />}
        expanded={expanded}
      >
        {structureLevel(list)}
      </TreeView>
    </>
  );
};

export default DHITreeView;
