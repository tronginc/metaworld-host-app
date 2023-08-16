import React, { forwardRef, memo, useMemo } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { generateStyles } from './utils';
import useRenderRow from './hooks/useRenderRow';
import useDimensions from './hooks/useDimensions';
import useRows from './hooks/useRows';

const SimpleGrid = memo(
  forwardRef((props, ref) => {
    const {
      style,
      spacing,
      fixed,
      data,
      itemDimension,
      renderItem,
      horizontal,
      additionalRowStyle: externalRowStyle,
      itemContainerStyle,
      keyExtractor: customKeyExtractor,
      invertedRow,
      onItemsPerRowChange,
      ...restProps
    } = props;

    const { onLayout, itemsPerRow, containerDimension, fixedSpacing } =
      useDimensions(props);

    const { containerStyle, rowStyle } = useMemo(
      () =>
        generateStyles({
          horizontal,
          itemDimension,
          containerDimension,
          spacing,
          fixedSpacing,
          fixed,
        }),
      [
        horizontal,
        itemDimension,
        containerDimension,
        spacing,
        fixedSpacing,
        fixed,
      ],
    );

    const { rows, keyExtractor } = useRows({
      data,
      invertedRow,
      itemsPerRow,
      keyExtractor: customKeyExtractor,
      onItemsPerRowChange,
    });
    const renderRow = useRenderRow({
      renderItem,
      spacing,
      keyExtractor: customKeyExtractor,
      externalRowStyle,
      itemContainerStyle,
      horizontal,
      invertedRow,
    });

    return (
      <View
        style={[
          {
            ...(horizontal
              ? { paddingLeft: spacing }
              : { paddingTop: spacing }),
          },
          style,
        ]}
        ref={ref}
        {...restProps}>
        {rows.map((row, index) => (
          <View key={keyExtractor(row, index)} onLayout={onLayout}>
            {renderRow({
              rowItems: row,
              rowIndex: index,
              isLastRow: index === rows.length - 1,
              itemsPerRow,
              rowStyle,
              containerStyle,
              separators: null,
            })}
          </View>
        ))}
      </View>
    );
  }),
);

SimpleGrid.displayName = 'SimpleGrid';

SimpleGrid.propTypes = {
  renderItem: PropTypes.func.isRequired,

  data: PropTypes.arrayOf(PropTypes.any).isRequired,
  itemDimension: PropTypes.number,

  maxDimension: PropTypes.number,
  fixed: PropTypes.bool,
  spacing: PropTypes.number,
  style: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array,
  ]),
  additionalRowStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array,
  ]),
  itemContainerStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number,
    PropTypes.array,
  ]),

  staticDimension: PropTypes.number,
  horizontal: PropTypes.bool,

  onLayout: PropTypes.func,
  keyExtractor: PropTypes.func,

  listKey: PropTypes.string,
  invertedRow: PropTypes.bool,

  maxItemsPerRow: PropTypes.number,

  adjustGridToStyles: PropTypes.bool,
  onItemsPerRowChange: PropTypes.func,
};

SimpleGrid.defaultProps = {
  fixed: false,
  itemDimension: 120,
  spacing: 10,
  style: {},
  additionalRowStyle: undefined,
  itemContainerStyle: undefined,
  staticDimension: undefined,
  horizontal: false,
  onLayout: null,
  keyExtractor: null,
  listKey: undefined,
  maxDimension: undefined,
  invertedRow: false,
  maxItemsPerRow: undefined,
  adjustGridToStyles: false,
  onItemsPerRowChange: undefined,
};

export default SimpleGrid;
