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
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../helpers/helperFunctions';
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
            backgroundColor:
              selectedOption === item ? colors.red : colors.light_red,
          },
          selectedOption === item ? styles.shadow : {},
        ]}>
        <Text
          style={[
            styles.optionText,
            {color: selectedOption === item ? colors.white : colors.black},
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
          <AntDesign name={'arrowleft'} size={20} color={colors.black} />
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontFamily: 'Gilroy-bold'}}>Quiz</Text>
        <View style={{width: widthPercentageToDP(10)}} />
      </View>
      <TextInput
        value={freeText}
        onChangeText={setFreeText}
        selectionColor={colors.red}
        placeholder={'Enter Text Here....'}
        style={styles.textInput}
      />
      <Text style={styles.questionText}>{question.Question}</Text>
      <FlatList
        data={Object.values(question.Options)}
        style={{marginTop: heightPercentageToDP(2)}}
        renderItem={OptionTab}
        scrollEnabled={false}
      />
      <View
        style={{
          marginBottom: isKeyboardVisible
            ? heightPercentageToDP(1)
            : heightPercentageToDP(5),
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.submitButton,
            {
              backgroundColor:
                freeText === '' || selectedOption === ''
                  ? colors.gray
                  : colors.red,
            },
          ]}
          disabled={isSubmitLoading || freeText === '' || selectedOption === ''}
          onPress={onSubmit}>
          {isSubmitLoading ? (
            <ActivityIndicator size={'small'} color={colors.white} />
          ) : (
            <Text style={styles.buttonText}>Submit Answer</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.submitButton,
            {
              backgroundColor: colors.red,
            },
          ]}
          disabled={isSubmitLoading}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Index;
