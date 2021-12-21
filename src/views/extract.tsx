import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  Button, Text, Badge, Title, Snackbar, Menu, TextInput, Caption
} from 'react-native-paper';
import { AuthContext } from '../context/AuthContext';
import colors from '../styles/colors';
import walletService from '../services/walletService';

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

const Extract = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const [availableMoney, setAvailableMoney] = useState(0);
  const [teacherWallet, _setTeacherWalletAddress] = useState('');
  const [snackbar, setSnackbar] = useState({ show: false, message: '', type: 'success' });
  const [showSaldoMenu, setShowSaldoMenu] = useState(false);

  useEffect(() => {
    // Api call for getting saldo
    const getBalance = async () => {
      const balance = await walletService.getTeacherBalance(authContext.userId);
      setAvailableMoney(balance?.balance ?? 0);
    };
    getBalance()
  }, []);

  const onSubmit = async () => {
    const response = await walletService.teacherWithdraw(authContext.userId, teacherWallet)
    if (response) {
      setSnackbar({ show: true, message: 'Extraction Succeded!', type: 'success' });
    } else {
      setSnackbar({ show: false, message: 'There was an error while extracting your balance. Try again later!', type: 'error' });
    }
  };

  const setTeacherWalletAddress = (name: string) => _setTeacherWalletAddress(name)

  return (
    <View style={styles.surface}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Title>Introduce a digital wallet address to extract to</Title>
        </View>
        <View style={[styles.infoBox, {
          borderRightColor: '#dddddd',
          borderRightWidth: 1,
        }]}
        >
          <Title>{parseFloat(`${availableMoney}`).toFixed(4)}ETH</Title>
        </View>
        <TextInput
          mode="outlined"
          value={teacherWallet}
          onChangeText={setTeacherWalletAddress}
          label="Wallet Address"
        />
        <View style={styles.buttons}>
          <Button mode="text">Cancel</Button>
          <Button mode="contained" labelStyle={styles.planText} onPress={onSubmit} disabled={teacherWallet == '' || availableMoney == 0}>Extract</Button>
        </View>
      </View>
      <Snackbar style={[snackbar.type === 'success' ? styles.snackbarSuccess : styles.snackbarError]} visible={snackbar.show} duration={7000}>{snackbar.message}</Snackbar>
    </View>
  );
};

export default Extract;
