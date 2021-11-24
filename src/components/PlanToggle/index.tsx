import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const styles = StyleSheet.create({
  planToggle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 24,
  },
});
const PlansToggle = ({ selectedPlan, setSelectedPlan }) => {
  useEffect(() => {
    setSelectedPlan(selectedPlan || 'free');
  }, []);

  const handleSelect = (selectedPlan) => {
    setSelectedPlan(selectedPlan);
  };

  return (
    <View style={styles.planToggle}>
      <Button mode={selectedPlan === 'free' ? 'contained' : 'outlined'} onPress={() => handleSelect('free')}>Free</Button>
      <Button mode={selectedPlan === 'premium' ? 'contained' : 'outlined'} onPress={() => handleSelect('premium')}>Premium</Button>
    </View>
  );
};

export default PlansToggle;
