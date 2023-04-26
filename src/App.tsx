import { useEffect, useState } from "react";
import { IAccount } from "../typings";

// interface IState {
//   account: IAccount;
//   mpan: string;
//   elecSerial: string;
// }

function App() {
  const initialState = {
    account: {},
    mpan: "",
    elecSerial: "",
  };

  const [state, setState] = useState(initialState);
  const { account, mpan, elecSerial } = state;

  const apiKey = import.meta.env.VITE_API_KEY;
  const accountNumber = import.meta.env.VITE_ACCOUNT_NUMBER;
  const url = `https://api.octopus.energy/v1/accounts/${accountNumber}/`;
  const productsUrl = "https://api.octopus.energy/v1/products";

  const consumptionUrl = `https://api.octopus.energy/v1/electricity-meter-points/${mpan}/meters/${elecSerial}/consumption/?page_size=100&period_from=2023-03-29T00:00Z&period_to=2023-03-29T01:29Z&order_by=period`;

  // const [account, setAccount] = useState<IAccount>();
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getAccount = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Basic ${window.btoa(apiKey + ":")}`,
          },
        });
        if (!response.ok) throw Error("did not receive expected data");
        const data: IAccount = await response.json(); // Extract JSON from the HTTP response
        setState({
          ...state,
          account: data,
          mpan: data.properties[0].electricity_meter_points[0].mpan,
          elecSerial:
            data.properties[0].electricity_meter_points[0].meters[0]
              .serial_number,
        });
        setFetchError(null);
      } catch (error: any) {
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getAccount();
  }, []);

  useEffect(() => {
    const getConsumption = async () => {
      try {
        const response = await fetch(consumptionUrl, {
          headers: {
            Authorization: `Basic ${window.btoa(apiKey + ":")}`,
          },
        });
        const data = await response.json();
        console.log("consumption", data);
      } catch (error) {
        console.log(error);
      }
    };
    if (mpan !== "" && elecSerial !== "") getConsumption();
  }, [mpan, elecSerial]);

  // console.log(state);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      {isLoading && <p>Loading ...</p>}
      {fetchError && (
        <p className=" text-red-500 font-bold">{`Error: ${fetchError}`}</p>
      )}
      {!fetchError && !isLoading && <p>MPAN: {mpan}</p>}
    </div>
  );
}

export default App;