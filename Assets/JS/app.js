let bodyHadith = document.querySelector('.body-hadith');
let sortData = document.querySelector('.form-select');
let darkModeSwitch = document.querySelector('#dark-mode-switch')
let filterHadith = document.querySelector('#filter-hadith')

// fetch hadiths list from API
const fetchHadithList = async () => {
    try {
        const res = await axios.get('https://api.hadith.sutanlab.id/books/')
        return res.data.data
    } catch (e) {
        return e
    }
}

// show data to page
const showHadithList = async (data) => {
    try {
        let el = ''
        data.forEach(data => {
            el += `
            <div class="col-12 col-md-3 my-2">
                <a href="hadith.html?${data.id}|1">
                    <div class="card-hadith">
                        <div>
                            <span class="material-icons-outlined">
                                auto_stories
                            </span>
                            <h4 id="btnShowHadith">
                                ${data.name} 
                            </h4>
                            <p>
                                Dengan Jumlah ${data.available} Data
                            </p>
                        </div>
                    </div>
                </a>
            </div>`
        });

        bodyHadith.innerHTML = el
    } catch (e) {
        const preloader = `
        <div class="preloader-data text-center">
            <div class="lottie-anim"></div>
            <H3 class="mt-3">Maaf terjadi kesalahan ketika mengambil data. Silahkan refresh kembali</H3>
        </div>
        `
        bodyHadith.innerHTML = preloader

        showPreloader('loading-failed.json')
    }
}

//function sort Hadith Number Ascending
const sortHadithAsc = (data) => {
    try {
        let dataArray = []
        let dataUrut = []

        data.forEach(data => {
            dataArray.push([data.available, data.name, data.id])
        });

        let sortedArrayAsc = dataArray.sort(function (a, b) {
            return a[0] - b[0];
        });

        sortedArrayAsc.forEach(data => {
            dataUrut.push({
                'available': data[0],
                'name': data[1],
                'id': data[2],
            })
        })

        showHadithList(dataUrut)

    } catch (e) {
        return e
    }
}

//function sort Hadith Number Descending
const sortHadithDesc = (data) => {
    try {
        let dataArray = []
        let dataUrut = []

        data.forEach(data => {
            dataArray.push([data.available, data.name, data.id])
        });

        let sortedArrayDesc = dataArray.sort(function (a, b) {
            return b[0] - a[0];
        });

        sortedArrayDesc.forEach(data => {
            dataUrut.push({
                'available': data[0],
                'name': data[1],
                'id': data[2],
            })
        })

        showHadithList(dataUrut)
    } catch (e) {
        return e
    }

}

//function sort Hadith Name Ascending
const sortNamaHadithAsc = (data) => {
    try {
        let dataArray = []
        let dataUrut = []

        data.forEach(data => {
            dataArray.push([data.available, data.name, data.id])
        });

        dataArray.sort(function (a, b) {
            return a[1] === b[1] ? 0 : a[1] < b[1] ? -1 : 1;
        });

        dataArray.forEach(data => {
            dataUrut.push({
                'available': data[0],
                'name': data[1],
                'id': data[2],
            })
        })

        showHadithList(dataUrut)
    } catch (e) {
        return e
    }
}

//function sort Hadith Nae Descending
const sortNamaHadithDesc = (data) => {
    try {
        let dataArray = []
        let dataUrut = []

        data.forEach(data => {
            dataArray.push([data.available, data.name, data.id])
        });

        dataArray.sort(function (a, b) {
            return b[1] === a[1] ? 0 : b[1] < a[1] ? -1 : 1;
        });

        dataArray.forEach(data => {
            dataUrut.push({
                'available': data[0],
                'name': data[1],
                'id': data[2],
            })
        })

        showHadithList(dataUrut)
    } catch (e) {
        return e
    }
}

const filterData = (filterOpt, data) => {
    if (filterOpt.value == 0) {
        sortHadithAsc(data)
    } else if (filterOpt.value == 1) {
        sortHadithDesc(data)
    } else if (filterOpt.value == 2) {
        sortNamaHadithAsc(data)
    } else if (filterOpt.value == 3) {
        sortNamaHadithDesc(data)
    }
}


document.addEventListener('DOMContentLoaded', () => {

    const preloader = `
        <div class="preloader-data text-center">
            <div class="lottie-anim"></div>
            <H3 class="mt-3">Sedang Memuat Data...</H3>
        </div>
    `
    bodyHadith.innerHTML = preloader

    showPreloader('loading-data.json')

    let data;

    setTimeout(async () => {
        data = await fetchHadithList()
        filterData(filterHadith, data)
    }, 1000);

    filterHadith.addEventListener('change', (event) => {
        filterData(filterHadith, data)
    });

    darkModeSwitch.addEventListener('click', () => {
        if (darkModeSwitch.checked) {
            turnOnDarkMode()
            localStorage.setItem('dark-mode', true)
        } else {
            turnOffDarkMode()
            localStorage.setItem('dark-mode', false)
        }
    })

})

window.addEventListener('load', async () => {
    let darkModeState = localStorage.getItem('dark-mode')

    if (darkModeState == 'true') {
        turnOnDarkMode()
        darkModeSwitch.checked = true
    } else {
        turnOffDarkMode()
        darkModeSwitch.checked = false
    }
})


