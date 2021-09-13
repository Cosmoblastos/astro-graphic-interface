import React, {
  useCallback,
  useEffect,
  useContext,
  useMemo,
  useState,
  useRef
} from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";

const baseUrl = "http://localhost:3600";

const SerialPortContext = React.createContext();
const socket = socketIOClient(baseUrl);

const SerialPortProvider = ({ ...rest }) => {
  const [currentValue, setCurrentValue] = useState(null),
    [listValues, setListValues] = useState([]),
    [ports, setPorts] = useState([]),
    [port, setPort] = useState(null),
    [num, setNum] = useState(10),
    [sampleTime, setSampleTime] = useState(100),
    currentLength = useRef(0);

  const fetchPorts = async () => {
    const res = await axios.get(`${baseUrl}/list`);
    if (res.status !== 200) throw new Error("Server error");
    return res.data;
  };

  const fetchConnection = async serialPort => {
    const { status, data } = await axios.get(
      `${baseUrl}/connect?serialPort=${serialPort}`
    );
    if (status !== 200) throw new Error("Server error");
    return data;
  };

  const fetchClose = async () => {
    const { status, data } = await axios.get(`${baseUrl}/close`);
    if (status !== 200) throw new Error("Server error");
    return data;
  };

  useEffect(() => {
    socket.on("robot:data", data => {
      const { value } = data;
      setCurrentValue(value);
      insertValue(currentValue);
      currentLength.current = currentLength.current + 1;
    });

    return () => socket.off("robot:data");
  }, [setCurrentValue, listValues]);

  const insertValue = newValue => {
    let _data = listValues;
    if (_data.length >= num * 100) _data.shift();
    setListValues([..._data, newValue]);
  };

  const value = {
    listValues,
    setListValues,
    num,
    setNum,
    currentValue,
    setCurrentValue,
    ports,
    setPorts,
    port,
    setPort,
    baseUrl,
    socket,
    fetchPorts,
    fetchClose,
    fetchConnection
  };

  return <SerialPortContext.Provider value={value} {...rest} />;
};

const useSerialPort = () => {
  const context = useContext(SerialPortContext);

  if (!context) {
    throw new Error("useSerialPort debe estar dentro de su provider");
  }

  return context;
};

export { useSerialPort, SerialPortProvider };
