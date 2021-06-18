let param = location.search.substring(1);
let splitter = param.split("|");
let hadithId = splitter[0];
let page = parseInt(splitter[1]);

const detailHadith = document.querySelector('.detail-hadith');
const nextBtnHadith = document.querySelector('#nextHadith');
const backBtnHadith = document.querySelector('#backHadith');
const namaHadith = document.querySelector('#nama-hadith')
const nomorHadith = document.querySelector('#no-hadith')
const title = document.querySelector('title')
let inputPage = document.querySelector('#input-page')


// show data to page
const showHadith = (data) => {
    try {

        namaHadith.innerHTML = data.name
        nomorHadith.innerHTML = `
            <h5>Hadith Nomor</h5>
            <h3>${data.num}</h3>
        `
        title.innerText = `${data.name} - Hadith No ${data.num}`

        if (data.found) {
            detailHadith.innerHTML = `
            <div>
                <p id="arabic-hadith">
                    ${data.arab}
                </p>
                <hr />
                <p id="idn-hadith">'
                    ${data.idn}
                </p>
            </div>
            `
        } else {

            const preloader = `
            <div class="preloader-data text-center">
                <div class="lottie-anim"></div>
                <H3 class="mt-3">Hadith Nomor ${data.num} tidak ditemukan</H3>
            </div>
            `
            detailHadith.innerHTML = preloader

            showPreloader('not-found.json')
        }
    } catch (e) {
        return e;
    }
}


// fetch data from API
const fetchHadith = async () => {
    try {
        const res = await axios.get('https://api.hadith.sutanlab.id/books/' + hadithId + "/" + page)
        console.log(res)

        if (res.data.data.contents) {
            return {
                "found": 1,
                "arab": res.data.data.contents.arab,
                "idn": res.data.data.contents.id,
                "num": res.data.data.contents.number,
                "name": res.data.data.name
            }
        }

        return {
            "found": 0,
            "name": res.data.data.name,
            "num": page
        }


    } catch (e) {
        return e
    }
}


// next button, increase page by 1
const nextHadith = () => {
    try {
        page += 1;
        const nextHadithContent = window.history.replaceState(null, null, "?" + hadithId + "|" + page);
        location.reload();
        return nextHadithContent
    } catch (e) {
        return e
    }
}

// get hadith by number
const getSpecificHadith = (num) => {
    try {
        const data = window.history.replaceState(null, null, "?" + hadithId + "|" + num);
        location.reload();
        return data

    } catch (e) {
        return e
    }
}


// back button, decrease page by 1
const backHadith = () => {
    try {
        page -= 1;
        const backHadithContent = window.history.replaceState(null, null, "?" + hadithId + "|" + page);
        location.reload();
        return backHadithContent
    } catch (e) {
        return e
    }
}



document.addEventListener('DOMContentLoaded', async () => {

    // disable back button if current page is 1
    if (page <= 1) {
        backBtnHadith.disabled = true
    }

    // show user feedback to page
    const preloader = `
        <div class="preloader-data text-center">
            <div class="lottie-anim"></div>
            <H3 class="mt-3">Sedang Memuat Data...</H3>
        </div>
    `
    detailHadith.innerHTML = preloader

    showPreloader('loading-data.json')
    setTimeout(async () => {
        const data = await fetchHadith()
        showHadith(data)
    }, 1000);

    inputPage.addEventListener('change', async (e) => {
        const page = inputPage.value
        
        console.log(page)
        const data = await getSpecificHadith(page)

        showHadith(data)
    })

    nextBtnHadith.addEventListener('click', nextHadith)
    backBtnHadith.addEventListener('click', backHadith)
})

window.addEventListener('load', async () => {
    let darkModeState = localStorage.getItem('dark-mode')

    if (darkModeState == 'true') {
        turnOnDarkMode()
    } else {
        turnOffDarkMode()
    }
})

