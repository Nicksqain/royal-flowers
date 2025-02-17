import { Button, Container, Heading, HStack, Text } from "@chakra-ui/react";
import { FC } from "react";
import { Link as ChakraLink } from "@chakra-ui/react"
import { Link } from 'react-router-dom';

import Logo from "@/shared/Logo";
import { useAppDispatch } from "@/store/hooks";
import { logoutUser } from "@/slices/auth.slice";
import PipelineSelect from "../amocrm/PipelineSelect";

interface HeaderProps { }

const Header: FC<HeaderProps> = () => {
  const dispatch = useAppDispatch();
  
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Container py={4}>
      <HStack gap={10}>
        <Logo />
        <HStack gap={4}>
          <ChakraLink asChild py={3}>
            <Link to="/orders">
              <Text>Orders</Text>
            </Link>
          </ChakraLink>
        </HStack>
        <HStack gap={4}>
          <Button variant={"ghost"} onClick={handleLogout} colorPalette="red">
            Logout
          </Button>
        </HStack>
      </HStack>
    </Container>
  );
};

export default Header;
