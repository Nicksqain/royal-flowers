import { Heading } from '@chakra-ui/react';
import { FC } from 'react'
import { Link as ChakraLink } from "@chakra-ui/react"
import { Link } from 'react-router-dom';

interface LogoProps {

}

const Logo: FC<LogoProps> = () => {
  return (
    <ChakraLink asChild py={3}>
      <Link to="/">
        <Heading as="h1" size="lg">Royal Flowers</Heading>
      </Link>
    </ChakraLink>
  )
}

export default Logo;