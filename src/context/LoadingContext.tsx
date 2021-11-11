import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import colors from '../styles/colors';

const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

// Create a context
const LoadingContext = React.createContext({});

const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{
      loading, setLoading,
    }}
    >
      {loading
        ? (
          <View style={styles.loading}>
            <ActivityIndicator animating color={colors.secondary} />
          </View>
        )
        : null}
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
