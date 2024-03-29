import {Platform, StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../helpers/helperFunctions';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop:
      Platform.OS === 'ios' ? heightPercentageToDP(5) : heightPercentageToDP(1),
    paddingHorizontal: widthPercentageToDP(5),
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    paddingVertical: heightPercentageToDP(2),
    paddingHorizontal: widthPercentageToDP(4),
    borderRadius: heightPercentageToDP(2),
    width: '100%',
    fontSize: 18,
    fontFamily: 'Gilroy-Regular',
    backgroundColor: colors.light_red,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.49,
    elevation: 5,
  },
  submitButton: {
    paddingVertical: heightPercentageToDP(2),
    paddingHorizontal: widthPercentageToDP(5),
    borderRadius: heightPercentageToDP(2),
    alignItems: 'center',
    width: widthPercentageToDP(42),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  buttonText: {
    color: colors.white,
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 16,
  },
  questionText: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 30,
    alignSelf: 'center',
    marginTop: heightPercentageToDP(3),
    color: colors.black,
  },
  backButton: {
    paddingHorizontal: widthPercentageToDP(1),
    marginRight: widthPercentageToDP(4),
  },
  optionStyle: {
    paddingVertical: heightPercentageToDP(2),
    paddingHorizontal: widthPercentageToDP(4),
    borderRadius: heightPercentageToDP(1),
    marginVertical: heightPercentageToDP(1),
    alignItems: 'center',
  },
  optionText: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: heightPercentageToDP(2),
  },
  shadow: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.49,
    elevation: 12,
  },
});

export default styles;
