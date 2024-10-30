import { NumberInput, Pagination, Table } from '@mantine/core';
import { useGetFlightsQuery } from '../../services/apiSlice';
import { useSearchParams } from 'react-router-dom';

type Flight = {
  id: string;
  code: string;
  capacity: number;
  departureDate: string; // You may consider using Date type if it's a date object
  status: 'processing' | 'completed' | 'cancelled'; // assuming possible statuses
  img: string;
};

function FlightsTable() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const size = parseInt(searchParams.get('size') || '10', 10);
  const { data: flights } = useGetFlightsQuery({
    page,
    size,
  });

  const rows = flights?.resources?.map((element: Flight) => (
    <Table.Tr key={element?.id}>
      <Table.Td>{element.code}</Table.Td>
      <Table.Td>{element.capacity}</Table.Td>
      <Table.Td>{element.departureDate}</Table.Td>
    </Table.Tr>
  ));

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), size: size.toString() });
  };

  const handleSizeChange = (newSize: number) => {
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
          value={size}
          onChange={(e) => handleSizeChange(+e)}
          min={1}
          step={1}
        />
      </div>
    </div>
  );
}

export default FlightsTable;
