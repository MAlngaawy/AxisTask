import { Table } from '@mantine/core';
import { useGetFlightsQuery } from '../../services/apiSlice';
import { useState } from 'react';

type Flight = {
  id: string;
  code: string;
  capacity: number;
  departureDate: string; // You may consider using Date type if it's a date object
  status: 'processing' | 'completed' | 'cancelled'; // assuming possible statuses
  img: string;
};

function FlightsTable() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
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
    </div>
  );
}

export default FlightsTable;
