import React from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Landing_Quiz} from '../../assets/images';

const Index = ({navigation}) => {
  const navigateToQuiz = () => navigation.navigate('Quiz');

  return (
    <View style={styles.container}>
      <Image
        source={Landing_Quiz}
        style={styles.asset}
        resizeMode={'contain'}
      />
      <Text style={styles.titleText}>Quiz App</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.startQuizButton}
        onPress={navigateToQuiz}>
        <Text style={styles.buttonText}>Start Quiz</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Index;
