import { NumberInput, Pagination, Table } from '@mantine/core';
import { SetURLSearchParams } from 'react-router-dom';
import ShowImageBtn from '../ShowImageBtn';
import DeleteFlightBtn from '../DeleteFlightBtn';
import EditFlightForm from '../EditFlightForm';
import { Flights } from '../../types';

type Flight = {
  id: string;
  code: string;
  capacity: number;
  departureDate: string;
  status: 'none' | 'processing' | 'ready';
  img: string;
};

type Props = {
  flights: Flights;
  setSearchParams: SetURLSearchParams;
  size: number;
  page: number;
  isError: boolean;
};

function FlightsTable({
  flights,
  setSearchParams,
  size,
  page,
  isError,
}: Props) {
  const rows = flights?.resources
    //! I'll make a filter here to remove a one record from the data because this record caused error
    ?.filter((item) => item.id !== 'a34920cd-cc28-4423-bf83-e15fb859480c')
    ?.map((element: Flight) => (
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
