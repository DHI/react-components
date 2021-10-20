import React, { FC, ReactNode, Children } from 'react';
import {
  Box,
  Typography,
  Checkbox,
  Card as MUICard,
  Collapse,
} from '@material-ui/core';

import { RadioButtonUnchecked, CheckCircle } from '@material-ui/icons';
import clsx from 'clsx';
import cardStyles from './styles';

import { CardProps } from './types';

const Card: FC<CardProps> = ({
  isOpen = true,
  setIsOpen,
  description,
  title,
  subTitle,
  image,
  children,
  isClickable = true,
  disabled = false,
}) => {
  const classes = cardStyles();
  const collapseIn = isClickable && isOpen;
  return (
    <MUICard className={clsx(classes.root)} variant="outlined">
      {disabled && <Box className={classes.disabled} />}
      <Box px={2} py={1.5}>
        <Box
          onClick={() => isClickable && setIsOpen(!isOpen)}
          className={clsx(isClickable && classes.isClickable)}
          display="flex"
          justifyContent="space-between"
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
                  disabled={disabled}
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
                [description]?.flat()?.map((elem: string | ReactNode) =>
                  Children.toArray(
                    <Typography
                      align="justify"
                      variant="body2"
                      gutterBottom
                      style={{ fontSize: 12 }}
                    >
                      {elem}
                    </Typography>
                  )
                )}
            </Box>
            {children}
          </Box>
        </Collapse>
      </Box>
    </MUICard>
  );
};

export default Card;
