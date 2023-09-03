const handleCategory = async() => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await  res.json();
    const tabContainer = document.getElementById("tab-container");
    data.data.forEach((category) => {
        const div = document.createElement("div");
        
        div.innerHTML = `<button class="p-2 rounded-lg bg-gray-300  focus:bg-btn-color " ><a onclick="handleLoadCategory('${category?.category_id}')"  class=" tab font-bold ">${category.category}</a> </button>`;
        //const category_id=category.category_id;
        tabContainer.appendChild(div);
        ;
    });

} ;
handleCategory();

const  sortView = async (category_id) => {
    const res = await fetch(` https://openapi.programming-hero.com/api/videos/category/${category_id}`);
    const data = await  res.json();
    const parseViewCount = (viewString) => {
        if (viewString.endsWith("k")) {
            return parseFloat(viewString) * 1000;
        } else {
            return parseFloat(viewString);
        }
    };
    data.data.sort((a, b) => {
        const viewA = parseViewCount(a.others.views);
        const viewB = parseViewCount(b.others.views);
        return viewB - viewA;
    });
    
    displaySort(data.data);

};

// category loaded  handle 
const  handleLoadCategory = async (category_id) => {
    const res = await fetch(` https://openapi.programming-hero.com/api/videos/category/${category_id}`);
    const data = await  res.json();
    const btnViwer = document.getElementById("sortView");
    btnViwer.onclick =()=> {
        sortView(category_id);
    }
    const cardContainer = document.getElementById("card-container");
    const containerBody = document.getElementById("container-body");
     cardContainer.innerHTML = '';
     containerBody.innerHTML = '';
        const selectCategory = category_id;
        
        if (data.data.length===0)
        {
            const div = document.createElement("div");
            div.classList.add("w-full","flex" , "flex-col", "item-center" , "justify-center");
            div.innerHTML = `  
            <img src="images/Icon.png"   class="mx-auto" alt="">
            <p class=" text-center text-xl font-semibold" >Opps!! sorry, there is no</p>
            <p class=" text-center text-xl font-semibold"> content here</p>
            
            `;
            
            containerBody.appendChild(div);
        }

        data.data.forEach((videos ) => {
       
        if( selectCategory === "1000" || videos.category_id===selectCategory) {
        
        const  secToHours = (seconds)=> {
            const hours = Math.floor(seconds / 3600); 
            const minutes = Math.floor((seconds % 3600) / 60); 
          
            return { hours, minutes };
          };
          const len = videos.others.posted_date.length;
          
          if(len!==0){
          const time = secToHours(videos.others.posted_date);
          
        const div = document.createElement("div");
        div.classList.add("w-full" ,  "item-center" , "justify-center");
        div.innerHTML = `  <div class="card w-72 bg-base-100 shadow-xl">
        <div class="relative">
            <figure><img src=${videos?.thumbnail} class=" h-48 w-full bg-slate-400 rounded-xl  " alt="Shoes" /></figure>
            <h3 class="absolute text-sm text-white bg-slate-600 bottom-5 right-5">${time.hours} hrs ${time.minutes } mins ago</h3>
        </div>
        <div class="card-body py-5 px-0 ">
              <h2 class="card-title p-0">
                <div class="">
                    <img class="w-12 h-12  rounded-full" src=${videos?.authors[0]?.profile_picture} />
                  </div>
                ${videos?.title}
              </h2>
              <p class="px-8" >${videos?.authors[0]?.profile_name}  <span  class="badge"><img src=${videos?.authors[0]?.verified?"images/fi_10629607.svg":"" } ></span></p>
              <div class="card-actions px-8">
           <p>${videos?.others?.views} views</p>
          </div>
        </div>
      </div>`;
      
    cardContainer.appendChild(div);
       
        }
        else{
            const div = document.createElement("div");
        div.innerHTML = `  <div class="card w-72 bg-base-100 shadow-xl">
        <div class="relative">
            <figure><img src=${videos?.thumbnail} class=" h-48 w-full bg-slate-400 rounded-xl  " alt="Shoes" /></figure>
           
        </div>
        <div class="card-body py-5 px-0 ">
              <h2 class="card-title p-0">
                <div class="">
                    <img class="w-12 h-12  rounded-full" src=${videos?.authors[0]?.profile_picture} />
                  </div>
                ${videos?.title}
              </h2>
              <p class="px-8" >${videos?.authors[0]?.profile_name}  <span  class="badge"><img src=${videos?.authors[0]?.verified?"images/fi_10629607.svg":"" } ></span></p>
              <div class="card-actions px-8">
           <p>${videos?.others?.views} views</p>
          </div>
        </div>
      </div>`;
      
    cardContainer.appendChild(div);

        }

    }
    });

};
handleLoadCategory("1000");

const displaySort = (sorts) => {

    const cardContainer = document.getElementById("card-container");
    const containerBody = document.getElementById("container-body");
    cardContainer.innerHTML = '';
    containerBody.innerHTML = '';
    const selectCategory = sorts.category_id;
    
    if (sorts.length===0)
    { 
        const div = document.createElement("div");
        div.classList.add("w-full","flex" , "flex-col", "item-center" , "justify-center");
        div.innerHTML = `  
        <img src="images/Icon.png"   class="mx-auto" alt="">
        <p class=" text-center text-xl font-semibold" >Opps!! sorry, there is no</p>
        <p class=" text-center text-xl font-semibold"> content here</p>
        
        `;
        
        containerBody.appendChild(div);
    }
    else {
    sorts.forEach((videos ) => {
    
       // if( selectCategory === "1000" || videos.category_id===selectCategory) {
        
            const  secToHours = (seconds)=> {
                const hours = Math.floor(seconds / 3600); 
                const minutes = Math.floor((seconds % 3600) / 60); 
              
                return { hours, minutes };
              };
              const len = videos.others.posted_date.length;
              
              if(len!==0){
              const time = secToHours(videos.others.posted_date);
              
            const div = document.createElement("div");
            div.classList.add("w-full" ,  "item-center" , "justify-center");
            div.innerHTML = `  <div class="card w-72 bg-base-100 shadow-xl">
            <div class="relative">
                <figure><img src=${videos?.thumbnail} class=" h-48 w-full bg-slate-400 rounded-xl  " alt="Shoes" /></figure>
                <h3 class="absolute text-sm text-white bg-slate-600 bottom-5 right-5">${time.hours} hrs ${time.minutes } mins ago</h3>
            </div>
            <div class="card-body py-5 px-0 ">
                  <h2 class="card-title p-0">
                    <div class="">
                        <img class="w-12 h-12  rounded-full" src=${videos?.authors[0]?.profile_picture} />
                      </div>
                    ${videos?.title}
                  </h2>
                  <p class="px-8" >${videos?.authors[0]?.profile_name}  <span  class="badge"><img src=${videos?.authors[0]?.verified?"images/fi_10629607.svg":"" } ></span></p>
                  <div class="card-actions px-8">
               <p>${videos?.others?.views} views</p>
              </div>
            </div>
          </div>`;
          
        cardContainer.appendChild(div);
           
            }
            else{
                const div = document.createElement("div");
            div.innerHTML = `  <div class="card w-72 bg-base-100 shadow-xl">
            <div class="relative">
                <figure><img src=${videos?.thumbnail} class=" h-48 w-full bg-slate-400 rounded-xl  " alt="Shoes" /></figure>
               
            </div>
            <div class="card-body py-5 px-0 ">
                  <h2 class="card-title p-0">
                    <div class="">
                        <img class="w-12 h-12  rounded-full" src=${videos?.authors[0]?.profile_picture} />
                      </div>
                    ${videos?.title}
                  </h2>
                  <p class="px-8" >${videos?.authors[0]?.profile_name}  <span  class="badge"><img src=${videos?.authors[0]?.verified?"images/fi_10629607.svg":"" } ></span></p>
                  <div class="card-actions px-8">
               <p>${videos?.others?.views} views</p>
              </div>
            </div>
          </div>`;
          
        cardContainer.appendChild(div);
    
            //}
    
        }
     
    });
}
};