import React, { useState, useEffect } from 'react';
import './Face.css';
import { Canvas } from 'react-three-fiber';
import * as THREE from 'three';

const Box = ({ position }) => {

    return (
        <mesh position={position}>
            <boxBufferGeometry attach="geometry" />
            <meshLambertMaterial attach="material" color="hotpink" />
        </mesh>
    )
};

const Sphere = ({ position, color = 'hotpink' }) => {
    return (
        <mesh position={position}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshLambertMaterial attach="material" color={color} />
        </mesh>
    )
}


const Plane = ({ position = [0, 0, 0] }) => {

    return (
        <mesh position={position} scale={[20, 20, 1]}>
            <planeBufferGeometry attach="geometry" />
            <meshLambertMaterial attach="material" color="white" />
        </mesh>
    )
}

const Face = ({ }) => {

    return (
        <div style={{
            width: '60vw',
            height: '50vh',
            borderRadius: '10px',
            background: 'transparent'
        }}>
            <Canvas>
                <Sphere position={[-1.7, 0.2, 2]} color={'rgb(39, 227, 221)'} />
                <Sphere position={[1.7, 0.2, 2]} color={'rgb(39, 227, 221)'} />
                <ambientLight intensity={0.5} />
                <spotLight
                    position={[10, 15, 10]}
                    angle={0.3}
                />
            </Canvas>
        </div>
    );
};

export default Face;