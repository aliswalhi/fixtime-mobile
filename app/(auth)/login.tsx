import { router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AuthHeader from '../../components/auth-header';
import InputField from '../../components/input-field';
import PrimaryButton from '../../components/primary-button';
import colors from '../../constants/colors';
import { useLoginMutation } from '../../hooks/use-auth-mutations';
import type { LoginPayload } from '../../types/auth';
import showAlert from '../../utils/show-alert';
import {
  validateEmailValue,
  validatePasswordValue,
} from '../../validation/auth-validation';

export default function LoginPage() {
  const loginMutation = useLoginMutation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onTouched',
  });

  async function handleLogin(values: LoginPayload) {
    try {
      await loginMutation.mutateAsync(values);
      router.replace('/home');
    } catch (error: any) {
      showAlert('Login Failed', error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <AuthHeader title="Login" subtitle="Welcome back to FixTime" />

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
          title={loginMutation.isPending ? 'Logging In...' : 'Login'}
          onPress={handleSubmit(handleLogin)}
          disabled={loginMutation.isPending}
        />

        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.linkText}>Don't have an account? Register</Text>
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
