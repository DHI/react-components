import React, { FC, ReactNode } from 'react';
import { Box, Typography, Checkbox, Card, Collapse } from '@material-ui/core';

import { RadioButtonUnchecked, CheckCircle } from '@material-ui/icons';
import clsx from 'clsx';
import cardStyles from './styles';

import Props from './types';

const CardControl: FC<Props> = ({
  isOpen = true,
  setIsOpen,
  description,
  title,
  subTitle,
  image,
  children,
  isClickable = true,
}) => {
  const classes = cardStyles();
  const collapseIn = isClickable && isOpen;
  return (
    <Card className={classes.root} variant="outlined">
      <Box px={2} py={1.5}>
        <Box
          display="flex"
          justifyContent="space-between"
          onClick={() => isClickable && setIsOpen(!isOpen)}
        >
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Typography variant="h5" className={classes.title}>
              {title}
            </Typography>
            {subTitle && (
              <Typography variant="subtitle1" className={classes.subTitle}>
                {subTitle}
              </Typography>
            )}
          </Box>
          <Box
            display="flex"
            justifyContent="flex-end"
            width={image ? '60%' : 'unset'}
          >
            <Box
              width={image ? 125 : 0}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <img src={image} alt={image} className={classes.image} />
            </Box>
            {isClickable && (
              <Box display="flex" alignItems="flex-end">
                <Checkbox
                  checked={isOpen}
                  icon={
                    <RadioButtonUnchecked
                      color="primary"
                      className={classes.checkIcon}
                    />
                  }
                  checkedIcon={
                    <CheckCircle
                      className={clsx(
                        classes.checkIcon,
                        isOpen && classes.checkIconActive
                      )}
                    />
                  }
                />
              </Box>
            )}
          </Box>
        </Box>
        <Collapse in={(!isClickable && true) || collapseIn}>
          <Box mt={2}>
            <Box mb={2}>
              {description &&
                [description]
                  ?.flat()
                  ?.map((elem: string | ReactNode, i: number) => (
                    <Typography
                      align="justify"
                      key={`text-${i}`}
                      variant="body2"
                      gutterBottom
                      style={{ fontSize: 12 }}
                    >
                      {elem}
                    </Typography>
                  ))}
            </Box>
            {children}
          </Box>
        </Collapse>
      </Box>
    </Card>
  );
};

export default CardControl;
