import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './styles';
import axios from 'axios';
import colors from '../../constants/colors';
import {heightPercentageToDP} from '../../helpers/helperFunctions';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Urls from '../../constants/urls';

const Index = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [freeText, setFreeText] = useState('');
  const [question, setQuestion] = useState();
  const [selectedOption, setSelectedOption] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    async function fetchQuestion() {
      await axios
        .get(Urls.BASE_URL + 'question/getQuestions', {
          headers: {
            Accept: 'application/json',
          },
        })
        .then(res => {
          setQuestion(res.data.data[0]);
          setIsLoading(false);
        })
        .catch(err => {
          console.log('Error ==> ', err);
          alert('Unable to Fetch Questions..!');
          setIsLoading(false);
        });
    }
    fetchQuestion();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size={'large'} color={colors.red} />
      </View>
    );
  }

  const OptionTab = ({item}) => {
    const onPress = () => {
      if (selectedOption === item) {
        setSelectedOption('');
      } else {
        setSelectedOption(item);
      }
    };

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.optionStyle,
          {
            borderColor: selectedOption === item ? colors.red : '#D3D3D3',
            backgroundColor: selectedOption === item ? '#FFCCCB' : colors.white,
          },
        ]}>
        <Text
          style={[
            styles.optionText,
            {color: selectedOption === item ? colors.red : 'black'},
          ]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  const onSubmit = async () => {
    setIsSubmitLoading(true);
    Keyboard.dismiss();
    if (freeText === '') {
      alert('Please Enter Text');
    } else {
      if (selectedOption === '') {
        alert('Please Select Anyone Option');
      } else {
        await axios
          .post(Urls.BASE_URL + 'answer/checkAnswer', {
            questionId: question.id,
            selectedAnswer: selectedOption,
            free_text: freeText,
          })
          .then(() => {
            setIsSubmitLoading(false);
            navigation.goBack();
          })
          .catch(err => {
            console.log('Error ==>', err);
            setIsSubmitLoading(false);
            alert('Something is Wrong!');
          });
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={'height'}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <AntDesign name={'arrowleft'} size={20} color={'black'} />
        </TouchableOpacity>
        <TextInput
          value={freeText}
          onChangeText={setFreeText}
          selectionColor={colors.red}
          placeholder={'Enter Text Here....'}
          style={styles.textInput}
        />
      </View>
      <Text style={styles.questionText}>{question.Question}</Text>
      <FlatList
        data={Object.values(question.Options)}
        style={{marginTop: heightPercentageToDP(3)}}
        renderItem={OptionTab}
        scrollEnabled={false}
      />
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.submitButton,
          {
            marginBottom: isKeyboardVisible
              ? heightPercentageToDP(1)
              : heightPercentageToDP(5),
          },
        ]}
        disabled={isSubmitLoading}
        onPress={onSubmit}>
        {isSubmitLoading ? (
          <ActivityIndicator size={'small'} color={colors.white} />
        ) : (
          <Text style={styles.buttonText}>Submit Answer</Text>
        )}
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Index;
