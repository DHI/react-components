import { Checkbox, Typography } from '@material-ui/core';
import { Folder } from '@material-ui/icons';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import React, { useEffect, useState } from 'react';
import { fetchTimeseriesfullNames } from '../../DataServices/DataServices';

interface TreeViewProps {
  dataSources: any;
  token: string;
}
const TEMP_DATA = [
  'Telemetry/Water Level/WL6200_abs.dfs0 [Laško I]',
  'Telemetry/Catchment rainfall/4230_POLJANSKA_SORA_ZMINEC_Rainfall.dfs0 [weighted]',
  'Telemetry/Catchment rainfall/4298_SELSKA_SORA_VESTER_Rainfall.dfs0 [weighted]',
  'Telemetry/Catchment rainfall/4520_RACA_PODRECJE_Rainfall.dfs0 [weighted]',
  'Telemetry/Catchment rainfall/4570_PSATA_TOPOLE_Rainfall.dfs0 [weighted]',
  'Telemetry/Catchment rainfall/4695_MIRNA_JELOVEC_Rainfall.dfs0 [weighted]',
  'Telemetry/Catchment rainfall/4770_MESTINJSCICA_SODNA_VAS_Rainfall.dfs0 [weighted]',
  'Telemetry/Catchment rainfall/5040_LJUBLJANICA_KOMIN_Rainfall.dfs0 [weighted]',
  'Telemetry/Catchment rainfall/5500_GRADASCICA_DVOR_Rainfall.dfs0 [weighted]',
  'Models and Scenarios/Sava5/Model Setup/MIKE 11/Input/RR.dfs0 - 28 - RunOff SAVA_HE_BLANCA 147.780',
  'Models and Scenarios/Sava5/Model Setup/MIKE 11/Input/RR.dfs0 - 29 - RunOff SAVA_NEK 184.740',
  'Models and Scenarios/Sava5/Model Setup/MIKE 11/Input/RR.dfs0 - 30 - RunOff SAVA_CATEZ 180.800',
  'Models and Scenarios/Sava5/Model Setup/MIKE 11/Input/RR.dfs0 - 31 - RunOff SAVA_JESENICE_NA_DOLENJSKEM 135.180',
  'Models and Scenarios/Sava5/Model Setup/MIKE 11/Input/RR.dfs0 - 32 - RunOff 6060_SAVINJA_NAZARJE 457.100',
];

//  data Structure needs to be
//   value: 'telemetry',
//   label: 'Telemetry',
//   children: [
//       {
//          value: 'catchment-rainfall',
//          label: 'Catchment rainfall',
//          children: [
//              {
//                value: '4298_SELSKA_SORA_VESTER_Rainfall.dfs0-[weighted]',
//                label: '4298_SELSKA_SORA_VESTER_Rainfall.dfs0 [weighted]'
//              },
//              {
//                value: '4520_RACA_PODRECJE_Rainfall.dfs0-[weighted]',
//                label: '4520_RACA_PODRECJE_Rainfall.dfs0 [weighted]'
//              },
//              {
//                value: '4570_PSATA_TOPOLE_Rainfall.dfs0-[weighted]',
//                label: '4570_PSATA_TOPOLE_Rainfall.dfs0 [weighted]'
//              },
//          ],
//       }
//  ];

const DHITreeView = (props: TreeViewProps) => {
  const { dataSources, token } = props;
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchListOfTimeseriesFullnames = (group = '') => {
    fetchTimeseriesfullNames(dataSources, token, group).subscribe((res) => {
      console.log(res);
      const data = res.map((d) => ({
        value: d.toLowerCase().replaceAll(' ', '-').replace('/', ''),
        label: d,
      }));
      setList(data);
    });
  };

  // const structureList = (list) => {
  //   const structuredData = [];

  //   list.forEach((item) => {
  //     const name = item.split('/');

  //     const result = name.reverse().reduce(
  //       (accumulator, currentValue) => ({
  //         value: currentValue.toLowerCase().replaceAll(' ', '-'),
  //         label: currentValue,
  //         children: [accumulator],
  //       }),
  //       {},
  //     );

  //     structuredData.push(result);
  //   });

  //   console.log(structuredData);

  //   structuredData.forEach((data, index) => {
  //     console.log(data);
  //     console.log(index);
  //   });

  //   // const output = [];

  //   // structuredData.forEach(function (item) {
  //   //   const existing = output.filter(function (v, i) {
  //   //     return v.value === item.value;
  //   //   });

  //   //   if (existing.length) {
  //   //     const existingIndex = output.indexOf(existing[0]);
  //   //     output[existingIndex].children = output[existingIndex].children.concat(item.children);
  //   //   } else {
  //   //     output.push(item);
  //   //   }
  //   // });

  //   // console.dir(output);
  // };

  useEffect(() => {
    fetchListOfTimeseriesFullnames();
  }, []);

  const checkBoxClicked = (event, checked, id) => {
    console.log({ event });
    console.log({ checked });
    console.log({ id });
    // setOrgStructureElement(checked, id, selected, orgStructure);
  };

  const createOrgStructureLevel = (orgStructureElement) => {
    const elements = [];

    orgStructureElement.forEach((v, i) => {
      const { id, children } = v;
      console.log(v);

      if (i.length !== 0) {
        const label = (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Folder />
            <Checkbox
              id={`checkbox-${i}`}
              //    className={classes.globalFilterCheckbox}
              // checked={selected.has(id)}
              onChange={(event, checked) => checkBoxClicked(event, checked, id)}
              color="primary"
            />
            <Typography variant="caption">{v.label.replace('/', '')}</Typography>
          </div>
        );

        elements.push(
          children && children.length > 0 ? (
            <TreeItem key={id} nodeId={id} label={label}>
              {createOrgStructureLevel(children)}
            </TreeItem>
          ) : (
            <TreeItem key={id} nodeId={id} label={label} />
          ),
        );
      } else if (children) {
        elements.push(createOrgStructureLevel(children));
      }
    });

    return elements;
  };

  const handleExpanded = (nodeId, nodeExpanded) => {
    // cache expanded nodes
    if (nodeExpanded) {
      //    addOpenOrgStructurePanel(nodeId);
    } else {
      //    removeOpenOrgStructurePanel(nodeId);
    }
  };

  return (
    <>
      <TreeView
        //    defaultExpanded={openOrgStructurePanels}
        onNodeToggle={(nodeId, nodeExpanded) => handleExpanded(nodeId, nodeExpanded)}
        defaultCollapseIcon={'+'}
        defaultExpandIcon={'-'}
      >
        {createOrgStructureLevel(list)}
      </TreeView>
    </>
  );
};

export default DHITreeView;
