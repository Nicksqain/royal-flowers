"use client"

import { Box, Heading } from '@chakra-ui/react';
import { FC } from 'react'
import AuthForm from '@/components/forms/AuthForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { toaster } from '@/components/ui/toaster';

interface AuthProps {
  
}

const Auth: FC<AuthProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const fromPage = location.state?.from?.pathname || "/";

  function onSuccessfulSubmit() {
    toaster.create({
      title: 'Success',
      type: 'success',
      description: 'You have successfully logged in',
    });
    navigate(fromPage);
  }

  function onUnsuccessfulSubmit() {
    toaster.create({
      title: 'Error',
      type: 'error',
      description: 'Invalid username or password',
    });
  }

  return (
    <Box maxW="md" mx="auto" p={5}>
      <Heading as="h2" size="lg" textAlign="center" mb={6}>
        Authorization
      </Heading>
      <AuthForm onSuccessfulSubmit={onSuccessfulSubmit} onUnsuccessfulSubmit={onUnsuccessfulSubmit} />
    </Box>
  )
}

export default Auth;