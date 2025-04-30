import React from 'react';
import { BouquetItem } from '@/types/bouquets';
import { Alert, Box, Card, Editable, Heading, HStack, IconButton, Stack, Text } from '@chakra-ui/react';
import { FaMinus, FaPlus, FaXmark } from "react-icons/fa6";
import { beautifyPrice } from '@/utils/price';

interface BouquetBuilderProps {
  items: BouquetItem[];
  onChangeQuantity: (productId: string, delta: number) => void;
  onClearBouquet: () => void;
  onSetQuantity: (productId: string, newQuantity: number) => void;
}

const BouquetBuilder: React.FC<BouquetBuilderProps> = ({
  items,
  onChangeQuantity,
  onClearBouquet,
  onSetQuantity,
}) => {
  return (
    <Stack>
      <HStack justify={"space-between"}>
        <Text>Конструктор букета</Text>
        <HStack gap={1}>
          <IconButton size={"xs"} variant={"plain"} onClick={onClearBouquet}>
            <FaXmark />
          </IconButton>
        </HStack>
      </HStack>
      <Stack direction={"column"} gap={1}>
        {items.length > 0 ? (
          items.map(({ product, quantity }) => { 
            const price = product.attributes.maxPrice ?? product.attributes.cost ?? 0;
            const total = price * quantity; 

            return (
            <Card.Root key={product.id} size={"sm"} variant={"elevated"}>
              <Card.Body>
                <HStack justify={"space-between"} align={"start"}>
                  <Box>
                    <Heading size={"md"}>{product.attributes.title}</Heading>
                    <Text textStyle="sm" letterSpacing="tight" color={"fg.muted"}>{beautifyPrice(total)}</Text>
                    </Box>
                  <HStack gap={1}>
                    <IconButton size={"xs"} variant={"subtle"} onClick={() => onChangeQuantity(product.id, -1)}>
                      <FaMinus />
                    </IconButton>
                    <Editable.Root
                      value={String(quantity)}
                      onValueChange={(e) => {
                        const newQuantity = parseInt(e.value, 10);
                        if (!isNaN(newQuantity) && newQuantity >= 0) {
                          onSetQuantity(product.id, newQuantity);
                        }
                      }}
                    >
                      <Editable.Preview width={10} justifyContent={"center"} />
                      <Editable.Input width={10} textAlign={"center"} />
                    </Editable.Root>
                    <IconButton size={"xs"} variant={"subtle"} onClick={() => onChangeQuantity(product.id, +1)}>
                      <FaPlus />
                    </IconButton>
                  </HStack>
                </HStack>
              </Card.Body>
              {/* <HStack key={product.id}>
                {product.attributes.title} x {quantity}
                <Button onClick={() => onChangeQuantity(product.id, -1)}>-</Button>
                <Button onClick={() => onChangeQuantity(product.id, +1)}>+</Button>
              </HStack> */}
            </Card.Root>
          )})
        ) : (
          <Alert.Root status="neutral" variant={"surface"}>
            <Alert.Indicator />
            <Alert.Title>
              Нет позиций в текущем букете
            </Alert.Title>
          </Alert.Root>
        )}
      </Stack>
    </Stack>
  );
};

export default BouquetBuilder;