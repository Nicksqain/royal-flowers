import { List } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import { EmptyState } from '@/components/ui/empty-state';
import { FC } from 'react'
import { HiColorSwatch } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';

interface PageNotFoundProps {
  
}

const PageNotFound: FC<PageNotFoundProps> = (  ) => {
  const navigate = useNavigate();
  return (
    <EmptyState
      icon={<HiColorSwatch />}
      title="No results found"
      description="Try adjusting your search"
    >
      <List.Root variant="marker">
        <List.Item>Try removing filters</List.Item>
        <List.Item>Try different keywords</List.Item>
      </List.Root>
      <Button size="lg" mt={4} onClick={() => navigate(-1)}>
        Go back</Button>
    </EmptyState>
  )
}

export default PageNotFound;