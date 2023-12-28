import * as THREE from 'three'
import Experience from '../experience.js'


export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.gui.addFolder('Environment Tweaks')
        }

        // Setup
        this.setSunLight()
        this.setEnvironment()
    }

    setSunLight()
    {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(3.5, 2, - 1.25)
        this.scene.add(this.sunLight)

        // Debug
        if(this.debug.active)
        {
            // Intensity
            this.debugFolder
                .add(this.sunLight, 'intensity')
                .name('Sunlight Intensity')
                .min(0)
                .max(10)
                .step(0.001)

            // x-Position
            this.debugFolder
                .add(this.sunLight.position, 'x')
                .name('Sunlight x-Position')
                .min(-5)
                .max(5)
                .step(0.001)

            // y-Position
            this.debugFolder
                .add(this.sunLight.position, 'y')
                .name('Sunlight y-Position')
                .min(-5)
                .max(5)
                .step(0.001)
            
            // z-Position
            this.debugFolder
                .add(this.sunLight.position, 'z')
                .name('Sunlight z-Position')
                .min(-5)
                .max(5)
                .step(0.001)
        }
    }

    setEnvironment()
    {
        this.environmentMap = {}
        this.environmentMap.intensity = 0.35
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.colorSpace = THREE.SRGBColorSpace
        this.scene.environment = this.environmentMap.texture
        
        // Update
        this.environmentMap.updateMaterials = () =>
        {
            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        this.environmentMap.updateMaterials()

        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.environmentMap, 'intensity')
                .name('Environment Map Intensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterials)
        }
    }
}