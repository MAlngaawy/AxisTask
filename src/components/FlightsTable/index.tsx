import { Table } from '@mantine/core';
import ShowImageBtn from '../ShowImageBtn';
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

type Props = {
  flights: Flight[];
  isError: boolean;
  flightResourcesLength: number;
};

function FlightsTable({ flights, isError, flightResourcesLength }: Props) {
  const rows = flights?.map((element: Flight) => (
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

  return (
    <div>
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
          {isError || flightResourcesLength < 1 ? (
            <div className="w-full py-10 text-4xl font-bold text-center flex justify-center">
              No Results
            </div>
          ) : (
            rows
          )}
        </Table.Tbody>
      </Table>
    </div>
  );
}

export default FlightsTable;
