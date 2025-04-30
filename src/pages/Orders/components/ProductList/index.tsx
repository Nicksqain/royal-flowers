// ProductList.tsx
import React, { useState } from 'react';
import { useProducts } from '@/api/posiflora';
import { BouquetItem } from '@/types/bouquets';
import {
  Box,
  Card,
  FormatNumber,
  Grid,
  Heading,
  HStack,
  Spinner,
  Stack,
  Status,
  Text,
  Input,
} from '@chakra-ui/react';
import { Product } from '@/types/products';
import { Button } from '@/components/ui/button';
import { beautifyPrice } from '@/utils/price';
import { useAppSelector } from '@/store/hooks';
import { LuSearch } from 'react-icons/lu';
import { InputGroup } from '@/components/ui/input-group';

interface ProductListProps {
  onAddToBouquet: (product: Product) => void;
  activeBouquetItems: BouquetItem[];
}

const ProductList: React.FC<ProductListProps> = ({
  onAddToBouquet,
  activeBouquetItems,
}) => {
  const store = useAppSelector((state) => state.posiflora.activeStore);
  const { data: products, isLoading, error } = useProducts(store?.id ?? '');
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) return <Spinner />;
  if (error)  {return <div>Error loading products</div>}

  // Фильтрация товаров по поисковому запросу
  const filteredProducts = products?.filter((product) =>
    product.attributes?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Stack>
      {/* Поле поиска */}
      <InputGroup
        flex="1"
        startElement={<LuSearch />}
      >
        <Input
          placeholder="Поиск товаров..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </InputGroup>

      <Grid templateColumns="repeat(3, 1fr)" gap="2">
        {filteredProducts?.map((product) => {
          const isActive = activeBouquetItems.some(
            (item) => item.product.id === product.id
          );
          const price =
            product.attributes.maxPrice ?? product.attributes.cost ?? 0;
          return (
            <Card.Root key={product.id} size={'sm'}>
              <Card.Body>
                <HStack justify={'space-between'} align={'start'}>
                  <Box>
                    <Heading size={'md'}>{product.attributes.title}</Heading>
                    <Card.Description textStyle="sm" letterSpacing="tight">
                      {beautifyPrice(price)}
                    </Card.Description>
                  </Box>
                  {isActive && (
                    <Status.Root colorPalette="blue" size={'sm'}>
                      <Status.Indicator />
                      В букете
                    </Status.Root>
                  )}
                </HStack>
              </Card.Body>
              <Card.Footer gap="2">
                <Button
                  colorPalette={''}
                  variant="solid"
                  onClick={() => onAddToBouquet(product)}
                >
                  Добавить
                </Button>
              </Card.Footer>
            </Card.Root>
          );
        })}
      </Grid>
    </Stack>
  );
};

export default ProductList;