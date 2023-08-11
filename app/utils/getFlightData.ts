import { Duffel } from "@duffel/api";

const duffel = new Duffel({
  token: "duffel_test_PTGHpqlDC118HrhOMGnPDNRU-DVCwLZFuqriClIn1i9",
});

interface FlightInfoProps {
  slices: { origin: string; destination: string; departureDate: string }[];
}

const getFlightInfo = async (slices: FlightInfoProps) => {
  const offerID = await duffel.offerRequests.create({
    slices: [
      {
        origin: "NYC",
        destination: "ATL",
        departure_date: "2023-08-12",
      },
      {
        origin: "ATL",
        destination: "NYC",
        departure_date: "2023-08-20",
      },
    ],
    passengers: [{ type: "adult" }, { type: "adult" }, { age: 1 }],
    cabin_class: "economy",
    return_offers: false,
  });

  const flights = await duffel.offers.list({
    offer_request_id: offerID.data.id,
    sort: "total_amount",
    limit: 1,
  });

};

export default getFlightInfo;
