


chrome.storage.local.get('sitedata', function (data) {
  if (data.sitedata) {
    chrome.storage.local.set({ 'sitedata': [] });
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

  
  chrome.storage.local.get(null, function (data) {

    for ( i in data){
      for (j in i){
        if (j.tabid == tabId)
          console.log(i);

      }
    }

    data[tabes_domain].e_time = new Date();
    chrome.storage.local.set(data);
    console.log(data);

    var websiteData = {};
    websiteData[tabes_domain] = data;
    chrome.storage.local.set(websiteData);

  });

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
    this.s_time ;
    this.e_time ;
    this.name = name;
    this.tabid ;
  }
}


function find(arr, domain) {
  for (let i of arr) {
    if (i.name === domain)
      return i;
  }
  return null;
}


// Open a database
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("myDatabase", 1);
    request.onsuccess = () => {
      resolve(request.result);
    };
    request.onupgradeneeded = () => {
      request.result.createObjectStore("myObjectStore", { keyPath: "id" });
    };
    request.onerror = () => {
      reject(request.error);
    };
  });
};

// Store data in the database
const storeData = async (data) => {
  const db = await openDB();
  const tx = db.transaction("myObjectStore", "readwrite");
  const store = tx.objectStore("myObjectStore");
  store.put(data);
  return tx.complete;
};

// Retrieve data from the database
const getData = async (id) => {
  const db = await openDB();

  const tx = await db.transaction("myObjectStore", "readwrite");
  const store = await tx.objectStore("myObjectStore");

  return store.get(id);
};




// chrome.webNavigation.onBeforeNavigate.addListener(async function (details) {
//   try {
//     let a = await getData('google');
//     console.log(a.result);
//   }
//   catch (d) {
//     console.log(d);
//   }

//   // console.log(a);
//   // a.result && console.log(a.result);

//   // if (1){
//   //   let web = new site(getdomain(details.url));
//   //   web.s_time = [new Date()];
//   //   storeData({ 'id': getdomain(details.url),'data':web });
//   // }
//   // else{
//   //   rv.result.data.s_time.push(new Date());
//   //   storeData({ 'id': getdomain(details.url),'data':web });
//   // }
// });






// // on visit
// chrome.webNavigation.onBeforeNavigate.addListener(function (details) {

//   let domain = getdomain(getdomain(details.url));
//   let start_time = new Date();

//   chrome.storage.local.get('sitedata',function (data) {

//     if(data.sitedata){
//       chrome.storage.local.set({ 'sitedata': [] });
//       console.log("empty");
//     }

//     let idx = find(data.sitedata.sitedata,domain);

//     // not found
//     if(idx === null){

//       let temp = new site(domain);
//       temp.s_time = start_time;
//       data.sitedata.push(temp);
//       chrome.storage.local.set({ 'sitedata': data });

//     }

//     //found 
//     else {
//       idx.s_time = start_time;
//       chrome.storage.local.set({ 'sitedata': data });
//     }

//   });

// });

// function storeVisitTime() {

// }
chrome.webNavigation.onBeforeNavigate.addListener(function (details) {

  var website = getdomain(details.url);
  var date = new Date();
  var visitTime = date.toString();
  


  var website_data = new site(website);
  website_data.s_time = visitTime;
  website.tabid = details.tabId;

  chrome.storage.local.get(website, function (data) {
    var visitArray;

    if (data[website]) {
      visitArray = data[website];
      visitArray.push(website_data);
    }
    else {
      visitArray = [website_data];
    }

    var websiteData = {};
    websiteData[website] = visitArray;
    
    chrome.storage.local.set(websiteData);
  });

});

function printVisitTimes(x) {
  chrome.storage.local.get(x, function (data) {
    console.log("Website: " + x);
    console.log("Visit Times: ");
    console.log(data[x]);
  });
}



// function printVisitTimes() {
//     chrome.storage.local.get(['websiteVisitTimes'], function(result) {
//         if (result.websiteVisitTimes) {
//             console.log("Website Visit Times:");
//             result.websiteVisitTimes.forEach(function(website) {
//                 console.log("URL: " + website.url + ", Visit Time: " + website.visitTime);
//             });
//         } else {
//             console.log("No website visit times found in chrome storage.");
//         }
//     });
// }

// Call the function to print stored website visit times



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


