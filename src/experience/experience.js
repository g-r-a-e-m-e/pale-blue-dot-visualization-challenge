/**
 * Imports
 */
import * as THREE from 'three'
import Sizes from './utils/sizes.js'
import Time from './utils/time.js'
import Resources from './utils/resources.js'
import Debug from './utils/debug.js'
import Camera from './camera.js'
import Renderer from './renderer.js'
import World from './world/world.js'
import sources from './sources.js'

let instance = null

export default class Experience
{
    constructor(canvas)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this

        // Global access
        window.experience = this

        // Options
        this.canvas = canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()

        // Resize event
        this.sizes.on('resize', ()=>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', ()=>
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the scene...
        this.scene.traverse((child) =>
        {
            // Dipose Meshes
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through each Material
                for(const key in child.material)
                {
                    const value = child.material.key
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        // Camera controls
        this.camera.controls.dispose()

        // Renderer
        this.renderer.instance.dispose()

        // Debug
        if(this.debug.active)
        {
            this.debug.gui.destroy()
        }

    }
}