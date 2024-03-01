import * as THREE from 'three'

export const loadingManager = new THREE.LoadingManager()

const progressBar = document.querySelector('#progress-bar');
const progressBarContainer = document.querySelector('.progress-bar-container');

loadingManager.onStart = (url, item, total) => {
  console.log('onStart')
  console.log(url)
  console.log(item)
  console.log(total)
}

loadingManager.onProgress = (url, loaded, total) => {
  progressBar.value = (loaded / total) * 100;
}

loadingManager.onLoad = () => {
  progressBarContainer.style.display = 'none';
}

loadingManager.onError = () => {
    console.log('onError')
}