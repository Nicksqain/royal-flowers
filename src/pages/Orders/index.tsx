import PipelineSelect from '@/components/amocrm/PipelineSelect';
import StoreSelect from '@/components/posiflora/StoreSelect';
import { VStack } from '@chakra-ui/react';
import { FC } from 'react'

interface OrdersProps {

}

const Orders: FC<OrdersProps> = () => {
  return (
    <VStack align={"normal"}>
      Orders

      <PipelineSelect />
      <StoreSelect />
    </VStack>
  )
}

export default Orders;