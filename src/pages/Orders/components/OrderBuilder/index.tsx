import React, { useState } from 'react';
import ProductList from '../ProductList';
import BouquetBuilder from '../BouquetBuilder';
import { Product } from '@/types/products';
import { BouquetItem } from '@/types/bouquets';
import { CheckboxCard } from '@/components/ui/checkbox-card';
import { Box, Button, Container, Heading, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { EmptyState } from '@/components/ui/empty-state';
import { HiColorSwatch } from 'react-icons/hi';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import LeadPick from '../LeadPick';
import { FileImageList, FilePasteInput, FileUploadRoot } from '@/components/ui/file-upload';
import { useMutation } from '@tanstack/react-query';
import { createOrder } from '@/api/orders';
import { CreateOrderParams } from '@/api/orders/types';
import { StepsCompletedContent, StepsContent, StepsItem, StepsList, StepsRoot } from '@/components/ui/steps';

interface OrderBuilderProps { }

const OrderBuilder: React.FC<OrderBuilderProps> = () => {
  const [bouquets, setBouquets] = useState<{ id: string; items: BouquetItem[] }[]>([]);
  const [activeBouquetId, setActiveBouquetId] = useState<string | null>(null);

  const [selectedLead, setSelectedLead] = useState<string>('');

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleLeadChange = (leadId: string) => {
    setSelectedLead(leadId);
  };

  // Создание нового букета
  const handleCreateBouquet = () => {
    const newBouquet = {
      id: Date.now().toString(), // Уникальный ID для нового букета
      items: [],
    };
    setBouquets((prevBouquets) => [...prevBouquets, newBouquet]);
    setActiveBouquetId(newBouquet.id); // Новый букет становится активным
  };

  // Удаление текущего букета
  const handleDeleteBouquet = () => {
    if (!activeBouquetId) return;

    setBouquets((prevBouquets) => {
      const updatedBouquets = prevBouquets.filter(
        (bouquet) => bouquet.id !== activeBouquetId
      );

      // Переключаемся на первый букет или сбрасываем активный букет
      const nextBouquet = updatedBouquets[0]?.id || null;
      setActiveBouquetId(nextBouquet);

      return updatedBouquets;
    });
  };

  // Выбор активного букета
  const handleSelectBouquet = (bouquetId: string) => {
    setActiveBouquetId(bouquetId);
  };

  // Добавление товара в активный букет
  const handleAddToBouquet = (product: Product) => {
    if (!activeBouquetId) return;

    setBouquets((prevBouquets) =>
      prevBouquets.map((bouquet) =>
        bouquet.id === activeBouquetId
          ? {
            ...bouquet,
            items: bouquet.items.some((item) => item.product.id === product.id)
              ? bouquet.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
              : [...bouquet.items, { product, quantity: 1 }],
          }
          : bouquet
      )
    );
  };

  // Изменение количества товара в активном букете
  const handleChangeQuantity = (productId: string, delta: number) => {
    if (!activeBouquetId) return;

    setBouquets((prevBouquets) =>
      prevBouquets.map((bouquet) =>
        bouquet.id === activeBouquetId
          ? {
            ...bouquet,
            items: bouquet.items
              .map((item) =>
                item.product.id === productId
                  ? { ...item, quantity: Math.max(item.quantity + delta, 0) }
                  : item
              )
              .filter((item) => item.quantity > 0), // Удаляем товары с количеством 0
          }
          : bouquet
      )
    );
  };

  // Установка нового количества товара напрямую
  const handleSetQuantity = (productId: string, newQuantity: number) => {
    if (!activeBouquetId) return;

    setBouquets((prevBouquets) =>
      prevBouquets.map((bouquet) =>
        bouquet.id === activeBouquetId
          ? {
            ...bouquet,
            items: bouquet.items
              .map((item) =>
                item.product.id === productId
                  ? { ...item, quantity: Math.max(newQuantity, 0) }
                  : item
              )
              .filter((item) => item.quantity > 0), // Удаляем товары с количеством 0
          }
          : bouquet
      )
    );
  };

  // Очистка активного букета
  const handleClearBouquet = () => {
    if (!activeBouquetId) return;

    setBouquets((prevBouquets) =>
      prevBouquets.map((bouquet) =>
        bouquet.id === activeBouquetId ? { ...bouquet, items: [] } : bouquet
      )
    );
  };

  // useEffect(() => {
  //   console.log('bouquets', bouquets);
  //   // if (bouquets.length <= 0) {
  //   //   handleCreateBouquet();
  //   // }
  // }, [bouquets]);

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      alert("Files uploaded successfully!");
    },
    onError: (error) => {
      console.error("Error uploading files:", error);
      alert("An error occurred while uploading files.");
    },
  });

  // Активный букет
  const activeBouquet = bouquets.find((bouquet) => bouquet.id === activeBouquetId);

  const handleSubmit = () => {
    if (!selectedLead) return;
    if (!bouquets.length) return;
    if (!uploadedFiles.length) return;
    if (!activeBouquet) return;

    const orderParams: CreateOrderParams = {
      amocrm_id: selectedLead ? parseInt(selectedLead) : 0,
      bouquets: bouquets.map(bouquet => ({
        id: bouquet.id,
        items: bouquet.items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      })),
      files: uploadedFiles,
    };
    mutation.mutate(orderParams);
  };

  return (
    <Box>
      <StepsRoot defaultStep={0} count={3} variant={"solid"}>
        <StepsList colorPalette={"pink"}>
          <StepsItem index={0} title="Выбор обращения" />
          <StepsItem index={1} title="Загрузка фото" />
          <StepsItem index={2} title="Сборка заказа" />
        </StepsList>

        <StepsContent index={0}>
          <LeadPick value={selectedLead} onChange={handleLeadChange} />
        </StepsContent>
        <StepsContent index={1}>
          <FileUploadRoot maxFiles={3} accept="image/*"
            onFileChange={({ acceptedFiles }) => {
              setUploadedFiles(acceptedFiles);
            }
            }>
            <FileImageList clearable />
            <FilePasteInput placeholder="Вставьте изображение сюда..." />
          </FileUploadRoot>
        </StepsContent>
        <StepsContent index={2}>
          <Heading textStyle={"md"} mb={2}>Конструктор сборки заказа</Heading>
          <HStack align={"flex-start"} gap={8} justify={"space-between"}>
            <Container px={0} fluid>
              {bouquets.length <= 0 ? (
                <Container px={0} fluid>
                  <EmptyState title='Букеты не созданы' description='Для начала сборки необходимо добавить букет' icon={<HiColorSwatch />}>
                    {/* Кнопка создания нового букета */}
                    <Button onClick={handleCreateBouquet}>Создать букет</Button>
                  </EmptyState>
                </Container>
              ) :
                <>
                  {/* ProductList */}
                  {activeBouquetId && (
                    <ProductList
                      onAddToBouquet={handleAddToBouquet}
                      activeBouquetItems={activeBouquet?.items || []}
                    />
                  )}
                </>
              }
            </Container>

            {/* Список букетов */}
            {bouquets.length > 0 && (
              <Container px={0} maxWidth={"sm"}>
                <VStack align={"normal"} w={"100%"} gap={3}>
                  <VStack align={"normal"}>
                    <HStack justify={"space-between"}>
                      <Text>Букеты</Text>
                      <HStack gap={1}>
                        <IconButton size={"xs"} variant={"ghost"} onClick={handleDeleteBouquet}>
                          <FaMinus />
                        </IconButton>
                        <IconButton size={"xs"} variant={"ghost"} onClick={handleCreateBouquet}>
                          <FaPlus />
                        </IconButton>
                      </HStack>
                    </HStack>
                    <VStack align={"normal"} gap={1}>
                      {bouquets.map((bouquet, index) => (
                        <CheckboxCard
                          size={"sm"}
                          variant={"subtle"}
                          cursor={"pointer"}
                          colorPalette={"blue"}
                          onClick={() => handleSelectBouquet(bouquet.id)}
                          checked={bouquet.id === activeBouquetId}
                          label={`Букет ${index + 1} (${bouquet.items.length} позиций)`}
                          key={bouquet.id}
                          value={bouquet.id}
                        />
                      ))}
                    </VStack>
                  </VStack>

                  <Box>
                    {/* BouquetBuilder */}
                    {activeBouquetId && activeBouquet && (
                      <BouquetBuilder
                        items={activeBouquet.items}
                        onChangeQuantity={handleChangeQuantity}
                        onSetQuantity={handleSetQuantity}
                        onClearBouquet={handleClearBouquet}
                      />
                    )}
                  </Box>
                </VStack>
              </Container>
            )}
          </HStack>
        </StepsContent>
        <StepsCompletedContent>All steps are complete!</StepsCompletedContent>
      </StepsRoot>

      <Button onClick={handleSubmit} loading={mutation.isPending} mt={5}>Создать заказ</Button>
    </Box>
  );
};

export default OrderBuilder;