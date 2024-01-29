import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { useOrbitControls, zoomToExtents, getExtents, DxfLoader } from 'three-dxf';

export default function DxfViewer({width, height, clearColor, dxf}) {

    const hostElement = useRef();

    const rendererRef = useRef(new THREE.WebGLRenderer());
    
    const sceneRef = useRef(new THREE.Scene());

    const cameraRef = useRef(new THREE.OrthographicCamera());

    useEffect(() => {
        // Initialize the renderer and camera
        width = width || 200;
        height = height || 200;
        clearColor = clearColor || 0;
        let renderer = rendererRef.current;
        let camera = cameraRef.current;
        let scene = sceneRef.current;
        renderer.setSize(width, height);
        renderer.setClearColor(clearColor, 1);
        renderer.setPixelRatio( window.devicePixelRatio );
        camera.position.set(0, 0, 10);
        camera.lookAt(0, 0, 0);
        renderer.render(scene, camera);
        hostElement.current.appendChild(renderer.domElement);
    }, [])

    useEffect(() => {
        if (dxf) {
            let renderer = rendererRef.current;
            let camera = cameraRef.current;
            let scene = sceneRef.current;
            scene.clear();
            new DxfLoader().load(dxf, (objects) => {
                objects.forEach(obj => scene.add(obj));

                const extents = getExtents(objects)
                zoomToExtents(camera, extents, renderer.domElement.width / renderer.domElement.height);
                useOrbitControls(camera, renderer.domElement, () => renderer.render(scene, camera));
            })
            
        }
    }, [dxf])

    return (
        <div ref={hostElement} width={width} height={height}>
            
        </div>
    );
}