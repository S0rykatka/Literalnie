$(document).ready(function() {
    const inputs = document.getElementsByTagName('input');
    const inputsCount = inputs.length;
    const pattern =  ['A','a','Ą','ą','B','b','C','c','Ć','ć','D','d','E','e','Ę','ę','F','f','G','g','H','h','I','i','J','j','K','k','L','l','Ł','ł','M','m','N','n','Ń','ń','O','o','Ó','ó','P','p','R','r','S','s','Ś','ś','T','t','U','u','W','w','Y','y','Z','z','Ź','ź','Ż','ż'];
    const chances = [false, false, false, false, false, false];

    const blockLine = (lineId) => {
        const row = document.getElementsByClassName('row')[lineId];

        if (!row) {
            return;
        }

        const inputs = row.children;
        const inputsCount = inputs.length;

        for(let i = 0; i < inputsCount; i++) {
            const input = inputs[i];
            
            input.disabled = true;
            input.style.background = '#787c7e';
        }
    }

    const activateLine = (lineId) => {
        const row = document.getElementsByClassName('row')[lineId];

        if (!row) {
            return;
        }

        const inputs = row.children;
        const input = inputs[0];

        input.focus();
    } 

    const submitLine = () => {
        let breakLoop = false;

        chances.forEach((chance, index) => {
            if (!breakLoop && !chance) {
                breakLoop = true;

                const row = document.getElementsByClassName('row')[index];
                
                const inputs = row.children;
                const inputsCount = inputs.length;

                let word = '';

                for(let i = 0; i < inputsCount; i++) {
                    const char = inputs[i].value;

                    word += char;
                }

                if (word.length === 5) {
                    chances[index] = true;
                    blockLine(index);
                    activateLine(index+1);
                    
                    const data = { word };
                    
                    $.post('/api/check', data)
                    .then(response => {
                        console.log(response);
                    });
                }
            }
        });
    }

    for(let i = 0; i < inputsCount; i++) {
        const input = inputs[i];

        input.addEventListener('keypress', (e) => {
            const key = e.key;

            if (key === 'Enter') {
                submitLine();
                return;
            }
            
            const match = pattern.includes(key);

            if (match) {
                input.value = key;

                if (input.nextElementSibling) {
                    input.nextElementSibling.focus();
                }
            } else {
                input.value = '';
            }
        });
    };
});