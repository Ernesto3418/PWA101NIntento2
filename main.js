if('serviceWorker' in navigator) {
    console.log('Andando Service Worker')

    navigator.serviceWorker.register('sw.js')
    .then(res => console.log('serviceWorker cargado correctamente', res))
    .catch(err => console.log('serviceWorker no se ha podido registrar', err))    
}
else {
    console.log('Aun no lo puedes usar')
}