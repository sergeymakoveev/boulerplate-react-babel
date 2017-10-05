import * as React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three-orbitcontrols-ts';


class PageThreeNative extends React.Component<{}, {}> {

    public container: HTMLDivElement | null;
    public renderer: THREE.WebGLRenderer;
    public objects: THREE.Mesh[] = [];
    public camera: THREE.PerspectiveCamera;
    public controls: {} | null;

    public mouse = new THREE.Vector2();
    public scene = new THREE.Scene();
    public raycaster = new THREE.Raycaster();
    public rollOverMesh = new THREE.Mesh(
        new THREE.BoxGeometry( 50, 50, 50 ),
        new THREE.MeshBasicMaterial({
            color: 0xff0000,
            opacity: 0.5,
            transparent: true
        })
    );

    constructor( props: React.Props<{}> ) {
        super( props );
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
    }

    public onMouseMove( event: MouseEvent ) {
        event.preventDefault();
        this.mouse.set(
          ( event.clientX / window.innerWidth ) * 2 - 1,
          - ( event.clientY / window.innerHeight ) * 2 + 1
        );
        this.raycaster.setFromCamera( this.mouse, this.camera );
        const intersects = this.raycaster.intersectObjects( this.objects );
        if ( intersects && intersects.length > 0 ) {
            const intersect = intersects[ 0 ];
            this.rollOverMesh.position
                .copy( intersect.point )
                .add( intersect.face.normal );
            this.rollOverMesh.position
                .divideScalar( 50 )
                .floor()
                .multiplyScalar( 50 )
                .addScalar( 25 );
        }
        this.render_three();
    }

    public onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    public render_three() {
        this.renderer.render( this.scene, this.camera );
    }

    public componentDidMount() {
        const {innerWidth, innerHeight, devicePixelRatio} = window;
        const ratio = innerWidth / innerHeight;

        const directionalLight = new THREE.DirectionalLight( 0xffffff );
        const geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
        const plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );

        this.camera = new THREE.PerspectiveCamera( 45, ratio, 1, 10000 );
        this.camera.position.set( 500, 800, 1300 );
        this.camera.lookAt( new THREE.Vector3() );

        this.renderer = new THREE.WebGLRenderer({ antialias: true, devicePixelRatio });
        this.controls = new OrbitControls( this.camera );

        directionalLight.position.set( 1, 0.75, 0.5 ).normalize();
        geometry.rotateX( - Math.PI / 2 );

        this.scene.background = new THREE.Color( 0xf0f0f0 );
        this.scene.add( new THREE.GridHelper( 1000, 20 ) );
        this.scene.add( new THREE.AmbientLight( 0x606060 ) );
        this.scene.add( directionalLight );
        this.scene.add( this.rollOverMesh );
        this.scene.add( plane );

        this.objects.push( plane );
        this.renderer.setSize( innerWidth, innerHeight );

        console.warn(this.container);

        window.addEventListener( 'resize', this.onWindowResize, false );
        window.addEventListener( 'mousemove', this.onMouseMove, false );

        if (this.container)
            this.container
                .appendChild( this.renderer.domElement );

        this.render_three();
    }

    public render() {
        return (
            <div ref={(container) => { this.container = container; }} />
        );
    }
}

export default PageThreeNative;