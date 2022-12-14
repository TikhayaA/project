//Sticky header
const headerElement = document.querySelector('.header');
const bodyElement = document.querySelector('body');
const hamburgerMenuElement = document.querySelector('.burger-menu');
const hamburgerMenuElementActive = document.querySelector('.burger-menu.active');

window.addEventListener('scroll', (event) => {
    if (pageYOffset > 80) {
        headerElement.classList.add('sticky');
        bodyElement.classList.add('has-sticky-header');
    } else {
        headerElement.classList.remove('sticky');
        bodyElement.classList.remove('has-sticky-header');
    }
});

/*initialize map */
const mapContainerEl = document.querySelector('#map');

if (mapContainerEl) {

    mapboxgl.accessToken = 'pk.eyJ1Ijoib2xlaC15b3lvIiwiYSI6ImNrOGVmOHN1eDBpNjIzaG4xMGhqamljaXUifQ.VHjHWv7LUQ5MWbL-_Jlkpw';

    let map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [25, 50],
        zoom: 4
    });
    // Add zoom and rotation controls to the map.
    let nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-right');

    let geojson = {
        type: 'FeatureCollection',
        features: [
        {
            geometry: {
                type: 'Point',
                coordinates: [36.231878, 50.032735]
            },
        },
        ]
    };

    geojson.features.forEach(function (marker) {

        // create a HTML element for each feature
        var el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add to the map
        new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);
    });

    //Add event on clicking on map items and event of changing markers
    const mapItemsArray = document.querySelectorAll('.map-item');
    if (mapItemsArray) {
        mapItemsArray.forEach((item) => {
            item.addEventListener('click', (e) => {
                const mapItemActiveEl = document.querySelector('.map-item.active');

                if (mapItemActiveEl) {
                    mapItemActiveEl.classList.remove('active');
                }

                e.currentTarget.classList.add('active');
                goToCoordinate(+item.dataset.mapCenterX, +item.dataset.mapCenterY, +item.dataset.markerCoordinateX, +item.dataset.markerCoordinateY);
            });
        })
    }

    function goToCoordinate(centerCoordinatesX, centerCoordinatesY, markerCoordinatesX, markerCoordinatesY) {

        map.flyTo({
            center: [centerCoordinatesX, centerCoordinatesY],
            essential: true // this animation is considered essential with respect to prefers-reduced-motion
        });

        const newMarker = {
            geometry: {
                type: 'Point',
                coordinates: [markerCoordinatesX, markerCoordinatesY]
            },
        };

        geojson.features.push(newMarker);
        geojson.features.forEach(function (marker) {

            document.querySelectorAll('.marker').forEach((item) => {
                item.parentNode.removeChild(item);
            });

            var markerElement = document.createElement('div');
            markerElement.className = 'marker';

            new mapboxgl.Marker(markerElement)
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);
        });
    }
}

//Add logic for back to top button

const backToTopBtn = document.querySelector('.back-to-top-btn');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (pageYOffset > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

const formInputs = document.querySelectorAll('.form-row.input-wrapper input');

formInputs.forEach(element => element.addEventListener('change', () => {
    if (element.value.trim().length) {
        element.classList.add('active');
    } else {
        element.value = '';
        element.classList.remove('active');
    }
}));

//Sort dropdown

const sortItemArray = document.querySelectorAll('.sort-item');
if (sortItemArray) {
    for (let i = 0; i < sortItemArray.length; i++) {
        const dropdownItem = sortItemArray[i].querySelector('.dropdown');
        if (dropdownItem) {

            const dropdownItemHeight = dropdownItem.clientHeight;
            sortItemArray[i].classList.remove('active');
            dropdownItem.style.height = '0px';

            document.addEventListener('click', function (e) {
                const isClickInside = sortItemArray[i].contains(e.target);

                if (!isClickInside) {
                    sortItemArray[i].classList.remove('active');
                    dropdownItem.style.height = '0px';
                }
            });

            sortItemArray[i].addEventListener('click', () => {
                if (sortItemArray[i].classList.contains('active')) {
                    sortItemArray[i].classList.remove('active');
                    dropdownItem.style.height = '0px';
                } else {
                    for (let j = 0; j < sortItemArray.length; j++) {
                        sortItemArray[j].classList.remove('active');
                        sortItemArray[j].querySelector('.dropdown').style.height = '0px';
                    }
                    sortItemArray[i].classList.add('active');
                    dropdownItem.style.height = dropdownItemHeight + 'px';
                }
            });
        }


    }
}

const mobileSortBtn = document.querySelector('.sort-mobile-btn');
const mobileSortList = document.querySelector('.mobile-sort');

if (mobileSortBtn) {

    document.addEventListener('click', function (e) {
        const isClickInside = mobileSortBtn.contains(e.target) || mobileSortList.contains(e.target);

        if (!isClickInside) {
            mobileSortBtn.classList.remove('active');
            mobileSortList.classList.remove('active');
        }
    });

    mobileSortBtn.addEventListener('click', (e) => {
        if (mobileSortBtn.classList.contains('active')) {
            mobileSortBtn.classList.remove('active');
            mobileSortList.classList.remove('active');
        } else {
            mobileSortBtn.classList.add('active');
            mobileSortList.classList.add('active');
        }
    });
}

// mobile search
const mobileSearchEl = document.querySelector('.mobile-filter-wrapper .search-wrapper');
const mobileSearchBtn = document.querySelector('.mobile-filter-wrapper .search-wrapper .search-submit-btn');
const mobileSearchCloseBtn = document.querySelector('.mobile-filter-wrapper .search-wrapper .close-search');

if (mobileSearchEl) {

    document.addEventListener('click', function (e) {
        const isClickInside = mobileSearchEl.contains(e.target);

        if (!isClickInside) {
            mobileSearchEl.classList.remove('open');
        }
    });

    mobileSearchBtn.addEventListener('click', (e) => {
        if (!mobileSearchEl.classList.contains('open')) {
            e.preventDefault();
            mobileSearchEl.classList.add('open');
        }
    });

    mobileSearchCloseBtn.addEventListener('click', (e) => {
        if (mobileSearchEl.classList.contains('open')) {
            mobileSearchEl.classList.remove('open');
        }
    });
}

/*Initialize scroll to animate library*/
if (document.querySelector('[data-aos]')) {
    AOS.init({
        offset: 50,
        once: true,
        disable: 'mobile',
    });
}

const articleContentElement = document.querySelector('.article-main-content');

if (articleContentElement) {
    articleContentElement.onmouseover = function(event) {
        window.TinyQ.init();
    };
    articleContentElement.onmouseout = function(event) {
        window.TinyQ.destroy();
    };
}

const fixedShareBlock = document.querySelector('.share-block.fixed');

if (fixedShareBlock) {
    document.addEventListener('scroll', function() {
        const posTop = articleContentElement.getBoundingClientRect().top;

        fixedShareBlock.classList.toggle('visible', posTop + articleContentElement.clientHeight >= window.innerHeight && posTop <= 0);
    });
}

let progressValueWrapperEL = document.querySelector('.page-progress-bar');
let progressValueEL = document.querySelector('.progress-value');

if (progressValueEL) {
    window.addEventListener('scroll', (event) => {
        if (pageYOffset > 80) {
            progressValueWrapperEL.classList.add('visible');
        } else {
            progressValueWrapperEL.classList.remove('visible');
        }
    });
    document.addEventListener("scroll",function () {
        let scrollTop =
        document.documentElement["scrollTop"] || document.body["scrollTop"];
        let scrollBottom = (document.documentElement["scrollHeight"] || document.body["scrollHeight"]) - document.documentElement.clientHeight;
        let scrollPercent = scrollTop / scrollBottom * 100 + "%";
        progressValueEL.style.setProperty("--scroll", scrollPercent);
    },{ passive: true });
}

function paginationItemClickHandler(el) {
    var target = el.getAttribute("href").replace("#", "");
    console.log(el.getAttribute("href"));
    history.pushState(null, null, el.getAttribute("href"));

    var sectionSelector = document.querySelectorAll(".portfolio-page-item");
    for (j = 0; j < sectionSelector.length; j++) {
        //Hide all the Tab content
        sectionSelector[j].classList.remove('active');
    }

    //Show the active Tab content
    document.getElementById(target).classList.add('active');
    checkPaginationButtons();
}

const openModalBtnArray = document.querySelectorAll('.open-modal-btn');
const modalContainer = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close-modal');

if (openModalBtnArray && modalContainer) {
    openModalBtnArray.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            modalContainer.classList.add('show');
            document.body.classList.add('modal-opened');
        });
    });


    document.addEventListener('click', (e) =>{
        if(modalContainer.classList.contains('show')) {
            const isClickInside = modalContainer.contains(e.target);

            if (!isClickInside) {
                modalContainer.classList.remove('show');
                document.body.classList.remove('modal-opened');
            }

        }
    });
    closeModalBtn.addEventListener('click', (e) =>{
        modalContainer.classList.remove('show');
        document.body.classList.remove('modal-opened');
    });
}

//initialize portfolio slider
const portfolioSliderEl = document.querySelector('.portfolio-slider');
let portfolioSlider;
if (portfolioSliderEl) {
    portfolioSlider = new Swiper('.portfolio-slider', {
        clickable: true,
        pagination: {
            el: '.portfolio-slider .swiper-pagination',
            clickable: true,
        }
    });
}
//initialize white paper slider
const whitePaperSliderEl = document.querySelector('.white-paper-slider');
let whitePaperSlider;
if (whitePaperSliderEl) {
    whitePaperSlider = new Swiper('.white-paper-slider-block', {
        clickable: true,
        pagination: {
            el: '.white-paper-slider-block .swiper-pagination',
            clickable: true,
        }
    });
}
