import { useEffect, useState } from "react";
import Axios from "../../utils/Axios";

const PhoneNumbers = () => {
  const [country, setCountry] = useState("US");
  const [numbers, setNumbers] = useState([]);
  const [myNumbers, setMyNumbers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch available numbers
  const fetchNumbers = async () => {
    try {
      setLoading(true);
      const res = await Axios.get(
        `/twilio/available-numbers?country=${country}`,
      );
      setNumbers(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Buy number
  const buyNumber = async (phone) => {
    try {
      await Axios.post("/twilio/buy-number", {
        phone_number: phone,
      });

      alert("Number purchased successfully!");
      fetchMyNumbers();
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch purchased numbers
  const fetchMyNumbers = async () => {
    try {
      const res = await Axios.get("/twilio/my-numbers");
      setMyNumbers(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMyNumbers();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Title */}
      <h1 className="text-2xl font-semibold mb-6">Phone Numbers</h1>

      {/* Country Select */}
      <div className="flex gap-3 mb-4">
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="US">United States</option>
          <option value="GB">United Kingdom</option>
          <option value="CA">Canada</option>
        </select>

        <button
          onClick={fetchNumbers}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Search Numbers
        </button>
      </div>

      {/* Available Numbers */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-3">Available Numbers</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-2">
            {numbers.map((num, index) => (
              <div
                key={index}
                className="flex justify-between items-center border p-3 rounded"
              >
                <span>{num.phone_number}</span>

                <button
                  onClick={() => buyNumber(num.phone_number)}
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Buy
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* My Numbers */}
      <div>
        <h2 className="text-lg font-medium mb-3">My Numbers</h2>

        {myNumbers.length === 0 ? (
          <p>No numbers purchased yet</p>
        ) : (
          <div className="space-y-2">
            {myNumbers.map((num) => (
              <div
                key={num.id}
                className="flex justify-between items-center border p-3 rounded"
              >
                <span>{num.phone_number}</span>
                <span className="text-sm text-gray-500">{num.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhoneNumbers;
