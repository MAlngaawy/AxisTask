import { NumberInput, Pagination, Table, TextInput } from '@mantine/core';
import { useGetFlightsQuery } from '../../services/apiSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ShowImageBtn from '../ShowImageBtn';
import PageTitle from '../shared/PageTitle';
import DeleteFlightBtn from '../DeleteFlightBtn';
import EditFlightForm from '../EditFlightForm';

type Flight = {
  id: string;
  code: string;
  capacity: number;
  departureDate: string;
  status: 'none' | 'processing' | 'ready';
  img: string;
};

function FlightsTable() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
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

  const rows = flights?.resources?.map((element: Flight) => (
    <Table.Tr key={element?.id}>
      <Table.Td>{element.code}</Table.Td>
      <Table.Td>{element.capacity}</Table.Td>
      <Table.Td>{element.departureDate}</Table.Td>
      <Table.Td>
        <ShowImageBtn img={element.img && element.id} />
      </Table.Td>
      <Table.Td>
        <div className="flex gap-2 items-center justify-center">
          <DeleteFlightBtn flightId={element.id} />
          <EditFlightForm flightData={element} />
        </div>
      </Table.Td>
    </Table.Tr>
  ));

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), size: size.toString() });
  };

  const handleSizeChange = (newSize: number) => {
    if (newSize === null || newSize === 0) return;
    setSearchParams({ page: '1', size: newSize.toString() }); // Reset to page 1 when size changes
  };

  const handleCodeChange = (newCode: string) => {
    setSearchParams({
      code: newCode,
      size: size.toString(),
      page: page.toString(),
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle text="Flights Table" />
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

      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Code</Table.Th>
            <Table.Th>Capacity</Table.Th>
            <Table.Th>Departure Date</Table.Th>
            <Table.Th>Preview Img</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {isError || flights?.resources.length < 1 ? (
            <div className="w-full py-10 text-4xl font-bold text-center flex justify-center">
              No Results
            </div>
          ) : (
            rows
          )}
        </Table.Tbody>
      </Table>

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
}

export default FlightsTable;
