import * as THREE from 'three'
import * as gui from 'lil-gui'

export default class Debug
{
    constructor()
    {
        this.active = window.location.hash === '#debug'

        if(this.active)
        {
            this.gui = new gui.GUI()
        }
    }
}