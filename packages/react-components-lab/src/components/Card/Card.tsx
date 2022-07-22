import React, { FC, ReactNode, Children, cloneElement } from 'react';
import { Box, Typography, Checkbox, Collapse } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { RadioButtonUnchecked, CheckCircle } from '@mui/icons-material';
import CardRootStyled from './CardRoot.styled';
import BoxDisabledStyled from './BoxDisabled.styled';
import ImgCardStyled from './ImgCard.styled';
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
  customCheckbox,
}) => {
  const collapseIn = isClickable && isOpen;
  const theme = useTheme();
  console.log(theme);
  return (
    <CardRootStyled variant="outlined">
      {disabled && <BoxDisabledStyled />}
      <Box px={2} py={1.5}>
        <Box
          onClick={() => isClickable && setIsOpen(!isOpen)}
          sx={{ cursor: isClickable ? 'pointer' : 'default' }}
          display="flex"
          justifyContent="space-between"
        >
          <Box display="flex" flexDirection="column" justifyContent="center">
            <Typography variant="h5" sx={{ pt: 1, pb: 1 }}>
              {title}
            </Typography>

            {subTitle && (
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: 12,
                  color: 'darkGrey.main',
                }}
              >
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
              <ImgCardStyled src={image} alt={image} />
            </Box>
            {isClickable && (
              <Box display="flex" alignItems="center">
                {customCheckbox ? (
                  cloneElement(customCheckbox, { checked: isOpen })
                ) : (
                  <Checkbox
                    checked={isOpen}
                    disabled={disabled}
                    icon={
                      <RadioButtonUnchecked
                        color="primary"
                        sx={{
                          width: 26,
                          height: 26,
                          color: 'primary.dark',
                        }}
                      />
                    }
                    checkedIcon={
                      <CheckCircle
                        sx={{
                          width: 26,
                          height: 26,
                          color: isOpen ? 'success.main' : 'primary.dark',
                        }}
                      />
                    }
                  />
                )}
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
                      sx={{ fontSize: 12 }}
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
    </CardRootStyled>
  );
};

export default Card;
