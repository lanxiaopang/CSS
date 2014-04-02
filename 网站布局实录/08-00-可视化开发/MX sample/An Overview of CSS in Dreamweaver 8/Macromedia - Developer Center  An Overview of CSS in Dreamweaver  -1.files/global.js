/* ===================================================
	Copyright (c) 2003-2005 Macromedia Inc.
	global JavaScript functions 
	$Revision: 1.34 $
==================================================== */
if (window.parent == self)
{
window.name = "MacromediaWindow";
window.focus();
}
var crosslinkWindow;
function openCrosslinkWindow ( url )
{
if (window.opener != null && !window.opener.closed) {
window.opener.location = url;
window.opener.focus();
} else if (typeof crosslinkWindow != "undefined" && crosslinkWindow != null && !crosslinkWindow.closed) {
crosslinkWindow.location = url;
crosslinkWindow.focus();
} else {
crosslinkWindow = window.open(url, "AdobeWindow");
crosslinkWindow.focus();
}
}
var mmWindow;
function openMMWindow ( url )
{
if (window.opener != null && !window.opener.closed) {
window.opener.location = url;
window.opener.focus();
} else if (typeof mmWindow != "undefined" && mmWindow != null && !mmWindow.closed) {
mmWindow.location = url;
mmWindow.focus();
} else {
mmWindow = window.open(url, "mm_window");
mmWindow.focus();
}
}
PNG = function (id,src,altsrc) {
var png = document.createElement('img');
png.setAttribute('id',id);
if (browser.ua.indexOf('msie 5.0') != -1) {
if (altsrc != null) png.src = altsrc;
else return;
} else if ((browser.appN.indexOf('microsoft') != -1) && (browser.ua.indexOf('mac') == -1)) {
png.src = '/images/alpha/blank.gif';
png.runtimeStyle.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='"+src+"',sizingMethod='scale');";
} else {
png.src = src;
}
return png;
}
function removeElementFromDOM (id) {
var element = document.getElementById(id);
return element.parentNode.removeChild(element);
}
var cookies;
function parseCookies() {
var cookiesHash = new Object();
var cookiesArray = document.cookie.split(';');
for (i=0; i < cookiesArray.length; i++) {
cookie = cookiesArray[i];
cookie = cookie.split('=');
cookiesHash[cookie[0]] = cookie[1];
}
return cookiesHash;
}
function getCookie (name) {
var value = null;
if (name != null) {
name = name.toUpperCase();
cookies = (cookies) ? cookies : parseCookies();
for (key in cookies) {
if (key.toUpperCase().match(name)) {
value = decodeURI(cookies[key]);
if (value.indexOf('%') != -1) value = unescape(value);
break;
}
}
}
return value;
}
function cookiesToString () { 
cookies = (cookies) ? cookies : parseCookies();
var fvString = new String();
if (arguments.length != 0) {
for (var i=0; i < arguments.length; i++) {
cookieName = arguments[i];
fvString += cookieName +'='+ getCookie(cookieName) +';';
}
} else {
for (cookie in cookies) {
fvString += cookie +'='+ cookies[cookie] +';';
}
}
return fvString;
}
function setCookie (name,value,msec,path,domain,secure) {
if (name != null) {
var now = new Date();
var exp_date = new Date(now.getTime()+(msec?msec:0));
var cookie = name+'='+escape(value)+';';
if (msec) cookie += 'expires='+exp_date.toUTCString()+';';
if (path) cookie += 'path='+path+';';
if (domain) cookie += 'domain='+domain+';';
if (secure) cookie += 'secure;';
document.cookie = cookie;
}
}
Dimensions = function (w,h) { 
this.width = w || 0;
this.height = h || 0;
return this;
}
XYCoords = function (x,y) { 
this.x = x || 0;
this.y = y || 0;	
return this;
}
BoxCoords = function (x1,y1,x2,y2) {
this.x1 = x1 || 0;
this.y1 = y1 || 0;
this.x2 = x2 || 0;
this.y2 = y2 || 0;
return this;
}
function getEventCoords (e) {
var coords = new XYCoords();
if (e.pageX && e.pageY) {
coords.x = e.pageX;
coords.y = e.pageY;
} else if (e.clientX && e.clientY) {
coords.x = e.clientX + document.body.scrollLeft;
coords.y = e.clientY + document.body.scrollTop;
}
return coords;
}
function getElementBoxCoords(domElement) {
this.element = domElement;
this.calculated_offset;
this.calcOffsetFrom = function (element,from,reset) {
if (reset != false) this.calculated_offset = 0;
if (element != null)	{
switch (from) {
case 'top': 
this.calculated_offset += element.offsetTop;
break;
case 'left': 
this.calculated_offset += element.offsetLeft;
break;
}
if ((element.offsetParent == document.body) || (element.offsetParent.tagName == ('HTML'||'BODY'))) {				
return this.calculated_offset;
} else {
return this.calcOffsetFrom(element.offsetParent,from,false);
}
}
}
this.w = this.element.offsetWidth;
this.h = this.element.offsetHeight;
var coords = new BoxCoords();
coords.x1 = this.calcOffsetFrom(this.element,'left',true);
coords.y1 = this.calcOffsetFrom(this.element,'top',true);
coords.x2 = coords.x1 + this.w;
coords.y2 = coords.y1 + this.h;
return coords;
}
function getElementBoxCoordsById(elementID) {
var element = document.getElementById(elementID);
if (element != null) {
return getElementBoxCoords(element);
}
}
function getWindowDimensions () {
var width = (window.innerWidth) ? window.innerWidth : document.body.clientWidth;
var height = (window.innerHeight) ? window.innerHeight : document.body.clientHeight;
return new Dimensions(width,height);
}
function getContentDimensions () {
var width = Math.max(document.body.offsetWidth,document.body.scrollWidth);
var height = Math.max(document.body.offsetHeight,document.body.scrollHeight);
return new Dimensions(width,height);
}
function getScrollPosition () {
var scrollPosition = new XYCoords();
if (window.scrollX && window.scrollY) {
scrollPosition.x = window.scrollX;
scrollPosition.y = window.scrollY;
} else {
var docBody = document.body;
var parent_scrollLeft = (docBody.parentNode.scrollLeft) ? docBody.parentNode.scrollLeft : 0;
var parent_scrollTop = (docBody.parentNode.scrollTop) ? docBody.parentNode.scrollTop : 0;
scrollPosition.x = Math.max(docBody.scrollLeft,parent_scrollLeft);
scrollPosition.y = Math.max(docBody.scrollTop,parent_scrollTop);
}
return scrollPosition;
}
function defineEventHandler (element,eventName,handler,capture) {
try {
if (document.addEventListener) {
element.addEventListener(eventName,handler,capture);
} else if (document.attachEvent) {
eventName = 'on'+eventName;
element.attachEvent(eventName,handler);
}
} catch (ex) {
return;
}
}
function removeEventHandler (element,eventName,handler,capture) {
try {
if (document.removeEventListener) {
element.removeEventListener(eventName,handler,capture);
} else if (document.detachEvent) {
element.detachEvent('on'+eventName,handler);
}	
} catch (ex) {
return;
}
}
var onload_queue = new Array();
function execute_onload () {
for (var i=0; i < onload_queue.length; i++) {
onload_queue[i]();
}
}
function registerOnLoadFunc () {
for (var i=0; i < arguments.length; i++) {
if (typeof arguments[i] == 'function') onload_queue[onload_queue.length] = arguments[i];
}
if (document.addEventListener || document.attachEvent) {
var domElement = (window.opera) ? document : window;
removeEventHandler(domElement,'load',execute_onload,false);
defineEventHandler(domElement,'load',execute_onload,false);
} else {
onload = execute_onload;
}
}
var unload_queue = new Array();
function execute_unload () {
for (var i=0; i < unload_queue.length; i++) {
unload_queue[i]();
}
}
function registerUnLoadFunc () {
for (var i=0; i < arguments.length; i++) {
if (typeof arguments[i] == 'function') unload_queue[unload_queue.length] = arguments[i];
}
if (document.addEventListener || document.attachEvent) {
var domElement = (window.opera) ? document : window;
defineEventHandler(domElement,'unload',execute_unload,false);
} else {
onunload = execute_unload;
}
}
BrowserDescription = function () {
this.appN = navigator.appName.toLowerCase();
this.appV = parseInt(navigator.appVersion);
this.ua = navigator.userAgent.toLowerCase();
this.plt = navigator.platform.toLowerCase();
if (this.ua.indexOf('opera/7') != -1 || this.ua.indexOf('opera 7') != -1) {
this.appV = 7;
}
return this;
}
var browser = new BrowserDescription();
