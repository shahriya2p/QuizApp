import {StyleSheet} from 'react-native';
import colors from '../../constants/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../helpers/helperFunctions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  asset: {
    height: hp(40),
    width: hp(40),
  },
  titleText: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 35,
    marginTop: hp(3),
  },
  startQuizButton: {
    paddingVertical: heightPercentageToDP(2),
    backgroundColor: colors.red,
    paddingHorizontal: widthPercentageToDP(5),
    borderRadius: heightPercentageToDP(2),
    marginVertical: heightPercentageToDP(3),
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
    fontFamily: 'Gilroy-Regular',
    fontSize: 20,
  },
});

export default styles;
