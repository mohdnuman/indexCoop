const received=88967729643331620219;
const total=1307818949130797167511*1.65;

const token0reserve=10627659166841552270167/10**18;
const token1reserve=601112631070644530017/10**18;

const token0amount=received/total*token0reserve;
const token1amount=received/total*token1reserve;

console.log(token0amount,token1amount);