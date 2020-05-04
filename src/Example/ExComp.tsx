import React, { FC, HTMLAttributes, ReactChild } from 'react';

interface ExProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactChild;
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
const ExComp: FC<ExProps> = ({ children }) => {
  return (
    <div>{children || `Example component - Please remove from build.`}</div>
  );
};

export { ExProps, ExComp };
