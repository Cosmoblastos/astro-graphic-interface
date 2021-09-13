import React, { useEffect } from "react";
import "./DataIncome.css";
import { useSerialPort } from "../../contexts/serialport";
import Button from "../UI/Button/Button";
import Chart from "../Chart/Chart";

const DataIncome = ({}) => {
  const {
    currentValue,
    port,
    fetchConnection,
    fetchClose,
    setPort,
    setCurrentValue,
    setListValues,
    num,
    listValues
  } = useSerialPort();

  useEffect(() => {
    handleConnect();
  }, []);

  const handleConnect = () => {
    fetchConnection(port.path)
      .then(data => {
        console.log(data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const handleClose = () => {
    fetchClose()
      .then(data => {
        console.log(data);
        setPort(null);
        setCurrentValue(null);
        setListValues([]);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <section className="dataIncomeWrapper">
      <h3>{port.path}</h3>
      <div className="dataWrapper">
        <p>Datos entrantes: </p>
        <div className="item">{currentValue ? currentValue : ""}</div>
        <div style={{ margin: "10px 0" }}>
          <Chart num={num} data={listValues} />
        </div>
      </div>

      <div className="buttonsWrapper">
        <Button onClick={handleClose} color="danger">
          Cerrar
        </Button>
        <Button onClick={handleConnect}>Conectar</Button>
      </div>
    </section>
  );
};

export default DataIncome;
