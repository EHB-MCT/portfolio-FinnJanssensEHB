import CityForm from "./components/CityForm";
import "./App.css";
import { useState } from "react";
import { ProgressBar } from "react-loader-spinner";

function App() {
  let now = new Date();
  const [delay, setDelay] = useState("00:00:00");
  const [time, setTime] = useState(now);
  const [city, setCity] = useState("");
  const [isLoading, setLoading] = useState(false);
  return (
    <div className="App w-screen h-screen flex flex-col justify-center items-center bg-black">
      <CityForm
        handleClick={async (entity, city) => {
          console.log(entity);
          console.log(city);
          setLoading(true);
          const response = await fetch(
            `http://localhost:3030/delay?city=${city}`
          );
          const data = await response.json();
          console.log(data);
          setDelay(data.delay);
          setTime(new Date(data.time));
          setCity(data.city);
          setLoading(false);
        }}
        isLoading={isLoading}
      />
      {isLoading ? (
        <ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor="#fff"
          barColor="#fff"
        />
      ) : (
        <></>
      )}
      {delay === "00:00:00" && isLoading ? (
        <></>
      ) : (
        <div>
          <h2 className="font-medium text-white">
            At {time.getHours()}:{time.getMinutes()} on {time.toDateString()}{" "}
            there was this much delay for busses in {city}:
          </h2>
          <h1 className="text-8xl font-black text-white">{delay}</h1>
        </div>
      )}
    </div>
  );
}

export default App;
