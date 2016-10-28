if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
        console.log('ServiceWorker registrado com sucesso: ', registration);
    }).catch(function(err) {
        console.log('Registro do ServiceWorker falhou: ', err);
    })
}