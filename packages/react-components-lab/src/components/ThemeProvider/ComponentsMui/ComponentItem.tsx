/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
import React, { FC, useState } from 'react';
import {
  Box,
  Typography,
  Tooltip,
  IconButton,
  Collapse,
} from '@material-ui/core';
import CodeIcon from '@material-ui/icons/Code';
import { ComponentList } from './types';
import Syntax from '../../Syntax/Syntax';

import useStyles from './styles';

interface Props {
  item: ComponentList;
}

const ComponentItem: FC<Props> = ({ item }) => {
  const classes = useStyles();

  const [showCode, setShowCode] = useState(false);

  const codeExample = item.components
    .map((comp) => `${comp.codeExample}\n`)
    .join('');

  return (
    <Box width={1} paddingTop={5} className={classes.container} id={item.title}>
      <Typography variant="h3">{item.title}</Typography>
      <Typography variant="body2" className={classes.desc}>
        {item.description}
      </Typography>
      <div className={classes.exampleWrapper}>
        {item.components.map((sub, i) => (
          <Box key={`component-${item.title}-${i}`}>{sub.component}</Box>
        ))}
      </div>
      <Box display="flex" width={1} justifyContent="flex-end">
        <Tooltip title="Show code" placement="left">
          <IconButton onClick={() => setShowCode((val) => !val)}>
            <CodeIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Collapse in={showCode} style={{ width: '100%' }}>
        <Syntax
          code={`import { ${item.title} } from '@material-ui/core'\n\n${codeExample}`}
        />
      </Collapse>
    </Box>
  );
};

export default ComponentItem;
