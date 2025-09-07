const createElement = (arr) =>{
    const htmlElements = arr.map(element => `<span class="btn">${element}</span>`)
    return htmlElement;
}





const loadLessons = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
        .then(res => res.json())
        .then(json => displayLessons(json.data))
}
const displayLessons = (data) => {
    const btnContainer = document.getElementById("btn-container");
    btnContainer.innerHTML = "";

    data.forEach(element => {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
    
    <button class="btn btn-outline btn-primary py-[10px] btn-all" onclick="loadCard(${element.level_no})" id="lesson-btn${element.level_no}">
     <i class="fa-brands fa-leanpub"></i>
                            Lesson - ${element.level_no}</button>
    
    `

        btnContainer.appendChild(btnDiv);
    });
}

// id
// : 
// 5
// level
// : 
// 1
// meaning
// : 
// "আগ্রহী"

// : 
// "ইগার"
// word
// : 
// "Eager"

const loadCard = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(element => {
            displayCard(element.data)
            const activeBtn = document.getElementById(`lesson-btn${id}`);
            deactiveBtn(element.data);
            activeBtn.classList.add("active");

        })
}


const deactiveBtn = element => {
    const allBtn = document.querySelectorAll(".btn-all");
    allBtn.forEach(element => {
        element.classList.remove("active");
    });
}

const wordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const detials = await res.json();
    displayWordDetails(detials.data);
}

const displayWordDetails = data => {
    console.log(data)
    const modal = document.getElementById('detail-box');
    modal.innerHTML = `
      <div>
                    <div class="my-3">
                        <h1 class="font-bold text-4xl">${data.word} ( <i class="fa-solid fa-microphone-lines"></i>  :${data.pronunciation})</h1>
                    </div>
                    <div>
                        <h1 class="text-2xl font-semibold">Meaning</h1>
                        <p class="font-bangla font-medium text-2xl">${data.meaning}</p>
                    </div>
                    <div class="my-3">
                        <h1 class="text-2xl font-semibold">Example</h1>
                        <p class="font-bangla font-medium text-2xl" >${data.sentence}</p>
                    </div>

                    <div>
                        <h1>Synnonames</h1>
                        <div>${createElement(data.synonyms)}</div>
                    </div>
                </div>
        `
    modal_word.showModal()

    console.log(data)
}



// id
// : 
// 5
// level
// : 
// 1
// meaning
// : 
// "আগ্রহী"
// partsOfSpeech
// : 
// "adjective"
// points
// : 
// 1
// pronunciation
// : 
// "ইগার"
// sentence
// : 
// "The kids were eager to open their gifts."
// synonyms
// : 
// Array(3)
// 0
// : 
// "enthusiastic"
// 1
// : 
// "excited"
// 2
// : 
// "keen"





const displayCard = (data) => {
    const card = document.getElementById('card-container');
    card.innerHTML = '';
    if (data.length == 0) {
        card.innerHTML = `   <div class="text-center col-span-3 font-bangla">
            <img class="m-auto" src="./assets/alert-error.png" alt="">
             <p class="text-[14px] text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।!!</p>
            <h2 class="text-3xl font-medium pt-4">নেক্সট Lesson এ যান</h2>
        </div>`
    }

    data.forEach(element => {
        const div = document.createElement("div");
        div.innerHTML = `
          <div class="card bg-white py-14 px-10 rounded-xl  bg-base-100 shadow-sm text-center h-full" id="cardDiv">
            <h2 class="mb-4 text-3xl font-bold">${element.word ? element.word : "Word Not Found"}</h2>
            <p class="mb-4 text-2xl font-medium">Meaning /Pronounciation</p>
            <p class="text-3xl font-semibold font-bangla">"${element.meaning ? element.meaning : "Meaning Not Found"} / ${element.pronunciation ? element.pronunciation : "Pronounciation Not Found"}"</p>
            <div class="flex justify-between items-center mt-10">
                <button onclick="wordDetails(${element.id})" class="btn bg-[#1A91FF10] rounded-lg hover:bg-[#1A91FF50]">
                    <i class="fa-solid fa-circle-info"></i>
                </button>
                <button class="btn bg-[#1A91FF10] rounded-lg hover:bg-[#1A91FF50]">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
        </div>
        `

        card.appendChild(div);
    })

}

loadLessons()