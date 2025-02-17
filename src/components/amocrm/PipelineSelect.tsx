import { fetchPipelines, setActivePipeline } from '@/slices/amocrm.slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useMemo } from 'react';
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from '@/components/ui/select';
import { createListCollection} from '@chakra-ui/react';

const PipelineSelect = () => {
  const dispatch = useAppDispatch();
  const { pipelines, activePipeline, loading, error } = useAppSelector((state) => state.amocrm);

  useEffect(() => {
    dispatch(fetchPipelines());
  }, [dispatch]);

  const handleChange = (value: string[]) => {
    const selectedPipeline = collection.items.find((pipeline) => pipeline.id.toString() === value.toString());
    if (selectedPipeline) {
      dispatch(setActivePipeline(selectedPipeline));
    }
  };

  const collection = useMemo(() => createListCollection({
    items: pipelines || [],
    itemToString: (item) => item.name,
    itemToValue: (item) => item.id.toString(),
  }), [pipelines]);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <>
      <SelectRoot collection={collection}
      value={activePipeline ? [activePipeline.id.toString()] : []}
      onValueChange={(e)=>handleChange(e.value)}
      disabled={loading}
      >
        <SelectLabel>Pipeline</SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder="Select pipeline" />
        </SelectTrigger>
        <SelectContent>
          {collection.items.map((pipeline) => (
            <SelectItem item={pipeline} key={pipeline.id}>
              {pipeline.name}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </>
  );
};

export default PipelineSelect;