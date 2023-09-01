const handleCategory = async() => {
    const res = await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data = await  res.json();
    const tabContainer = document.getElementById("tab-container");
    data.data.forEach(category => {
        const div = document.createElement("div");
        div.innerHTML = `<a class="tab btn ">${category.category}</a> `;
        tabContainer.appendChild(div);
    });
    console.log(data.data);
    
} 
handleCategory();