import React from "react";
import "./MainView.css";
import Face from "../../components/Face/Face";
import Camera from "../../components/Camera/Camera";
import Robot from "../../components/Robot/Robot";

const MainView = () => {

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
