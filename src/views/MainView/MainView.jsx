import React from "react";
import "./MainView.css";
import { useSerialPort } from "../../contexts/serialport";
import DataIncome from "../../components/DataIncome/DataIncome";
import PortList from "../../components/PortList/PortList";
import Face from "../../components/Face/Face";
import Camera from "../../components/Camera/Camera";
import Robot from "../../components/Robot/Robot";

const MainView = () => {
  const { port } = useSerialPort();

  return (
    <>
      {/*
      {port && <DataIncome />}
      {!port && <PortList />}
      <Face />
    
      <Robot fileUrl={process.env.PUBLIC_URL + '/stl2/Component1.stl'} />
      */}
      <Camera url={'http://174.129.97.195/client'} />
    </>
  );
};

export default MainView;
