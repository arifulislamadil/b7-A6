//Load data
const loadData = async () => {
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const res = await fetch(url);
  const data = await res.json();
  displayData(data.data.tools);
};
loadData();


//display features
const displayData = (features) => {
  
  const container = document.getElementById("features-container");
  //show fist six features
  features = features.slice(0, 6);
  //show feature
  features.map((feature) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100">
        <img id="feature-img" src=${feature.image} class="card-img-top img-fluid" alt="..." />
        <div class="card-body">
                  <h5 class="card-title">Features</h5>
                    <p class="m-0">1. ${feature.features[0]}</p>
                    <p class="m-0">2. ${feature.features[1]}</p>
                    <p class="m-0">3. ${feature.features[2]}</p>
                    <hr/>
                  <div class="card-text d-flex justify-content-between">
                    <div>
                    <h5>${feature.name}</h5>
                    <span><i class="fa-solid fa-calendar-days"></i> ${feature.published_in}</span>
                    </div>
                    <button id="arrow-icon" onclick='(displayFeature("${feature.id}"))' type="button" 
                    class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>       
        </div>
    </div>
    
    `;
    toggleSpinner(true)
    container.appendChild(div);
  });
 
};

//display feature details

const displayFeature = async (id) => {
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayFeatureDetails(data.data);
};

const displayFeatureDetails = (features) => {
  const details = document.getElementById("exampleModalLabel");
  const modalBody = document.getElementById("modal-body");
  details.innerText = `
  ${features.description.slice(0,100)}
  `;
  // condition of price 
  const price = features.pricing[0].price;

//condition for accuracy
const textAccuracy = "accuracy"
const accuracy = features.accuracy.score ;
//  condition for integrations 
 const integrations1= features.integrations[0];
 const integrations2= features.integrations[1];
 const integrations3= features.integrations[2];


 //Condition for text
 const chatText = features.input_output_examples[0].output.slice(0,100);
 
 
  modalBody.innerHTML = `
  <div class="d-flex flex-column flex-sm-row flex-md-row flex-lg-row">
  
        <div class="border border-secondary-subtle p-3 me-2">
        <div id="ser-price" class="d-flex">
        <div>
          <p class="m-0">${price === "0" ? "free of cost" : price}</p>
          <p>${features.pricing[0].plan}</p>
        </div>
        <div>
          <p class="m-0 text-danger">${features.pricing[1].price}</p>
          <p class="m-0 text-danger">${features.pricing[1].plan}</p>
        </div>
        <div>
          <p class="m-0 text-danger">${features.pricing[2].price}</p>
          <p class="m-0 text-danger">${features.pricing[2].plan}</p>
        </div>
      </div>
      <div class="d-flex">
        <div >
        <h4>features</h4>
        <ul>
          <li><p class="m-0 ">${features.features["1"].feature_name}</p></li>
          <li><p class="m-0 ">${features.features["2"].feature_name}</p></li>
          <li><p class="m-0 ">${features.features["3"].feature_name}</p></li>
        </ul></div>
        <div>
        <h4>Integrations</h4>
        <ul>
          <li><p class="m-0 ">${integrations1!== undefined? integrations1 : 'no data found'}</p></li>
          <li><p class="m-0 ">${integrations2!== undefined? integrations2 : 'no data found'}</p></li>
          <li><p class="m-0 ">${integrations3!== undefined? integrations3 : 'no data found'}</p></li>
        </ul></div>
      
      </div>
        </div>
  <div>
  <div id="image-text">
      <div id="text" class="d-flex justify-content-end">
     ${accuracy!== undefined && accuracy !== null ?  `<span class="text-left bg-danger bg-gradient ps-2 pe-2 pt-2 pb-2 rounded">${accuracy} <span>accuracy</span></span>`:""}
      </div>
    <div id="image-main">
        <img id="feature-details-image" class="image-fluid" src="${features.image_link[0]}" alt="logo"/>
    </div> 
  </div>
  <h5>${features.input_output_examples[0].input}</h5>
  ${chatText.includes("function") ? "No!! not yet ! take a break" : chatText}
  </div>
  
  </div>
  `;
};

//load data for show more
const allFeatures=async()=>{
  const url = "https://openapi.programming-hero.com/api/ai/tools";
  const res = await fetch(url);
  const data = await res.json();
  showAllFeatures(data.data.tools);
}

//show all data by click on show more
const showAllFeatures=(features)=>{
  const container = document.getElementById("features-container");
  console.log(features);
  // clear previous features 
  container.innerHTML="";
  // show all features 
  console.log(features);
  features.map((feature) => {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100">
        <img id="feature-img" src=${feature.image} class="card-img-top img-fluid" alt="..." />
        <div class="card-body">
                  <h5 class="card-title">Features</h5>
                    <p class="m-0">1. ${feature.features[0]}</p>
                    <p class="m-0">2. ${feature.features[1]}</p>
                    <p class="m-0">3. ${feature.features[2]}</p>
                    <hr/>
                  <div class="card-text d-flex justify-content-between">
                    <div>
                    <h5>${feature.name}</h5>
                    <span><i class="fa-solid fa-calendar-days"></i> ${feature.published_in}</span>
                    </div>
                    <button id="arrow-icon" onclick='(displayFeature("${feature.id}"))' type="button" 
                    class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i class="fa-solid fa-arrow-right"></i>
                    </button>
                  </div>       
        </div>
    </div>
    `;
    container.appendChild(div);
  });
}

// add loader 
const toggleSpinner = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.add("d-none");
  } else {
    loaderSection.classList.remove("d-none");
  }
};

//sort data depending on dates;
