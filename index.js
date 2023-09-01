const handleCategory = async() => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await  res.json();
    const tabContainer = document.getElementById("tab-container");
    data.data.forEach((category) => {
        const div = document.createElement("div");
        div.innerHTML = `<a onclick="handleLoadCategory('${category.category_id}')" class="tab btn ">${category.category}</a> `;
        tabContainer.appendChild(div);
    });
     
} ;
const handleLoadCategory = async (category_id) => {
    const res = await fetch(` https://openapi.programming-hero.com/api/videos/category/${category_id}`);
    const data = await res.json();
    const cardContainer = document.getElementById("card-container");
    data.data.forEach((videos) => {
        
        const div = document.createElement("div");
        div.innerHTML = `  <div class="card w-72 bg-base-100 shadow-xl">
        <div class="relative">
            <figure><img src=${videos?.thumbnail} class=" h-48 w-full bg-slate-400 rounded-xl  " alt="Shoes" /></figure>
            <h3 class="absolute text-sm text-white bg-slate-600 bottom-5 right-5">Bottom Right</h3>
        </div>
        
        <div class="card-body py-5 px-0 ">
              <h2 class="card-title p-0">
                <div class="w-12 rounded-full">
                    <img src="images/Ellipse 1.svg" />
                  </div>
                ${videos?.title}
              </h2>
          
          <p class="px-8" >${videos?.authors[0]?.profile_name}  <span  class="badge"><img src="images/fi_10629607.svg" alt="" srcset=""></span></p>
          
          <div class="card-actions px-8">
           <p>${videos?.others?.views} views</p>
          </div>
        </div>
      </div>`;
      cardContainer.appendChild(div);
    });
    
   };
handleCategory();