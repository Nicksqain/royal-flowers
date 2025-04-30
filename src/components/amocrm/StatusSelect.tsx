import { fetchPipelines, setActiveStatus } from '@/slices/amocrm.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useMemo } from 'react';
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from '@/components/ui/select';
import { createListCollection} from '@chakra-ui/react';

const StatusSelect = () => {
  const dispatch = useAppDispatch();
  const { pipelines,activePipeline, activeStatus, loading, error } = useAppSelector((state) => state.amocrm);

  useEffect(() => {
    dispatch(fetchPipelines());
  }, [dispatch]);

  const handleChange = (value: string[]) => {
    const selectedStatus = collection.items.find((status) => status.id.toString() === value.toString());
    if (selectedStatus) {
      dispatch(setActiveStatus(selectedStatus));
    } else {
      dispatch(setActiveStatus(null));
    }
  };

  const collection = useMemo(() => createListCollection({
    items: activePipeline?._embedded.statuses || [],
    itemToString: (item) => item.name,
    itemToValue: (item) => item.id.toString(),
  }), [pipelines, activePipeline]);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <>
      <SelectRoot collection={collection}
      value={activeStatus ? [activeStatus.id.toString()] : []}
      onValueChange={(e)=>handleChange(e.value)}
      disabled={loading}
      >
        <SelectLabel>Status</SelectLabel>
        <SelectTrigger clearable>
          <SelectValueText placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {collection.items.map((status) => (
            <SelectItem item={status} key={status.id}>
              {status.name}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </>
  );
};

export default StatusSelect;