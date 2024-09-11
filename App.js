import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Vibration } from 'react-native';
import { useState } from 'react';
import { Entypo } from '@expo/vector-icons';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentNumber, setCurrentNumber] = useState('');
  const [lastNumber, setLastNumber] = useState('');

  // Danh sách các nút trên máy tính
  const buttons = [
    'C', 'CE', 'DEL', '%', 
    '1/x', 'x^2', '√x', '/', 
    7, 8, 9, '*', 
    4, 5, 6, '-', 
    1, 2, 3, '+', 
    '+/-', 0, '.', '='
  ];

  function calculator() {
    let lastChar = currentNumber[currentNumber.length - 1];

    if (lastChar === '/' || lastChar === '*' || lastChar === '-' || lastChar === '+' || lastChar === '.') {
      return;
    }

    let result;
    try {
      result = eval(currentNumber).toString();
    } catch (error) {
      result = 'Error';
    }

    setCurrentNumber(result);
  }

  function handleInput(buttonPressed) {
    if (buttonPressed === '+' || buttonPressed === '-' || buttonPressed === '*' || buttonPressed === '/') {
      Vibration.vibrate(35);
      setCurrentNumber(currentNumber + buttonPressed);
      return;
    } else if (buttonPressed === 1 || buttonPressed === 2 || buttonPressed === 3 || buttonPressed === 4 || buttonPressed === 5 ||
      buttonPressed === 6 || buttonPressed === 7 || buttonPressed === 8 || buttonPressed === 9 || buttonPressed === 0 || buttonPressed === '.') {
      Vibration.vibrate(35);
    }

    switch (buttonPressed) {
      case 'DEL':
        Vibration.vibrate(35);
        setCurrentNumber(currentNumber.substring(0, (currentNumber.length - 1)));
        return;
      case 'C':
        Vibration.vibrate(35);
        setLastNumber('');
        setCurrentNumber('');
        return;
      case 'CE':
        Vibration.vibrate(35);
        setCurrentNumber('');
        return;
      case '=':
        Vibration.vibrate(35);
        setLastNumber(currentNumber + ' = ');
        calculator();
        return;
      case '%':
        Vibration.vibrate(35);
        setCurrentNumber((parseFloat(currentNumber) / 100).toString());
        setLastNumber(currentNumber + '% = ' + (parseFloat(currentNumber) / 100).toString());
        return;
      case '1/x':
        Vibration.vibrate(35);
        setCurrentNumber((1 / parseFloat(currentNumber)).toString());
        return;
      case 'x^2':
        Vibration.vibrate(35);
        setCurrentNumber((Math.pow(parseFloat(currentNumber), 2)).toString());
        return;
      case '√x':
        Vibration.vibrate(35);
        setCurrentNumber((Math.sqrt(parseFloat(currentNumber))).toString());
        return;
      case '+/-':
        Vibration.vibrate(35);
        setCurrentNumber((parseFloat(currentNumber) * -1).toString());
        return;
    }

    setCurrentNumber(currentNumber + buttonPressed);
  }

  const styles = StyleSheet.create({
    results: {
      backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
      maxWidth: '100%',
      minHeight: '30%',
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    resultText: {
      maxHeight: 45,
      color: '#00b9d6',
      margin: 15,
      fontSize: 40,
    },
    historyText: {
      color: darkMode ? '#B5B7BB' : '#7c7c7c',
      fontSize: 20,
      marginRight: 10,
      alignSelf: 'flex-end',
    },
    themeButton: {
      alignSelf: 'flex-start',
      bottom: '5%',
      margin: 15,
      backgroundColor: darkMode ? '#7b8084' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    buttons: {
      width: '100%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor: darkMode ? '#282f3b' : '#f5f5f5',
    },
    button: {
      borderColor: darkMode ? '#3f4d5b' : '#e5e5e5',
      alignItems: 'center',
      justifyContent: 'center',
      width: '25%', // Đảm bảo mỗi nút chiếm 1/4 chiều rộng
      height: 80, // Chiều cao nút cố định để đồng đều
      borderWidth: 0.5,
    },
    textButton: {
      color: darkMode ? '#b5b7bb' : '#7c7c7c',
      fontSize: 25,
    }
  });

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.results}>
        <TouchableOpacity style={styles.themeButton}>
          <Entypo name={darkMode ? 'light-up' : 'moon'} size={24} color={darkMode ? 'white' : 'black'} onPress={() => darkMode ? setDarkMode(false) : setDarkMode(true)} />
        </TouchableOpacity>
        <Text style={styles.historyText}>{lastNumber}</Text>
        <Text style={styles.resultText}>{currentNumber}</Text>
      </View>
      <View style={styles.buttons}>
        {buttons.map((button) =>
          <TouchableOpacity key={button} style={[styles.button, { backgroundColor: (button === '=' || button === '/' || button === '*' || button === '-' || button === '+') ? '#00b9d6' : typeof(button) === 'number' ? (darkMode ? '#303946' : '#fff') : (darkMode ? '#414853' : '#ededed') }]} onPress={() => handleInput(button)}>
            <Text style={[styles.textButton, { color: (button === '=' || button === '/' || button === '*' || button === '-' || button === '+') ? 'white' : darkMode ? '#b5b7bb' : '#7c7c7c' }]}>{button}</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
