(this["webpackJsonp@minimal/minimal-kit-react"]=this["webpackJsonp@minimal/minimal-kit-react"]||[]).push([[98],{1819:function(e,t,a){"use strict";a.d(t,"a",(function(){return x}));var c=a(4),n=a(25),l=a(136),r=a(27),s=a(407),i=a(1824),o=a(269),j=a(1681),b=a(0),d=["links","activeLast"];function x(e){var t,a=e.links,r=e.activeLast,j=void 0!==r&&r,x=Object(n.a)(e,d),h=null===(t=Object(l.last)(a))||void 0===t?void 0:t.name,u=a.map((function(e){return Object(b.jsx)(O,{link:e},e.name)})),m=a.map((function(e){return Object(b.jsx)("div",{children:e.name!==h?Object(b.jsx)(O,{link:e}):Object(b.jsx)(s.a,{variant:"body2",sx:{maxWidth:260,overflow:"hidden",whiteSpace:"nowrap",color:"text.disabled",textOverflow:"ellipsis"},children:h})},e.name)}));return Object(b.jsx)(i.a,Object(c.a)(Object(c.a)({separator:Object(b.jsx)(o.a,{component:"span",sx:{width:4,height:4,borderRadius:"50%",bgcolor:"text.disabled"}})},x),{},{children:j?u:m}))}function O(e){var t=e.link,a=t.href,c=t.name,n=t.icon;return Object(b.jsxs)(j.a,{variant:"body2",component:r.b,to:a||"#",sx:{lineHeight:2,display:"flex",alignItems:"center",color:"text.primary","& > div":{display:"inherit"}},children:[n&&Object(b.jsx)(o.a,{sx:{mr:1,"& svg":{width:20,height:20}},children:n}),c]},c)}},1820:function(e,t,a){"use strict";a.d(t,"a",(function(){return d}));var c=a(4),n=a(25),l=a(136),r=a(269),s=a(407),i=a(1681),o=a(1819),j=a(0),b=["links","action","heading","moreLink","sx"];function d(e){var t=e.links,a=e.action,d=e.heading,x=e.moreLink,O=void 0===x?[]:x,h=e.sx,u=Object(n.a)(e,b);return Object(j.jsxs)(r.a,{sx:Object(c.a)({mb:5},h),children:[Object(j.jsxs)(r.a,{sx:{display:"flex",alignItems:"center"},children:[Object(j.jsxs)(r.a,{sx:{flexGrow:1},children:[Object(j.jsx)(s.a,{variant:"h4",gutterBottom:!0,children:d}),Object(j.jsx)(o.a,Object(c.a)({links:t},u))]}),a&&Object(j.jsx)(r.a,{sx:{flexShrink:0},children:a})]}),Object(j.jsx)(r.a,{sx:{mt:2},children:Object(l.isString)(O)?Object(j.jsx)(i.a,{href:O,target:"_blank",rel:"noopener",variant:"body2",children:O}):O.map((function(e){return Object(j.jsx)(i.a,{noWrap:!0,href:e,variant:"body2",target:"_blank",rel:"noopener",sx:{display:"table"},children:e},e)}))})]})}},1823:function(e,t,a){"use strict";a.d(t,"a",(function(){return j})),a.d(t,"b",(function(){return b}));var c=a(4),n=a(98),l=a(1009),r=a(1825),s=a(269),i=a(407),o=a(0);function j(e){var t=e.title,a=e.sx,i=e.children;return Object(o.jsxs)(l.a,{variant:"outlined",sx:{borderRadius:1.5,bgcolor:function(e){return Object(n.a)(e.palette.grey[500],.04)}},children:[t&&Object(o.jsx)(r.a,{title:t}),Object(o.jsx)(s.a,{sx:Object(c.a)({p:5,minHeight:180},a),children:i})]})}function b(e){var t=e.title;return Object(o.jsx)(i.a,{variant:"overline",component:"p",gutterBottom:!0,sx:{color:"text.secondary"},children:t})}},2799:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return f}));var c=a(12),n=a(269),l=a(1785),r=a(1884),s=a(1803),i=a(1800),o=a(1685),j=a(1843),b=a(47),d=a(671),x=a(1820),O=a(1823),h=a(0),u={display:"flex",alignItems:"center",justifyContent:"center",flexWrap:"wrap","& > *":{mx:"8px !important"}},m=Object(c.a)("div")((function(e){var t=e.theme;return{paddingTop:t.spacing(11),paddingBottom:t.spacing(15)}}));function f(){return Object(h.jsx)(d.a,{title:"Components: Switches",children:Object(h.jsxs)(m,{children:[Object(h.jsx)(n.a,{sx:{pt:6,pb:1,mb:10,bgcolor:function(e){return"light"===e.palette.mode?"grey.200":"grey.800"}},children:Object(h.jsx)(l.a,{children:Object(h.jsx)(x.a,{heading:"Switches",links:[{name:"Components",href:b.d.components},{name:"Switches"}],moreLink:"https://mui.com/components/switches"})})}),Object(h.jsx)(l.a,{children:Object(h.jsxs)(j.a,{columns:{xs:1,md:2},spacing:3,children:[Object(h.jsxs)(O.a,{title:"Basic",sx:u,children:[Object(h.jsx)(r.a,{defaultChecked:!0}),Object(h.jsx)(r.a,{}),Object(h.jsx)(r.a,{disabled:!0}),Object(h.jsx)(r.a,{disabled:!0,checked:!0}),Object(h.jsx)(r.a,{defaultChecked:!0,color:"default"})]}),Object(h.jsxs)(O.a,{title:"Sizes",sx:u,children:[Object(h.jsx)(s.a,{control:Object(h.jsx)(r.a,{size:"small"}),label:"Small"}),Object(h.jsx)(s.a,{control:Object(h.jsx)(r.a,{}),label:"Normal"})]}),Object(h.jsx)(O.a,{title:"Placement",sx:u,children:Object(h.jsx)(i.a,{component:"fieldset",children:Object(h.jsxs)(o.a,{row:!0,children:[Object(h.jsx)(s.a,{value:"top",label:"Top",labelPlacement:"top",control:Object(h.jsx)(r.a,{})}),Object(h.jsx)(s.a,{value:"start",label:"Start",labelPlacement:"start",control:Object(h.jsx)(r.a,{})}),Object(h.jsx)(s.a,{value:"bottom",label:"Bottom",labelPlacement:"bottom",control:Object(h.jsx)(r.a,{})}),Object(h.jsx)(s.a,{value:"end",label:"End",labelPlacement:"end",control:Object(h.jsx)(r.a,{})})]})})}),Object(h.jsx)(O.a,{title:"Adding Colors",children:Object(h.jsx)(i.a,{component:"fieldset",children:Object(h.jsxs)(o.a,{children:[Object(h.jsx)(s.a,{control:Object(h.jsx)(r.a,{defaultChecked:!0,color:"default"}),label:"Default"}),Object(h.jsx)(s.a,{control:Object(h.jsx)(r.a,{defaultChecked:!0}),label:"Primary"}),Object(h.jsx)(s.a,{control:Object(h.jsx)(r.a,{defaultChecked:!0,color:"info"}),label:"Info"}),Object(h.jsx)(s.a,{control:Object(h.jsx)(r.a,{defaultChecked:!0,color:"success"}),label:"Success"}),Object(h.jsx)(s.a,{control:Object(h.jsx)(r.a,{defaultChecked:!0,color:"warning"}),label:"Warning"}),Object(h.jsx)(s.a,{control:Object(h.jsx)(r.a,{defaultChecked:!0,color:"error"}),label:"Error"}),Object(h.jsx)(s.a,{disabled:!0,control:Object(h.jsx)(r.a,{defaultChecked:!0,color:"error"}),label:"Disabled"}),Object(h.jsx)(s.a,{disabled:!0,control:Object(h.jsx)(r.a,{color:"error"}),label:"Disabled"})]})})})]})})]})})}}}]);
//# sourceMappingURL=98.ccda8fc4.chunk.js.map