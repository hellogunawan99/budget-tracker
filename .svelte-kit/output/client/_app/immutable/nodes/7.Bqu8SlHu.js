import"../chunks/DsnmJJEf.js";import{i as P}from"../chunks/gzsJLoAv.js";import{c as A,f as b,a as r,k as B,o,q as E,$ as M,z as s,v as n,y as w,x as c}from"../chunks/EyY2Qe4w.js";import{h as R}from"../chunks/BpIlfRRV.js";import{C as $}from"../chunks/BZuN3xt8.js";import{B as k}from"../chunks/DM_qtgBz.js";import{I as V,s as L}from"../chunks/wEJ3cds_.js";import{l as O,s as U}from"../chunks/DCLTBedR.js";import{T as F}from"../chunks/7FXa3mcv.js";function I(u,v){const m=O(v,["children","$$slots","$$events","$$legacy"]);/**
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
 */const x=[["path",{d:"M12 15V3"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"}],["path",{d:"m7 10 5 5 5-5"}]];V(u,U({name:"download"},()=>m,{get iconNode(){return x},children:(i,p)=>{var d=A(),y=b(d);L(y,v,"default",{}),r(i,d)},$$slots:{default:!0}}))}var j=o("<!> Export to CSV",1),q=o("<!> Clear All Data",1),z=o('<div class="space-y-4"><div><h4 class="font-medium text-gray-900 mb-2">Export Data</h4> <p class="text-sm text-gray-600 mb-4">Download your budget and expense data as a CSV file.</p> <!></div> <hr class="border-gray-200"/> <div><h4 class="font-medium text-gray-900 mb-2">Clear All Data</h4> <p class="text-sm text-gray-600 mb-4">Remove all your budget and expense data. This action cannot be undone.</p> <!></div></div>'),N=o('<div class="space-y-4"><div><h4 class="font-medium text-gray-900">Version</h4> <p class="text-sm text-gray-600">Budget Tracker v1.0.0</p></div> <div><h4 class="font-medium text-gray-900">Features</h4> <ul class="text-sm text-gray-600 space-y-1"><li>• Monthly budget planning</li> <li>• Daily expense tracking</li> <li>• Visual analytics and charts</li> <li>• Savings goal tracking</li> <li>• Data export capabilities</li></ul></div> <div><h4 class="font-medium text-gray-900">Support</h4> <p class="text-sm text-gray-600">For help or questions, please refer to the user guide or contact support.</p></div></div>'),G=o('<div class="grid grid-cols-2 md:grid-cols-4 gap-4"><div class="text-center p-4 bg-gray-50 rounded-lg"><div class="text-2xl font-bold text-gray-900">1</div> <div class="text-sm text-gray-600">Active Budgets</div></div> <div class="text-center p-4 bg-gray-50 rounded-lg"><div class="text-2xl font-bold text-gray-900">12</div> <div class="text-sm text-gray-600">Categories</div></div> <div class="text-center p-4 bg-gray-50 rounded-lg"><div class="text-2xl font-bold text-gray-900">0</div> <div class="text-sm text-gray-600">Expenses</div></div> <div class="text-center p-4 bg-gray-50 rounded-lg"><div class="text-2xl font-bold text-gray-900">0</div> <div class="text-sm text-gray-600">Savings Goals</div></div></div>'),H=o('<div class="space-y-6"><div><h1 class="text-2xl font-bold text-gray-900">Settings</h1> <p class="text-gray-500 mt-1">Manage your budget tracker preferences and data</p></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><!> <!></div> <!></div>');function et(u,v){B(v,!1);async function m(){try{const g=await(await fetch("/api/export/csv")).blob(),t=window.URL.createObjectURL(g),e=document.createElement("a");e.href=t,e.download=`budget-tracker-export-${new Date().toISOString().split("T")[0]}.csv`,document.body.appendChild(e),e.click(),window.URL.revokeObjectURL(t),document.body.removeChild(e)}catch(a){console.error("Export failed:",a),alert("Failed to export data. Please try again.")}}function x(){confirm("Are you sure you want to clear all your data? This action cannot be undone.")&&alert("Data clearing functionality would be implemented here.")}P();var i=H();R(a=>{M.title="Settings - Budget Tracker"});var p=s(n(i),2),d=n(p);$(d,{title:"Data Management",subtitle:"Export or manage your financial data",children:(a,g)=>{var t=z(),e=n(t),S=s(n(e),4);k(S,{$$events:{click:m},children:(f,T)=>{var l=j(),h=b(l);I(h,{class:"w-4 h-4 mr-2"}),w(),r(f,l)},$$slots:{default:!0}}),c(e);var _=s(e,4),C=s(n(_),4);k(C,{variant:"danger",$$events:{click:x},children:(f,T)=>{var l=q(),h=b(l);F(h,{class:"w-4 h-4 mr-2"}),w(),r(f,l)},$$slots:{default:!0}}),c(_),c(t),r(a,t)},$$slots:{default:!0}});var y=s(d,2);$(y,{title:"About Budget Tracker",subtitle:"Application information and help",children:(a,g)=>{var t=N();r(a,t)},$$slots:{default:!0}}),c(p);var D=s(p,2);$(D,{title:"Quick Stats",subtitle:"Overview of your data",children:(a,g)=>{var t=G();r(a,t)},$$slots:{default:!0}}),c(i),r(u,i),E()}export{et as component};
