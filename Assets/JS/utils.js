let bodyPage = document.body

const turnOnDarkMode = async () => {
    bodyPage.classList.add('dark-mode')
}

const turnOffDarkMode = () => {
    bodyPage.classList.remove('dark-mode')
}

const showPreloader = (data) => {
    lottie.loadAnimation({
        container: document.querySelector('.lottie-anim'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: `./Assets/JSON/${data}`
    })
}