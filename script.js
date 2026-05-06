let cur ='0', prev ='', operator ='', fresh =false;
const valEl = document.getElementById('current');
const exprEl = document.getElementById('expression');

function update() {valEl.textContent=cur;}

function calc() {
    const a =parseFloat(prev), b =parseFloat(cur);
    if (operator === '/' && b === 0) {cur='Error';}
    else if (operator ==='+') cur =(a+b).toString();
    else if (operator ==='-') cur =(a-b).toString();
    else if (operator ==='*') cur =(a*b).toString();
    else if (operator ==='/') cur =(a/b).toString();
    operator =''; prev=''; fresh = true; 
    update();

}


function num(d) {
    if (fresh) {cur=d; fresh=false;}
    else {cur = cur === '0' ? d: cur + d;}
    update();

}

function dot() {
    if (fresh){cur='0.'; fresh=false}
    else if (!cur.includes('.')) cur += '.'
    update();

}

function op(o) {
    if(prev && operator && !fresh) calc();
    prev=cur; operator =o; fresh=true;
    const sym ={'+':'+', '-':'-', '*':'*', '/':'÷'}[o]
    exprEl.textContent =cur + ' ' + sym;

}

function eq() {
    if(!operator)return;
    const sym = {'+':'+', '-':'-', '*':'*', '/':'÷'}[operator];
    exprEl.textContent = prev + ' ' + sym + ' ' + cur + '=';
    calc();

}

function ac() {
    cur ='0'; prev =''; operator =''; fresh=false;
    exprEl.textContent=''; update();

}

function toggleSign() {
    if (cur !== '0' && cur !== 'Error') {
        cur = cur.startsWith('-') ? cur.slice(1) : '-' + cur;
        update();
    }
}

function percent() {
    if (cur !=='Error') { cur =(parseFloat(cur) / 100).toString(); update();}
}

document.addEventListener('keydown', (e) => {
    if(e.key >='0' && e.key <='9') num(e.key);
    else if (e.key ==='.') dot();
    else if (e.key ==='+') op('+');
    else if (e.key ==='-') op('-');
    else if (e.key ==='*') op('*');
    else if (e.key ==='/') {e.preventDefault(); op('/');}
    else if (e.key ==='Enter' || e.key === '=') eq();
    else if (e.key ==='Escape') ac();
    else if (e.key ==='Backspace'){
        cur =cur.length > 1 && cur !=='Error'? cur.slice(0,-1):'0';
        update();

    }
});