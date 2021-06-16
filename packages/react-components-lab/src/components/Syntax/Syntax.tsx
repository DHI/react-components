import React, { memo, useEffect } from 'react';
import Prism from 'prismjs';

// #region Local imports
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/themes/prism-okaidia.css';
import { Box } from '@material-ui/core';
import { SyntaxProps } from './types';
// #endregion

const Syntax: React.FC<SyntaxProps> = ({ code, language }) => {
  useEffect(() => {
    Prism.highlightAll();
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
