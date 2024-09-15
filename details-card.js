
const loadCardDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
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
            displayDetails(data.data);
        }
    } catch (error) {
        console.log(error, 'from catch');
    } finally{
        // hide spinner
        // hideSpinner();
    }
}

const modalBody = document.querySelector('.modal-body');
const modalLeft = document.querySelector('.information');
const modalRight = document.querySelector('.interface');
const displayDetails = (data) => {
    const accuracyData = `Accuracy ${(data.accuracy.score)*100}%`;
    console.log(data);
    modalLeft.innerHTML = `
    <h4>${data.description}</h4>
    <div id = 'information-middle'>
        <div class = 'price-box'>
            <p>${data.pricing[0].plan}</p>
            <p>${data.pricing[0].price}</p>
        </div>
        <div class = 'price-box'>
            <p>${data.pricing[1].plan}</p>
            <p>${data.pricing[1].price}</p>
        </div>
        <div class = 'price-box'>
            <p>${data.pricing[2].plan}</p>
            <p>${data.pricing[2].price}</p>
        </div>
    </div>
    <div id = 'information-bottom'>
        <div class = 'bottom-info-box'>
            <h4>Features</h4>
            <ul>
                <li>${data.features[1].feature_name ? data.features[1].feature_name : 'Not Available'}</li>
                <li>${data.features[2].feature_name ? data.features[2].feature_name : 'Not Available'}</li>
                <li>${data.features[3].feature_name ? data.features[3].feature_name : 'Not Available'}</li>
            </ul>
        </div>
        <div class = 'bottom-info-box'>
            <h4>Integrations</h4>
            <ul>
                <li>${data.integrations[0]}</li>
                <li>${data.integrations[1]}</li>
                <li>${data.integrations[2]}</li>
            </ul>
             </div>
        </div>
        
    </div>

    `;
    modalRight.innerHTML = `
    <div>
    <h6 id = 'accuracy' onerror = 'this.style.display = "none"'>${data.accuracy.score ? accuracyData : ''}</h6>
    <img src = '${data.image_link[0] ? data.image_link[0] : placeholderImage}' onerror = 'this.src = "${placeholderImage}"' }'
    </div>
    <div class = 'interface-bottom'>
        <h4>${data.input_output_examples[0].input}</h4>
        <p>${data.input_output_examples[1].input}</p>
    </div>
    `;

}