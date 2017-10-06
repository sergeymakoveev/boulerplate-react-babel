import * as THREE from 'externals/three';
import * as React from 'react';


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

    public getSizes() {
        const {clientWidth = 1, clientHeight = 1} = this.container || {};
        const {devicePixelRatio} = window;
        return {
            devicePixelRatio,
            height: clientHeight,
            ratio: clientWidth / clientHeight,
            width: clientWidth
        };
    }

    public render_three() {
        this.renderer
            .render( this.scene, this.camera );
    }

    public onMouseMove( event: MouseEvent ) {
        event.preventDefault();
        this.mouse.set(
          ( event.clientX / window.innerWidth ) * 2 - 1,
          - ( event.clientY / window.innerHeight ) * 2 + 1
        );
        this.raycaster
            .setFromCamera( this.mouse, this.camera );
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
        const { width, height, ratio } = this.getSizes();
        this.camera.aspect = ratio;
        this.camera
            .updateProjectionMatrix();
        this.renderer
            .setSize( width, height );
    }

    public componentDidMount() {
        const { ratio, devicePixelRatio } = this.getSizes();

        const directionalLight = new THREE.DirectionalLight( 0xffffff );
        const geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
        const plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );

        this.camera = new THREE.PerspectiveCamera( 45, ratio, 1, 10000 );
        this.camera.position
            .set( 500, 800, 1300 );
        this.camera
            .lookAt( new THREE.Vector3() );

        this.renderer = new THREE.WebGLRenderer({ antialias: true, devicePixelRatio });
        this.controls = new THREE.OrbitControls( this.camera );

        directionalLight.position
            .set( 1, 0.75, 0.5 ).normalize();
        geometry.rotateX( - Math.PI / 2 );

        this.scene.background = new THREE.Color( 0xf0f0f0 );
        this.scene.add( new THREE.GridHelper( 1000, 20 ) );
        this.scene.add( new THREE.AmbientLight( 0x606060 ) );
        this.scene.add( directionalLight );
        this.scene.add( this.rollOverMesh );
        this.scene.add( plane );

        this.objects.push( plane );

        window.addEventListener( 'resize', this.onWindowResize, false );
        window.addEventListener( 'mousemove', this.onMouseMove, false );

        if (this.container)
            this.container
                .appendChild( this.renderer.domElement );

        this.render_three();
        setTimeout( this.onWindowResize, 500 );
    }

    public render() {
        return (
            <div
                id="page"
                ref={(container) => { this.container = container; }}
            />
        );
    }
}

export default PageThreeNative;