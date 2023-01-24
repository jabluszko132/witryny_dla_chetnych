document.body.onclick = () => { 
    document.querySelectorAll('a').forEach(btn => {
        btn.addEventListener('click', function(e) {
            let x = e.clientX;
            let y = e.clientY;
            let wave = document.createElement('span');
            wave.style.left = x + 'px';
            wave.style.top = y + 'px';
            this.appendChild(wave);
    
            setTimeout(() => {wave.remove()},600);
        })
    });}

//changed sth here for example