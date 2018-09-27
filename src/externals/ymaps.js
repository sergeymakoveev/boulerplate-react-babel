import promisescript from 'promisescript';


const YMLoader =
    promisescript({
        url: '//api-maps.yandex.ru/2.1/?lang=ru_RU',
        type: 'script',
        exposed: 'ymaps',
    })
        .then(() => new Promise(
            (resolve) =>
                window.ymaps
                    .ready(() => resolve({ api: window.ymaps }))
        ))
        .catch(() => { throw new Error('Error by load Yandex Maps API'); });

export default YMLoader;
