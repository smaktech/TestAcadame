(this["webpackJsonp@minimal/minimal-kit-react"]=this["webpackJsonp@minimal/minimal-kit-react"]||[]).push([[106],{1819:function(e,t,r){"use strict";r.d(t,"a",(function(){return u}));var a=r(4),n=r(25),c=r(136),i=r(27),s=r(407),j=r(1824),o=r(269),l=r(1681),b=r(0),x=["links","activeLast"];function u(e){var t,r=e.links,i=e.activeLast,l=void 0!==i&&i,u=Object(n.a)(e,x),d=null===(t=Object(c.last)(r))||void 0===t?void 0:t.name,v=r.map((function(e){return Object(b.jsx)(O,{link:e},e.name)})),f=r.map((function(e){return Object(b.jsx)("div",{children:e.name!==d?Object(b.jsx)(O,{link:e}):Object(b.jsx)(s.a,{variant:"body2",sx:{maxWidth:260,overflow:"hidden",whiteSpace:"nowrap",color:"text.disabled",textOverflow:"ellipsis"},children:d})},e.name)}));return Object(b.jsx)(j.a,Object(a.a)(Object(a.a)({separator:Object(b.jsx)(o.a,{component:"span",sx:{width:4,height:4,borderRadius:"50%",bgcolor:"text.disabled"}})},u),{},{children:l?v:f}))}function O(e){var t=e.link,r=t.href,a=t.name,n=t.icon;return Object(b.jsxs)(l.a,{variant:"body2",component:i.b,to:r||"#",sx:{lineHeight:2,display:"flex",alignItems:"center",color:"text.primary","& > div":{display:"inherit"}},children:[n&&Object(b.jsx)(o.a,{sx:{mr:1,"& svg":{width:20,height:20}},children:n}),a]},a)}},1820:function(e,t,r){"use strict";r.d(t,"a",(function(){return x}));var a=r(4),n=r(25),c=r(136),i=r(269),s=r(407),j=r(1681),o=r(1819),l=r(0),b=["links","action","heading","moreLink","sx"];function x(e){var t=e.links,r=e.action,x=e.heading,u=e.moreLink,O=void 0===u?[]:u,d=e.sx,v=Object(n.a)(e,b);return Object(l.jsxs)(i.a,{sx:Object(a.a)({mb:5},d),children:[Object(l.jsxs)(i.a,{sx:{display:"flex",alignItems:"center"},children:[Object(l.jsxs)(i.a,{sx:{flexGrow:1},children:[Object(l.jsx)(s.a,{variant:"h4",gutterBottom:!0,children:x}),Object(l.jsx)(o.a,Object(a.a)({links:t},v))]}),r&&Object(l.jsx)(i.a,{sx:{flexShrink:0},children:r})]}),Object(l.jsx)(i.a,{sx:{mt:2},children:Object(c.isString)(O)?Object(l.jsx)(j.a,{href:O,target:"_blank",rel:"noopener",variant:"body2",children:O}):O.map((function(e){return Object(l.jsx)(j.a,{noWrap:!0,href:e,variant:"body2",target:"_blank",rel:"noopener",sx:{display:"table"},children:e},e)}))})]})}},1823:function(e,t,r){"use strict";r.d(t,"a",(function(){return l})),r.d(t,"b",(function(){return b}));var a=r(4),n=r(98),c=r(1009),i=r(1825),s=r(269),j=r(407),o=r(0);function l(e){var t=e.title,r=e.sx,j=e.children;return Object(o.jsxs)(c.a,{variant:"outlined",sx:{borderRadius:1.5,bgcolor:function(e){return Object(n.a)(e.palette.grey[500],.04)}},children:[t&&Object(o.jsx)(i.a,{title:t}),Object(o.jsx)(s.a,{sx:Object(a.a)({p:5,minHeight:180},r),children:j})]})}function b(e){var t=e.title;return Object(o.jsx)(j.a,{variant:"overline",component:"p",gutterBottom:!0,sx:{color:"text.secondary"},children:t})}},2873:function(e,t,r){"use strict";r.r(t),r.d(t,"default",(function(){return w}));var a=r(3),n=r(1),c=r(12),i=r(269),s=r(1785),j=r(1002),o=r(47),l=r(671),b=r(1820),x=r(1009),u=r(1991),O=r(1843),d=r(1823),v=r(0),f={p:2,minHeight:160,display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center","& > *":{m:1}};function h(e){var t=e.progress,r=e.buffer;return Object(v.jsxs)(O.a,{columns:{xs:1,md:2},spacing:3,children:[Object(v.jsxs)("div",{children:[Object(v.jsx)(d.b,{title:"Linears Indeterminate"}),Object(v.jsx)(x.a,{variant:"outlined",sx:f,children:Object(v.jsxs)(i.a,{sx:{width:"100%"},children:[Object(v.jsx)(u.a,{color:"inherit"})," ",Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{})," ",Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{color:"secondary"})," ",Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{color:"info"})," ",Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{color:"success"})," ",Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{color:"warning"})," ",Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{color:"error"})]})})]}),Object(v.jsxs)("div",{children:[Object(v.jsx)(d.b,{title:"Linears Determinate"}),Object(v.jsx)(x.a,{variant:"outlined",sx:f,children:Object(v.jsxs)(i.a,{sx:{width:"100%"},children:[Object(v.jsx)(u.a,{variant:"determinate",value:t,color:"inherit"}),Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{variant:"determinate",value:t}),Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{variant:"determinate",value:t,color:"secondary"}),Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{variant:"determinate",value:t,color:"info"}),Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{variant:"determinate",value:t,color:"success"}),Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{variant:"determinate",value:t,color:"warning"}),Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{variant:"determinate",value:t,color:"error"})]})})]}),Object(v.jsxs)("div",{children:[Object(v.jsx)(d.b,{title:"Linears Buffer"}),Object(v.jsx)(x.a,{variant:"outlined",sx:f,children:Object(v.jsxs)(i.a,{sx:{width:"100%"},children:[Object(v.jsx)(u.a,{variant:"buffer",value:t,valueBuffer:r,color:"inherit"}),Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{variant:"buffer",value:t,valueBuffer:r}),Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{variant:"buffer",value:t,valueBuffer:r,color:"secondary"}),Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{variant:"buffer",value:t,valueBuffer:r,color:"info"}),Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{variant:"buffer",value:t,valueBuffer:r,color:"success"}),Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{variant:"buffer",value:t,valueBuffer:r,color:"warning"}),Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{variant:"buffer",value:t,valueBuffer:r,color:"error"})]})})]}),Object(v.jsxs)("div",{children:[Object(v.jsx)(d.b,{title:"Linears Query"}),Object(v.jsx)(x.a,{variant:"outlined",sx:f,children:Object(v.jsxs)(i.a,{sx:{width:"100%"},children:[Object(v.jsx)(u.a,{variant:"query",value:t,valueBuffer:r,color:"inherit"}),Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{variant:"query",value:t,valueBuffer:r}),Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{variant:"query",value:t,valueBuffer:r,color:"secondary"}),Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{variant:"query",value:t,valueBuffer:r,color:"info"}),Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{variant:"query",value:t,valueBuffer:r,color:"success"}),Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{variant:"query",value:t,valueBuffer:r,color:"warning"}),Object(v.jsx)("br",{}),Object(v.jsx)(u.a,{variant:"query",value:t,valueBuffer:r,color:"error"})]})})]})]})}var m=r(1804),p={minHeight:160,display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center","& > *":{m:1}};function g(e){var t=e.progress;return Object(v.jsxs)(O.a,{columns:{xs:1,md:3},spacing:3,children:[Object(v.jsxs)("div",{children:[Object(v.jsx)(d.b,{title:"Circular Indeterminate"}),Object(v.jsxs)(x.a,{variant:"outlined",sx:p,children:[Object(v.jsx)(m.a,{color:"inherit"}),Object(v.jsx)(m.a,{}),Object(v.jsx)(m.a,{color:"secondary"}),Object(v.jsx)(m.a,{color:"info"}),Object(v.jsx)(m.a,{color:"success"}),Object(v.jsx)(m.a,{color:"warning"}),Object(v.jsx)(m.a,{color:"error"})]})]}),Object(v.jsxs)("div",{children:[Object(v.jsx)(d.b,{title:"Circular determinate"}),Object(v.jsxs)(x.a,{variant:"outlined",sx:p,children:[Object(v.jsx)(m.a,{color:"info"}),Object(v.jsx)(m.a,{color:"info",variant:"determinate",value:25}),Object(v.jsx)(m.a,{color:"info",variant:"determinate",value:50}),Object(v.jsx)(m.a,{color:"info",variant:"determinate",value:75}),Object(v.jsx)(m.a,{color:"info",variant:"determinate",value:100}),Object(v.jsx)(m.a,{color:"info",variant:"determinate",value:t})]})]}),Object(v.jsxs)("div",{children:[Object(v.jsx)(d.b,{title:"Circular Size"}),Object(v.jsxs)(x.a,{variant:"outlined",sx:p,children:[Object(v.jsx)(m.a,{size:48,color:"info"}),Object(v.jsx)(m.a,{color:"info"}),Object(v.jsx)(m.a,{size:32,color:"info"}),Object(v.jsx)(m.a,{size:24,color:"info"})]})]})]})}var y=Object(c.a)("div")((function(e){var t=e.theme;return{paddingTop:t.spacing(11),paddingBottom:t.spacing(15)}}));function w(){var e=Object(n.useState)(0),t=Object(a.a)(e,2),r=t[0],c=t[1],x=Object(n.useState)(10),u=Object(a.a)(x,2),O=u[0],f=u[1];Object(n.useEffect)((function(){var e=setInterval((function(){c((function(e){if(100===e)return 0;var t=10*Math.random();return Math.min(e+t,100)}))}),500);return function(){clearInterval(e)}}),[]);var m=Object(n.useRef)((function(){}));return Object(n.useEffect)((function(){m.current=function(){if(r>100)c(0),f(10);else{var e=10*Math.random(),t=10*Math.random();c(r+e),f(r+e+t)}}})),Object(n.useEffect)((function(){var e=setInterval((function(){m.current()}),500);return function(){clearInterval(e)}}),[]),Object(v.jsx)(l.a,{title:"Components: Progress",children:Object(v.jsxs)(y,{children:[Object(v.jsx)(i.a,{sx:{pt:6,pb:1,mb:10,bgcolor:function(e){return"light"===e.palette.mode?"grey.200":"grey.800"}},children:Object(v.jsx)(s.a,{children:Object(v.jsx)(b.a,{heading:"Progress",links:[{name:"Components",href:o.d.components},{name:"Progress"}],moreLink:"https://mui.com/components/progress"})})}),Object(v.jsx)(s.a,{children:Object(v.jsxs)(j.a,{spacing:5,children:[Object(v.jsx)(d.a,{title:"Circular",children:Object(v.jsx)(g,{progress:r})}),Object(v.jsx)(d.a,{title:"Linear",children:Object(v.jsx)(h,{progress:r,buffer:O})})]})})]})})}}}]);
//# sourceMappingURL=106.c6fadcde.chunk.js.map