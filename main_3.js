//код срабоет после полной загрузки страницы
document.addEventListener('DOMContentLoaded', function() { 
    document.body.classList.add('ready');
});

// переменная с актуальным количеством предметов из строки
var items_count = 0;

// переменные с ссылками на текст на странице
var p_items = document.getElementById('items');
var p_rs = document.getElementById('rs');
var p_ri = document.getElementById('ri');

// дрисня для считывания нажатия на кнопки
document.getElementById("b1").addEventListener('click', function() {on_button_click('b1')});
document.getElementById("b2").addEventListener('click', function() {on_button_click('b2')});
document.getElementById("b3").addEventListener('click', function() {on_button_click('b3')});
document.getElementById("b4").addEventListener('click', function() {on_button_click('b4')});
document.getElementById("b5").addEventListener('click', function() {on_button_click('b5')});
document.getElementById("b6").addEventListener('click', function() {on_button_click('b6')});
document.getElementById("b7").addEventListener('click', function() {on_button_click('b7')});
document.getElementById("b8").addEventListener('click', function() {on_button_click('b8')});
document.getElementById("b9").addEventListener('click', function() {on_button_click('b9')});
document.getElementById("b0").addEventListener('click', function() {on_button_click('b0')});
document.getElementById("bc").addEventListener('click', function() {on_button_click('bc')});
document.getElementById("bce").addEventListener('click', function() {on_button_click('bce')}); // <- остановился тут (не запускактся анимация нажатия кнопки)

// переменная отвечающая за состояние текста с количеством стаков и предметов
var magic_blurred = true;

// по дефолту при загрузке страницы - кнопки не видимы
items.style.color = 'white';
rs.style.color = 'white';
ri.style.color = 'white';

// срабатывает при нажатии кнопки
function on_button_click(q) {
    document.getElementById(q).classList.add('scale-up-center');
    document.getElementById('items').classList.add('scale-up-center');
    document.getElementById('rs').classList.add('scale-up-center');
    document.getElementById('ri').classList.add('scale-up-center');

    // удаляет классы после конца анимации
    setTimeout(function () {
        document.getElementById(q).classList.remove('scale-up-center');
        document.getElementById('items').classList.remove('scale-up-center');
        document.getElementById('rs').classList.remove('scale-up-center');
        document.getElementById('ri').classList.remove('scale-up-center');
    }, 100);

    // предупредление если сильно больше число (что бы код не ламался) (даже если цифр больше 5 - предупреждение игнорирует кнопки C и CE)
    if (p_items.textContent.length > 9 && q !== 'bc' && q !== 'bce') {
        // функция вызова анимации ошибки
        error_anim();
        // прекращает подальшее выполнение функции
        return;
    }

    // конструкция обратоки значений передаваемых кнопками
    switch(q) {
        // полная очистка строки
        case 'bce': 
            p_items.textContent = '...';
            break;
        // удаления только последего символа строки
        case 'bc': 
            if(p_items.textContent.substr(6) == '') {
                p_items.textContent = '...';
            }
            else {
                qq = p_items.textContent;
                new_qq = qq.slice(0, -1);
                p_items.textContent =  new_qq;
            }  
            break;
        // дабавление нового символа в конец стороки
        default: 
            if(p_items.textContent == '...') {
                p_items.textContent = 'All: ' + q.substr(1);
            }
            else {
                p_items.textContent += q.substr(1);
            }
            break;
        }
    
    // вызов функции пересчета значений
    main_recount();
};

function error_anim() {
  var p_itmes = document.getElementById('items');
        p_items.classList.add('error_shake-horizontal');
        setTimeout(function() {
            p_items.classList.remove('error_shake-horizontal');
        }, 750);
}

function main_recount() {
    var stack = 0;

    items.style.color = 'black';
    rs.style.color = 'black';
    ri.style.color = 'black';

    // переменная с общим количеством предметов
    items_count = Number(p_items.textContent.substr(5));

    // если поле ввода пустое - текст магически пропадет
    if(p_items.textContent == '...') {
        document.body.classList.remove('magic_undest');
        document.body.classList.add('magic_dest');
        magic_blurred = true;
    }
    
    // если в поле ввода цифра меньше 64
    else if(items_count < 64) {
        
        // если текст пропадал ранее - его нужно вернуть
        if(magic_blurred == true) {
            document.body.classList.remove('magic_dest');
            document.body.classList.add('magic_undest');
            magic_blurred = false;
        }

        // изменить значение 2 строк результата
        rs.textContent = ('Stack: 0');
        ri.textContent = ('Items: ' + items_count);
    }
    // если в поле ввода цифра больше 64
    else {
        items_count = Number(p_items.textContent.substr(5));
        // если текст пропадал ранее - его нужно вернуть
        if(magic_blurred == true) {
            document.body.classList.remove('magic_dest');
            document.body.classList.add('magic_undest');
            magic_blurred = false;  
        }

        // фукнция где: if q > 64 : stack++; q -= 64;
        q = recount(items_count);

        // изменить значение 2 строк результата
        rs.textContent = (stack < 2 ? 'Stack: ' + stack : 'Stacks: ' + stack);
        ri.textContent = ('Items left: ' + q);
    }

    // та самая функиция пересчета стаков
    function recount(int) {
        if(int >= 64) {
            stack ++;
            int -= 64;
        }
        if (int >= 64) {
            return recount(int)
        }
        else {
            return int
        }
    }
};