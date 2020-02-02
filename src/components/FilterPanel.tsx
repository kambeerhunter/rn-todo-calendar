import React, { useCallback, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { THEME } from '../theme';

type FilterPanelProps = {
  onClickHandler: (value: boolean | null) => void;
};

export const FilterPanel: React.FC<FilterPanelProps> = ({ onClickHandler }) => {
  const [activeFilter, setActiveFilter] = useState(null);
  const showResolved = useCallback(() => {
    setActiveFilter(false);
    onClickHandler(false);
  }, [onClickHandler]);

  const showUnresolved = useCallback(() => {
    setActiveFilter(true);
    onClickHandler(true);
  }, [onClickHandler]);

  const showAll = useCallback(() => {
    setActiveFilter(null);
    onClickHandler(null);
  }, [onClickHandler]);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={showAll}>
        <Ionicons
          name="ios-list-box"
          size={48}
          color={THEME.mainColor}
          style={activeFilter === null ? styles.active : styles.inactive}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={showResolved}>
        <Ionicons
          name="ios-checkmark-circle-outline"
          size={48}
          color={THEME.resolveColor}
          style={activeFilter === false ? styles.active : styles.inactive}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={showUnresolved}>
        <Ionicons
          name="ios-close-circle-outline"
          size={48}
          color={THEME.unresolveColor}
          style={activeFilter === true ? styles.active : styles.inactive}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inactive: {
    opacity: 0.4,
  },
  active: {
    opacity: 1,
  },
});
