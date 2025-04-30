"use client"

import { Button, Input, Stack } from "@chakra-ui/react"
import { Formik, Form, Field as FormikField, FieldProps } from "formik"
import * as Yup from "yup"
import { useMutation } from '@tanstack/react-query'

import { Field } from "@/components/ui/field"
import { PasswordInput } from "@/components/ui/password-input"
import { FC } from "react"
import { login } from "@/api/auth"
import { toaster } from "../ui/toaster"

interface FormValues {
  username: string
  password: string
}

interface AuthFormProps {
  onSuccessfulSubmit: () => void
  onUnsuccessfulSubmit?: () => void
}

const AuthForm: FC<AuthFormProps> = ({ onSuccessfulSubmit, onUnsuccessfulSubmit }) => {
  const initialValues: FormValues = {
    username: "",
    password: "",
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().email('Invalid email format').required('Email is required!'),
    password: Yup.string().required('Password is required!'),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      onSuccessfulSubmit && onSuccessfulSubmit();
    },
    onError: () => {
      onUnsuccessfulSubmit && onUnsuccessfulSubmit();
    },
    onSettled: () => {
      console.log('settled');
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      mutate(values)  
    } catch (error) {
      onUnsuccessfulSubmit && onUnsuccessfulSubmit()
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <Stack gap={4} align="flex-start" maxW="sm" mx="auto">
          <FormikField name="username">
            {({ field, meta }: FieldProps) => (
              <Field label="Email" invalid={meta.touched && !!meta.error} errorText={meta.error}>
                <Input {...field} size="lg" placeholder="me@example.com" />
              </Field>
            )}
          </FormikField>
          <FormikField name="password">
            {({ field, meta }: FieldProps) => (
              <Field label="Password" invalid={meta.touched && !!meta.error} errorText={meta.error}>
                <PasswordInput {...field} size="lg" placeholder="me@example.com" />
              </Field>
            )}
          </FormikField>
          <Button type="submit" colorScheme="teal" loading={isPending}>
            Submit
          </Button>
        </Stack>
      </Form>
    </Formik>
  )
}

export default AuthForm