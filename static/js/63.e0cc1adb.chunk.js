(this["webpackJsonp@minimal/minimal-kit-react"]=this["webpackJsonp@minimal/minimal-kit-react"]||[]).push([[63],{1819:function(e,t,a){"use strict";a.d(t,"a",(function(){return j}));var r=a(4),n=a(25),o=a(136),c=a(27),i=a(407),s=a(1824),l=a(269),d=a(1681),u=a(0),b=["links","activeLast"];function j(e){var t,a=e.links,c=e.activeLast,d=void 0!==c&&c,j=Object(n.a)(e,b),m=null===(t=Object(o.last)(a))||void 0===t?void 0:t.name,h=a.map((function(e){return Object(u.jsx)(p,{link:e},e.name)})),x=a.map((function(e){return Object(u.jsx)("div",{children:e.name!==m?Object(u.jsx)(p,{link:e}):Object(u.jsx)(i.a,{variant:"body2",sx:{maxWidth:260,overflow:"hidden",whiteSpace:"nowrap",color:"text.disabled",textOverflow:"ellipsis"},children:m})},e.name)}));return Object(u.jsx)(s.a,Object(r.a)(Object(r.a)({separator:Object(u.jsx)(l.a,{component:"span",sx:{width:4,height:4,borderRadius:"50%",bgcolor:"text.disabled"}})},j),{},{children:d?h:x}))}function p(e){var t=e.link,a=t.href,r=t.name,n=t.icon;return Object(u.jsxs)(d.a,{variant:"body2",component:c.b,to:a||"#",sx:{lineHeight:2,display:"flex",alignItems:"center",color:"text.primary","& > div":{display:"inherit"}},children:[n&&Object(u.jsx)(l.a,{sx:{mr:1,"& svg":{width:20,height:20}},children:n}),r]},r)}},1820:function(e,t,a){"use strict";a.d(t,"a",(function(){return b}));var r=a(4),n=a(25),o=a(136),c=a(269),i=a(407),s=a(1681),l=a(1819),d=a(0),u=["links","action","heading","moreLink","sx"];function b(e){var t=e.links,a=e.action,b=e.heading,j=e.moreLink,p=void 0===j?[]:j,m=e.sx,h=Object(n.a)(e,u);return Object(d.jsxs)(c.a,{sx:Object(r.a)({mb:5},m),children:[Object(d.jsxs)(c.a,{sx:{display:"flex",alignItems:"center"},children:[Object(d.jsxs)(c.a,{sx:{flexGrow:1},children:[Object(d.jsx)(i.a,{variant:"h4",gutterBottom:!0,children:b}),Object(d.jsx)(l.a,Object(r.a)({links:t},h))]}),a&&Object(d.jsx)(c.a,{sx:{flexShrink:0},children:a})]}),Object(d.jsx)(c.a,{sx:{mt:2},children:Object(o.isString)(p)?Object(d.jsx)(s.a,{href:p,target:"_blank",rel:"noopener",variant:"body2",children:p}):p.map((function(e){return Object(d.jsx)(s.a,{noWrap:!0,href:e,variant:"body2",target:"_blank",rel:"noopener",sx:{display:"table"},children:e},e)}))})]})}},1823:function(e,t,a){"use strict";a.d(t,"a",(function(){return d})),a.d(t,"b",(function(){return u}));var r=a(4),n=a(98),o=a(1009),c=a(1825),i=a(269),s=a(407),l=a(0);function d(e){var t=e.title,a=e.sx,s=e.children;return Object(l.jsxs)(o.a,{variant:"outlined",sx:{borderRadius:1.5,bgcolor:function(e){return Object(n.a)(e.palette.grey[500],.04)}},children:[t&&Object(l.jsx)(c.a,{title:t}),Object(l.jsx)(i.a,{sx:Object(r.a)({p:5,minHeight:180},a),children:s})]})}function u(e){var t=e.title;return Object(l.jsx)(s.a,{variant:"overline",component:"p",gutterBottom:!0,sx:{color:"text.secondary"},children:t})}},1824:function(e,t,a){"use strict";var r=a(16),n=a(3),o=a(10),c=a(2),i=a(13),s=a(1),l=(a(99),a(7),a(5)),d=a(300),u=a(12),b=a(18),j=a(407),p=a(98),m=a(59),h=a(0),x=Object(m.a)(Object(h.jsx)("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"}),"MoreHoriz"),O=a(1675),v=Object(u.a)(O.a,{skipSx:!0})((function(e){var t=e.theme;return Object(c.a)({display:"flex",marginLeft:"calc(".concat(t.spacing(1)," * 0.5)"),marginRight:"calc(".concat(t.spacing(1)," * 0.5)")},"light"===t.palette.mode?{backgroundColor:t.palette.grey[100],color:t.palette.grey[700]}:{backgroundColor:t.palette.grey[700],color:t.palette.grey[100]},{borderRadius:2,"&:hover, &:focus":Object(c.a)({},"light"===t.palette.mode?{backgroundColor:t.palette.grey[200]}:{backgroundColor:t.palette.grey[600]}),"&:active":Object(c.a)({boxShadow:t.shadows[0]},"light"===t.palette.mode?{backgroundColor:Object(p.c)(t.palette.grey[200],.12)}:{backgroundColor:Object(p.c)(t.palette.grey[600],.12)})})})),f=Object(u.a)(x)({width:24,height:16});var g=function(e){var t=e;return Object(h.jsx)("li",{children:Object(h.jsx)(v,Object(c.a)({focusRipple:!0},e,{ownerState:t,children:Object(h.jsx)(f,{ownerState:t})}))})},y=a(179),C=a(192);function k(e){return Object(y.a)("MuiBreadcrumbs",e)}var w=Object(C.a)("MuiBreadcrumbs",["root","ol","li","separator"]),S=["children","className","component","expandText","itemsAfterCollapse","itemsBeforeCollapse","maxItems","separator"],R=Object(u.a)(j.a,{name:"MuiBreadcrumbs",slot:"Root",overridesResolver:function(e,t){return[Object(o.a)({},"& .".concat(w.li),t.li),t.root]}})({}),B=Object(u.a)("ol",{name:"MuiBreadcrumbs",slot:"Ol",overridesResolver:function(e,t){return t.ol}})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"}),M=Object(u.a)("li",{name:"MuiBreadcrumbs",slot:"Separator",overridesResolver:function(e,t){return t.separator}})({display:"flex",userSelect:"none",marginLeft:8,marginRight:8});function T(e,t,a,r){return e.reduce((function(n,o,c){return c<e.length-1?n=n.concat(o,Object(h.jsx)(M,{"aria-hidden":!0,className:t,ownerState:r,children:a},"separator-".concat(c))):n.push(o),n}),[])}var N=s.forwardRef((function(e,t){var a=Object(b.a)({props:e,name:"MuiBreadcrumbs"}),o=a.children,u=a.className,j=a.component,p=void 0===j?"nav":j,m=a.expandText,x=void 0===m?"Show path":m,O=a.itemsAfterCollapse,v=void 0===O?1:O,f=a.itemsBeforeCollapse,y=void 0===f?1:f,C=a.maxItems,w=void 0===C?8:C,M=a.separator,N=void 0===M?"/":M,H=Object(i.a)(a,S),P=s.useState(!1),z=Object(n.a)(P,2),I=z[0],L=z[1],E=Object(c.a)({},a,{component:p,expanded:I,expandText:x,itemsAfterCollapse:v,itemsBeforeCollapse:y,maxItems:w,separator:N}),A=function(e){var t=e.classes;return Object(d.a)({root:["root"],li:["li"],ol:["ol"],separator:["separator"]},k,t)}(E),W=s.useRef(null),F=s.Children.toArray(o).filter((function(e){return s.isValidElement(e)})).map((function(e,t){return Object(h.jsx)("li",{className:A.li,children:e},"child-".concat(t))}));return Object(h.jsx)(R,Object(c.a)({ref:t,component:p,color:"text.secondary",className:Object(l.a)(A.root,u),ownerState:E},H,{children:Object(h.jsx)(B,{className:A.ol,ref:W,ownerState:E,children:T(I||w&&F.length<=w?F:function(e){return y+v>=e.length?e:[].concat(Object(r.a)(e.slice(0,y)),[Object(h.jsx)(g,{"aria-label":x,onClick:function(){L(!0);var e=W.current.querySelector("a[href],button,[tabindex]");e&&e.focus()}},"ellipsis")],Object(r.a)(e.slice(e.length-v,e.length)))}(F),A.separator,N,E)})}))}));t.a=N},1825:function(e,t,a){"use strict";var r=a(10),n=a(13),o=a(2),c=a(1),i=(a(7),a(5)),s=a(300),l=a(407),d=a(18),u=a(12),b=a(179),j=a(192);function p(e){return Object(b.a)("MuiCardHeader",e)}var m=Object(j.a)("MuiCardHeader",["root","avatar","action","content","title","subheader"]),h=a(0),x=["action","avatar","className","component","disableTypography","subheader","subheaderTypographyProps","title","titleTypographyProps"],O=Object(u.a)("div",{name:"MuiCardHeader",slot:"Root",overridesResolver:function(e,t){var a;return Object(o.a)((a={},Object(r.a)(a,"& .".concat(m.title),t.title),Object(r.a)(a,"& .".concat(m.subheader),t.subheader),a),t.root)}})({display:"flex",alignItems:"center",padding:16}),v=Object(u.a)("div",{name:"MuiCardHeader",slot:"Avatar",overridesResolver:function(e,t){return t.avatar}})({display:"flex",flex:"0 0 auto",marginRight:16}),f=Object(u.a)("div",{name:"MuiCardHeader",slot:"Action",overridesResolver:function(e,t){return t.action}})({flex:"0 0 auto",alignSelf:"flex-start",marginTop:-4,marginRight:-8,marginBottom:-4}),g=Object(u.a)("div",{name:"MuiCardHeader",slot:"Content",overridesResolver:function(e,t){return t.content}})({flex:"1 1 auto"}),y=c.forwardRef((function(e,t){var a=Object(d.a)({props:e,name:"MuiCardHeader"}),r=a.action,c=a.avatar,u=a.className,b=a.component,j=void 0===b?"div":b,m=a.disableTypography,y=void 0!==m&&m,C=a.subheader,k=a.subheaderTypographyProps,w=a.title,S=a.titleTypographyProps,R=Object(n.a)(a,x),B=Object(o.a)({},a,{component:j,disableTypography:y}),M=function(e){var t=e.classes;return Object(s.a)({root:["root"],avatar:["avatar"],action:["action"],content:["content"],title:["title"],subheader:["subheader"]},p,t)}(B),T=w;null==T||T.type===l.a||y||(T=Object(h.jsx)(l.a,Object(o.a)({variant:c?"body2":"h5",className:M.title,component:"span",display:"block"},S,{children:T})));var N=C;return null==N||N.type===l.a||y||(N=Object(h.jsx)(l.a,Object(o.a)({variant:c?"body2":"body1",className:M.subheader,color:"text.secondary",component:"span",display:"block"},k,{children:N}))),Object(h.jsxs)(O,Object(o.a)({className:Object(i.a)(M.root,u),as:j,ref:t,ownerState:B},R,{children:[c&&Object(h.jsx)(v,{className:M.avatar,ownerState:B,children:c}),Object(h.jsxs)(g,{className:M.content,ownerState:B,children:[T,N]}),r&&Object(h.jsx)(f,{className:M.action,ownerState:B,children:r})]}))}));t.a=y},2794:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return O}));var r=a(3),n=a(1),o=a(12),c=a(269),i=a(1785),s=a(544),l=a(1683),d=a(407),u=a(47),b=a(671),j=a(1820),p=a(1823),m=a(0),h=Object(o.a)("div")((function(e){var t=e.theme;return{paddingTop:t.spacing(11),paddingBottom:t.spacing(15)}})),x={display:"flex",alignItems:"center",justifyContent:"center"};function O(){var e=Object(n.useState)(null),t=Object(r.a)(e,2),a=t[0],o=t[1],O=Object(n.useState)(null),v=Object(r.a)(O,2),f=v[0],g=v[1],y=function(){g(null)};return Object(m.jsx)(b.a,{title:"Components: Popover",children:Object(m.jsxs)(h,{children:[Object(m.jsx)(c.a,{sx:{pt:6,pb:1,mb:10,bgcolor:function(e){return"light"===e.palette.mode?"grey.200":"grey.800"}},children:Object(m.jsx)(i.a,{children:Object(m.jsx)(j.a,{heading:"Popover",links:[{name:"Components",href:u.d.components},{name:"Popover"}],moreLink:"https://mui.com/components/popover"})})}),Object(m.jsx)(i.a,{children:Object(m.jsxs)(c.a,{sx:{display:"grid",gap:3,gridTemplateColumns:{xs:"repeat(1, 1fr)",md:"repeat(2, 1fr)"}},children:[Object(m.jsxs)(p.a,{title:"Click",sx:x,children:[Object(m.jsx)(s.a,{variant:"contained",onClick:function(e){o(e.currentTarget)},children:"Open Popover"}),Object(m.jsx)(l.a,{open:Boolean(a),anchorEl:a,onClose:function(){o(null)},anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"},children:Object(m.jsxs)(c.a,{sx:{p:2,maxWidth:280},children:[Object(m.jsx)(d.a,{variant:"subtitle1",gutterBottom:!0,children:"Etiam feugiat lorem non metus"}),Object(m.jsx)(d.a,{variant:"body2",sx:{color:"text.secondary"},children:"Fusce vulputate eleifend sapien. Curabitur at lacus ac velit ornare lobortis."})]})})]}),Object(m.jsxs)(p.a,{title:"Hover",sx:x,children:[Object(m.jsx)(d.a,{"aria-owns":f?"mouse-over-popover":void 0,"aria-haspopup":"true",onMouseEnter:function(e){g(e.currentTarget)},onMouseLeave:y,children:"Hover with a Popover."}),Object(m.jsx)(l.a,{id:"mouse-over-popover",open:Boolean(f),anchorEl:f,anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"},onClose:y,disableRestoreFocus:!0,sx:{pointerEvents:"none"},children:Object(m.jsxs)(c.a,{sx:{p:2,maxWidth:280},children:[Object(m.jsx)(d.a,{variant:"subtitle1",gutterBottom:!0,children:"Etiam feugiat lorem non metus"}),Object(m.jsx)(d.a,{variant:"body2",sx:{color:"text.secondary"},children:"Fusce vulputate eleifend sapien. Curabitur at lacus ac velit ornare lobortis."})]})})]})]})})]})})}}}]);
//# sourceMappingURL=63.e0cc1adb.chunk.js.map