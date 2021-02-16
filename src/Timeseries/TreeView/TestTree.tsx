import React, { useEffect, useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import { fetchTimeseriesfullNames } from '../../DataServices/DataServices';

interface TreeViewProps {
  dataSources: any;
  token: string;
}

const DHITreeViewWidget = (props: TreeViewProps) => {
  const { dataSources, token } = props;
  const [list, setList] = useState([]);
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchListOfTimeseriesFullnames = (group = '') => {
    fetchTimeseriesfullNames(dataSources, token, group.replace(/\/$/, '')).subscribe(
      (res) => {
        console.log({ res });

        if (!res) {
          return null;
        }
        if (!group) {
          const data = res.map((d) => ({
            value: d,
            label: d,
            children: [],
          }));
          setList(data);
        } else {
          const children = res.map((item) => ({
            value: item,
            label: item.replace(group, ''),
            children: item.substring(item.length - 1) === '/' && [],
          }));

          const newList = recursive(null, list, group, children);
          setList(newList);
          // setLoading(false);
        }
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const recursive = (parent, original, group, childList) => {
    let updatedList = [];

    for (const k in original) {
      const parObj = parent == null ? original : parent.children;

      if (!parObj.find((x) => x.value === group) || parObj[k].value === group) {
        if (original[k].children?.length > 0) {
          original[k].children = recursive(original[k], original[k].children, group, childList);

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

          return updatedList;
        }
      }
    }
  };

  const handleOnCheck = (checked, e) => {
    setChecked(checked);
    fetchListOfTimeseriesFullnames(e.value);
  };

  const handleOnExpand = (expanded, e) => {
    setExpanded(expanded);
    fetchListOfTimeseriesFullnames(e.value);
  };

  useEffect(() => {
    fetchListOfTimeseriesFullnames();
  }, []);

  console.log({ checked });
  console.log({ expanded });

  return (
    <CheckboxTree
      nodes={list}
      checked={checked}
      expanded={expanded}
      showNodeIcon
      onCheck={(checked, e) => handleOnCheck(checked, e)}
      onExpand={(expanded, e) => handleOnExpand(expanded, e)}
    />
  );
};

export default DHITreeViewWidget;
