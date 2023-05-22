

const sumbitButton = document.getElementById('subButton')
const ul = document.getElementById('ul');
const url = "https://crudcrud.com/api/829d7f39c83248f5ba8b3c6179102308/info/"

sumbitButton.addEventListener('click',addDataToUI)
ul.addEventListener('click',deleteFromUI)


function addDataToUI(e)
{
    e.preventDefault();
    let des =document.getElementById('autoSizingInput').value
    let amount = document.getElementById('autoSizingInputGroup').value
    let cat = document.getElementById('autoSizingSelect').value
    let editButton = document.createElement('button')
    //let space = document.createElement('span')
    let deleteButton = document.createElement('button')
    editButton.setAttribute('class','btn btn-primary')
    deleteButton.setAttribute('class','btn btn-primary')
    editButton.className='edit inside ul'
    deleteButton.className='delete inside ul'
    editButton.setAttribute('style',"background-color: blueviolet")
    deleteButton.setAttribute('style',"background-color: blueviolet")
    editButton.textContent='Edit';
    deleteButton.textContent='Delete'
    
    let node = document.createElement('li');
    node.textContent=`${des} ${amount} ${cat} `
    node.appendChild(editButton)
    //node.appendChild(space)
    node.appendChild(deleteButton)
    let parentEle = document.getElementById('ul')
    parentEle.appendChild(node)
    let objToStore = {description:des, amountOf:amount , category:cat}
    objToStore = JSON.stringify(objToStore)
    localStorage.setItem(des,objToStore)

    axios.post(url,{
        des,amount,cat
    }).then(res=>{
        console.log("details saved")
    }).catch(err =>{
        console.log("something went wrong")
    })
    
    axios.get(url)
.then(res=>{
    console.log(res.data)
})
.catch(e=>{
    console.log("some error")
})
}



function deleteFromUI(e)
{
    if(e.target.className=='delete inside ul')
    {
        let parentNode = e.target.parentNode;
        let tc = String(parentNode.textContent)
        tc = tc.split(" ")
        ul.removeChild(parentNode)
        localStorage.removeItem(tc[0])
        let search=tc[0];
        let idSearch;
        axios.get(url)
        .then(res=>{
            res.data.forEach((x)=>{
                if(x['des']==search)
                idSearch=x['_id']
            })
            axios.delete(url+`${idSearch}`)
        })
        .catch(e=>{console.log('delete unsuccessful ')})
    }
    else if(e.target.className=='edit inside ul')
    {
        let parentNode = e.target.parentNode;
        let tc = String(parentNode.textContent)
        tc = tc.split(" ")
        let d = tc[0]
        let a = tc[1]
        let c = tc[2]
        ul.removeChild(parentNode)
        localStorage.removeItem(tc[0])
        document.getElementById('autoSizingInput').value=d;
        document.getElementById('autoSizingInputGroup').value=a
        document.getElementById('autoSizingSelect').value=c

        let search=tc[0];
        let idSearch;
        axios.get(url)
        .then(res=>{
            res.data.forEach((x)=>{
                if(x['des']==search)
                idSearch=x['_id']
            })
            axios.delete(url+`${idSearch}`)
        })
        .catch(e=>{console.log('delete unsuccessful ')})
    }
}


window.addEventListener("DOMContentLoaded",abc)
function abc()
{
    
    // Object.keys(localStorage).forEach(function(key){
        

    //     let des =JSON.parse(localStorage.getItem(key))['description']
    // let amount = JSON.parse(localStorage.getItem(key))['amountOf']
    // let cat = JSON.parse(localStorage.getItem(key))['category']
    // let editButton = document.createElement('button')
    // //let space = document.createElement('span')
    // let deleteButton = document.createElement('button')
    // editButton.setAttribute('class','btn btn-primary')
    // deleteButton.setAttribute('class','btn btn-primary')
    // editButton.className='edit inside ul'
    // deleteButton.className='delete inside ul'
    // editButton.setAttribute('style',"background-color: blueviolet")
    // deleteButton.setAttribute('style',"background-color: blueviolet")
    // editButton.textContent='Edit';
    // deleteButton.textContent='Delete'

    // let node = document.createElement('li');
    // node.textContent=`${des} ${amount} ${cat} `
    // node.appendChild(editButton)
    // //node.appendChild(space)
    // node.appendChild(deleteButton)
    // let parentEle = document.getElementById('ul')
    // parentEle.appendChild(node)

    //  });




     let desFromCC;
     let amtFromCC;
     let catFromCC;
    axios.get(url).then(res=>{
        res.data.forEach(x=>{
            desFromCC = x['des'];
            amtFromCC = x['amount'];
            catFromCC = x['cat'];

            let editButton = document.createElement('button')
    let deleteButton = document.createElement('button')
    editButton.setAttribute('class','btn btn-primary')
    deleteButton.setAttribute('class','btn btn-primary')
    editButton.className='edit inside ul'
    deleteButton.className='delete inside ul'
    editButton.setAttribute('style',"background-color: blueviolet")
    deleteButton.setAttribute('style',"background-color: blueviolet")
    editButton.textContent='Edit';
    deleteButton.textContent='Delete'

    let node = document.createElement('li');
    node.textContent=`${desFromCC} ${amtFromCC} ${catFromCC} `
    node.appendChild(editButton)
    node.appendChild(deleteButton)
    let parentEle = document.getElementById('ul')
    parentEle.appendChild(node)
            
        })
    }) 
     


}
