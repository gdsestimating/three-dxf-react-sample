import { useEffect, useRef } from "react";
import * as THREE from 'three';

export default function DxfViewer() {

    const hostCanvas = useRef();

    useEffect(() => {
        const camera = new THREE.OrthographicCamera(-100, 100, 100, -100, 1, 1000);
        camera.position.set(0, 0, -10);
        camera.lookAt(0, 0, 0);
        const scene = new THREE.Scene();

        var v1 = new THREE.Vector3(0,0,0);
        var v2 = new THREE.Vector3(30,0,0);
        var v3 = new THREE.Vector3(30,30,0);
        var v4 = new THREE.Vector3(0,0,0);
        var geom = new THREE.BufferGeometry().setFromPoints([v1,v2,v3,v4]);

        scene.add(new THREE.Line(geom, new THREE.LineBasicMaterial({color: 0x00ff00})));
        
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(500, 500);
        renderer.setClearColor(0x000000, 1);
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.render(scene, camera);
        hostCanvas.current.appendChild(renderer.domElement);
    }, [])

    return (
        <div ref={hostCanvas}>
            
        </div>
    );
}