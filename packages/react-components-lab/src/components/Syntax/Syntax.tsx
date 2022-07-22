import React, { memo, useEffect, FC } from 'react';
import { highlightAll } from 'prismjs';

// #region Local imports
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/themes/prism-okaidia.css';
import { Box } from '@mui/material';
import { SyntaxProps } from './types';
// #endregion

const Syntax: FC<SyntaxProps> = ({ code, language }) => {
  useEffect(() => {
    highlightAll();
  }, []);

  return (
    <Box width={1} className="Code" p={1}>
      <pre>
        <code className={language ? `language-${language}` : `language-tsx`}>
          {code}
        </code>
      </pre>
    </Box>
  );
};

export default memo(Syntax);
