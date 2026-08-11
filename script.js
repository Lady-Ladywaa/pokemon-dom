//random pokemon 
//add name
//remove when click 
//add some styles to that

const pokemoncontainer = document.getElementById('pokemon-container');
const btnPokemon = document.getElementById('btn-pokemon');
btnPokemon.addEventListener('click', async () => {

    //const RandomPokemon = await fetch('https://pokeapi.co/api/v2/pokemon/67');
    pokemoncontainer.innerHTML = '';   // ล้าง Pokémon ตัวเก่า

    try {
        const randomPokemon = Math.floor(Math.random() * 1000);    // สุ่มหมายเลข Pokémon 

        const RandomPokemon = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${randomPokemon}`
        );
        const data = await RandomPokemon.json();
        console.log(data);

        // progressX.innerHTML = `${data.name} <img src="${data.sprites.front_default}">`;

        const div = document.createElement('div');   // สร้างกล่องสำหรับ Pokémon
        div.classList.add('pokemon-card');           // เพิ่ม class ให้กล่อง

        const img = document.createElement('img');     // สร้างรูป Pokémon
        img.classList.add('pokemon-image');             // เพิ่ม class ให้รูป
        img.src = data.sprites.front_default;           // เอารูปจาก API มาใส่

        const name = document.createElement('p');       // สร้างชื่อ Pokémon
        name.classList.add('pokemon-name');              // เพิ่ม class ให้ชื่อ
        name.textContent = data.name;                   // เอาชื่อจาก API มาใส่

        // เอารูปและชื่อใส่ในกล่อง
        div.append(img);
        div.append(name);
        pokemoncontainer.append(div);        // เอากล่อง Pokémon ไปแสดงในหน้าเว็บ

    } catch (error) {
        console.log(error);
    };

});

const btnReset = document.getElementById('btn-reset');


btnReset.addEventListener('click', () => {
    pokemoncontainer.innerHTML = '';
});

const btnFind = document.getElementById('btn-find');
const pokemonInput = document.getElementById('pokemon-box');

btnFind.addEventListener('click', async () => {
    const searchValue = pokemonInput.value.trim().toLowerCase();
    if (!searchValue) return; // ถ้าไม่ได้พิมพ์อะไรมา ให้ข้าม
    pokemoncontainer.innerHTML = ''; // ล้างตัวเก่าก่อน
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`);
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }
        const data = await response.json();
        // นำข้อมูล data มาสร้างการแสดงผล (img + name) เช่นเดียวกับปุ่ม Random
        const div = document.createElement('div');
        div.classList.add('pokemon-card');
        const img = document.createElement('img');
        img.classList.add('pokemon-image');
        img.src = data.sprites.front_default;
        const name = document.createElement('p');
        name.classList.add('pokemon-name');
        name.textContent = data.name;
        div.append(img);
        div.append(name);
        pokemoncontainer.append(div);
    } catch (error) {
        console.log(error);
        alert('ไม่พบข้อมูล Pokémon นี้');
    }
});

