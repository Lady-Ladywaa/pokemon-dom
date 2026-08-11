const pokemoncontainer = document.getElementById('pokemon-container');
const btnPokemon = document.getElementById('btn-pokemon');
const btnReset = document.getElementById('btn-reset');
const btnFind = document.getElementById('btn-find');
const pokemonInput = document.getElementById('pokemon-box');

// ฟังก์ชันสร้างการ์ดโปเกมอน (ใช้ซ้ำทั้งปุ่ม Random และ Find)
function createPokemonCard(data) {
    const div = document.createElement('div');
    div.classList.add('pokemon-card', 'pokemon-pop'); // ใส่ class อนิเมชัน popUp

    const img = document.createElement('img');
    img.classList.add('pokemon-image');
    // ใช้ภาพ Official Artwork จะได้ภาพคมชัดสูงกว่า front_default
    img.src = data.sprites.other['official-artwork'].front_default || data.sprites.front_default;

    const name = document.createElement('p');
    name.classList.add('pokemon-name');
    name.textContent = data.name;

    div.append(img);
    div.append(name);

    // คลิกที่การ์ดเพื่อลบทิ้ง
    div.addEventListener('click', () => {
        div.remove();
    });

    return div;
}

// 1. ปุ่ม สุ่มโปเกมอน (Random Pokemon)
btnPokemon.addEventListener('click', async () => {
    pokemoncontainer.innerHTML = ''; // ล้าง Pokémon ตัวเก่า

    try {
        const randomPokemon = Math.floor(Math.random() * 1025) + 1; // สุ่ม ID (1 - 1025)

        // แสดงลูกบอล Pokeball แล้วสั่งให้เขย่าลุ้นก่อน
        const pokeballImg = document.createElement('img');
        pokeballImg.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
        pokeballImg.classList.add('pokeball-shake');
        pokemoncontainer.append(pokeballImg);

        // ดึงข้อมูลจาก API (แก้จุดผิด Syntax เพิ่มเครื่องหมาย ` ` แล้ว)
        const RandomPokemon = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${randomPokemon}`
        );
        const data = await RandomPokemon.json();

        // รอให้ลูกบอลเขย่า 1.5 วินาที แล้วเปิดออกเป็นตัวโปเกมอน
        setTimeout(() => {
            pokemoncontainer.innerHTML = ''; // ลบลูกบอลออก
            const pokemonCard = createPokemonCard(data);
            pokemoncontainer.append(pokemonCard); // แสดงรูป + ชื่อโปเกมอน
        }, 1500);

    } catch (error) {
        console.log(error);
        pokemoncontainer.innerHTML = '<p style="color:white;">เกิดข้อผิดพลาด ลองใหม่อีกครั้ง</p>';
    }
});

// 2. ปุ่ม ค้นหาโปเกมอน (Find Pokemon)
btnFind.addEventListener('click', async () => {
    const searchValue = pokemonInput.value.trim().toLowerCase();
    if (!searchValue) return; // ถ้าไม่ได้พิมพ์อะไรมา ให้ข้าม

    pokemoncontainer.innerHTML = ''; // ล้างตัวเก่าก่อน

    try {
        // แสดงลูกบอลเขย่าระหว่างรอโหลด
        const pokeballImg = document.createElement('img');
        pokeballImg.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
        pokeballImg.classList.add('pokeball-shake');
        pokemoncontainer.append(pokeballImg);

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchValue}`);
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }
        const data = await response.json();

        // หน่วงเวลา 1 วินาทีให้เห็นลูกบอลเปิดตัว
        setTimeout(() => {
            pokemoncontainer.innerHTML = '';
            const pokemonCard = createPokemonCard(data);
            pokemoncontainer.append(pokemonCard);
        }, 1000);

    } catch (error) {
        console.log(error);
        pokemoncontainer.innerHTML = '';
        alert('ไม่พบข้อมูล Pokémon นี้');
    }
});

// 3. ปุ่ม รีเซ็ต (Reset)
btnReset.addEventListener('click', () => {
    pokemoncontainer.innerHTML = '';
    pokemonInput.value = ''; // เคลียร์ข้อความใน ช่องค้นหา ด้วย
});