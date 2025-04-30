import { FC } from 'react'
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import { useAmoCrmLeads } from '@/api/amocrm';
import { RadioCardItem, RadioCardLabel, RadioCardRoot } from '@/components/ui/radio-card';
import { Box, HStack, RadioCard, SimpleGrid } from '@chakra-ui/react';
import { useAppSelector } from '@/store/hooks';
import { beautifyPrice } from '@/utils/price';

dayjs.extend(calendar)

interface LeadPickProps {
  value?: string;
  onChange?: (value: string) => void;
}

const LeadPick: FC<LeadPickProps> = ({ value, onChange }) => {
  const status = useAppSelector((state) => state.amocrm.activeStatus);
  const activePipeline = useAppSelector((state) => state.amocrm.activePipeline);
  const { data, isLoading } = useAmoCrmLeads({ pipelineId: activePipeline?.id, statusId: status?.id });

  const handleChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <RadioCardRoot
        size={"sm"}
        orientation="horizontal"
        value={value}
        onValueChange={(e) => handleChange(e.value)}
      >
        <RadioCardLabel>Выбор обращения</RadioCardLabel>
        <SimpleGrid columns={[2, null, 4]} gap={4}>
          {data?.map((lead) => (

            <RadioCard.Item
              key={lead.id}
              value={lead.id.toString()}
              disabled={lead?.is_deleted}
            >
              <RadioCard.ItemHiddenInput />
              <RadioCard.ItemControl>

                <RadioCard.ItemContent>
                  <HStack justify={'space-between'} align={'stretch'} w={"100%"}>
                    <RadioCard.ItemText>{lead.name}</RadioCard.ItemText>
                    <RadioCard.ItemDescription textStyle={"2xs"}>
                    {dayjs().locale('ru').calendar(null, {
                      sameDay: '[Сегодня в] HH:mm', // Сегодня в 14:30
                      nextDay: '[Завтра в] HH:mm', // Завтра в 14:30
                      nextWeek: 'dddd [в] HH:mm', // Понедельник в 14:30
                      lastDay: '[Вчера в] HH:mm', // Вчера в 14:30
                      lastWeek: '[Прошлый] dddd [в] HH:mm', // Прошлый понедельник в 14:30
                      sameElse: 'DD.MM.YYYY [в] HH:mm', // 01.01.2023 в 14:30
                    })}
                    </RadioCard.ItemDescription>
                  </HStack>
                  <RadioCard.ItemDescription>
                    {beautifyPrice(lead.price)}
                  </RadioCard.ItemDescription>
                </RadioCard.ItemContent>
              </RadioCard.ItemControl>
              <RadioCard.ItemAddon>
                    {lead.custom_fields_values.map((field) => {
                      if (field.field_name === 'Продукт название') {
                        return field.values.map((value) => {
                          return value.value;
                        });
                      }
                    })}
                  </RadioCard.ItemAddon>
              {/* {addon && <RadioCard.ItemAddon>{addon}</RadioCard.ItemAddon>} */}
            </RadioCard.Item>
            // {/* <RadioCardItem
            //   inputProps={{ name: 'lead' }}
            //   label={lead.name}
            //   indicator={false}
            //   key={lead.id}
            //   value={lead.id.toString()}
            //   disabled={lead.is_archive || lead.is_deleted}
            // >
            //   <Box>{lead.name}</Box>
            // </RadioCardItem> */}
          ))}
        </SimpleGrid>
      </RadioCardRoot>
    </Box>
  );
};

export default LeadPick;