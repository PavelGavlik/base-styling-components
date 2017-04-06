// @flow
import React, { PropTypes } from 'react';
import type { BoxProps } from './Box';
import Box from './Box';  // eslint-disable-line no-duplicate-imports
import defaultTheme from './defaultTheme';
import type { themeType } from './defaultTheme'; // eslint-disable-line no-duplicate-imports

type TextProps = BoxProps & {
  fontFamily?: string,
  size?: number | string,
  fontSize?: number | string,
  align?: 'left' | 'right' | 'center' | 'justify',
  textAlign?: 'left' | 'right' | 'center' | 'justify',
  bold?: boolean,
  color?: string,
  decoration?: 'none' | 'underline' | 'line-through',
  textDecoration?: 'none' | 'underline' | 'line-through',
  transform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase',
  textTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase',
  italic?: boolean,
  lineHeight?: number | string,
};

type TextContext = {
  theme: themeType,
};

const computeTextStyle = (theme = defaultTheme, {
  fontFamily = theme.text.fontFamily,
  size,
  fontSize = size,
  align,
  textAlign = align,
  bold,
  color = theme.text.color,
  decoration,
  textDecoration = decoration,
  transform,
  textTransform = transform,
  italic,
  lineHeight,

  ...props
}) => {
  let style = {
    fontFamily,
    color,
  };

  const isNumber = /^-?\d+\.?\d*$/;

  if (lineHeight) {
    if (typeof lineHeight === 'number' || isNumber.test(lineHeight)) {
      style = { ...style, lineHeight: `${lineHeight}px` };
    } else {
      style = { ...style, lineHeight };
    }
  }

  if (typeof fontSize === 'number' || isNumber.test(fontSize)) {
    const value = parseFloat(fontSize);
    style = {
      ...style,
      fontSize: (
        (value < theme.textScale.length)
        ? `${theme.textScale[value]}px`
        : `${value}px`
      ),
    };
  } else if (fontSize) {
    style = { ...style, fontSize };
  }

  if (textAlign) {
    style = { ...style, textAlign };
  }

  if (bold) {
    style = { ...style, fontWeight: theme.text.bold };
  }

  if (textDecoration) {
    style = { ...style, textDecoration };
  }

  if (textTransform) {
    style = { ...style, textTransform };
  }

  if (italic) {
    style = { ...style, fontStyle: 'italic' };
  }

  return [style, props];
};

const Text = ({
  as,
  style,
  ...props
}: TextProps,
{
  theme,
}: TextContext) => {
  const [textStyle, restProps] = computeTextStyle(theme, props);
  return (
    <Box
      as={as}
      {...restProps}
      style={{
        ...textStyle,
        ...style,
      }}
    />
  );
};

Text.contextTypes = {
  theme: PropTypes.object,
};

export default Text;
