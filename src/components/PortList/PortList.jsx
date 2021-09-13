import React, { useEffect } from "react";
import { useSerialPort } from "../../contexts/serialport";
import "./PortList.css";
import Button from "../UI/Button/Button";

const PORTS = {
  "Silicon Labs": "ESP32"
};

const PortList = ({}) => {
  const { fetchPorts, ports, setPorts, setPort, fetchClose } = useSerialPort();

  useEffect(() => {
    handleSearch();
  }, [setPorts]);

  const handleSearch = async () => {
    await fetchClose();
    fetchPorts()
      .then(data => {
        console.log(data);
        const { response } = data;
        setPorts(response);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handlePort = port => {
    console.log(port);
    setPort(port);
  };

  return (
    <section className="portsWrapper">
      <h3>Puertos disponibles</h3>
      <div className="list">
        {ports.map(i => (
          <div key={i.path} className="item" onClick={() => handlePort(i)}>
            <p>
              {i.manufacturer && PORTS[i.manufacturer]
                ? PORTS[i.manufacturer]
                : i.path}
            </p>
          </div>
        ))}
      </div>
      <Button onClick={handleSearch}>Buscar</Button>
    </section>
  );
};

export default PortList;
