import React, { useState, useEffect } from 'react';
import './Robot.css';
import { Canvas, useLoader } from 'react-three-fiber';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

const Box = ({ position = [0, 0, 0] }) => {

    return (
        <mesh position={position}>
            <boxBufferGeometry attach="geometry" />
            <meshLambertMaterial attach="material" color="hotpink" />
        </mesh>
    )
};

const Robot = ({ fileUrl }) => {

    const geometry = useLoader(STLLoader, './stl2/robotic_armv1.stl');

    console.log("GOEMTRY", geometry);

    return (
        <div style={{
            width: '60vw',
            height: '50vh',
            borderRadius: '10px',
            background: 'white'
        }}>
            {
                geometry &&
                <Canvas>

                    <mesh
                        geometry={geometry}
                        position={[0, 0, -1]}>
                        <meshLambertMaterial attach="material" color="black" />
                    </mesh>

                    <Box position={[0, 0, -10]} />
                    <ambientLight intensity={0.5} />
                    <spotLight
                        position={[10, 15, 10]}
                        angle={0.3}
                    />

                </Canvas>
            }
        </div>
    );
};

export default Robot;