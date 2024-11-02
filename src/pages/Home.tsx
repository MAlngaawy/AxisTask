import { NumberInput, Pagination, TextInput } from '@mantine/core';
import FlightsTable from '../components/FlightsTable';
import PageTitle from '../components/shared/PageTitle';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetFlightsQuery } from '../services/apiSlice';
import useWindowSize from '../hooks/useWindowSize';
import FlightsCards from '../components/FlightsCards';
import { useMemo } from 'react';
import { Flight } from '../types';

const Home = () => {
  const windowSize = useWindowSize();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get('page') || '1', 10);
  const size = parseInt(searchParams.get('size') || '10', 10);
  const code = searchParams.get('code') || '';

  const { data: flights, isError } = useGetFlightsQuery({
    page,
    size,
    ...(code && { code }), // Only include `code` if it’s not empty,
  });

  // Memoize the filtered flights
  const filteredFlights = useMemo(() => {
    return flights?.resources.filter(
      (item: Flight) => item.id !== 'a34920cd-cc28-4423-bf83-e15fb859480c'
    );
  }, [flights]);

  // Validate page and size parameters
  if (isNaN(page) || page < 1 || isNaN(size) || size < 1) {
    navigate('/bad-request'); // Redirect if invalid
    return null; // Exit component rendering
  }

  const handleCodeChange = (newCode: string) => {
    setSearchParams({
      code: newCode,
      size: size.toString(),
      page: page.toString(),
    });
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), size: size.toString() });
  };

  const handleSizeChange = (newSize: number) => {
    if (newSize === null || newSize === 0) return;
    setSearchParams({ page: '1', size: newSize.toString() }); // Reset to page 1 when size changes
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row mb-4 justify-between items-center">
        <PageTitle text="Flights Info" />
        <TextInput
          placeholder="Search By Code"
          value={code}
          // maxLength={6}
          error={code.length > 6 && 'Code must be at most 6 letters'}
          onChange={(e) => {
            handleCodeChange(e.target.value);
          }}
        />
      </div>
      {windowSize.width > 769 ? (
        <FlightsTable
          flights={filteredFlights}
          isError={isError}
          flightResourcesLength={filteredFlights?.length}
        />
      ) : (
        <FlightsCards flights={filteredFlights} />
      )}
      <div className="mx-auto py-2 flex items-center justify-between">
        <Pagination
          value={page}
          onChange={handlePageChange}
          total={Math.ceil(flights?.total / size)}
        />
        <NumberInput
          label="Table Size Per Page"
          placeholder="Enter size"
          value={size || ''}
          onChange={(e) => handleSizeChange(+e)}
          min={1}
          step={1}
        />
      </div>
    </div>
  );
};

export default Home;
