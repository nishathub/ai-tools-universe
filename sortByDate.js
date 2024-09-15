
const loadBySort = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    try {
        // show spinner
        // showSpinner();
        if(!res.ok){
            if(res.status === 404){
                console.log('Not Found');
            } else {
                console.log('Res is not okay');
            }
        } else {
            const data = await res.json();
            displayBySort(data.data.tools);
        }
    } catch (error) {
        console.log(error, 'from catch');
    } finally{
        // hide spinner
        // hideSpinner();
    }
}
// const cardHolder = document.getElementById('card-holder');
const displayBySort = (data) => {
    seeMoreButton.style.display = 'none';
    console.log('before sorting', data);
    data.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
    console.log('after sorting', data);
    cardHolder.innerHTML = '';
    data.forEach(element => {
        // console.log(element);
        let card = document.createElement('div');
        card.classList.add('card');
        let cardTop = document.createElement('div');
        cardTop.classList.add('card-top');
        let cardMiddle = document.createElement('div');
        cardMiddle.classList.add('card-middle');
        let cardBottom = document.createElement('div');
        cardBottom.classList.add('card-bottom');
        cardTop.innerHTML = `
        <img src = '${element.image ? element.image : placeholderImage}' onerror = 'this.src = "${placeholderImage}"'>
        `;
        cardMiddle.innerHTML = `
        <h4>Features</h4>
        <p>1. ${element.features[0]}</p>
        <p>2. ${element.features[1]}</p>
        <p id = 'feature-3'>3. ${element.features[2] ? element.features[2] : 'Not Available'}</p>
        `;
        cardBottom.innerHTML = `
        <div>
            <h4> <a href = '${element.links[0].url}' target = '_blank'>${element.name}</a></h4>
            <p id = 'publish-date'>${element.published_in}</p>
        </div>
        <div>
        <button onclick = 'loadCardDetails("${element.id}")' data-bs-toggle="modal" data-bs-target="#staticBackdrop"  id = 'details-button'>&rarr;</button>
        </div>
        `;
        card.appendChild(cardTop);
        card.appendChild(cardMiddle);
        card.appendChild(cardBottom);
        cardHolder.appendChild(card);
    });
}

const sortButton = document.getElementById('sort-button');
sortButton.addEventListener('click', function(){
    console.log('clicked');
    loadBySort();
})