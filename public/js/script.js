const formSearch=document.getElementById('cname');
const button=document.getElementById('btn');


button.addEventListener('click',()=>{
    let city=formSearch.value;
    fetch(`/weather?address=${city}`).then((data)=>{
    data.json().then(val=>{

        document.getElementById('outCity').innerHTML=city;
        document.getElementById('mtemp').innerHTML=val.data.temp;
        document.getElementById('max').innerHTML=val.data.min;
        document.getElementById('min').innerHTML=val.data.max;
    });
    })
})



