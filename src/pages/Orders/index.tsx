import PipelineSelect from '@/components/amocrm/PipelineSelect';
import StoreSelect from '@/components/posiflora/StoreSelect';
import { Stack, VStack } from '@chakra-ui/react';
import { FC } from 'react'
import OrderBuilder from './components/OrderBuilder';
import StatusSelect from '@/components/amocrm/StatusSelect';

interface OrdersProps {

}

const Orders: FC<OrdersProps> = () => {
  return (
    <VStack align={"normal"} gap={6}>
      <Stack direction={"row"} gap={4}>
        <PipelineSelect />
        <StatusSelect />
        <StoreSelect />
      </Stack>

      <OrderBuilder />
    </VStack>
  )
}

export default Orders;