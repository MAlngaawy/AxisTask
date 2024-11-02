import { Flight } from '../../types';
import Card from '../reusable/Card';
import DeleteFlightBtn from '../DeleteFlightBtn';
import EditFlightForm from '../EditFlightForm';
import OneFlightImg from './OneFlightImg';

type Props = {
  flights: Flight[];
};

const FlightsCards = ({ flights }: Props) => {
  return (
    <div className="flex gap-4 flex-wrap justify-center">
      {flights?.map((oneFlight) => {
        return (
          <Card key={oneFlight.id}>
            <div className="w-60 h-full flex flex-col justify-between">
              <OneFlightImg flightData={oneFlight} />
              <div>
                <div className="my-5">
                  <DataPreview name="Code" value={oneFlight.code} />
                  <DataPreview
                    name="Capacity"
                    value={oneFlight.capacity.toString()}
                  />
                  <DataPreview
                    name="Departure Date"
                    value={oneFlight.departureDate}
                  />
                </div>
                <div className="flex gap-2 items-center justify-around">
                  <DeleteFlightBtn flightId={oneFlight.id} />
                  <EditFlightForm flightData={oneFlight} />
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default FlightsCards;

const DataPreview = ({ name, value }: { name: string; value: string }) => {
  return (
    <div>
      <span className="font-medium">{name}</span> : <span>{value}</span>
    </div>
  );
};
