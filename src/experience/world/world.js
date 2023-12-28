import * as THREE from 'three'
import Experience from '../experience.js'
import Environment from './environment.js'
// import Floor from './floor.js'
// import Fox from './fox.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            // this.floor = new Floor()
            // this.fox = new Fox()
            this.environment = new Environment()
        })

        // // Test mesh
        // const testMesh = new THREE.Mesh(
        //     new THREE.BoxGeometry(1, 1, 1),
        //     new THREE.MeshStandardMaterial()
        // )
        // this.scene.add(testMesh)
    }

    update()
    {
        // if(this.fox)
        // {
        //     this.fox.update()
        // }
    }
}