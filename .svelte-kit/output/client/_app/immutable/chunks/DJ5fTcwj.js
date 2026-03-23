import{B as g,aH as _,aI as d,u as m,S as $,aJ as w,p as b,a as S,w as M,d as y,c as N,f as I,b as T,F as A}from"./DXx4DmIk.js";import{c as E,l as J}from"./Bwa-IWym.js";import"./BzXQD9-t.js";import{I as O,s as x}from"./Dc5opQSA.js";import{l as B,s as C}from"./Dfzk-0oT.js";var F="font-weight: bold",L="font-weight: normal";function u(t){console.warn(`%c[svelte] state_snapshot_uncloneable
%c${t?`The following properties cannot be cloned with \`$state.snapshot\` — the return value contains the originals:

${t}`:"Value cannot be cloned with `$state.snapshot` — the original value was returned"}
https://svelte.dev/e/state_snapshot_uncloneable`,F,L)}const j=[];function z(t,n=!1,o=!1){if(!n){const e=[],s=f(t,new Map,"",e,null,o);if(e.length===1&&e[0]==="")u();else if(e.length>0){const c=e.length>10?e.slice(0,7):e.slice(0,10),a=e.length-c.length;let r=c.map(i=>`- <value>${i}`).join(`
`);a>0&&(r+=`
- ...and ${a} more`),u(r)}return s}return f(t,new Map,"",j,null,o)}function f(t,n,o,e,s=null,c=!1){if(typeof t=="object"&&t!==null){var a=n.get(t);if(a!==void 0)return a;if(t instanceof Map)return new Map(t);if(t instanceof Set)return new Set(t);if(g(t)){var r=Array(t.length);n.set(t,r),s!==null&&n.set(s,r);for(var i=0;i<t.length;i+=1){var h=t[i];i in t&&(r[i]=f(h,n,`${o}[${i}]`,e,null,c))}return r}if(_(t)===d){r={},n.set(t,r),s!==null&&n.set(s,r);for(var p in t)r[p]=f(t[p],n,`${o}.${p}`,e,null,c);return r}if(t instanceof Date)return structuredClone(t);if(typeof t.toJSON=="function"&&!c)return f(t.toJSON(),n,`${o}.toJSON()`,e,t)}if(t instanceof EventTarget)return t;try{return structuredClone(t)}catch{return e.push(o),t}}function q(t,...n){return m(()=>{try{let o=!1;const e=[];for(const s of n)s&&typeof s=="object"&&$ in s?(e.push(z(s,!0)),o=!0):e.push(s);o&&(w(t),console.log("%c[snapshot]","color: grey",...e))}catch{}}),n}l[A]="node_modules/lucide-svelte/dist/icons/settings.svelte";function l(t,n){E(new.target);const o=B(n,["children","$$slots","$$events","$$legacy"]);b(n,!1,l);/**
 * @license lucide-svelte v0.541.0 - ISC
 *
 * ISC License
 *
 * Copyright (c) for portions of Lucide are held by Cole Bemis 2013-2023 as part of Feather (MIT). All other copyright (c) for Lucide are held by Lucide Contributors 2025.
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * ---
 *
 * The MIT License (MIT) (for portions derived from Feather)
 *
 * Copyright (c) 2013-2023 Cole Bemis
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */const e=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"}],["circle",{cx:"12",cy:"12",r:"3"}]];return S(()=>O(t,C({name:"settings"},()=>o,{get iconNode(){return e},children:M(l,(s,c)=>{var a=N(),r=I(a);x(r,n,"default",{},null),T(s,a)}),$$slots:{default:!0}})),"component",l,60,0,{componentTag:"Icon"}),y({...J()})}export{l as S,q as l};
