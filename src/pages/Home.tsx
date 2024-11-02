import { TextInput } from '@mantine/core';
import FlightsTable from '../components/FlightsTable';
import PageTitle from '../components/shared/PageTitle';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGetFlightsQuery } from '../services/apiSlice';
import useWindowSize from '../hooks/useWindowSize';
import FlightsCards from '../components/FlightsCards';

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
          flights={flights}
          isError={isError}
          page={page}
          setSearchParams={setSearchParams}
          size={size}
        />
      ) : (
        <FlightsCards flights={flights} />
      )}
    </div>
  );
};

export default Home;
