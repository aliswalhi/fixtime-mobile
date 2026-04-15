import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import colors from '../constants/colors';

type InputFieldProps = TextInputProps & {
  errorMessage?: string;
};

export default function InputField(props: InputFieldProps) {
  const { errorMessage, style, ...restProps } = props;

  return (
    <View style={styles.wrapper}>
      <TextInput
        placeholderTextColor={colors.placeholder}
        style={[styles.input, errorMessage ? styles.inputError : null, style]}
        {...restProps}
      />
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 14,
  },
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 16,
    backgroundColor: colors.inputBackground,
    paddingHorizontal: 18,
    fontSize: 15.5,
    color: colors.textDark,
  },
  inputError: {
    borderColor: '#d64545',
  },
  errorText: {
    color: '#d64545',
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
  },
});
