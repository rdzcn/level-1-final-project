import * as THREE from 'three'

export const loadingManager = new THREE.LoadingManager()

loadingManager.onStart = () => {
    console.log('onStart')
}

loadingManager.onLoad = () => {
    console.log('onLoad')
}

loadingManager.onProgress = () => {
    console.log('onProgress')
}

loadingManager.onError = () => {
    console.log('onError')
}