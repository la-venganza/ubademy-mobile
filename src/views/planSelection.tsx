import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Button, Text, Badge, Title, Snackbar, Menu, Modal,
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
  modal: {
    backgroundColor: 'white', padding: 20, margin: 48, marginBottom: 56,
  },
});

const PlanSelection = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const [selectedPlan, setSelectedPlan] = useState('free');
  const [currentPlan, setCurrentPlan] = useState('free');
  const [plans, setPlans] = useState(['free'])
  const [availableMoney, setAvailableMoney] = useState(0);
  const [wallet, setWalletAddress] = useState('');
  const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'success' });
  const [showSaldoMenu, setShowSaldoMenu] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showHashModal, setShowHashModal] = useState(false);

  useEffect(() => {
    // Api call for getting saldo
    const getBalance = async () => {
      const balance = await walletService.getBalance(authContext.userId);
      setAvailableMoney(balance?.balance ?? 0);
      const walletResponse = await walletService.getWallet(authContext.userId);
      setWalletAddress(walletResponse?.address ?? '');
      const subscriptionResponse = await subscriptionService.getSubscription(authContext.userId);
      const subscriptionTitle = subscriptionResponse.results.length
        ? subscriptionResponse.results[0].subscription.title
        : 'Free';
      setSelectedPlan(subscriptionTitle);
      setCurrentPlan(subscriptionTitle);
      setPlans(authContext.plans);
    };
    getBalance()
  }, [authContext.updateData]);

  const onSubmit = async () => {
    setShowModal(true);
    if (plans.includes(selectedPlan)) {
      setShowModal(true);
    } else {
      const planUpdatedResponse = await subscriptionService.updateSubscription(authContext.userId, selectedPlan);
      if (planUpdatedResponse) {
        setSnackbar({ show: true, message: 'Plan updated!', type: 'success' });
      } else {
        setSnackbar({ show: false, message: 'There was an error while updating your plan. Try again later!', type: 'error' });
      }
    }
    authContext.update()
  };

  const dismiss = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.surface}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Title>Select a billing plan</Title>
          <Menu
            visible={showSaldoMenu}
            onDismiss={() => setShowSaldoMenu(false)}
            anchor={<Badge onPress={() => setShowHashModal(true)}>{availableMoney}</Badge>}
          >
            <Menu.Item title={wallet} />
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
          {
            showModal || showHashModal
              ? null
              : <Button mode="contained" labelStyle={styles.planText} onPress={onSubmit} disabled={currentPlan === selectedPlan || plans.includes(selectedPlan.toLowerCase())}>Select Plan</Button>
        }
        </View>
      </View>
      <Modal style={styles.modal} visible={showHashModal} onDismiss={() => setShowHashModal(false)}>
        <Text>
          Transfer to:
          {' '}
          {wallet}
        </Text>
      </Modal>
      <Snackbar style={[snackbar.type === 'success' ? styles.snackbarSuccess : styles.snackbarError]} visible={snackbar.show} duration={7000}>{snackbar.message}</Snackbar>
    </View>
  );
};
export default PlanSelection;
