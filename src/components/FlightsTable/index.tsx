import { NumberInput, Pagination, Table } from '@mantine/core';
import { useGetFlightsQuery } from '../../services/apiSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ShowImageBtn from '../ShowImageBtn';

type Flight = {
  id: string;
  code: string;
  capacity: number;
  departureDate: string;
  status: 'processing' | 'completed' | 'cancelled';
  img: string;
};

function FlightsTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const size = parseInt(searchParams.get('size') || '10', 10);
  const navigate = useNavigate();

  const { data: flights } = useGetFlightsQuery({
    page,
    size,
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
        <ShowImageBtn img={element.img} />
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

  return (
    <div className="my-10">
      <h1>Flights Table</h1>

      <Table striped highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Code</Table.Th>
            <Table.Th>Capacity</Table.Th>
            <Table.Th>Departure Date</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
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
