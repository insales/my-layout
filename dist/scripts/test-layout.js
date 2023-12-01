var currentEditLayout;
var settingsPanel = document.getElementById("test-settings");

/* Переключение текущего layout */
for (let item of document.getElementsByClassName("js-edit-layout")) {
  item.addEventListener("click", function(event) { 
    configureteLayoutEditor(document.getElementById(event.target.value));
	});
}

/* Скрытие панели с настройками */
document.addEventListener("click", (event) => {
  if (!event.target.closest("#test-settings") && !event.target.closest(".editor__field"))
    settingsPanel.classList.remove("is-show");
});

/* Настройки с добавлением css-переменных  */
for (let settingItem of document.getElementsByClassName("js-setting-css-variable")) {
	let eventName = settingItem.dataset.eventName,
			settingName = settingItem.dataset.settingName,
			settingUnit = settingItem.dataset.settingUnit == undefined ? '' : settingItem.dataset.settingUnit;

  settingItem.addEventListener(eventName, function(event) { 
  	let settingValue = settingItem.dataset.settingValue ? settingItem.dataset.settingValue : event.target.value;

  	if (settingItem.dataset.isToggle !== undefined){
  		if(event.target.checked)
  			addCssVariable(settingName, settingValue, settingUnit);
  		else
  			removeCssVariable(settingName);
  	}
  	else{
  		addCssVariable(settingName, settingValue, settingUnit);
      
      // При смене цвета фона выбираем оттенок для цвета текста и добавляем оттенки
      if (settingName == '--bg'){
        addCssVariable('--bg-lighter', lighterColor(settingValue), '');
        addCssVariable('--bg-darker', darkerColor(settingValue), ''); 
        
        if (isDarkColor(settingValue)){
          addCssVariable('--is-dark-bg', 'true', '');
          removeCssVariable('--is-light-bg');
        }
        else{
          addCssVariable('--is-light-bg', 'true', '');
          removeCssVariable('--is-dark-bg');
        }
      }
    }
	});
}

/* Настройки с добавлением data-атрибутов  */
for (let settingItem of document.getElementsByClassName("js-setting-data-attr")) {
	let eventName = settingItem.dataset.eventName,
			settingAttrName = settingItem.dataset.attrName;

  settingItem.addEventListener(eventName, function(event){
  	if (settingItem.dataset.isToggle !== undefined){
  		if(event.target.checked)
  			addDataAttr(settingAttrName, '');
  		else
  			removeDataAttr(settingAttrName);
  	}
  	else
  		addDataAttr(settingAttrName, event.target.value);
	});
}

/* Определение цвета у элементов с назнаенным фоном */
for (let itemWithBg of document.querySelectorAll('[style*="--bg"]')) {
  const itemBg = getComputedStyle(itemWithBg).getPropertyValue('--bg');

  if(itemBg !== ''){
    if (isDarkColor(itemBg))
      itemWithBg.style.setProperty('--is-dark-bg', 'true');
    else
      itemWithBg.style.setProperty('--is-light-bg', 'true');

   itemWithBg.style.setProperty('--bg-lighter', lighterColor(itemBg));
   itemWithBg.style.setProperty('--bg-darker', darkerColor(itemBg));
  }
}

function addCssVariable(name, value, unit){
	currentEditLayout.style.setProperty(name, `${value}${unit}`);
}

function removeCssVariable(name){
	currentEditLayout.style.removeProperty(name);
}

function addDataAttr(dataAttrName, value){
	currentEditLayout.setAttribute(dataAttrName, value);
}

function removeDataAttr(dataAttrName){
	currentEditLayout.removeAttribute(dataAttrName);
}

function isDarkColor(color) {
  if (color === 'transparent')
    return false;

  var r, g, b;

  // Check the format of the color, HEX or RGB?
  if (color.match(/^rgb/)) {

    // If HEX --> store the red, green, blue values in separate variables
    let resultColor = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

    r = resultColor[1];
    g = resultColor[2];
    b = resultColor[3];
  } 
  else {

    // If RGB --> Convert it to HEX: http://gist.github.com/983661
    let resultColor = +("0x" + color.slice(1).replace( 
      color.length < 5 && /./g, '$&$&'
    )
             );

    r = resultColor >> 16;
    g = resultColor >> 8 & 255;
    b = resultColor & 255;
  }

  // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
  hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
  );

  // Using the HSP value, determine whether the color is light or dark
  return hsp < 127.5; // 255/2
}

function hexToHSL(hex) {
  return 'hsl(' + hslObject(hex).h + ', ' + hslObject(hex).s + '%, ' + hslObject(hex).l + '%)';
}

function hslObject(hex){
  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  let r = parseInt(result[1], 16);
  let g = parseInt(result[2], 16);
  let b = parseInt(result[3], 16);

  r /= 255, g /= 255, b /= 255;
  let max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if(max == min){
    h = s = 0; // achromatic
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  s = s*100;
  s = Math.round(s);
  l = l*100;
  l = Math.round(l);
  h = Math.round(360*h);

  let hslObject = {
    h: h,
    s: s,
    l: l
  } 

  return hslObject;
}

function lighterColor(color){
  const hsl = hslObject(color);
  let lighter_l = hsl.l;

  if (lighter_l >= 80)
    lighter_l = 100;
  else
    lighter_l += 20;

  return 'hsl(' + hsl.h + ', ' + hsl.s + '%, ' + lighter_l + '%)';
}

function darkerColor(color){
  const hsl = hslObject(color);
  let darker_l = hsl.l;

  if (darker_l >= 20)
    darker_l -= 20;
  else
    darker_l = 0;

  return 'hsl(' + hsl.h + ', ' + hsl.s + '%, ' + darker_l + '%)'; 
}


function configureteLayoutEditor(layout){
  currentEditLayout = layout;
  settingsPanel.classList.add("is-show");

  for (let settingItem of settingsPanel.querySelectorAll("[data-setting-name]")) {
    const settingName = settingItem.getAttribute("data-setting-name");
    const layotPropertyValue = getComputedStyle(currentEditLayout).getPropertyValue(settingName);

    if (settingItem.hasAttribute("data-is-toggle"))
      if (layotPropertyValue && layotPropertyValue != '')
        settingItem.checked = "checked";
      else
        settingItem.checked = false;
    else if (settingName == '--bg')
      settingItem.value = layotPropertyValue;
    else
      if (layotPropertyValue && layotPropertyValue != '')
        settingItem.value = parseInt(layotPropertyValue);
      else
        settingItem.value = 0;
  } 
}