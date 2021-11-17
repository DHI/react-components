import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  useRef,
  useState,
  Fragment,
  useEffect,
} from 'react';
import { Box, TextField, Typography } from '@material-ui/core';
import { MultiFieldProps } from './types';
import useStyles from './styles';

// Currently supports a-z, A-Z, 0-9 characters. If others are needed, regex needs to be updated
const MultiField: FC<MultiFieldProps> = ({
  value,
  onChange,
  length = 6,
  seperationInterval = 3,
  fontSize = 50,

  seperatorChar = '-',

  // Replaces the value of empty fields with the placeholder value, to maintain a consistent length of the value string,
  // to determine which fields are empty, allowing any preceding field value to be empty
  placeholderChar = ' ',
}) => {
  const classes = useStyles({ fontSize });

  const lengthIndex = length - 1;
  // TODO add support for dynamic length
  const [refs, setRefs] = useState(
    Array.from({ length }, () => useRef<HTMLInputElement>(null))
  );

  const valueWithFallback =
    value ?? Array.from({ length }, () => placeholderChar).join('');

  const chars = valueWithFallback.split('');

  const getValue = (eValue: string, position: number) =>
    chars
      .map((item, i) => {
        if (i === position) {
          if (eValue === '') return placeholderChar;

          return eValue;
        }

        return item;
      })
      .slice(0, length)
      .join('');

  const handleKeyPress = (e: KeyboardEvent<HTMLElement>, position: number) => {
    if (e.key === 'Backspace' && position !== 0) {
      // handleChange prevented on backspace and handled here - otherwise order would be incorrect
      e.preventDefault();
      onChange(getValue('', position));
      refs[position - 1].current?.focus();
    } else if (
      e.key.length === 1 &&
      chars[position] !== placeholderChar &&
      position + 1 !== length
    ) {
      // Moves focus to next, if existing position already has a character and pressed key is a character
      refs[position + 1].current?.focus();
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    position: number
  ) => {
    const eventValue = e.target.value.trim();

    // 111111 - Handles paste
    const withoutDashRe = new RegExp(`^[a-zA-Z0-9]{${length}}$`);

    const focus = () => refs[lengthIndex].current?.focus();

    if (withoutDashRe.test(eventValue)) {
      onChange(eventValue);
      focus();

      return;
    }

    // 111-111 - Handles paste  for string with seperator
    const withDashRe = new RegExp(
      `[a-zA-Z0-9]{${seperationInterval}}${seperatorChar}[a-zA-Z0-9]{${seperationInterval}}$`
    );
    if (withDashRe.test(eventValue)) {
      onChange(eventValue.replace(seperatorChar, ''));
      focus();

      return;
    }

    // Prevents more than 1 char
    if (eventValue.length > 1 || eventValue === placeholderChar) return;

    if (position !== lengthIndex && eventValue !== '')
      refs[position + 1].current?.focus();

    const newChars = getValue(eventValue, position);
    onChange(newChars);
  };

  const getFieldValue = (position: number) => {
    const fieldValue = chars[position];
    if (fieldValue === placeholderChar) return '';

    return fieldValue;
  };

  useEffect(() => {
    // ------ - Handles value reset
    const emptyRe = new RegExp(`^${seperatorChar}{${length}}$`);
    if (emptyRe.test(valueWithFallback)) refs[0].current?.focus();
  }, [length, refs, valueWithFallback, seperatorChar]);

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      width="100%"
      alignItems="center"
      className={classes.root}
    >
      {refs.map((item, i) => (
        <Fragment key={i.toString()}>
          <TextField
            value={getFieldValue(i)}
            onChange={(e) => handleChange(e, i)}
            onKeyDown={(e) => handleKeyPress(e, i)}
            variant="filled"
            className={classes.field}
            inputRef={item}
            autoFocus={i === 0}
          />
          {(i + 1) % seperationInterval === 0 && i !== lengthIndex && (
            <Typography className={classes.dash}>{seperatorChar}</Typography>
          )}
        </Fragment>
      ))}
    </Box>
  );
};

export default MultiField;
