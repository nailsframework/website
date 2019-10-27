!function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const directiveDefinitions_1=__webpack_require__(5),ActiveElement_1=__webpack_require__(1);class RenderingEngine{constructor(e){null==e&&console.log("Engine was initialized without a state"),this.state=e,this.directives=new directiveDefinitions_1.NailsDirectives}indexDOM(){if(void 0!==this.state.element){var e=null;if(this.state.element.startsWith("#")){var t=this.state.element.substr(1);e=document.getElementById(t)}else e=document.getElementsByTagName(this.state.element);if(null==e)return void console.error("No element with selector: "+this.state.element+" has been found");if(e instanceof HTMLCollection&&e.length>1)return void console.error("Multiple choices, try using id if the element tag is not unique. Your Selector was: "+this.state.element);if(e instanceof HTMLCollection&&0===e.length)return void console.error("No element with selector: "+this.state.element+" has been found");e instanceof HTMLCollection&&(e=e[0]);var n=this.indexElement(e);for(var i of n)this.executeDirectivesOnElement(i,!0);this.executeInerpolationsOnElement(e)}}insert(e,t,n){return e>0?n.substring(0,e)+t+n.substring(e,n.length):t+n}setTitle(){void 0===this.state.data.title&&null!==this.state.data.title||(document.title=this.state.data.title)}elementCanGetAttribute(e){return"getAttribute"in e}isNForActivated(e){return!!this.elementCanGetAttribute(e)&&null!==e.getAttribute("n-for")}disableInterpolationForVariableNameOnElement(e,t){if(void 0===e||void 0===t)return;for(var n of this.state.disabledElements)if(n.content==e&&n.element==t)return;let i=new ActiveElement_1.ActiveElement(t,null,"",e,"","");this.state.disabledElements.push(i)}getElementDerrivedObject(e){return"object"}getElementDerrivedProperty(e){return"property"}getForArrayByStatement(e){let t=e.split(" ");return t[t.length]}isForAttribute(e){let t=e.element;return"getAttribute"in t&&null!==t.getAttribute("n-for")}isActiveElement(e){return this.getElementDirectives(e).length>0}removePrefix(e){return e.substring(2)}prefixDiretive(e){return"n-"+e}getElementDirectives(e){if(void 0===e)return[];var t=[];for(var n of this.directives.directives)n=this.prefixDiretive(n),"hasAttribute"in e&&e.hasAttribute(n)&&t.push(n);return t}indexElement(e){this.state.disableElementIfNeeded(e);let t=[];for(var n of e.childNodes){var i=this.indexElement(n);t.push.apply(t,i)}return this.isActiveElement(e)&&t.push(e),t}getElementAttributeForDirective(e,t){return t=this.prefixDiretive(t),e.hasAttribute(t)?e.getAttribute(t):(console.warn("directive: "+t+" not found on element: "+e),"")}executeDirectivesOnElement(element,add){var directives=this.getElementDirectives(element);for(let directive of directives)if(directive=this.removePrefix(directive),directive in this.directives){eval("this.directives."+directive+"(element, this.getElementAttributeForDirective(element, directive), this.state");let nDirectives=this.getElementDirectives(element);if(add)for(var dir of nDirectives)this.state.addActiveDirectiveElement(dir,element.getAttribute(dir),element)}else console.warn("not found directive: "+directive)}stripAndTrimNForInterpolation(e){return e=(e=(e=e.replace("[[[","")).replace("]]]","")).trim()}getNForInterpolations(e){var t=(e=e.trim()).match(/\[\[\[(( +)?\w+.?\w+( +)?)\]\]\]/g);if(null!==t)for(let e of t)(void 0).push(e)}getNForInterpolation(e){return(e=e.trim()).match(/\[\[\[(( +)?\w+.?\w+( +)?)\]\]\]/g)?e=this.stripAndTrimNForInterpolation(e):(console.warn("Not found interpolation in submitted value: "+e),e)}getValueOfInterpolation(interpolation){if(interpolation=interpolation.trim(),!interpolation.match(/{{(.?\s?\w?.?\w\s?)+}}/g))return console.warn("Not found interpolation in submitted value: "+interpolation),interpolation;interpolation=this.stripAndTrimInterpolation(interpolation),interpolation=interpolation.trim();var stripped=this.stripAndTrimInterpolation(interpolation),args=stripped.split(".");for(var arg of(stripped="",args))stripped+=arg+".";return stripped=stripped.substring(0,stripped.length-1),void 0===this.state.data[stripped.split(".")[0]]?"undefined":eval("this.state.data."+stripped)}removeWhiteSpaceFromString(e){return e.replace(/\s/g,"")}stripAndTrimInterpolation(e){return void 0===e||null===typeof e?e:e=(e=(e=e.replace("{{","")).replace("}}","")).trim()}getInterpolationsForTextContent(e){var t=[];if(null==e)return t;var n=e.match(/{{(.?\s?\w?.?\w\s?)+}}/g);if(null===n)return[];for(var i of n)t.push(i);return t}getObjectReferenceByInterpolationName(e){return e=this.stripAndTrimInterpolation(e),this.state.data[e]}interpolateOnTextWithState(e,t){}getContentOfNodeIfTextNodeExists(e){if(3===e.nodeType)return e.nodeValue;if(0===e.childNodes.length)return null;if(this.nodeHasTextNodeAsADirectChild(e))for(var t of e.childNodes)if(null!==this.getContentOfNodeIfTextNodeExists(t))return this.getContentOfNodeIfTextNodeExists(t)}setContentOfTextNode(e,t){return 3!==e.nodeType?(console.error("setContentOfTextNode... this implies that you *HAVE* to provide nothing else than a textNode as argument."),!1):(e.nodeValue=t,!0)}updateInterpolatedElement(e,t){this.executeDirectivesOnElement(e,!1),console.log(t);var n=this.getInterpolationsForTextContent(t);if(console.log(n),0!==n.length){var i=t;for(var r of n){var s=this.getValueOfInterpolation(r);this.isElementDisabled(this.stripAndTrimInterpolation(r),e)||(i=i.replace(r,s))}console.log("updating: "+i),e.textContent=i}}isDescendant(e,t){for(var n=t.parentNode;null!=n;){if(n==e)return!0;n=n.parentNode}return!1}isElementDisabled(e,t){for(var n of this.state.disabledElements){if((this.isDescendant(t,n.element)||this.isDescendant(n.element,t))&&e.includes(n.content))return!0;if(n.content===e&&n.element===t)return!0}return!1}interpolateElement(e,t){for(var n of t){this.state.disableElementIfNeeded(e);var i=this.getValueOfInterpolation(n);if(this.isElementDisabled(this.stripAndTrimInterpolation(n).trim(),e))continue;let t=e.textContent||e.textContent;t=t.replace(n,i),"textContent"in e&&(e.textContent=t)}return e}nodeHasTextNodeAsAChild(e){return 3===e.nodeType||0!==e.childNodes.length&&this.nodeHasTextNodeAsAChild(e)}nodeHasTextNodeAsADirectChild(e){for(var t of e.childNodes)if(3===t.nodeType)return!0;return!1}isTextNode(e){return 3===e.nodeType}sanitize(e){if("string"!=typeof e)return e;var t=document.createElement("div");return t.textContent=e,t.innerHTML}executeInerpolationsOnElement(e){for(var t of e.childNodes)this.executeInerpolationsOnElement(t);var n=this.getInterpolationsForTextContent(e.nodeValue);if(this.isTextNode(e)){if(0===n.length)return;if(3!==e.nodeType)return;for(let t of n)this.state.addActiveElement(e,this.getObjectReferenceByInterpolationName(t),e.nodeValue,t);this.interpolateElement(e,n)}else{if(!this.isNForActivated(e))return;let t=e,n="{{"+t.getAttribute("n-for").split(" ")[3]+"}}";this.state.addActiveElement(t,t.getAttribute("n-for").split(" ")[3],null,n)}}}exports.RenderingEngine=RenderingEngine},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.ActiveElement=class{constructor(e,t,n,i,r,s){this.element=e,this.reference=t,this.content=n,this.key=r,this.statement=s,this.interpolation=i}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=n(6);t.ComponentEngine=class{constructor(e,t,n,i){this.state=e,this.engine=t,this.instance=this,this.nails=n,this.routings=i}getInstance(){return this.instance}injectComponents(){if(!Array.isArray(this.state.mountedComponents)){this.state.mountedComponents=[];for(let e of this.state.components){let t=new e(this.state);t instanceof i.Router&&(this.state.router=t,t.addRoutings(this.routings),t.navigate("")),this.state.mountedComponents.push(t)}}}traverseElementAndExecuteDirectives(e){if(e){if(e.childNodes.length>0)for(let t of e.childNodes)this.traverseElementAndExecuteDirectives(t);console.log("TRAV:"+e),this.engine.executeDirectivesOnElement(e,!0)}}renderComponents(){if(this.injectComponents(),void 0!==this.state.mountedComponents&&null!==this.state.mountedComponents&&this.state.mountedComponents.length>0)for(let r=0;r<300;r++){let r,s=document.body.innerHTML;for(var e of this.state.mountedComponents){var t=document.getElementsByTagName(e.selector);if(0!==t.length){for(var n of t)if(!(n.childNodes.length>0)){var i=e.render();i.includes("<"+e.selector+">")||(n.innerHTML=i,this.traverseElementAndExecuteDirectives(n),this.engine.executeInerpolationsOnElement(n))}r=document.body.innerHTML}}if(s==r)break}}recreateComponentsByName(e){if(void 0!==this.state.mountedComponents&&null!==this.state.mountedComponents){var t=null;for(var n of this.state.mountedComponents)n.selector===e&&(t=n);if(null===t)return;if(null===this.state.mountedComponents[e])return;var i=document.getElementsByTagName(e);for(var r of i){var s=t.render();s.includes("<"+t.selector+">")?console.error("component "+t.selector+" has a recursion with no exit condition"):(r.innerHTML=s,this.renderComponents())}}}recreateAllComponents(){this.renderComponents()}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=n(4),r=n(0),s=n(2),o=n(7);class a{create(e){return new e}}t.Nails=class{constructor(e){void 0!==e.methods.onInit&&e.methods.onInit(),this.state=new i.State,e.hasOwnProperty("el")?this.state.element=e.el:console.error("NailsJS cannot be initalized, because no element was specified"),e.hasOwnProperty("data")&&(this.state.data=e.data),e.hasOwnProperty("methods")&&(this.state.methods=e.methods),void 0===e.components?this.state.components=[]:Array.isArray(e.components)?this.state.components=e.components:this.state.components=[],this.engine=new r.RenderingEngine(this.state),this.componentEngine=new s.ComponentEngine(this.state,this.engine,this,e.routings),this.setUpProxy(),this.injector=new o.Injector(this.state),this.prepareInjector(e.declarations),this.state.addInjector(this.injector),this.componentEngine.renderComponents(),this.engine.indexDOM(),this.engine.setTitle(),this.state.methods.getState=function(){return this.state},void 0!==this.state.methods.onMounted&&this.state.methods.onMounted(this.state)}prepareInjector(e){let t=new a;if(Array.isArray(e))for(let n of e){let e=t.create(n);this.injector.insert(e)}else console.warn("Cannot iterate over declarations, since they are not an array")}notifyDOM(e,t,n){var i=this.state.findElementsByObject(e,t);if(i!==[]&&0!==i.length){for(var r of i)this.engine.updateInterpolatedElement(r.element,r.content),this.engine.executeDirectivesOnElement(r.element,!1);return!0}}setUpProxy(){var e={state:this.state,notifyDom:this.notifyDOM,engine:this.engine,get:function(e,t,n){return e[t]},set(e,t,n){return e[t]=n,this.notifyDom(e,t,""),!0}},t=new Proxy(this.state.data,e);this.state.data=t}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const i=n(0),r=n(2),s=n(1);class o{constructor(){this.data={},this.activeElements=[],this.activeDirectiveElements=[],this.engine=new i.RenderingEngine(this),this.disabledElements=[],this.componentEngine=new r.ComponentEngine(this,this.engine,null,[])}getInstance(){return null===this.instance&&(this.instance=new o),this.instance}addInjector(e){this.injector=e}addActiveDirectiveElement(e,t,n){for(var i of this.activeDirectiveElements)if(i.key===e&&i.statement===t&&i.element===n)return void console.warn("refusing to insert element");let r=new s.ActiveElement(n,"","","",e,t);this.activeDirectiveElements.push(r)}updateElementRefByObject(e,t){for(var n of this.activeElements)n.element===t&&(n.reference=e)}addActiveElement(e,t,n,i){let r=new s.ActiveElement(e,t,n,i,"","");this.activeElements.push(r)}findElementByRef(e){for(var t of this.activeElements)if(t.reference===e)return t}getHtmlReferenceOfStateElement(e){return e.reference}stripAndTrimInterpolation(e){return"string"!=typeof e?e:e=(e=(e=e.replace("{{","")).replace("}}","")).trim()}disableElementIfNeeded(e){if("getAttribute"in e){var t=e.getAttribute("n-for");if(null===t)return;var n=t.split(" ")[1];this.engine.disableInterpolationForVariableNameOnElement(n,e)}}findElementsByObject(e,t){var n=[];for(var i of this.activeElements)this.stripAndTrimInterpolation(i.interpolation)===t&&n.push(i);for(let i of this.activeDirectiveElements)if(t=t.replace("!",""),i.statement=i.statement.replace("!",""),this.stripAndTrimInterpolation(i.statement)===t){let t=new s.ActiveElement(i.element,e,i.element.innerText,"","","");n.push(t)}return n}}t.State=o},function(module,exports,__webpack_require__){"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const engine_1=__webpack_require__(0);class NailsDirectives{constructor(){this.directives=["if","form","for","test"]}form(e,t,n){"text"===e.getAttribute("type")&&n.data[t]!==e.innerText&&(n.data[t]=e.innerText),e.addEventListener("input",(function(){n.data[t]!==e.innerText&&(n.data[t]=e.innerText)}))}for(element,statemenet,state){console.log("n-for called"),console.log(state);var engine=new engine_1.RenderingEngine(state);function interpolateCustomElement(element,object,descriptor){var html=element.innerHTML,interpolations=engine.getInterpolationsForTextContent(html);for(var interpolation of interpolations){var stripped=engine.stripAndTrimInterpolation(interpolation),args=stripped.split(".");for(var arg of(args[0]="",stripped="",args))stripped+=arg+".";stripped=stripped.substring(0,stripped.length-1),"undefined"!==engine.getValueOfInterpolation(interpolation)?html=html.replace(interpolation,engine.getValueOfInterpolation(interpolation)):(console.log("interpolation inside"),html=html.replace(interpolation,engine.sanitize(eval("object"+stripped))))}element.innerHTML=html}element.style.display="none";var descriptor=statemenet.split(" ")[1],arr=statemenet.split(" ")[3],refArray=eval("state.data."+arr);if(null!=refArray){var parent=element.parentNode;for(var i of(parent.childNodes.length>5&&(console.log("State change?"),console.log(parent.childNodes.length)),refArray)){var child=document.createElement(element.nodeName);child.innerHTML=element.innerHTML,interpolateCustomElement(child,i,descriptor),parent.appendChild(child);for(let e of element.attributes)"n-for"!==e.name&&"style"!==e.name&&child.setAttribute(e.name,e.value);engine.executeDirectivesOnElement(child,!0)}}}if(element,statement,state){var reversed=!1;"!"===statement[0]&&(statement=statement.substring(1),reversed=!0),state.data.hasOwnProperty(statement)?reversed?eval(state.data[statement])?element.style.display="none":element.style.display="block":eval(state.data[statement])?element.style.display="block":element.style.display="none":console.warn("statement: "+statement+" not found in context")}}exports.NailsDirectives=NailsDirectives},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Router=class{constructor(e){this.state=e;var t=this;this.selector="yield",this.hashRoute=window.location.hash.replace("#/",""),this.engine=e.componentEngine,window.onhashchange=function(){void 0!==t.engine&&void 0!==t.engine&&(t.hashRoute=window.location.hash.replace("#/",""),t.engine.recreateComponentsByName("yield"))}}isFunction(e){return e&&"[object Function]"==={}.toString.call(e)}addRoutings(e){this.routings=e}getComponent(){if(void 0===this.routings)return"div";for(var e of this.routings){if(e.route===this.hashRoute)return this.isFunction(e.guard)?e.guard(this)?new e.component(this.state).selector:"div":new e.component(this.state).selector}}navigate(e){window.location.hash="/"+e.replace("/","")}render(){return`\n            <${this.getComponent()}></${this.getComponent()}>\n        `}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.Injector=class{constructor(e){this.state=e,this.bootstrap()}bootstrap(){this.state.injectors=[]}insert(e){console.log(this.state.injectors);for(let t of this.state.injectors)if(t instanceof e)return;this.state.injectors.push(e)}resolve(e){for(var t of(console.log(this.state.injectors),this.state.injectors))if(t instanceof e)return t}}}]);