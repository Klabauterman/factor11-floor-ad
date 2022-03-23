var container = document.currentScript.parentElement;

if (!document.currentScript.getAttribute("pid")) {
    console.error("pid attribute missing")
}

if (!document.currentScript.getAttribute("gdpr")) {
    console.error("gdpr attribute missing (should be 0 or 1)")
}

if (!document.currentScript.getAttribute("gdpr_consent")) {
    console.error("gdpr_consent attribute missing")
}

var config = {
    buttonBackground: document.currentScript.getAttribute("button-background") ?? "#4E2CA3",
    buttonForeground: document.currentScript.getAttribute("button-foreground") ?? "white",
    dataAsmCdn: document.currentScript.getAttribute("data-asm-cdn") ?? "cdn-de.f11-ads.com",
    dataAsmHost: document.currentScript.getAttribute("data-asm-host") ?? "ads.qualitymedianetwork.de",
    adScript: document.currentScript.getAttribute("ad-loader") ?? "https://cdn-de.f11-ads.com/adasync.min.js",
    pid: document.currentScript.getAttribute("pid")
};

var style = document.createElement('style');
style.innerHTML = `
#floor-ad { 
    position: fixed;
    display: flex;
    justify-content: center;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 10000;
    transition: height 1000ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    display: flex;
    height: 50px;
 }

 .hidden {
    display: none !important;
 }

 .expanded {
     height: 600px !important;
 }

 #floor-container {
    position: relative;
    width: 300px;
    height: 100%;
    background: white;
 }

 #ad-container {
     overflow: hidden;
 }

 #top-button {
    position: absolute;
    cursor: pointer;
    top: -32px;
    left: 0;
    right: 0;
    background: ${config.buttonBackground};
    color: ${config.buttonForeground};
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    height: 32px;
    width: 32px;
    margin-left: auto;
    margin-right: auto;
    z-index: 10000;
 }

 #close-button {
    position: absolute;
    cursor: pointer;
    top: 0;
    right: -24px;
    background: ${config.buttonBackground};
    color: ${config.buttonForeground};
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    height: 24px;
    width: 24px;
    z-index: 10000;
 }

 .asm_async_creative {
    display: "inline-block";
    width: 300px;
    height: 601px;
    text-align: left;
    text-decoration: none;
 }

 
 `;
document.getElementsByTagName('head')[0].appendChild(style);   

async function onMessage(message) {
    if (message.data.type === "floorad" && message.data.status === "loaded" && !container?.getAttribute("loaded")) {
        console.log("SHOW AD");
        container?.setAttribute("loaded", "true");
        setVisible(true);
    }
};

var expanded = false;
var hidden = true;

function setExpanded(value) {
    if (value) {
        document.getElementById("floor-ad").classList.add("expanded");
        document.getElementById("top-icon").classList.remove("ph-arrow-circle-up");
        document.getElementById("top-icon").classList.add("ph-arrow-circle-down");
        document.getElementById("top-button").onclick = function(){
            setExpanded(false);
        };
    } else {
        document.getElementById("floor-ad").classList.remove("expanded");
        document.getElementById("top-icon").classList.remove("ph-arrow-circle-down");
        document.getElementById("top-icon").classList.add("ph-arrow-circle-up");
        document.getElementById("top-button").onclick = function(){
            setExpanded(true);
        };
    }
}

function setVisible(value) {
    if (value) {
        document.getElementById("floor-ad").classList.remove("hidden");
    } else {
        document.getElementById("floor-ad").classList.add("hidden");
    }
}

async function loadAd() {
    var gdpr = document.currentScript.getAttribute("gdpr");
    var consent = document.currentScript.getAttribute("gdpr_consent");
    var params = `pid=${config.pid}&gdpr=${gdpr}&gdpr_consent=${consent}`;
    const ad = document.createElement("ins");
    ad.classList.add("asm_async_creative");
    ad.setAttribute("data-asm-cdn", config.dataAsmCdn);
    ad.setAttribute("data-asm-host", config.dataAsmHost);
    ad.setAttribute("data-asm-params", params);
    document.getElementById("ad-container").appendChild(ad);

    var script = document.createElement("script");
    script.src = config.adScript;
    script.async = true;

    container.appendChild(script);
}

const floorAd = document.createElement("div");
floorAd.id = "floor-ad";
floorAd.classList.add("hidden");

const floorContainer = document.createElement("div");
floorContainer.id = "floor-container";
floorAd.appendChild(floorContainer);

const adContainer = document.createElement("div");
adContainer.id = "ad-container";
floorContainer.appendChild(adContainer);

var phosphor = document.createElement("script");
phosphor.src = "https://unpkg.com/phosphor-icons";
document.head.appendChild(phosphor);

const close = document.createElement("div");
close.id = "close-button";
close.onclick = function(){
    setVisible(false);
};
const closeIcon = document.createElement("i");
closeIcon.style="font-size: 24px";
closeIcon.classList.add("ph-x-circle");
close.appendChild(closeIcon);
floorContainer.appendChild(close);

const upper = document.createElement("div");
upper.id = "top-button";
upper.onclick = function(){
    setExpanded(true);
};
const expandIcon = document.createElement("i");
expandIcon.id="top-icon";
expandIcon.style="font-size: 32px";
expandIcon.classList.add("ph-arrow-circle-up");
upper.appendChild(expandIcon);
floorContainer.appendChild(upper);

container.appendChild(floorAd);
window.addEventListener("message", onMessage);
loadAd();
  