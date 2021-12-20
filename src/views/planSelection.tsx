import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Button, Text, Badge, Title, Snackbar, Menu,
} from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import colors from '../styles/colors';
import walletService from '../services/walletService';
import subscriptionService from '../services/subscriptionService';

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
  snackbarSuccess: {
    backgroundColor: 'green',
  },
  snackbarError: {
    backgroundColor: 'red',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const PlanSelection = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [currentPlan, setCurrentPlan] = useState('free');
  const [availableMoney, setAvailableMoney] = useState(0);
  const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'success' });
  const [showSaldoMenu, setShowSaldoMenu] = useState(false);

  useEffect(() => {
    // Api call for getting saldo
    const getBalance = async () => {
      const balance = await walletService.getBalance(authContext.userId);
      setAvailableMoney(balance?.balance ?? 0);
      const subscription = await subscriptionService.getSubscription(authContext.userId);
      setSelectedPlan(subscription?.subscription?.title ?? 'Free');
      setCurrentPlan(subscription?.subscription?.title ?? 'Free');
    };
    getBalance()
  }, []);

  const onSubmit = async () => {
    if (currentPlan === selectedPlan) {
      // do nothing?
    } else {
      const planUpdatedResponse = await subscriptionService.updateSubscription(authContext.userId, selectedPlan);
      console.log(planUpdatedResponse)
      if (planUpdatedResponse) {
        setSnackbar({ show: true, message: 'Plan updated!', type: 'success' });
      } else {
        setSnackbar({ show: false, message: 'There was an error while updating your plan. Try again later!', type: 'error' });
      }
    }
  };

  return (
    <View style={styles.surface}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Title>Select a billing plan</Title>
          <Menu
            visible={showSaldoMenu}
            onDismiss={() => setShowSaldoMenu(false)}
            anchor={<Badge onPress={() => setShowSaldoMenu(true)}>{availableMoney}</Badge>}
          >
            <Menu.Item title="Your hash: OFJDPDK" />
          </Menu>

        </View>
        <View style={styles.planList}>
          <TouchableOpacity
            style={selectedPlan === 'Free' ? styles.planTypeSelected : styles.planTypeNotSelected}
            onPress={() => setSelectedPlan('Free')}
          >
            <Text style={[styles.planText, styles.planTitle]}>Free</Text>
            <Text style={[styles.planText]}>0ETH per month</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={selectedPlan === 'Gold' ? styles.planTypeSelected : styles.planTypeNotSelected}
            onPress={() => setSelectedPlan('Gold')}
          >
            <Text style={[styles.planText, styles.planTitle]}>Gold</Text>
            <Text style={[styles.planText]}>0.001ETH per month</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={selectedPlan === 'Premium' ? styles.planTypeSelected : styles.planTypeNotSelected}
            onPress={() => setSelectedPlan('Premium')}
          >
            <Text style={[styles.planText, styles.planTitle]}>Premium</Text>
            <Text style={[styles.planText]}>0.002ETH per month</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
          <Button mode="text">Cancel</Button>
          <Button mode="contained" labelStyle={styles.planText} onPress={onSubmit} disabled={currentPlan === selectedPlan}>Select Plan</Button>
        </View>
      </View>
      <Snackbar style={[snackbar.type === 'success' ? styles.snackbarSuccess : styles.snackbarError]} visible={snackbar.show} duration={7000}>{snackbar.message}</Snackbar>
    </View>
  );
};
export default PlanSelection;
