// App.js

import React, { useState } from 'react';
import { StyleSheet, Text, View, Switch, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';  // Import Entypo icons

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonPress = (value) => {
    if (value === '=') {
      calculateResult();
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else {
      setInput(input + value);
    }
  };

  const calculateResult = () => {
    try {
      setResult(eval(input).toString());
    } catch (e) {
      setResult('Error');
    }
  };

  return (
    <View style={[styles.container, isDarkTheme ? styles.darkContainer : styles.lightContainer]}>
      {/* Theme Toggle */}
      <View style={styles.themeToggle}>
        <Text style={styles.themeText}>{isDarkTheme ? 'Dark Theme' : 'Light Theme'}</Text>
        <Switch value={isDarkTheme} onValueChange={setIsDarkTheme} />
      </View>

      {/* Display */}
      <View style={styles.display}>
        <Text style={styles.inputText}>{input}</Text>
        <Text style={styles.resultText}>{result}</Text>
      </View>

      {/* Calculator Buttons */}
      <View style={styles.buttonContainer}>
        {['1', '2', '3', '+', '4', '5', '6', '-', '7', '8', '9', '*', 'C', '0', '=', '/'].map((button) => (
          <TouchableOpacity key={button} style={styles.button} onPress={() => handleButtonPress(button)}>
            <Text style={styles.buttonText}>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  themeToggle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  themeText: {
    fontSize: 18,
  },
  display: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  inputText: {
    fontSize: 36,
    color: '#000',
  },
  resultText: {
    fontSize: 24,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  button: {
    width: '22%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 24,
    color: '#000',
  },
});
