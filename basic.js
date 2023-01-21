function getdomain(url) {
    const regex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/im;
    const domain = String(url.match(regex)[1].split('.')[0]);
    if (domain === null)
      return "Local";
    return domain.charAt(0).toUpperCase() + domain.slice(1);;
}
  async function getip() {
    return await fetch("https://api.ipify.org?format=json")
      .then(response => response.json())
      .then(data => data.ip)
      .catch(error => {
        return null;
      });
  
  }
  
  chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
    var currentUrl = tabs[0];
    document.getElementById("img-logo").src = currentUrl.favIconUrl;
    document.getElementById("domain").innerHTML = getdomain(currentUrl.url);
    document.getElementById("url").innerHTML = await getip();
  });
  
