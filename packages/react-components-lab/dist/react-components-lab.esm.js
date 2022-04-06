import React, { useState, useEffect, cloneElement, Children, Fragment, useRef, useCallback, useMemo, createContext, useContext } from 'react';
import { useTheme, Box, Typography, Card as Card$1, Checkbox, Collapse, Button, ButtonBase, Grid, CircularProgress, LinearProgress, TextField, Snackbar, Slide, Grow, Fade, Slider, IconButton } from '@mui/material';
import { styled, useTheme as useTheme$1, createTheme, ThemeProvider } from '@mui/material/styles';
import { experimental_sx } from '@mui/system';
import { RadioButtonUnchecked, CheckCircle, ExpandMore, DragHandle, ExpandLess, PauseCircleFilled, PlayCircleFilled } from '@mui/icons-material';
import { TinyColor } from '@ctrl/tinycolor';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { deepmerge } from '@mui/utils';
import CssBaseline from '@mui/material/CssBaseline';

var ImgLegendStyled = /*#__PURE__*/styled('img')({
  width: '100%',
  height: 6,
  borderRadius: 4
});

var BarLegend = function BarLegend(_ref) {
  var src = _ref.src,
      length = _ref.length,
      range = _ref.range,
      _ref$unit = _ref.unit,
      unit = _ref$unit === void 0 ? '' : _ref$unit;

  var _useState = useState(),
      val = _useState[0],
      setVals = _useState[1];

  var theme = useTheme();
  useEffect(function () {
    if (length !== undefined && range && typeof range[0] === 'number' && typeof range[1] === 'number') {
      var localLength = length - 1;
      var arr = [];
      var diff = range[1] - range[0];
      var incr = diff / localLength;

      for (var i = 0; i <= localLength; i += 1) {
        var value = range[0] + incr * i;
        arr.push(Number(value.toFixed(2)));
      }

      setVals(arr);
    }
  }, [range, length]);
  return React.createElement(Box, {
    width: 1
  }, React.createElement(ImgLegendStyled, {
    src: src,
    alt: "legend-colorbar",
    theme: theme
  }), range && (typeof range[0] === 'number' && typeof range[1] === 'number' && val ? React.createElement(Box, {
    display: "flex",
    justifyContent: "space-between"
  }, val.map(function (v) {
    return React.createElement(Typography, {
      key: "value-" + v,
      sx: {
        fontSize: 10
      }
    }, v + " " + unit);
  })) : ['number', 'string'].includes(typeof range[0]) && ['number', 'string'].includes(typeof range[1]) && React.createElement(Box, {
    display: "flex",
    justifyContent: "space-between"
  }, React.createElement(Typography, {
    sx: {
      fontSize: 10
    }
  }, range[0] + " " + unit), React.createElement(Typography, {
    sx: {
      fontSize: 10
    }
  }, range[1] + " " + unit))));
};

var CalendarBox = function CalendarBox(_ref) {
  var children = _ref.children,
      title = _ref.title;
  return React.createElement(Box, null, title && React.createElement(Typography, {
    variant: "h5",
    gutterBottom: true
  }, title), React.createElement(Box, {
    width: 1,
    display: "flex",
    flexWrap: "wrap"
  }, children.map(function (comp) {
    return comp;
  })));
};

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

var options = {
  shouldForwardProp: function shouldForwardProp(prop) {
    return prop !== 'disabled' || prop !== 'variant' || prop !== 'active';
  }
};
var CalendarItemBox = /*#__PURE__*/styled(Box, options)(function (_ref) {
  var disabled = _ref.disabled,
      variant = _ref.variant,
      active = _ref.active;

  var getStyle = function getStyle() {
    if (disabled) return {
      backgroundColor: 'mediumGrey.light',
      color: 'mediumGrey.dark'
    };
    if (variant === 'button' && !disabled) return {
      backgroundColor: active ? 'secondary.main' : 'mediumGrey.light',
      color: active ? 'background.paper' : 'primary.main',
      '&:hover': {
        backgroundColor: active ? 'secondary.main' : 'mediumGrey.main'
      }
    };
    if (variant === 'semi-button' && !disabled) return {
      backgroundColor: active ? 'secondary.main' : 'mediumGrey.light',
      color: active ? 'background.paper' : 'primary.main',
      '&:hover': {
        backgroundColor: active ? 'secondary.main' : 'mediumGrey.main'
      }
    };
    return {};
  };

  var stableCss = _extends({
    cursor: disabled ? 'default' : 'pointer',
    borderRadius: 4,
    minWidth: 42,
    margin: '2px',
    padding: '0px 7px',
    textAlign: 'center',
    flexGrow: 1
  }, getStyle());

  return experimental_sx(stableCss);
});

var CalendarItem = function CalendarItem(_ref) {
  var variant = _ref.variant,
      _onClick = _ref.onClick,
      children = _ref.children,
      _ref$active = _ref.active,
      active = _ref$active === void 0 ? false : _ref$active,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled;
  return React.createElement(CalendarItemBox, {
    onClick: function onClick() {
      return !disabled && _onClick();
    },
    disabled: disabled,
    variant: variant,
    active: active
  }, React.createElement(Typography, {
    variant: "body2",
    sx: {
      color: 'inherit'
    }
  }, children));
};

var CardRootStyled = /*#__PURE__*/styled(Card$1)({
  borderRadius: 4,
  marginTop: 12,
  marginBottom: 15,
  position: 'relative'
});

var BoxDisabledStyled = /*#__PURE__*/styled(Box)( /*#__PURE__*/experimental_sx({
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 100,
  borderRadius: 4,
  backgroundColor: 'lightGrey.main',
  width: '100%',
  height: '100%',
  opacity: 0.7
}));

var ImgCardStyled = /*#__PURE__*/styled('img')({
  width: '90%',
  height: 'auto'
});

var Card = function Card(_ref) {
  var _ref2, _ref2$flat;

  var _ref$isOpen = _ref.isOpen,
      isOpen = _ref$isOpen === void 0 ? true : _ref$isOpen,
      setIsOpen = _ref.setIsOpen,
      description = _ref.description,
      title = _ref.title,
      subTitle = _ref.subTitle,
      image = _ref.image,
      children = _ref.children,
      _ref$isClickable = _ref.isClickable,
      isClickable = _ref$isClickable === void 0 ? true : _ref$isClickable,
      _ref$disabled = _ref.disabled,
      disabled = _ref$disabled === void 0 ? false : _ref$disabled,
      customCheckbox = _ref.customCheckbox;
  var collapseIn = isClickable && isOpen;
  var theme = useTheme$1();
  console.log(theme);
  return React.createElement(CardRootStyled, {
    variant: "outlined"
  }, disabled && React.createElement(BoxDisabledStyled, null), React.createElement(Box, {
    px: 2,
    py: 1.5
  }, React.createElement(Box, {
    onClick: function onClick() {
      return isClickable && setIsOpen(!isOpen);
    },
    sx: {
      cursor: isClickable ? 'pointer' : 'default'
    },
    display: "flex",
    justifyContent: "space-between"
  }, React.createElement(Box, {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  }, React.createElement(Typography, {
    variant: "h5",
    sx: {
      pt: 1,
      pb: 1
    }
  }, title), subTitle && React.createElement(Typography, {
    variant: "subtitle1",
    sx: {
      fontSize: 12,
      color: 'darkGrey.main'
    }
  }, subTitle)), React.createElement(Box, {
    display: "flex",
    justifyContent: "flex-end",
    width: image ? '60%' : 'unset'
  }, React.createElement(Box, {
    width: image ? 125 : 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }, React.createElement(ImgCardStyled, {
    src: image,
    alt: image
  })), isClickable && React.createElement(Box, {
    display: "flex",
    alignItems: "center"
  }, customCheckbox ? cloneElement(customCheckbox, {
    checked: isOpen
  }) : React.createElement(Checkbox, {
    checked: isOpen,
    disabled: disabled,
    icon: React.createElement(RadioButtonUnchecked, {
      color: "primary",
      sx: {
        width: 26,
        height: 26,
        color: 'primary.dark'
      }
    }),
    checkedIcon: React.createElement(CheckCircle, {
      sx: {
        width: 26,
        height: 26,
        color: isOpen ? 'success.main' : 'primary.dark'
      }
    })
  })))), React.createElement(Collapse, {
    "in": !isClickable && true || collapseIn
  }, React.createElement(Box, {
    mt: 2
  }, React.createElement(Box, {
    mb: 2
  }, description && ((_ref2 = [description]) == null ? void 0 : (_ref2$flat = _ref2.flat()) == null ? void 0 : _ref2$flat.map(function (elem) {
    return Children.toArray(React.createElement(Typography, {
      align: "justify",
      variant: "body2",
      gutterBottom: true,
      sx: {
        fontSize: 12
      }
    }, elem));
  }))), children))));
};

var CategoricalBarLegend = function CategoricalBarLegend(_ref) {
  var items = _ref.items;
  return React.createElement(Box, {
    mt: 2
  }, items.map(function (legendItem) {
    var _legendItem$label, _legendItem$label2;

    return React.createElement(Box, {
      display: "flex",
      alignItems: "center",
      key: "legend-item-" + legendItem.color + "-" + legendItem.label,
      ml: 0,
      my: 1
    }, React.createElement(Box, {
      width: (_legendItem$label = legendItem.label) != null && _legendItem$label.length ? '50%' : '100%',
      sx: {
        height: 7,
        borderRadius: 10,
        backgroundColor: legendItem.color,
        width: (_legendItem$label2 = legendItem.label) != null && _legendItem$label2.length ? '50%' : '100%'
      }
    }), Boolean(legendItem.label) && React.createElement(Box, {
      ml: 1,
      width: "50%"
    }, React.createElement(Typography, {
      variant: "body2",
      sx: {
        fontSize: 12
      }
    }, legendItem.label)));
  }));
};

var CollapsableBox = function CollapsableBox(_ref) {
  var expandLabel = _ref.expandLabel,
      collapseLabel = _ref.collapseLabel,
      children = _ref.children,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className;

  var _useState = useState(true),
      isCollapsed = _useState[0],
      setIsCollapsed = _useState[1];

  return React.createElement(Box, {
    style: _extends({}, style),
    className: className
  }, React.createElement(Collapse, {
    "in": !isCollapsed,
    collapsedSize: 75,
    sx: {
      overflow: 'hidden',
      position: 'relative'
    }
  }, React.createElement(Box, {
    component: "span",
    sx: {
      position: 'absolute',
      opacity: isCollapsed ? 1 : 0,
      pointerEvents: 'none',
      width: '100%',
      bottom: 0,
      background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
      height: isCollapsed && 50
    }
  }), React.createElement(Box, {
    p: 1
  }, children)), React.createElement(Box, {
    display: "flex",
    justifyContent: "center"
  }, React.createElement(Button, {
    onClick: function onClick() {
      return setIsCollapsed(!isCollapsed);
    },
    variant: "text",
    color: "primary",
    sx: {
      height: 'unset',
      padding: 'unset'
    },
    fullWidth: true
  }, React.createElement(ExpandMore, {
    sx: {
      transform: isCollapsed && 'rotateX(180deg)'
    }
  }), isCollapsed ? expandLabel : collapseLabel)));
};

var ButtonBaseStyled = /*#__PURE__*/styled(ButtonBase)(function (_ref) {
  var theme = _ref.theme;
  return {
    width: '100%',
    height: theme.spacing(5),
    display: 'flex',
    gap: theme.spacing(1),
    justifyContent: 'flex-end',
    '&.MuiButtonBase-root': {
      background: theme.palette.background["default"],
      padding: theme.spacing(1)
    }
  };
});

var RootBoxStyled = /*#__PURE__*/styled(Box)(function (_ref) {
  var theme = _ref.theme;
  return {
    boxShadow: theme.shadows[5],
    position: 'absolute',
    margin: theme.spacing(5),
    maxWidth: 120,
    transition: theme.transitions.create(['box-shadow'])
  };
});

var ArrowDownIconStyled = /*#__PURE__*/styled(KeyboardArrowDownIcon)(function (_ref) {
  var theme = _ref.theme;
  return {
    width: 24,
    height: 24,
    transition: theme.transitions.create(['transform'])
  };
});

var ColorBoxStyled = /*#__PURE__*/styled(Box)(function (_ref) {
  var theme = _ref.theme;
  return {
    width: 22,
    height: 22,
    marginLeft: theme.spacing(1)
  };
});

var TruncateTypographyStyled = /*#__PURE__*/styled(Typography)({
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: 75
});

var positionStylesMap = {
  topLeft: {
    top: 0,
    left: 0
  },
  topRight: {
    top: 0,
    right: 0
  },
  bottomRight: {
    bottom: 0,
    right: 0
  },
  bottomLeft: {
    bottom: 0,
    left: 0
  }
};

var LegendBase = function LegendBase(_ref) {
  var unit = _ref.unit,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Legend' : _ref$title,
      _ref$position = _ref.position,
      position = _ref$position === void 0 ? 'bottomRight' : _ref$position,
      _ref$defaultCollapsed = _ref.defaultCollapsed,
      defaultCollapsed = _ref$defaultCollapsed === void 0 ? false : _ref$defaultCollapsed,
      _ref$collapsable = _ref.collapsable,
      collapsable = _ref$collapsable === void 0 ? false : _ref$collapsable,
      children = _ref.children;

  var _useState = useState(defaultCollapsed),
      collapsed = _useState[0],
      setCollapsed = _useState[1];

  var toggleCollapsed = function toggleCollapsed() {
    return setCollapsed(!collapsed);
  };

  return React.createElement(RootBoxStyled, {
    sx: _extends({}, positionStylesMap[position], {
      boxShadow: collapsed && 'unset'
    })
  }, React.createElement(ButtonBaseStyled, {
    disabled: !collapsable,
    onClick: toggleCollapsed
  }, React.createElement(TruncateTypographyStyled, null, title), collapsable && React.createElement(ArrowDownIconStyled, {
    sx: {
      transform: collapsed && 'rotate(180deg)'
    }
  })), React.createElement(Box, {
    sx: {
      backgroundColor: 'lightGrey.main'
    }
  }, React.createElement(Collapse, {
    "in": !collapsed
  }, unit && React.createElement(Box, {
    display: "flex",
    justifyContent: "flex-end",
    mx: 1
  }, React.createElement(Typography, {
    variant: "subtitle2"
  }, unit), React.createElement(ColorBoxStyled, null)), React.createElement(Box, {
    sx: {
      margin: 1
    }
  }, children))));
};

var StaticLegend = function StaticLegend(_ref) {
  var items = _ref.items,
      unit = _ref.unit,
      _ref$title = _ref.title,
      title = _ref$title === void 0 ? 'Legend' : _ref$title,
      _ref$position = _ref.position,
      position = _ref$position === void 0 ? 'bottomRight' : _ref$position,
      _ref$defaultCollapsed = _ref.defaultCollapsed,
      defaultCollapsed = _ref$defaultCollapsed === void 0 ? false : _ref$defaultCollapsed,
      _ref$collapsable = _ref.collapsable,
      collapsable = _ref$collapsable === void 0 ? false : _ref$collapsable;
  return React.createElement(LegendBase, {
    unit: unit,
    title: title,
    position: position,
    collapsable: collapsable,
    defaultCollapsed: defaultCollapsed
  }, items.map(function (item, i) {
    return React.createElement(Box, {
      key: item.color,
      mb: i === items.length - 1 ? 0 : 1,
      display: "flex",
      justifyContent: "space-between",
      width: "100%"
    }, React.createElement(TruncateTypographyStyled, {
      variant: "subtitle2"
    }, item.label), React.createElement(ColorBoxStyled, {
      sx: {
        backgroundColor: item.color
      }
    }));
  }));
};

var _excluded = ["min", "max", "colors", "doMixColors", "maxItems"];
var mixLegendColors = function mixLegendColors(colorsArr) {
  var formatColors = colorsArr.map(function (color) {
    return color.includes('#') ? color : "#" + color;
  });
  var mixedColors = [];
  formatColors.forEach(function (color, i) {
    if (i !== formatColors.length - 1) {
      var color1 = new TinyColor(color);
      var color2 = new TinyColor(formatColors[i + 1]);
      var mix = color1.mix(color2).toHexString();
      mixedColors = [].concat(mixedColors, [color, mix]);
    } else mixedColors = [].concat(mixedColors, [color]);
  });
  return mixedColors;
};

var Legend = function Legend(_ref) {
  var min = _ref.min,
      max = _ref.max,
      colors = _ref.colors,
      doMixColors = _ref.doMixColors,
      _ref$maxItems = _ref.maxItems,
      maxItems = _ref$maxItems === void 0 ? 10 : _ref$maxItems,
      otherProps = _objectWithoutPropertiesLoose(_ref, _excluded);

  var colorLenByMax = colors.length / maxItems;
  var maxColorOverBy = Math.ceil(colorLenByMax);
  var reducedColors = colorLenByMax >= 1.5 ? colors.filter(function (_, i) {
    return i % maxColorOverBy === 0;
  }) : colors;
  var mixedColors = doMixColors ? mixLegendColors(colors) : reducedColors;
  var step = (max - min) / (mixedColors.length - 1);
  var legendItems = mixedColors.map(function (color, i) {
    return {
      label: Number(min + i * step).toFixed(2),
      color: color
    };
  }).reverse();
  return React.createElement(StaticLegend, Object.assign({}, otherProps, {
    items: legendItems
  }));
};

var options$1 = {
  shouldForwardProp: function shouldForwardProp(prop) {
    return prop !== 'gap';
  }
};
var GapBoxStyled = /*#__PURE__*/styled(Box, options$1)(function (_ref) {
  var gap = _ref.gap,
      theme = _ref.theme;
  return {
    gap: theme.spacing(Number(gap != null ? gap : 1))
  };
});

var _excluded$1 = ["gap", "children"];

var GapBox = function GapBox(_ref) {
  var _ref$gap = _ref.gap,
      gap = _ref$gap === void 0 ? 1 : _ref$gap,
      children = _ref.children,
      otherProps = _objectWithoutPropertiesLoose(_ref, _excluded$1);

  return React.createElement(GapBoxStyled, Object.assign({
    gap: gap
  }, otherProps), children);
};

var TopBarStyled = /*#__PURE__*/styled(Box)({
  position: 'fixed',
  left: 0,
  top: 0,
  right: 0,
  height: '4px',
  zIndex: 2000,
  color: 'white'
});

var BlockingGridStyled = /*#__PURE__*/styled(Grid)({
  position: 'fixed',
  left: 0,
  top: 0,
  right: 0,
  bottom: 0,
  height: '100vh',
  zIndex: 2000,
  backgroundColor: 'rgba(13,57,88,0.9)',
  color: '#ffffff'
});

var Loader = function Loader(_ref) {
  var _ref$isLoading = _ref.isLoading,
      isLoading = _ref$isLoading === void 0 ? false : _ref$isLoading,
      _ref$variant = _ref.variant,
      variant = _ref$variant === void 0 ? 'blocking' : _ref$variant,
      _ref$style = _ref.style,
      style = _ref$style === void 0 ? {} : _ref$style;

  if (isLoading) {
    if (variant === 'blocking') return React.createElement(BlockingGridStyled, {
      container: true,
      alignItems: "center",
      justifyContent: "center",
      style: _extends({}, style)
    }, React.createElement(CircularProgress, {
      color: "inherit",
      size: 50,
      thickness: 5
    }));
    return React.createElement(TopBarStyled, {
      style: _extends({}, style)
    }, React.createElement(LinearProgress, {
      color: "primary"
    }));
  }

  return null;
};

var MultiField = function MultiField(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      _ref$length = _ref.length,
      length = _ref$length === void 0 ? 6 : _ref$length,
      _ref$seperationInterv = _ref.seperationInterval,
      seperationInterval = _ref$seperationInterv === void 0 ? 3 : _ref$seperationInterv,
      _ref$fontSize = _ref.fontSize,
      fontSize = _ref$fontSize === void 0 ? 50 : _ref$fontSize,
      _ref$seperatorChar = _ref.seperatorChar,
      seperatorChar = _ref$seperatorChar === void 0 ? '-' : _ref$seperatorChar,
      _ref$placeholderChar = _ref.placeholderChar,
      placeholderChar = _ref$placeholderChar === void 0 ? ' ' : _ref$placeholderChar;
  var lengthIndex = length - 1; // Dynamically changing length is not supported. To add support, refs need to be updated to change correctly on rerender &
  // value truncated on length change

  var refs = Array.from({
    length: length
  }, function () {
    return useRef(null);
  });
  var valueWithFallback = value != null ? value : Array.from({
    length: length
  }, function () {
    return placeholderChar;
  }).join('');
  var chars = valueWithFallback.split('');

  var getValue = function getValue(eValue, position) {
    return chars.map(function (item, i) {
      if (i === position) {
        if (eValue === '') return placeholderChar;
        return eValue;
      }

      return item;
    }).slice(0, length).join('');
  };

  var handleKeyPress = function handleKeyPress(e, position) {
    if (e.key === 'Backspace' && position !== 0) {
      var _refs$current;

      // handleChange prevented on backspace and handled here - otherwise order would be incorrect
      e.preventDefault();
      onChange(getValue('', position));
      (_refs$current = refs[position - 1].current) == null ? void 0 : _refs$current.focus();
    } else if (e.key.length === 1 && chars[position] !== placeholderChar && position + 1 !== length) {
      var _refs$current2;

      // Moves focus to next, if existing position already has a character and pressed key is a character
      (_refs$current2 = refs[position + 1].current) == null ? void 0 : _refs$current2.focus();
    }
  };

  var handleChange = function handleChange(e, position) {
    var _refs$current3;

    var eventValue = e.target.value.trim(); // 111111 - Handles paste

    var withoutDashRe = new RegExp("^[a-zA-Z0-9]{" + length + "}$");

    var focus = function focus() {
      var _refs$lengthIndex$cur;

      return (_refs$lengthIndex$cur = refs[lengthIndex].current) == null ? void 0 : _refs$lengthIndex$cur.focus();
    };

    if (withoutDashRe.test(eventValue)) {
      onChange(eventValue);
      focus();
      return;
    } // 111-111 - Handles paste  for string with seperator


    var withDashRe = new RegExp("[a-zA-Z0-9]{" + seperationInterval + "}" + seperatorChar + "[a-zA-Z0-9]{" + seperationInterval + "}$");

    if (withDashRe.test(eventValue)) {
      onChange(eventValue.replace(seperatorChar, ''));
      focus();
      return;
    } // Prevents more than 1 char


    if (eventValue.length > 1 || eventValue === placeholderChar) return;
    if (position !== lengthIndex && eventValue !== '') (_refs$current3 = refs[position + 1].current) == null ? void 0 : _refs$current3.focus();
    var newChars = getValue(eventValue, position);
    onChange(newChars);
  };

  var getFieldValue = function getFieldValue(position) {
    var fieldValue = chars[position];
    if (fieldValue === placeholderChar) return '';
    return fieldValue;
  }; // Focuses on first input if value set to empty


  useEffect(function () {
    var _refs$, _refs$$current;

    var emptyRe = new RegExp("^" + placeholderChar + "{" + length + "}$");
    if (emptyRe.test(valueWithFallback)) (_refs$ = refs[0]) == null ? void 0 : (_refs$$current = _refs$.current) == null ? void 0 : _refs$$current.focus();
  }, [length, refs, valueWithFallback, seperatorChar]);
  return React.createElement(Box, {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    gap: 1
  }, refs.map(function (item, i) {
    return (// eslint-disable-next-line react/no-array-index-key
      React.createElement(Fragment, {
        key: i.toString()
      }, React.createElement(TextField, {
        value: getFieldValue(i),
        onChange: function onChange(e) {
          return handleChange(e, i);
        },
        onKeyDown: function onKeyDown(e) {
          return handleKeyPress(e, i);
        },
        variant: "filled",
        sx: {
          display: 'flex',
          '& .MuiInputBase-input': {
            fontSize: fontSize,
            padding: 1,
            textAlign: 'center'
          }
        },
        inputRef: item,
        autoFocus: i === 0
      }), (i + 1) % seperationInterval === 0 && i !== lengthIndex && React.createElement(Typography, {
        sx: {
          fontSize: fontSize,
          mx: 1,
          my: 0
        }
      }, seperatorChar))
    );
  }));
};

var BoxRootStyled = /*#__PURE__*/styled(Box, {
  shouldForwardProp: function shouldForwardProp(prop) {
    return prop !== 'isCollapsed';
  }
})(function (_ref) {
  var isCollapsed = _ref.isCollapsed,
      vertical = _ref.vertical;

  var getCursor = function getCursor() {
    if (isCollapsed) return 'pointer !important';
    if (!vertical) return 's-resize';
    return 'w-resize';
  };

  return {
    cursor: getCursor(),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  };
});

var IconBoxStyled = /*#__PURE__*/styled(Box)(function (_ref) {
  var theme = _ref.theme;
  return experimental_sx({
    zIndex: 10,
    padding: theme.spacing(2, 2, 0.2, 2),
    width: 20,
    height: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'darkGrey.main',
    position: 'relative',
    borderRadius: '20px 20px 0 0'
  });
});

var Handle = function Handle(_ref) {
  var onMouseDown = _ref.onMouseDown,
      onMouseUp = _ref.onMouseUp,
      isCollapsed = _ref.isCollapsed,
      onClickExpand = _ref.onClickExpand,
      vertical = _ref.vertical,
      size = _ref.size;
  var localTheme = useTheme();
  var isHorizontal = !vertical;
  var sizeMap = {
    small: {
      height: 16,
      padding: function padding(theme) {
        return theme.spacing(1, 1, 0.1, 1);
      }
    },
    large: {
      height: 34,
      padding: function padding(theme) {
        return theme.spacing(3, 3, 0.3, 3);
      }
    }
  };
  var iconSizeTranslateMap = {
    small: 'translate(0, -3px)',
    large: 'translate(0, -8px)'
  };
  return React.createElement(BoxRootStyled, {
    draggable: false,
    onMouseDown: onMouseDown,
    onMouseUp: onMouseUp,
    onClick: function onClick() {
      return isCollapsed && onClickExpand();
    },
    isCollapsed: isCollapsed,
    vertical: vertical
  }, React.createElement(IconBoxStyled, {
    draggable: false,
    sx: _extends({
      transform: !isHorizontal ? 'translate(-40%, 0) rotate(-90deg)' : 'unset'
    }, sizeMap[size])
  }, !isCollapsed ? React.createElement(DragHandle, {
    sx: {
      color: 'primary.main',
      transform: 'translate(0, -5px)',
      width: 18,
      translate: iconSizeTranslateMap[size]
    }
  }) : React.createElement(ExpandLess, {
    sx: {
      color: 'primary.main',
      transform: 'translate(0, -5px)',
      width: 18,
      translate: iconSizeTranslateMap[size]
    }
  })));
};

var VerticalHandle = function VerticalHandle(_ref) {
  var wrapperSize = _ref.wrapperSize,
      draggableSize = _ref.draggableSize,
      _ref$minDraggableSize = _ref.minDraggableSize,
      minDraggableSize = _ref$minDraggableSize === void 0 ? 0 : _ref$minDraggableSize,
      _ref$minContainerSize = _ref.minContainerSize,
      minContainerSize = _ref$minContainerSize === void 0 ? 0 : _ref$minContainerSize,
      _ref$vertical = _ref.vertical,
      vertical = _ref$vertical === void 0 ? false : _ref$vertical,
      _ref$size = _ref.size,
      size = _ref$size === void 0 ? 'medium' : _ref$size,
      onDrag = _ref.onDrag;

  var _useState = useState(false),
      isDragging = _useState[0],
      setIsDragging = _useState[1];

  var _useState2 = useState(minDraggableSize * 2),
      initialSize = _useState2[0],
      setInitialSize = _useState2[1];

  var handleMouseMove = useCallback(function (e) {
    if (!vertical) {
      var wrappersHeight = wrapperSize;
      var h = e.clientY < minContainerSize ? wrappersHeight - minContainerSize : wrappersHeight - e.clientY;
      h = h < minDraggableSize ? 0 : h;
      onDrag(h);
    }

    if (vertical) {
      var wrappersWidth = wrapperSize;
      var w = e.clientX < minContainerSize ? wrappersWidth - minContainerSize : wrappersWidth - e.clientX;
      w = w < minDraggableSize ? 0 : w;
      onDrag(w);
    }
  }, [vertical, minContainerSize, minDraggableSize, onDrag, wrapperSize]);
  var handleMouseDown = useCallback(function (e) {
    setIsDragging(true);
    var h = wrapperSize - e.clientY;
    var w = wrapperSize - e.clientX;

    if (!vertical) {
      setInitialSize(initialSize < minDraggableSize ? minDraggableSize : h);
    }

    if (vertical) {
      setInitialSize(initialSize < minDraggableSize ? minDraggableSize : w);
    }
  }, [initialSize, minDraggableSize, wrapperSize]);
  var handleMouseUp = useCallback(function () {
    setIsDragging(false);
  }, []);
  useEffect(function () {
    var remove = function remove() {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousedown', handleMouseDown);
    };

    var add = function add() {
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    };

    if (isDragging) add();else remove();
    return remove;
  }, [isDragging, handleMouseMove, handleMouseDown, handleMouseUp]);
  var expandWidth = useMemo(function () {
    return 30 / 100 * wrapperSize;
  }, [wrapperSize]);
  var expandHeight = useMemo(function () {
    return expandWidth;
  }, [expandWidth]);
  var expandSize = Number(!vertical ? expandHeight : expandWidth);
  return React.createElement(Handle, {
    size: size,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
    isCollapsed: draggableSize < minDraggableSize,
    onClickExpand: function onClickExpand() {
      return onDrag(expandSize);
    },
    vertical: vertical
  });
};

VerticalHandle.defaultProps = {
  minDraggableSize: 0,
  minContainerSize: 0,
  size: 'medium'
};

var _styled;
var BoxMessageStyled = /*#__PURE__*/styled(Box)((_styled = {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap'
}, _styled["& .MuiSvgIcon-root"] = {
  marginRight: 4
}, _styled));

var SnackbarContext = /*#__PURE__*/createContext({});

var DEFAULT_SEVERITY = 'normal';
var DEFAULT_TRANSITION = 'slide';
var DEFAULT_DURATION = 3000;
/* eslint-enable max-len */

var SnackbarProvider = function SnackbarProvider(_ref) {
  var _state$options, _state$options2, _state$options3, _state$options4, _state$options5;

  var children = _ref.children,
      _ref$autoHideDuration = _ref.autoHideDuration,
      autoHideDuration = _ref$autoHideDuration === void 0 ? DEFAULT_DURATION : _ref$autoHideDuration,
      _ref$transitionCompon = _ref.transitionComponent,
      transitionComponent = _ref$transitionCompon === void 0 ? DEFAULT_TRANSITION : _ref$transitionCompon,
      _ref$severity = _ref.severity,
      severity = _ref$severity === void 0 ? DEFAULT_SEVERITY : _ref$severity,
      _ref$action = _ref.action,
      action = _ref$action === void 0 ? null : _ref$action,
      _ref$onActionClick = _ref.onActionClick,
      onActionClick = _ref$onActionClick === void 0 ? null : _ref$onActionClick;

  var _useState = useState({
    open: false,
    message: undefined,
    options: undefined
  }),
      state = _useState[0],
      setState = _useState[1];

  var existingSnackbarProps = {
    autoHideDuration: autoHideDuration,
    transitionComponent: transitionComponent,
    severity: severity,
    action: action,
    onActionClick: onActionClick
  };
  var newAutoHideDuration = ((_state$options = state.options) == null ? void 0 : _state$options.autoHideDuration) || existingSnackbarProps.autoHideDuration;
  var newTransitionComponent = ((_state$options2 = state.options) == null ? void 0 : _state$options2.transitionComponent) || existingSnackbarProps.transitionComponent;
  var newSeverity = ((_state$options3 = state.options) == null ? void 0 : _state$options3.severity) || existingSnackbarProps.severity;
  var newAction = ((_state$options4 = state.options) == null ? void 0 : _state$options4.action) || existingSnackbarProps.action;
  var newOnActionClick = ((_state$options5 = state.options) == null ? void 0 : _state$options5.onActionClick) || existingSnackbarProps.onActionClick;

  var showMessage = function showMessage(message, options) {
    setState({
      open: true,
      message: message,
      options: options
    });
  };

  var _useState2 = useState({
    showMessage: showMessage
  }),
      stateContextValue = _useState2[0];

  var handleClose = function handleClose(reason) {
    if (reason && reason === 'clickaway') {
      return;
    }

    setState(function (prev) {
      return _extends({}, prev, {
        open: false
      });
    });
  };

  var handleMessage = function handleMessage(svr, msg) {
    switch (svr) {
      case 'normal':
        return msg;

      case 'info':
        return React.createElement(BoxMessageStyled, null, React.createElement(InfoOutlinedIcon, {
          className: "messageIcon"
        }), msg);

      case 'success':
        return React.createElement(BoxMessageStyled, null, React.createElement(CheckCircleOutlinedIcon, {
          className: "messageIcon"
        }), msg);

      case 'warning':
        return React.createElement(BoxMessageStyled, null, React.createElement(ReportProblemOutlinedIcon, {
          className: "messageIcon"
        }), msg);

      case 'error':
        return React.createElement(BoxMessageStyled, null, React.createElement(ErrorOutlineOutlinedIcon, {
          className: "messageIcon"
        }), msg);

      default:
        return msg;
    }
  };

  var handleActionClick = function handleActionClick(e) {
    if (newOnActionClick) {
      newOnActionClick(e);
    }
  };

  var handleTransitionComponent = function handleTransitionComponent(transitionType) {
    var transition = Slide;

    switch (transitionType) {
      case 'fade':
        transition = Fade;
        break;

      case 'grow':
        transition = Grow;
        break;

      case 'slide':
        transition = Slide;
        break;

      default:
        transition = Slide;
    }

    return transition;
  };

  var severityColorMapping = {
    normal: {
      backgroundColor: 'primary.main'
    },
    info: {
      backgroundColor: 'secondary.main'
    },
    success: {
      backgroundColor: 'success.main'
    },
    warning: {
      backgroundColor: 'warning.main'
    },
    error: {
      backgroundColor: 'error.main'
    }
  };
  return React.createElement(SnackbarContext.Provider, {
    value: stateContextValue
  }, children, React.createElement(Snackbar // {...existingSnackbarProps}
  , {
    // {...existingSnackbarProps}
    message: handleMessage(newSeverity, state.message),
    open: state.open,
    autoHideDuration: newAutoHideDuration,
    TransitionComponent: handleTransitionComponent(newTransitionComponent),
    ContentProps: {
      sx: severityColorMapping[newSeverity]
    },
    action: newAction && React.createElement(Button, {
      variant: "outlined",
      size: "small",
      sx: {
        color: 'background.paper',
        borderColor: 'background.paper',
        textTransform: 'none'
      },
      onClick: handleActionClick
    }, newAction),
    onClose: function onClose(e, r) {
      return handleClose(r);
    }
  }));
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars

var useSnackbar = function useSnackbar() {
  return useContext(SnackbarContext);
};

var FONT_FAMILY = /*#__PURE__*/['Roboto', '-apple-system', 'BlinkMacSystemFont', 'Arial', 'sans-serif'].join(',');
var dhiTypography = {
  htmlFontSize: 16,
  fontSize: 14,
  fontFamily: FONT_FAMILY,
  h1: {
    fontSize: '2rem',
    lineHeight: 1.25,
    fontWeight: 'normal'
  },
  h2: {
    fontSize: '1.5rem',
    lineHeight: 1.33,
    fontWeight: 'normal'
  },
  h3: {
    fontSize: '1.25rem',
    lineHeight: 1.2,
    fontWeight: 'bold'
  },
  h4: {
    fontSize: '1rem',
    lineHeight: 1.25,
    fontWeight: 'bold'
  },
  h5: {
    // not defined in DHI guidelines
    fontSize: '1rem',
    lineHeight: 1,
    fontWeight: 'bold'
  },
  h6: {
    // Used by mui for DialogTitles
    fontSize: '1.25rem',
    lineHeight: 1.2,
    fontWeight: 'bold'
  },
  subtitle1: {},
  subtitle2: {},
  body1: {
    // In Figma: Body Text
    // default mui: 1rem / 1.5.
    fontSize: '1rem',
    lineHeight: 1.374
  },
  body2: {
    // In Figma: Body Text (S)
    // default mui: 0.875rem / 1.43
    fontSize: '0.875rem',
    lineHeight: 1.286
  },
  button: {},
  caption: {},
  overline: {}
};

/**
 * @deprecated These are deprecated colors from DHI guidelines. Not to be used anymore
 */
/**
 * The colors from DHI Official Guidelines
 */

var DHI_COLORS = {
  BRANDBLUE_DEFAULT: '#0B4566',
  BRANDBLUE_DARK: '#09334B',
  BRANDBLUE_LIGHT: '#93C4D4',
  ACTIONBLUE_DEFAULT: '#00A4EC',
  ACTIONBLUE_DARK: '#008BEC',
  ACTIONBLUE_LIGHT: '#97DBF9',
  GREEN_DEFAULT: '#61C051',
  GREEN_DARK: '#3EB22A',
  GREEN_LIGHT: '#BFE7B7',
  PINK_DEFAULT: '#FD3F75',
  PINK_DARK: '#D40D57',
  PINK_LIGHT: '#FFB1C8',
  DARKGREY_DEFAULT: '#86A2B3',
  DARKGREY_DARK: '#557A8F',
  DARKGREY_LIGHT: '#CFDBE2',
  MEDIUMGREY_DEFAULT: '#DBE4E9',
  MEDIUMGREY_DARK: '#CFDBE2',
  MEDIUMGREY_LIGHT: '#F2F5F7',
  XLIGHTGREY: '#F8F8F8',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  // newly added
  YELLOW_DEFAULT: '#FFC20A',
  YELLOW_DARK: '#FFC20A',
  YELLOW_LIGHT: '#FFE300'
};

var defaultTheme = /*#__PURE__*/createTheme();
var MuiPalette = defaultTheme.palette;

var dhiPalette = /*#__PURE__*/_extends({}, MuiPalette, {
  primary: {
    main: DHI_COLORS.BRANDBLUE_DEFAULT,
    dark: DHI_COLORS.BRANDBLUE_DARK,
    light: DHI_COLORS.BRANDBLUE_LIGHT,
    contrastText: DHI_COLORS.WHITE
  },
  secondary: {
    main: DHI_COLORS.ACTIONBLUE_DEFAULT,
    dark: DHI_COLORS.ACTIONBLUE_DARK,
    light: DHI_COLORS.ACTIONBLUE_LIGHT,
    contrastText: DHI_COLORS.WHITE
  },
  error: {
    main: DHI_COLORS.PINK_DEFAULT,
    dark: DHI_COLORS.PINK_DARK,
    light: DHI_COLORS.PINK_LIGHT,
    contrastText: DHI_COLORS.WHITE
  },
  warning: {
    main: DHI_COLORS.YELLOW_DEFAULT,
    dark: DHI_COLORS.YELLOW_DARK,
    light: DHI_COLORS.YELLOW_LIGHT,
    contrastText: DHI_COLORS.WHITE
  },
  info: {
    main: DHI_COLORS.ACTIONBLUE_DEFAULT,
    dark: DHI_COLORS.ACTIONBLUE_DARK,
    light: DHI_COLORS.ACTIONBLUE_LIGHT,
    contrastText: DHI_COLORS.WHITE
  },
  success: {
    main: DHI_COLORS.GREEN_DEFAULT,
    dark: DHI_COLORS.GREEN_DARK,
    light: DHI_COLORS.GREEN_LIGHT,
    contrastText: DHI_COLORS.WHITE
  },
  darkGrey: {
    main: DHI_COLORS.DARKGREY_DEFAULT,
    dark: DHI_COLORS.DARKGREY_DARK,
    light: DHI_COLORS.DARKGREY_LIGHT,
    contrastText: DHI_COLORS.BLACK
  },
  mediumGrey: {
    main: DHI_COLORS.MEDIUMGREY_DEFAULT,
    dark: DHI_COLORS.MEDIUMGREY_DARK,
    light: DHI_COLORS.MEDIUMGREY_LIGHT,
    contrastText: DHI_COLORS.BLACK
  },
  lightGrey: {
    main: DHI_COLORS.XLIGHTGREY,
    dark: DHI_COLORS.XLIGHTGREY,
    light: DHI_COLORS.XLIGHTGREY,
    contrastText: DHI_COLORS.BLACK
  },
  text: {
    primary: DHI_COLORS.BRANDBLUE_DEFAULT,
    secondary: DHI_COLORS.DARKGREY_DEFAULT,
    disabled: DHI_COLORS.MEDIUMGREY_DEFAULT
  },
  background: {
    "default": DHI_COLORS.XLIGHTGREY,
    paper: DHI_COLORS.WHITE
  },
  divider: DHI_COLORS.MEDIUMGREY_DEFAULT
});

// #region Local imports

var FONT_FAMILY$1 = /*#__PURE__*/['Roboto', '-apple-system', 'BlinkMacSystemFont', 'Arial', 'sans-serif'].join(',');
var SPACING = 8; // const defaultTheme = createTheme();

var mikeOverrides = {
  MuiCssBaseline: {
    styleOverrides: {
      '*::-webkit-scrollbar': {
        width: '8px',
        height: '8px',
        backgroundColor: dhiPalette.mediumGrey.main,
        borderRadius: '100px'
      },
      '*::-webkit-scrollbar:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: dhiPalette.darkGrey.main,
        WebkitBorderRadius: '100px'
      },
      '*::-webkit-scrollbar-thumb:active': {
        backgroundColor: dhiPalette.darkGrey.main,
        WebkitBorderRadius: '100px'
      }
    }
  },
  MuiTypography: {
    styleOverrides: {
      root: {
        fontFamily: FONT_FAMILY$1
      }
    }
  },
  MuiAppBar: {
    styleOverrides: {
      colorPrimary: {
        backgroundColor: dhiPalette.mediumGrey.light,
        height: '60px',
        borderBottom: '4px solid',
        borderColor: dhiPalette.mediumGrey.main
      }
    }
  },
  MuiToolbar: {
    styleOverrides: {// not sure if this is really desireable
      // root: {
      //   height: '60px',
      //   minHeight: '0 !important',
      // }
    }
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        padding: 24,
        backgroundColor: dhiPalette.lightGrey.light
      }
    }
  },
  MuiDialogContent: {
    styleOverrides: {
      root: {
        position: 'relative',
        padding: 'unset'
      }
    }
  },
  MuiDialogTitle: {
    styleOverrides: {
      root: {
        padding: 0,
        marginBottom: 8
      }
    }
  },
  MuiDialogContentText: {
    styleOverrides: {
      root: {
        color: dhiPalette.text.primary
      }
    }
  },
  MuiDialogActions: {
    styleOverrides: {
      root: {
        padding: 0,
        marginTop: 16
      }
    }
  },
  MuiButton: {
    styleOverrides: {
      root: {
        fontWeight: 500,
        letterSpacing: 0.1,
        textTransform: 'none',
        height: '3rem',
        '&:disabled': {
          height: '3rem'
        }
      },
      sizeLarge: {
        minWidth: 328
      },
      sizeSmall: {
        height: '2.5rem',
        '&:disabled': {
          height: '2.5rem'
        },
        minWidth: 0,
        padding: '0 1rem'
      },
      outlined: {
        minWidth: 156,
        border: '2px solid'
      },
      contained: {
        minWidth: 156
      },
      containedPrimary: {
        '&:disabled': {
          backgroundColor: dhiPalette.primary.light,
          color: '#fff'
        }
      },
      containedSecondary: {
        '&:disabled': {
          backgroundColor: dhiPalette.secondary.light,
          color: '#fff'
        }
      },
      outlinedPrimary: {
        border: '2px solid',
        '&:hover': {
          border: '2px solid',
          borderColor: dhiPalette.primary.dark
        },
        '&:disabled': {
          border: '2px solid',
          color: dhiPalette.primary.light,
          borderColor: dhiPalette.primary.light
        }
      },
      outlinedSecondary: {
        border: '2px solid',
        '&:hover': {
          border: '2px solid',
          borderColor: dhiPalette.secondary.dark
        },
        '&:disabled': {
          border: '2px solid',
          color: dhiPalette.secondary.light,
          borderColor: dhiPalette.secondary.light
        }
      },
      textPrimary: {
        '&:disabled': {
          color: dhiPalette.primary.light
        }
      },
      textSecondary: {
        '&:disabled': {
          color: dhiPalette.secondary.light
        }
      }
    }
  },
  MuiBadge: {
    styleOverrides: {
      colorPrimary: {
        backgroundColor: dhiPalette.error.main
      }
    }
  },
  MuiCheckbox: {
    styleOverrides: {
      indeterminate: {
        color: dhiPalette.darkGrey.main,
        '&.Mui-checked': {
          color: dhiPalette.success.main
        }
      },
      colorPrimary: {
        '&.Mui-checked': {
          color: dhiPalette.success.main
        }
      },
      colorSecondary: {
        '&.Mui-checked': {
          color: dhiPalette.secondary.main
        }
      }
    }
  },
  MuiRadio: {
    styleOverrides: {
      root: {
        boxSizing: 'content-box',
        '&.Mui-checked': {
          '& svg:nth-of-type(2)': {
            transform: 'scale(0.8)'
          }
        }
      }
    }
  },
  MuiFormControlLabel: {
    styleOverrides: {
      label: {
        '&.Mui-disabled': {
          color: dhiPalette.mediumGrey.main
        }
      }
    }
  },
  MuiFab: {
    styleOverrides: {
      root: {
        backgroundColor: dhiPalette.mediumGrey.main,
        color: dhiPalette.darkGrey.dark,
        textTransform: 'none',
        '&:hover': {
          backgroundColor: dhiPalette.mediumGrey.dark
        }
      },
      primary: {
        backgroundColor: dhiPalette.primary.main,
        color: dhiPalette.background.paper,
        '&:disabled': {
          backgroundColor: dhiPalette.primary.light,
          color: '#fff'
        },
        '&:hover': {
          backgroundColor: dhiPalette.primary.dark
        }
      },
      secondary: {
        backgroundColor: dhiPalette.secondary.main,
        color: dhiPalette.background.paper,
        '&:disabled': {
          backgroundColor: dhiPalette.secondary.light,
          color: '#fff'
        },
        '&:hover': {
          backgroundColor: dhiPalette.secondary.dark
        }
      }
    }
  },
  MuiIconButton: {
    styleOverrides: {
      root: {
        '&:hover': {
          backgroundColor: dhiPalette.mediumGrey.main
        }
      }
    }
  },
  MuiInputBase: {
    styleOverrides: {
      input: {
        '&.Mui-disabled': {
          color: dhiPalette.mediumGrey.dark
        }
      }
    }
  },
  MuiFilledInput: {
    styleOverrides: {
      input: {
        '&.Mui-disabled': {
          backgroundColor: dhiPalette.mediumGrey.light
        }
      }
    }
  },
  MuiOutlinedInput: {
    styleOverrides: {
      input: {
        '&.Mui-disabled': {
          backgroundColor: dhiPalette.mediumGrey.light
        }
      }
    }
  },
  MuiTable: {
    styleOverrides: {
      root: {
        overflowX: 'auto'
      }
    }
  },
  MuiTableCell: {
    styleOverrides: {
      body: {
        height: '44px',
        color: dhiPalette.primary.main,
        padding: '0',
        userSelect: 'none',
        width: '300px'
      },
      head: {
        padding: '0',
        height: '44px',
        backgroundColor: 'white',
        borderBottom: "2px solid " + dhiPalette.divider,
        userSelect: 'none',
        cursor: 'pointer '
      }
    }
  },
  MuiTableRow: {
    styleOverrides: {
      root: {
        '&:hover, &:focus': {
          backgroundColor: dhiPalette.lightGrey.main
        }
      }
    }
  },
  MuiStepper: {
    styleOverrides: {
      root: {
        padding: '0.5rem'
      }
    }
  },
  MuiStepConnector: {
    styleOverrides: {
      line: {
        borderColor: dhiPalette.text.secondary
      }
    }
  },
  MuiStepIcon: {
    styleOverrides: {
      root: {
        fill: dhiPalette.background.paper,
        color: dhiPalette.text.secondary,
        border: 'solid',
        borderColor: dhiPalette.text.secondary,
        borderRadius: 25,
        borderWidth: 1,
        '&.Mui-active': {
          border: 'none',
          fill: dhiPalette.secondary.main,
          '& .MuiStepIcon-text': {
            fill: "" + dhiPalette.background.paper
          }
        },
        '&.Mui-completed': {
          border: 'none',
          fill: dhiPalette.secondary.main
        }
      },
      text: {
        fill: dhiPalette.text.secondary,
        fontSize: 15
      }
    }
  },
  MuiTooltip: {
    styleOverrides: {
      arrow: {
        color: dhiPalette.primary.main
      },
      popperArrow: {
        '& .MuiTooltip-tooltipPlacementBottom .MuiTooltip-arrow': {// // this seems to break the component, not sure why it was here.
          // '&::before': {
          //   borderWidth: '0 12px 12px 12px',
          //   marginTop: '-7px',
          //   marginLeft: '-6px',
          //   color: dhiPalette.darkGrey.main,
          // },
          // '&::after': {
          //   borderWidth: '0 11px 11px 11px',
          //   borderBottomColor: dhiPalette.mediumGrey.main,
          //   borderLeftColor: 'transparent',
          //   borderRightColor: 'transparent',
          //   borderTopColor: 'transparent',
          //   borderStyle: 'solid',
          //   marginTop: '-29px',
          //   marginLeft: '-5px',
          //   color: 'transparent',
          //   backgroundColor: 'transparent',
          //   width: 0,
          //   content: 'open-quote',
          //   position: 'absolute',
          //   display: 'block',
          // },
        }
      },
      tooltip: {
        backgroundColor: dhiPalette.mediumGrey.main,
        border: "1px solid " + dhiPalette.darkGrey.main,
        maxWidth: SPACING * 46,
        minHeight: SPACING * 4,
        fontSize: 14,
        fontWeight: 'normal',
        fontFamily: FONT_FAMILY$1,
        padding: SPACING,
        color: dhiPalette.primary.main,
        boxSizing: 'border-box'
      }
    }
  },
  MuiSwitch: {
    styleOverrides: {
      root: {
        width: 46,
        height: 22,
        padding: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        overflow: 'inherit',
        "float": 'right',
        '&.MuiSwitch-sizeSmall': {
          width: 40,
          height: 24,
          padding: 7,
          '& .MuiSwitch-colorPrimary': {
            '&.Mui-disabled': {
              color: dhiPalette.mediumGrey.main,
              '& + .MuiSwitch-track': {
                borderColor: dhiPalette.darkGrey.dark,
                backgroundColor: dhiPalette.darkGrey.light
              },
              '&.Mui-checked': {
                '& + .MuiSwitch-track': {
                  borderColor: dhiPalette.darkGrey.light,
                  backgroundColor: dhiPalette.darkGrey.light
                }
              }
            }
          },
          '& .MuiSwitch-colorSecondary': {
            '&.Mui-checked': {
              '& .MuiSwitch-thumb': {
                backgroundColor: dhiPalette.secondary.main
              }
            }
          },
          '& .MuiSwitch-switchBase': {
            transform: 'translateX(-2px)',
            '&.Mui-checked': {
              transform: 'translateX(18px)'
            }
          }
        }
      },
      switchBase: {
        padding: 0,
        height: '100%',
        color: dhiPalette.darkGrey.main,
        transform: 'translateX(5.6px)',
        '&:hover': {
          backgroundColor: 'transparent'
        },
        '&.Mui-checked': {
          transform: 'translateX(29px)',
          color: dhiPalette.success.dark,
          height: '100%',
          '& + .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: dhiPalette.success.light,
            borderColor: dhiPalette.success.light
          },
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }
      },
      colorSecondary: {
        color: dhiPalette.primary.main,
        '& + .MuiSwitch-track': {
          backgroundColor: dhiPalette.lightGrey.dark,
          borderColor: dhiPalette.primary.main
        },
        '&.Mui-checked': {
          color: dhiPalette.lightGrey.dark,
          '& + .MuiSwitch-track': {
            backgroundColor: dhiPalette.primary.main,
            borderColor: dhiPalette.primary.main
          }
        },
        '&.Mui-disabled': {
          color: dhiPalette.mediumGrey.main,
          '& + .MuiSwitch-track': {
            borderColor: dhiPalette.darkGrey.dark,
            backgroundColor: dhiPalette.darkGrey.light
          }
        }
      },
      colorPrimary: {
        color: dhiPalette.darkGrey.main,
        '&.Mui-checked': {
          color: dhiPalette.success.dark,
          '& + .MuiSwitch-track': {
            backgroundColor: dhiPalette.success.light,
            borderColor: dhiPalette.success.light
          }
        },
        '&.Mui-disabled': {
          color: dhiPalette.mediumGrey.main,
          '& + .MuiSwitch-track': {
            borderColor: dhiPalette.darkGrey.dark,
            backgroundColor: dhiPalette.darkGrey.light
          }
        }
      },
      input: {
        left: '-50%',
        '&:checked': {
          left: '-150%'
        }
      },
      thumb: {
        width: 12.5,
        height: 12.5,
        boxShadow: 'none'
      },
      track: {
        border: "3px solid " + dhiPalette.darkGrey.main,
        borderRadius: 16,
        opacity: 1,
        backgroundColor: dhiPalette.lightGrey.main
      }
    }
  },
  MuiTab: {
    styleOverrides: {
      root: {
        textTransform: 'none',
        fontSize: '0.75rem',
        fontWeight: 'normal',
        paddingLeft: '0.75rem',
        paddingRight: '0.75rem',
        minWidth: '0',
        '&:hover, &:focus': {
          color: dhiPalette.primary.main
        },
        '&.Mui-selected': {
          fontWeight: 'bold'
        }
      }
    }
  },
  MuiTabs: {
    styleOverrides: {
      scrollButtons: {
        minWidth: 0,
        width: 'auto',
        '& svg': {
          width: 40
        }
      }
    }
  }
};

var defaultTheme$1 = /*#__PURE__*/createTheme();
var dhiSharedTheme = /*#__PURE__*/createTheme( /*#__PURE__*/deepmerge(defaultTheme$1, {
  typography: dhiTypography,
  palette: dhiPalette,
  components: mikeOverrides
}));

var DHIThemeProvider = function DHIThemeProvider(_ref) {
  var overrides = _ref.overrides,
      children = _ref.children;
  var theme = useMemo(function () {
    var themeWithOverrides = deepmerge(_extends({}, dhiSharedTheme), overrides);
    return createTheme(themeWithOverrides);
  }, [overrides]);
  return React.createElement(React.Fragment, null, React.createElement(ThemeProvider, {
    theme: theme
  }, React.createElement(CssBaseline, null), children));
};

var CustomSlider = /*#__PURE__*/styled(Slider)(function (_ref) {
  var theme = _ref.theme;
  return {
    '&.MuiSlider-root': {
      height: 8
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      border: '1px solid',
      borderColor: theme.palette.secondary.dark,
      '&:focus, &:hover, &.Mui-active': {
        boxShadow: 'inherit'
      }
    },
    '& .MuiSlider-track, & .MuiSlider-rail': {
      height: 8,
      borderRadius: 4
    },
    '& .MuiSlider-valueLabel': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: 10
    }
  };
});

// eslint-disable-next-line import/prefer-default-export
var formatDate = function formatDate(date, dateType) {
  switch (dateType) {
    case 'monthly':
      return new Intl.DateTimeFormat('en-us', {
        year: 'numeric',
        month: 'long'
      }).format(date);

    case 'yearly':
      return new Intl.DateTimeFormat('en-us', {
        year: 'numeric'
      }).format(date);

    case 'daily':
      return new Intl.DateTimeFormat('en-us', {
        hour: 'numeric',
        minute: 'numeric',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }).format(date);

    default:
      return new Intl.DateTimeFormat('en-us', {
        hour: 'numeric',
        minute: 'numeric',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }).format(date);
  }
};

var TypographyAnnotations = /*#__PURE__*/styled(Typography)({
  fontSize: 12,
  fontWeight: 600
});

var TimestepPlayer = function TimestepPlayer(_ref) {
  var timesteps = _ref.timesteps,
      setTimestep = _ref.setTimestep,
      activeTimestep = _ref.activeTimestep,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'daily' : _ref$type,
      _ref$isPaused = _ref.isPaused,
      isPaused = _ref$isPaused === void 0 ? false : _ref$isPaused,
      _ref$interval = _ref.interval,
      interval = _ref$interval === void 0 ? 2000 : _ref$interval;

  var _useState = useState(false),
      play = _useState[0],
      setPlay = _useState[1];

  var _useState2 = useState(0),
      step = _useState2[0],
      setStep = _useState2[1]; // index


  var isLastStep = step === (timesteps == null ? void 0 : timesteps.length) - 1;
  useEffect(function () {
    var timer;
    if (play) timer = setInterval(function () {
      if (!isPaused) {
        setStep(function (previousStep) {
          return previousStep >= timesteps.length ? 0 : previousStep + 1;
        });
      }
    }, interval);else clearInterval(timer);
    return function () {
      clearInterval(timer);
    };
  }, [play, isPaused]);
  useEffect(function () {
    if (step !== undefined) setTimestep(timesteps[step]);
  }, [step]); // Pauses if on last step

  useEffect(function () {
    if (isLastStep && play) setPlay(false);
  }, [isLastStep, play]);
  useEffect(function () {
    var indexDataset = timesteps.findIndex(function (timestep) {
      return timestep.valueOf() === activeTimestep.valueOf();
    });

    if (indexDataset !== undefined) {
      setStep(indexDataset);
    }
  }, [activeTimestep]);
  useEffect(function () {
    setStep(0);
    setPlay(false);
  }, [timesteps]);

  var handleClick = function handleClick() {
    setPlay(!play);
  };

  return React.createElement(Box, {
    p: 2,
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, timesteps && timesteps.length > 0 && React.createElement(Grid, {
    container: true,
    alignItems: "center"
  }, React.createElement(Grid, {
    item: true
  }, React.createElement(Box, {
    mr: 1
  }, React.createElement(IconButton, {
    style: {
      marginBottom: 18
    },
    "aria-label": "play/pause",
    onClick: handleClick,
    color: "secondary",
    size: "large"
  }, play ? React.createElement(PauseCircleFilled, {
    sx: {
      height: 38,
      width: 38
    }
  }) : React.createElement(PlayCircleFilled, {
    sx: {
      height: 38,
      width: 38
    }
  })))), React.createElement(Grid, {
    item: true,
    xs: true
  }, React.createElement(Box, {
    ml: 1,
    mr: 3
  }, React.createElement(CustomSlider, {
    value: step,
    step: 1,
    min: 0,
    max: timesteps.length - 1,
    defaultValue: 0,
    onChange: function onChange(e, value) {
      return setStep(Number(value));
    },
    valueLabelFormat: function valueLabelFormat(value) {
      return timesteps[value] && formatDate(activeTimestep, type);
    },
    "aria-labelledby": "timestep-slider",
    valueLabelDisplay: [0, timesteps.length].includes(step) ? 'off' : 'on',
    color: "secondary"
  }), React.createElement(Box, {
    display: "flex",
    justifyContent: "space-between"
  }, React.createElement(TypographyAnnotations, {
    color: "secondary"
  }, timesteps[0] && formatDate(timesteps[0], type)), React.createElement(TypographyAnnotations, {
    color: "secondary"
  }, timesteps[timesteps.length - 1] && formatDate(new Date(timesteps[timesteps.length - 1]), type)))))));
};

var useBelow = (function (breakpoint) {
  var theme = useTheme$1();
  var checkIsBelow = useCallback(function () {
    return theme.breakpoints.values[breakpoint] > window.innerWidth;
  }, [breakpoint, theme.breakpoints.values]);

  var _useState = useState(checkIsBelow()),
      isBelow = _useState[0],
      setIsBelow = _useState[1];

  var handleResize = useCallback(function () {
    var newIsBelow = checkIsBelow();
    if (newIsBelow !== isBelow) setIsBelow(newIsBelow);
  }, [checkIsBelow, isBelow]);
  useEffect(function () {
    window.addEventListener('resize', handleResize);
    return function () {
      return window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);
  return isBelow;
});

function useLocalStorage(key, initialValue) {
  var _useState = useState(function () {
    var item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  }),
      storageValue = _useState[0],
      setStorageValue = _useState[1];

  var setValue = function setValue(value) {
    setStorageValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  return [storageValue, setValue];
}

function useSessionStorage(key, initialValue) {
  var _useState = useState(function () {
    var item = window.sessionStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  }),
      sessionValue = _useState[0],
      setsessionValue = _useState[1];

  var setValue = function setValue(value) {
    setsessionValue(value);
    window.sessionStorage.setItem(key, JSON.stringify(value));
  };

  return [sessionValue, setValue];
}

function useDebounce(value, delay) {
  var _useState = useState(value),
      debouncedValue = _useState[0],
      setDebouncedValue = _useState[1];

  useEffect(function () {
    var handler = setTimeout(function () {
      setDebouncedValue(value);
    }, delay);
    return function () {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export { ArrowDownIconStyled, BarLegend, BlockingGridStyled, BoxDisabledStyled, BoxMessageStyled, ButtonBaseStyled, CalendarBox, CalendarItem, CalendarItemBox as CalendarItemStyled, Card, CardRootStyled, CategoricalBarLegend, CollapsableBox, ColorBoxStyled, Legend as ContinuousLegend, DEFAULT_DURATION, DEFAULT_SEVERITY, DEFAULT_TRANSITION, GapBox, GapBoxStyled, IconBoxStyled, ImgCardStyled, ImgLegendStyled, LegendBase, Loader, MultiField, VerticalHandle as ResizeHandle, SnackbarProvider, StaticLegend, DHIThemeProvider as ThemeProvider, TimestepPlayer, CustomSlider as TimestepSliderStyled, TopBarStyled as TopBarBoxStyled, TruncateTypographyStyled, TypographyAnnotations as TypographyAnnotationsStyled, mixLegendColors, useBelow, useDebounce, useLocalStorage, useSessionStorage, useSnackbar };
//# sourceMappingURL=react-components-lab.esm.js.map
