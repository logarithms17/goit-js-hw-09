!function(){var t=document.querySelector("body"),e=document.querySelector("button[data-start]"),o=document.querySelector("button[data-stop]"),n=null;o.disabled=!0,e.addEventListener("click",(function(){n=setInterval((function(){t.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0)),e.disabled=!0,o.disabled=!1}),1e3)})),o.addEventListener("click",(function(){clearInterval(n),e.disabled=!1,o.disabled=!0,console.log("Color Change has Stopped")}))}();
//# sourceMappingURL=01-color-switcher.aff4c18f.js.map