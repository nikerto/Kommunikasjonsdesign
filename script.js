'use strict';
// ALLE tall nedenforr er illustrative verdier for interaksjonstesting, ikke kildedata.
const defaults={income:16500,rent:7500,food:3200,travel:600,other:1800};
const ids=Object.keys(defaults), costs=ids.slice(1);
const $=id=>document.getElementById(id);
const nf=new Intl.NumberFormat('nb-NO',{maximumFractionDigits:0});
const fmt=n=>nf.format(n), kr=n=>fmt(n)+' kr';

function render(){
  const v=Object.fromEntries(ids.map(id=>[id,Number($(id).value)]));
  ids.forEach(id=>$(id+'-out').textContent=kr(v[id]));
  const exp=costs.reduce((s,k)=>s+v[k],0), rem=v.income-exp, neg=rem<0;
  const remain=$('remaining');
  remain.innerHTML=fmt(rem)+' <small>kr</small>';
  remain.classList.toggle('negative',neg);
  $('remaining-caption').textContent=neg?'Utgiftene overstiger inntekten i dette eksempelet.':'Dette er det som står igjen i dette eksempelet.';
  $('expenses').textContent=kr(exp);
  $('share').textContent=Math.round(exp/v.income*100)+' %';
  const scale=Math.max(exp,v.income);
  [...costs.map(k=>[k,v[k]]),['left',Math.max(0,rem)]].forEach(([key,val])=>{
    const bar=$('bar-'+key);
    bar.style.width=val/scale*100+'%';
    bar.title=key+': '+kr(val);
  });
}

ids.forEach(id=>$(id).addEventListener('input',render));
$('reset').addEventListener('click',()=>{ids.forEach(id=>$(id).value=defaults[id]);render()});
addEventListener('scroll',()=>{
  const max=document.documentElement.scrollHeight-innerHeight;
  $('progress').style.width=(max>0?scrollY/max*100:0)+'%';
},{passive:true});
render();