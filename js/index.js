const root = document.querySelector(".root");
const links = document.querySelectorAll("a");
const urlChange = new Event("url-update");
links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        let target = e.target.getAttribute("href").replace(".html", "");
        window.history.pushState({}, target, window.location.origin + "#" + target.replace("/", ""));
        document.dispatchEvent(urlChange);
    })
})

document.addEventListener("url-update", async e => {
    updatePage();
});

updatePage();

async function updatePage() {
    let page = await fetch((location.hash.replace("#", "") || 'home') + ".html")
    root.innerHTML =await page.text();
}

