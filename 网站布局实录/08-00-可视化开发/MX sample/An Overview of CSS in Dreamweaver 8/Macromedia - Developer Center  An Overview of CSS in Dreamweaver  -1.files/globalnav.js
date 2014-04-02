/* Copyright (c) 2003 Macromedia Inc. $Revision: 1.48 $ */
EmxGlobalnavButton = function (domElement,parentBoxCoords) {
this.domElement = domElement;
this.coords = getElementBoxCoordsById(domElement.id);
this.buttonframes = new Array(10);
for (var i=0; i < this.buttonframes.length; i++) {
var btnImage = document.createElement('img');
btnImage.setAttribute('id',domElement.id+'-buttonImg'+i);
btnImage.setAttribute('name',domElement.id+'-buttonImg');
btnImage.setAttribute('buttonID',domElement.id);
btnImage.src = '/images/globalnav/button/frame'+i+'.gif';
var xCorrection = (!window.opera && browser.ua.indexOf('mac') != -1 && browser.appN.indexOf('microsoft') != -1) ? 8 : 0;
var wCorrection = (!window.opera && browser.ua.indexOf('mac') != -1 && browser.appN.indexOf('microsoft') != -1 && domElement.id != 'searchDIV') ? 8 : 3;
btnImage.style.position = 'absolute';
btnImage.style.top = 0;
btnImage.style.left = (this.coords.x1 -1) - parentBoxCoords.x1 + xCorrection +'px';
btnImage.style.width = (this.coords.x2 - this.coords.x1) + wCorrection +'px';
btnImage.style.height = '35px';
btnImage.style.zIndex = 0;
btnImage.style.visibility = 'hidden';
this.buttonframes[i] = document.getElementById('globalnavbar').appendChild(btnImage);
if (domElement.id != 'searchDIV') {
defineEventHandler(this.buttonframes[i],'mouseout',EmxGlobalnav.navEvent,false);
defineEventHandler(this.buttonframes[i],'mouseover',EmxGlobalnav.navEvent,false);
}
}
this.image = this.buttonframes[0];
this.submenu = document.getElementById(domElement.id+'-submenu');
this.state = 'off';
this.currentframe = 0;
this.submenuState  = 'off';
return this;
}
EmxGlobalnavButton.prototype.setState = function (state,tween) {
this.state = (state) ? state : 'off';
switch (state) {
case 'over':
this.tweenButton(this.currentframe,2,200);
break;		
case 'on':
this.image.style.zIndex = 1;
this.tweenButton(this.currentframe,this.buttonframes.length-1,700);
this.setSubmenuState(this.state);
break;
case 'off':
this.image.style.zIndex = 0;
this.setSubmenuState(this.state);
this.tweenButton(this.currentframe,0,100);
break;
}
} 
EmxGlobalnavButton.prototype.tweenButton = function (start,end,duration,callback) {
var lastFrame = this.buttonframes.length - 1;
var start = (start <= lastFrame) ? start : lastFrame;
var end = (end <= lastFrame) ? end : lastFrame;
var elapsed;
var frame = start;
var interval = Math.abs(Math.floor(duration/(end-start+1)));
var tweenID;
if (((browser.ua.indexOf('mac') != -1) && (browser.appN.indexOf('microsoft') != -1)) || 
(browser.ua.indexOf('msie 5.0') != -1) || 
(browser.ua.indexOf('safari') != -1) || (browser.ua.indexOf('applewebkit') != -1)) {
EmxGlobalnavButton.tweenButtonALT(this.image.id,start,end,frame,interval);
this.currentframe = end;
} else {
tweenID = setInterval(stepFrame,interval);
}
var button = this;
function stepFrame () {
if (frame != end) {
button.buttonframes[frame].style.visibility = 'hidden';
if (start < end) {
frame++;
} else if (start > end) {
frame--;
}
button.buttonframes[frame].style.visibility = 'visible';
elapsed += interval;
button.currentframe = frame;
} else {
clearInterval(tweenID);
if (callback) callback(button);
return;
}
}
}
EmxGlobalnavButton.tweenButtonALT = function (imageID,start,end,currentframe,interval,callback) {
var frame = currentframe;
if (frame != end) {
if (start < end) {
frame++;
} else if (start > end) {
frame--;
}
document.getElementById(imageID).style.visibility = 'visible';
document.getElementById(imageID).src = '/images/globalnav/button/frame'+frame+'.gif';
setTimeout('EmxGlobalnavButton.tweenButtonALT("'+imageID+'",'+start+','+end+','+frame+','+interval+');',interval);
} else {
if (callback) callback();
return;
}
}
EmxGlobalnavButton.prototype.setSubmenuState = function (state) {
if (this.submenu != null) {
var state = (state) ? state : 'off';
switch (state) {
case 'on':
this.submenu.style.visibility = 'visible';
break;
case 'off': 
this.submenu.style.visibility = 'hidden';
break;
}
this.submenuState = state;
}
}
EmxGlobalnav = function (listElement) {
this.domElement; 				
this.buttonsListElement;
this.buttonElements;		
this.hyperlinks;				
this.searchForm;				
this.membershipElements = new Array(); 
this.buttons = new Array();
this.menuBoxCoords;			
this.submenuBoxCoords;	
this.current_button = null;
this.over_button = null;
this.focusedElement;
this.tabFocusBox; 	
this.isOverMainNav = false;
this.isOverSubmenu = false;
this.isOverUtilNav = false;
this.mouseIdleID = null;
this.mouseMoveID = null;
this.mousePosition = null;
this.makeButtons = function () {
var emxButtons = new Array();
for (var i=0; i < this.buttonElements.length; i++) {
var buttonElement = this.buttonElements[i];			
emxButtons[buttonElement.id] = new EmxGlobalnavButton(buttonElement,this.menuBoxCoords);
}
emxButtons['search'] = new EmxGlobalnavButton(document.getElementById('searchDIV'),this.menuBoxCoords);
return emxButtons;
}
this.initEventHandlers = function () {
if (document.addEventListener || document.attachEvent) {
defineEventHandler(document,'mousemove',EmxGlobalnav.navEvent,false);
defineEventHandler(document,'keyup',EmxGlobalnav.navEvent,false);
for (var i=0; i < this.buttonElements.length; i++) { 
defineEventHandler(this.buttonElements[i],'mouseout',EmxGlobalnav.navEvent,false);
defineEventHandler(this.buttonElements[i],'mouseover',EmxGlobalnav.navEvent,false);
}
for (var i=0; i < this.hyperlinks.length; i++) {
defineEventHandler(this.hyperlinks[i],'blur',EmxGlobalnav.navEvent,false);
defineEventHandler(this.hyperlinks[i],'focus',EmxGlobalnav.navEvent,false);
}
var searchButton = document.getElementById('search');
defineEventHandler(searchButton,'mouseout',EmxGlobalnav.navEvent,false);
defineEventHandler(searchButton,'mouseover',EmxGlobalnav.navEvent,false);
defineEventHandler(searchButton,'blur',EmxGlobalnav.navEvent,false);
defineEventHandler(searchButton,'focus',EmxGlobalnav.navEvent,false);
var searchInput = document.getElementById('search-input');
defineEventHandler(searchInput,'focus',EmxGlobalnav.navEvent,false);
} else {
document.onmousemove = EmxGlobalnav.navEvent;
document.onkeyup = EmxGlobalnav.navEvent;
for (var i=0; i<this.buttonElements.length; i++) { 
this.buttonElements[i].onmouseout = EmxGlobalnav.navEvent;
this.buttonElements[i].onmouseover = EmxGlobalnav.navEvent;
}
for (var i=0; i < this.hyperlinks.length; i++) {
this.hyperlinks[i].onblur = EmxGlobalnav.navEvent;
this.hyperlinks[i].onfocus = EmxGlobalnav.navEvent;
}
var searchButton = document.getElementById('search');
searchButton.onmouseout = EmxGlobalnav.navEvent;
searchButton.onmouseover = EmxGlobalnav.navEvent;
searchButton.onblur = EmxGlobalnav.navEvent;
searchButton.onfocus = EmxGlobalnav.navEvent;
var searchInput = document.getElementById('search-input');
searchInput.onfocus = EmxGlobalnav.navEvent;
}
}
this.isMouseOverButton = function () {
if (this.calcBox() != false && this.isOverMainNav != false) {
for (var i=0; i < this.buttons.length; i++) {
if ((this.mousePosition.x < this.buttons[i].coords.x2) && (this.mousePosition.x > this.buttons[i].coords.x1)) {
this.overButton(this.buttons[i]);
}
}
}
}
this.initMembership = function () {
this.membershipElements['greeting'] = document.getElementById('greeting');
this.membershipElements['screen_name'] = document.getElementById('screenName');
this.membershipElements['account_link'] = document.getElementById('account');
this.membershipElements['signin'] = document.getElementById('signin');
this.membershipElements['signout'] = document.getElementById('signout');
for (var e in this.membershipElements) if (this.membershipElements[e] == null) return;
var authLevel = 0;
authLevel = (getCookie('RMID') != null) ? 1: authLevel;
authLevel = (getCookie('AUID') != null) ? 2: authLevel; 
this.showScreenName = function () {
var name = getCookie('SCREENNAME');
if (name != null && (name != '' || name != 'undefined')) {
this.membershipElements['screen_name'].innerHTML = name;
}
}
switch (authLevel) {
case 0:
this.membershipElements['greeting'].style.display = 'list-item';
this.membershipElements['account_link'].style.display = 'none';
this.membershipElements['signin'].style.display = 'list-item';
break;
case 1:
this.showScreenName();
this.membershipElements['greeting'].style.display = 'list-item';
this.membershipElements['signin'].style.display = 'list-item';
break;
case 2:
this.showScreenName();
this.membershipElements['greeting'].style.display = 'list-item';
this.membershipElements['signout'].style.display = 'list-item';
break;
default: break;
}
}
return this;
}
EmxGlobalnav.prototype.init = function () {
if (document.getElementById('globalnav') != null) {
if (document.getElementById('globalnav-menu') != null) {
EmxGlobalnav.prototype.domElement = document.getElementById('globalnav');
EmxGlobalnav.prototype.buttonsListElement = document.getElementById('globalnav-menu');
EmxGlobalnav.prototype.menuBoxCoords = getElementBoxCoordsById('globalnav-menu');
EmxGlobalnav.prototype.submenuBoxCoords = { x1:globalnav.menuBoxCoords.x1, y1:globalnav.menuBoxCoords.y2, x2:globalnav.menuBoxCoords.x2, y2:globalnav.menuBoxCoords.y2+22 };
EmxGlobalnav.prototype.buttonElements = EmxGlobalnav.prototype.buttonsListElement.getElementsByTagName('li');
EmxGlobalnav.prototype.hyperlinks = EmxGlobalnav.prototype.domElement.getElementsByTagName('a');
EmxGlobalnav.prototype.globalmessaging = document.getElementById('globalmessaging');
EmxGlobalnav.prototype.default_submenu = null;
EmxGlobalnav.prototype.tabFocusBox = new EmxTabFocusBox('tabfocus');
EmxGlobalnav.prototype.buttons = globalnav.makeButtons();
globalnav.isMouseOverButton();
globalnav.initEventHandlers();
}
if (document.getElementById('globalnav-helpmenu') != null && 
location.hostname.indexOf('macromedia.com') != -1) {
globalnav.initMembership();
}
return true;
}
}
EmxGlobalnav.navEvent = function (e) {
var eventObj = (e) ? e : ((window.event) ? event : null);
if (eventObj) { 
var eventElement = (eventObj.target) ? eventObj.target : ((eventObj.srcElement) ? eventObj.srcElement : null);
}
if (eventElement) {
if (eventElement.nodeType == 3) eventElement = eventElement.parentNode;
switch (eventObj.type) {
case 'mousemove':
EmxGlobalnav.prototype.onmousemove(eventObj);
break;
case 'mouseover':
var button = (eventElement.buttonID) ? document.getElementById(eventElement.buttonID) : (eventElement.id) ? eventElement : eventElement.parentNode;
EmxGlobalnav.prototype.overButton(button);
break;
case 'mouseout':
var button = (eventElement.buttonID) ? document.getElementById(eventElement.buttonID) : (eventElement.id) ? eventElement : eventElement.parentNode;
if (eventObj.toElement != null) {
if (eventObj.toElement.buttonID != null && eventObj.toElement.buttonID != button.id) {
EmxGlobalnav.prototype.offButton(button);
} else if (!eventObj.toElement.buttonID && eventObj.toElement.nodeType != 3) {
EmxGlobalnav.prototype.offButton(button);
}
} else if (eventObj.relatedTarget != null && eventObj.relatedTarget.nodeType != 3) {
EmxGlobalnav.prototype.offButton(button);	
}
break;
default: break;
}
}
}
EmxGlobalnav.prototype.calcBox = function () {
this.menuBoxCoords = getElementBoxCoordsById('globalnav-menu');
this.submenuBoxCoords = { x1:this.menuBoxCoords.x1, y1:this.menuBoxCoords.y2, x2:this.menuBoxCoords.x2, y2:this.menuBoxCoords.y2+22 };
return true;
}
EmxGlobalnav.prototype.buttonsAllOff = function () {
for (btn in this.buttons) this.buttons[btn].setState('off');
this.current_button = null;
}
EmxGlobalnav.prototype.setCurrentButton = function (button) {
this.buttons[button.id].setState('on');
this.current_button = button;
for (btn in this.buttons) {
if (btn != button.id) this.buttons[btn].setState('off');
}
return;
}
EmxGlobalnav.prototype.mouseovertest = function () {
if (this.mousePosition.y < this.menuBoxCoords.y1) {
this.isOverUtilNav = true;
this.isOverMainNav = false;
this.isOverSubmenu = false;
} else {
this.isOverUtilNav = false;
this.isOverMainNav = ((this.mousePosition.y > this.menuBoxCoords.y1) && (this.mousePosition.y < this.menuBoxCoords.y2) && (this.mousePosition.x > this.menuBoxCoords.x1) && (this.mousePosition.x < this.menuBoxCoords.x2));
this.isOverSubmenu = ((this.mousePosition.y > this.submenuBoxCoords.y1) && (this.mousePosition.y < this.submenuBoxCoords.y2) && (this.mousePosition.x > this.submenuBoxCoords.x1) && (this.mousePosition.x < this.submenuBoxCoords.x2));
}
}
EmxGlobalnav.prototype.onmousemove = function (e) {
clearInterval(this.mouseMoveID);
this.mousePosition = getEventCoords(e);
this.mouseMoveID = setInterval('EmxGlobalnav.prototype.onmousestop();',100);
}
EmxGlobalnav.prototype.onmousestop = function () {
clearInterval(this.mouseMoveID);
this.tabFocusBox.hide();
this.mouseovertest();
if (this.isOverUtilNav == true) {
this.buttonsAllOff();
this.setGlobalmessageState('on');
} else if (this.isOverMainNav == true) {
if (this.over_button != null && (this.over_button != this.current_button)) {
clearInterval(this.mouseIdleID);
this.mouseIdleID = setInterval('EmxGlobalnav.prototype.onmouseidle();',600);
}
} else if (this.current_button != null) {
clearInterval(this.mouseIdleID);
this.mouseIdleID = setInterval('EmxGlobalnav.prototype.onmouseidle();',200);
}
}
EmxGlobalnav.prototype.onmouseidle = function () {
clearInterval(this.mouseIdleID);
if (this.isOverMainNav == false && this.isOverSubmenu == false) {
this.over_button = null;
this.buttonsAllOff();
this.setGlobalmessageState('on');
} else if (this.isOverMainNav == true) {
if (this.over_button != null && (this.over_button != this.current_button)) {
this.setCurrentButton(this.over_button);
}
}
}
EmxGlobalnav.prototype.setGlobalmessageState = function (state) {
if (this.globalmessaging != null) {
var state = (state) ? state : 'off';
switch (state) {
case 'on':
this.globalmessaging.style.visibility = 'visible';
break;
case 'off':
this.globalmessaging.style.visibility = 'hidden';
break;
}
this.gmaState = state;
}
}
EmxGlobalnav.prototype.offButton = function (button) {
if (button != this.current_button) {
this.over_button = null;
this.buttons[button.id].setState('off');
}
}
EmxGlobalnav.prototype.overButton = function (button) {
this.isOverMainNav = true;
if (this.current_button == null) {
this.setGlobalmessageState('off');
this.setCurrentButton(button);
} else if (button != this.current_button) {
this.over_button = button;
this.buttons[button.id].setState('over');
}
}
EmxGlobalnav.prototype.tabFocus = function (element) {
if (element) {
var elementBoxCoords = getElementBoxCoords(element);
if (element.id == 'search-input') {
this.buttonsAllOff();
this.tabFocusBox.display(elementBoxCoords,'#63df52');
} else if (element.id && this.buttons[element.id] != null) {
this.setGlobalmessageState('off');
this.setCurrentButton(element);
elementBoxCoords.y2 -= 3;
this.tabFocusBox.display(elementBoxCoords);
} else {
this.tabFocusBox.display(elementBoxCoords);
}
}
return;
}
EmxGlobalnav.prototype.tabBlur = function (element) {
this.tabFocusBox.hide();
if (this.buttons[element.id] != null && 
this.buttons[element.id].submenu == null) {
this.buttonsAllOff();
}
}
EmxTabFocusBox = function (idstring) {
this.domElement = document.createElement('div');
this.domElement.setAttribute('id',idstring);
this.domElement.setAttribute('name',idstring);
this.domElement.style.position = 'absolute';
this.domElement.style.top = 0;
this.domElement.style.left = 0;
this.domElement.style.padding = 0;
this.domElement.style.border = '3px solid';
this.domElement.style.margin = 0;
this.domElement.style.width = 100+'px';
this.domElement.style.height = 35+'px';
this.domElement.zIndex = 9900;
this.domElement.style.visibility = 'hidden';
this.domElement = document.getElementsByTagName('body')[0].appendChild(this.domElement);
return this;
}
EmxTabFocusBox.prototype.hide = function () {
this.domElement.style.visibility = 'hidden';
}
EmxTabFocusBox.prototype.display = function (coordsObj,hexStr) {
if (coordsObj && coordsObj.constructor == BoxCoords) {
var parentBoxCoords = getElementBoxCoordsById('globalnav');
var bxc = ((browser.ua.indexOf('msie') != -1) && browser.plt.indexOf('mac') == -1) ? 6 : 0;
this.domElement.style.width = (coordsObj.x2 - coordsObj.x1) + bxc +'px';
this.domElement.style.height = (coordsObj.y2 - coordsObj.y1) - 2 + bxc +'px';
this.domElement.style.top = coordsObj.y1 - 2 +'px';
this.domElement.style.left = coordsObj.x1 - 4 +'px';
var color = (hexStr) ? hexStr : 'yellow';
this.domElement.style.borderColor = color;
this.domElement.style.visibility = 'visible';
}
}
var browser = new BrowserDescription();
var globalnav = new EmxGlobalnav();
if ((!window.opera && browser.ua.indexOf('netscape6') == -1) || 
(window.opera && browser.appV >= 7)) { 
registerOnLoadFunc(globalnav.init);
}
