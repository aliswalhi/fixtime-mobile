import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AuthHeader from '../../components/auth-header';
import InputField from '../../components/input-field';
import PrimaryButton from '../../components/primary-button';
import colors from '../../constants/colors';
import { useRegisterMutation } from '../../hooks/use-auth-mutations';
import type { RegisterPayload } from '../../types/auth';
import showAlert from '../../utils/show-alert';
import {
  validateEmailValue,
  validateNameValue,
  validatePasswordValue,
  validatePhoneValue,
} from '../../validation/auth-validation';

export default function RegisterPage() {
  const registerMutation = useRegisterMutation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterPayload>({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
    },
    mode: 'onTouched',
  });

  async function handleRegister(values: RegisterPayload) {
    try {
      await registerMutation.mutateAsync(values);
      showAlert('Success', 'Account created successfully');
      reset();
      router.replace('/login');
    } catch (error: any) {
      showAlert('Register Failed', error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <AuthHeader title="Register" subtitle="Create your FixTime account" />

        <Controller
          control={control}
          name="name"
          rules={{
            validate: (value) => validateNameValue(value),
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              placeholder="Name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              errorMessage={errors.name?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="phone"
          rules={{
            validate: (value) => validatePhoneValue(value),
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              placeholder="Phone"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="phone-pad"
              errorMessage={errors.phone?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          rules={{
            validate: (value) => validateEmailValue(value),
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              errorMessage={errors.email?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          rules={{
            validate: (value) => validatePasswordValue(value),
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
              errorMessage={errors.password?.message}
            />
          )}
        />

        <PrimaryButton
          title={registerMutation.isPending ? 'Creating Account...' : 'Register'}
          onPress={handleSubmit(handleRegister)}
          disabled={registerMutation.isPending}
        />

        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={styles.linkText}>Already have an account? Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 22,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    paddingHorizontal: 24,
    paddingVertical: 28,
    width: '100%',
    maxWidth: 370,
    shadowColor: colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  linkText: {
    color: colors.primary,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
});
