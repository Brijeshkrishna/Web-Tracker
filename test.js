
chrome.storage.local.get('sitedata', function (data) {
  if (!data.sitedata) {
    chrome.storage.local.set({ 'sitedata':  [] });
  }
});

function getdomain(url) {
  const regex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im;
  const domain = String(url.match(regex)[1].split('.')[0]);
  if (domain === null)
    return "Local";
  return domain;
}




// on exit
chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
  console.log("Tab with id: " + tabId + " is closed");
  console.log(removeInfo);
});


// function isexist(key){
//   let rv ;
//   chrome.storage.local.get(''+key, function(items) {  return (items[''+key] != null)   });
//   return rv;
// }

class site {
  constructor(name) {
    this.s_time = [];
    this.e_time = [];
    this.name = name;
  }
}

class main_web{

  constructor(){
    this.list= [];
  }
  push(data){
    this.list.push(data);
  }
}

function find(arr, domain) {
  for ( let i of  arr) {
    if (i.name === domain)
      return i;
  }
  return null;
}



// on visit
chrome.webNavigation.onBeforeNavigate.addListener(function (details) {

  let domain = getdomain(getdomain(details.url));
  let start_time = new Date();

  chrome.storage.local.get('sitedata',function (data) {

    console.log(data.sitedata);
    let idx = find(data.sitedata.sitedata,domain);

    // not found
    if(idx === null){

      let temp = new site(domain);
      temp.s_time = start_time;
      data.sitedata.push(temp);
      chrome.storage.local.set({ 'sitedata': data });

    }

    //found 
    else {
      idx.s_time = start_time;
      chrome.storage.local.set({ 'sitedata': data });
    }

  });
  
});



// const date = new Date();


// let temp = find(data.sitedata.sitedata, domain);




// // not found 
// if (temp === null) {

//   temp = new site(domain);
//   temp.s_time [0]  = date ;
//   data.sitedata.sitedata[0] = temp;
//   chrome.storage.local.set({ 'sitedata': data });

// }

// // yes
// else {
//   data.sitedata.sitedata[temp].s_time[0] =  date ;
// }

// }

// // not data
// else{

// temp = new site(domain);
// temp.s_time [0]  = date ;
// data.sitedata = [temp];

// }

// chrome.storage.local.set({ 'sitedata': data });