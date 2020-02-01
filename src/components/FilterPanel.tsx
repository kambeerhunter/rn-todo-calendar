import React, { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../theme';

type FilterPanelProps = {
  onClickHandler: (value: boolean | null) => void;
};

export const FilterPanel: React.FC<FilterPanelProps> = ({ onClickHandler }) => {
  const showResolved = useCallback(() => {
    onClickHandler(false);
  }, [onClickHandler]);

  const showUnresolved = useCallback(() => {
    onClickHandler(true);
  }, [onClickHandler]);

  const showAll = useCallback(() => {
    onClickHandler(null);
  }, [onClickHandler]);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={showAll}>
        <Ionicons name="ios-list-box" size={48} color={THEME.mainColor} />
      </TouchableOpacity>

      <TouchableOpacity onPress={showResolved}>
        <Ionicons
          name="ios-checkmark-circle-outline"
          size={48}
          color={THEME.resolveColor}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={showUnresolved}>
        <Ionicons
          name="ios-close-circle-outline"
          size={48}
          color={THEME.unresolveColor}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    justifyContent: 'space-around',
    alignItems: 'center',
    // marginTop: 15,
  },
});
