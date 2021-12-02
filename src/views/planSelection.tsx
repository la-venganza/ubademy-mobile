import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Button, Text, TextInput, HelperText, Title,
} from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import colors from '../styles/colors';

const styles = StyleSheet.create({
  planTypeSelected: {
    marginTop: 24,
    padding: 18,
    backgroundColor: colors.primary,
    color: colors.white,
  },
  planTypeNotSelected: {
    marginTop: 24,
    padding: 18,
    backgroundColor: colors.gray,
    color: colors.white,
  },
  surface: {
    flex: 1,
    padding: 20,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
    width: '100%',
  },
  planList: {
    marginTop: 24,
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 36,
  },
  planText: {
    color: colors.white,
  },
  planTitle: {
    fontWeight: 'bold',
    fontSize: 24,
  },
});

const PlanSelection = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const [selectedPlan, setSelectedPlan] = useState(authContext.plan);

  return (
    <View style={styles.surface}>
      <View style={styles.wrapper}>
        <Title>Select a billing plan</Title>
        <View style={styles.planList}>
          <TouchableOpacity
            style={selectedPlan === 'free' ? styles.planTypeSelected : styles.planTypeNotSelected}
            onPress={() => setSelectedPlan('free')}
          >
            <Text style={[styles.planText, styles.planTitle]}>Free</Text>
            <Text style={[styles.planText]}>$0 per month</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={selectedPlan === 'premium' ? styles.planTypeSelected : styles.planTypeNotSelected}
            onPress={() => setSelectedPlan('premium')}
          >
            <Text style={[styles.planText, styles.planTitle]}>Premium</Text>
            <Text style={[styles.planText]}>$50 per month</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
          <Button mode="text">Cancel</Button>
          <Button mode="contained" labelStyle={styles.planText}>Select Plan</Button>
        </View>
      </View>
    </View>
  );
};
export default PlanSelection;
