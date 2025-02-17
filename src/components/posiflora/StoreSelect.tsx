import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useMemo } from 'react';
import { SelectContent, SelectItem, SelectLabel, SelectRoot, SelectTrigger, SelectValueText } from '@/components/ui/select';
import { createListCollection} from '@chakra-ui/react';
import { fetchStores, setActiveStore } from '@/slices/posiflora.slice';

const StoreSelect = () => {
  const dispatch = useAppDispatch();
  const { stores, activeStore, loading, error } = useAppSelector((state) => state.posiflora);

  useEffect(() => {
    dispatch(fetchStores());
  }, [dispatch]);

  const handleChange = (value: string[]) => {
    const selectedStore = collection.items.find((store) => store.id.toString() === value.toString());
    if (selectedStore) {
      dispatch(setActiveStore(selectedStore));
    }
  };

  const collection = useMemo(() => createListCollection({
    items: stores || [],
    itemToString: (item) => item.attributes.title,
    itemToValue: (item) => item.id.toString(),
  }), [stores]);

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <>
      <SelectRoot collection={collection}
      value={activeStore ? [activeStore.id.toString()] : []}
      onValueChange={(e)=>handleChange(e.value)}
      disabled={loading}
      >
        <SelectLabel>Store</SelectLabel>
        <SelectTrigger>
          <SelectValueText placeholder="Select store" />
        </SelectTrigger>
        <SelectContent>
          {collection.items.map((store) => (
            <SelectItem item={store} key={store.id}>
              {store.attributes.title}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </>
  );
};

export default StoreSelect;