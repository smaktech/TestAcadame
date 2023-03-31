(this["webpackJsonp@minimal/minimal-kit-react"]=this["webpackJsonp@minimal/minimal-kit-react"]||[]).push([[31],{1821:function(e,t,n){"use strict";n.d(t,"a",(function(){return o})),n.d(t,"d",(function(){return c})),n.d(t,"c",(function(){return s})),n.d(t,"e",(function(){return l})),n.d(t,"b",(function(){return j}));var r=n(136),i=n(1829),a=n.n(i);function o(e){return a()(e).format(Number.isInteger(e)?"$0,0":"$0,0.00")}function c(e){return a()(e/100).format("0.0%")}function s(e){return a()(e).format()}function l(e){return Object(r.replace)(a()(e).format("0.00a"),".00","")}function j(e){return a()(e).format("0.0 b")}},1903:function(e,t,n){"use strict";var r=n(1),i=r.createContext({});t.a=i},2038:function(e,t,n){"use strict";n.d(t,"b",(function(){return a}));var r=n(179),i=n(192);function a(e){return Object(r.a)("MuiTimelineContent",e)}var o=Object(i.a)("MuiTimelineContent",["root","positionLeft","positionRight","positionAlternate"]);t.a=o},2114:function(e,t,n){"use strict";n.d(t,"b",(function(){return a}));var r=n(179),i=n(192);function a(e){return Object(r.a)("MuiTimelineOppositeContent",e)}var o=Object(i.a)("MuiTimelineOppositeContent",["root","positionLeft","positionRight","positionAlternate"]);t.a=o},2299:function(e,t,n){"use strict";var r=n(13),i=n(2),a=n(1),o=(n(7),n(5)),c=n(19),s=n(12),l=n(18),j=n(300),d=n(407),b=n(1903),u=n(2038),O=n(0),p=["className"],x=Object(s.a)(d.a,{name:"MuiTimelineContent",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["position".concat(Object(c.a)(n.position))]]}})((function(e){var t=e.ownerState;return Object(i.a)({flex:1,padding:"6px 16px",textAlign:"left"},"left"===t.position&&{textAlign:"right"})})),h=a.forwardRef((function(e,t){var n=Object(l.a)({props:e,name:"MuiTimelineContent"}),s=n.className,d=Object(r.a)(n,p),h=a.useContext(b.a).position,m=Object(i.a)({},n,{position:h||"right"}),f=function(e){var t=e.position,n=e.classes,r={root:["root","position".concat(Object(c.a)(t))]};return Object(j.a)(r,u.b,n)}(m);return Object(O.jsx)(x,Object(i.a)({component:"div",className:Object(o.a)(f.root,s),ownerState:m,ref:t},d))}));t.a=h},2726:function(e,t,n){"use strict";var r=n(2),i=n(13),a=n(1),o=(n(7),n(5)),c=n(19),s=n(300),l=n(12),j=n(18),d=n(1903),b=n(179),u=n(192);function O(e){return Object(b.a)("MuiTimeline",e)}Object(u.a)("MuiTimeline",["root","positionLeft","positionRight","positionAlternate"]);var p=n(0),x=["position","className"],h=Object(l.a)("ul",{name:"MuiTimeline",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,n.position&&t["position".concat(Object(c.a)(n.position))]]}})({display:"flex",flexDirection:"column",padding:"6px 16px",flexGrow:1}),m=a.forwardRef((function(e,t){var n=Object(j.a)({props:e,name:"MuiTimeline"}),a=n.position,l=void 0===a?"right":a,b=n.className,u=Object(i.a)(n,x),m=Object(r.a)({},n,{position:l}),f=function(e){var t=e.position,n=e.classes,r={root:["root",t&&"position".concat(Object(c.a)(t))]};return Object(s.a)(r,O,n)}(m);return Object(p.jsx)(d.a.Provider,{value:{position:l},children:Object(p.jsx)(h,Object(r.a)({className:Object(o.a)(f.root,b),ownerState:m,ref:t},u))})}));t.a=m},2727:function(e,t,n){"use strict";var r=n(10),i=n(13),a=n(2),o=n(1),c=(n(7),n(5)),s=n(19),l=n(250),j=n(12),d=n(18),b=n(300),u=n(2038),O=n(2114),p=n(1903),x=n(179),h=n(192);function m(e){return Object(x.a)("MuiTimelineItem",e)}Object(h.a)("MuiTimelineItem",["root","positionLeft","positionRight","positionAlternate","missingOppositeContent"]);var f=n(0),v=["position","className"],g=Object(j.a)("li",{name:"MuiTimelineItem",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["position".concat(Object(s.a)(n.position))]]}})((function(e){var t,n=e.ownerState;return Object(a.a)({listStyle:"none",display:"flex",position:"relative",minHeight:70},"left"===n.position&&{flexDirection:"row-reverse"},"alternate"===n.position&&{"&:nth-of-type(even)":(t={flexDirection:"row-reverse"},Object(r.a)(t,"& .".concat(u.a.root),{textAlign:"right"}),Object(r.a)(t,"& .".concat(O.a.root),{textAlign:"left"}),t)},!n.hasOppositeContent&&{"&:before":{content:'""',flex:1,padding:"6px 16px"}})})),y=o.forwardRef((function(e,t){var n=Object(d.a)({props:e,name:"MuiTimelineItem"}),r=n.position,j=n.className,u=Object(i.a)(n,v),O=o.useContext(p.a).position,x=!1;o.Children.forEach(n.children,(function(e){Object(l.a)(e,["TimelineOppositeContent"])&&(x=!0)}));var h=Object(a.a)({},n,{position:r||O||"right",hasOppositeContent:x}),y=function(e){var t=e.position,n=e.classes,r=e.hasOppositeContent,i={root:["root","position".concat(Object(s.a)(t)),!r&&"missingOppositeContent"]};return Object(b.a)(i,m,n)}(h);return Object(f.jsx)(p.a.Provider,{value:{position:h.position},children:Object(f.jsx)(g,Object(a.a)({className:Object(c.a)(y.root,j),ownerState:h,ref:t},u))})}));t.a=y},2728:function(e,t,n){"use strict";var r=n(2),i=n(13),a=n(1),o=(n(7),n(5)),c=n(300),s=n(12),l=n(18),j=n(179),d=n(192);function b(e){return Object(j.a)("MuiTimelineSeparator",e)}Object(d.a)("MuiTimelineSeparator",["root"]);var u=n(0),O=["className"],p=Object(s.a)("div",{name:"MuiTimelineSeparator",slot:"Root",overridesResolver:function(e,t){return t.root}})({display:"flex",flexDirection:"column",flex:0,alignItems:"center"}),x=a.forwardRef((function(e,t){var n=Object(l.a)({props:e,name:"MuiTimelineSeparator"}),a=n.className,s=Object(i.a)(n,O),j=n,d=function(e){var t=e.classes;return Object(c.a)({root:["root"]},b,t)}(j);return Object(u.jsx)(p,Object(r.a)({className:Object(o.a)(d.root,a),ownerState:j,ref:t},s))}));t.a=x},2729:function(e,t,n){"use strict";var r=n(13),i=n(2),a=n(1),o=(n(7),n(5)),c=n(12),s=n(18),l=n(19),j=n(300),d=n(179),b=n(192);function u(e){return Object(d.a)("MuiTimelineDot",e)}Object(b.a)("MuiTimelineDot",["root","filled","outlined","filledGrey","outlinedGrey","filledPrimary","outlinedPrimary","filledSecondary","outlinedSecondary"]);var O=n(0),p=["className","color","variant"],x=Object(c.a)("span",{name:"MuiTimelineDot",slot:"Root",overridesResolver:function(e,t){var n=e.ownerState;return[t.root,t["inherit"!==n.color&&"".concat(n.variant).concat(Object(l.a)(n.color))],t[n.variant]]}})((function(e){var t=e.ownerState,n=e.theme;return Object(i.a)({display:"flex",alignSelf:"baseline",borderStyle:"solid",borderWidth:2,padding:4,borderRadius:"50%",boxShadow:n.shadows[1],margin:"11.5px 0"},"filled"===t.variant&&Object(i.a)({borderColor:"transparent"},"inherit"!==t.color&&Object(i.a)({},"grey"===t.color?{color:n.palette.grey[50],backgroundColor:n.palette.grey[400]}:{color:n.palette[t.color].contrastText,backgroundColor:n.palette[t.color].main})),"outlined"===t.variant&&Object(i.a)({boxShadow:"none",backgroundColor:"transparent"},"inherit"!==t.color&&Object(i.a)({},"grey"===t.color?{borderColor:n.palette.grey[400]}:{borderColor:n.palette[t.color].main})))})),h=a.forwardRef((function(e,t){var n=Object(s.a)({props:e,name:"MuiTimelineDot"}),a=n.className,c=n.color,d=void 0===c?"grey":c,b=n.variant,h=void 0===b?"filled":b,m=Object(r.a)(n,p),f=Object(i.a)({},n,{color:d,variant:h}),v=function(e){var t=e.color,n=e.variant,r=e.classes,i={root:["root",n,"inherit"!==t&&"".concat(n).concat(Object(l.a)(t))]};return Object(j.a)(i,u,r)}(f);return Object(O.jsx)(x,Object(i.a)({className:Object(o.a)(v.root,a),ownerState:f,ref:t},m))}));t.a=h},2730:function(e,t,n){"use strict";var r=n(2),i=n(13),a=n(1),o=(n(7),n(5)),c=n(300),s=n(12),l=n(18),j=n(179),d=n(192);function b(e){return Object(j.a)("MuiTimelineConnector",e)}Object(d.a)("MuiTimelineConnector",["root"]);var u=n(0),O=["className"],p=Object(s.a)("span",{name:"MuiTimelineConnector",slot:"Root",overridesResolver:function(e,t){return t.root}})((function(e){return{width:2,backgroundColor:e.theme.palette.grey[400],flexGrow:1}})),x=a.forwardRef((function(e,t){var n=Object(l.a)({props:e,name:"MuiTimelineConnector"}),a=n.className,s=Object(i.a)(n,O),j=n,d=function(e){var t=e.classes;return Object(c.a)({root:["root"]},b,t)}(j);return Object(u.jsx)(p,Object(r.a)({className:Object(o.a)(d.root,a),ownerState:j,ref:t},s))}));t.a=x},2839:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return me}));var r=n(1785),i=n(407),a=n(1781),o=n(137),c=n(671),s=n(3),l=n(4),j=n(25),d=n(1),b=n(243),u=n(1805),O=n(1825),p=n(269),x=n(1002),h=n(1803),m=n(1774),f=n(1682),v=n(998),g=n(1796),y=n(1653),w=n(41),S=n(0),C=["task","checked","checkedProps"],k=["Create FireStone Logo","Add SCSS and JS files if required","Stakeholder Meeting","Scoping & Estimations","Sprint Showcase"];function T(){var e=Object(b.d)({initialValues:{checked:[k[2]]},onSubmit:function(e){console.log(e)}}),t=e.values,n=e.handleSubmit,r=(0,e.getFieldProps)("checked");return Object(S.jsxs)(u.a,{children:[Object(S.jsx)(O.a,{title:"Tasks"}),Object(S.jsx)(p.a,{sx:{px:3,py:1},children:Object(S.jsx)(b.b,{value:e,children:Object(S.jsx)(b.a,{autoComplete:"off",noValidate:!0,onSubmit:n,children:k.map((function(e){return Object(S.jsx)(R,{task:e,checkedProps:r,checked:t.checked.includes(e)},e)}))})})})]})}function R(e){var t=e.task,n=e.checked,r=e.checkedProps,a=Object(j.a)(e,C);return Object(S.jsx)(S.Fragment,{children:Object(S.jsxs)(x.a,{direction:"row",justifyContent:"space-between",sx:{py:.75},children:[Object(S.jsx)(h.a,{control:Object(S.jsx)(m.a,Object(l.a)(Object(l.a)({},r),{},{value:t,checked:n},a)),label:Object(S.jsx)(i.a,{variant:"body2",sx:Object(l.a)({},n&&{color:"text.disabled",textDecoration:"line-through"}),children:t})}),Object(S.jsx)(M,{})]})})}function M(){var e=Object(d.useRef)(null),t=Object(d.useState)(!1),n=Object(s.a)(t,2),r=n[0],a=n[1];return Object(S.jsxs)(S.Fragment,{children:[Object(S.jsx)(f.a,{ref:e,size:"large",onClick:function(){a(!0)},children:Object(S.jsx)(w.a,{icon:"eva:more-vertical-fill",width:20,height:20})}),Object(S.jsxs)(v.a,{open:r,anchorEl:e.current,onClose:function(){a(!1)},PaperProps:{sx:{width:200,maxWidth:"100%"}},anchorOrigin:{vertical:"top",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},children:[Object(S.jsxs)(g.a,{sx:{borderRadius:1},children:[Object(S.jsx)(w.a,{icon:"eva:checkmark-circle-2-fill",width:20,height:20}),Object(S.jsx)(i.a,{variant:"body2",sx:{ml:2},children:"Mark Complete"})]}),Object(S.jsxs)(g.a,{sx:{borderRadius:1},children:[Object(S.jsx)(w.a,{icon:"eva:edit-fill",width:20,height:20}),Object(S.jsx)(i.a,{variant:"body2",sx:{ml:2},children:"Edit"})]}),Object(S.jsxs)(g.a,{sx:{borderRadius:1},children:[Object(S.jsx)(w.a,{icon:"eva:share-fill",width:20,height:20}),Object(S.jsx)(i.a,{variant:"body2",sx:{ml:2},children:"Share"})]}),Object(S.jsx)(y.a,{}),Object(S.jsxs)(g.a,{sx:{color:"error.main",borderRadius:1},children:[Object(S.jsx)(w.a,{icon:"eva:trash-2-outline",width:20,height:20}),Object(S.jsx)(i.a,{variant:"body2",sx:{ml:2},children:"Delete"})]})]})]})}var N=n(27),A=n(544),I=n(1681),P=n(408),D=n(350),W=n(349),L=n(203);function z(){return Object(S.jsxs)(u.a,{children:[Object(S.jsx)(O.a,{title:"News Update"}),Object(S.jsx)(L.a,{children:Object(S.jsx)(x.a,{spacing:3,sx:{p:3,pr:0},children:D.d.map((function(e){return Object(S.jsx)(G,{news:e},e.id)}))})}),Object(S.jsx)(y.a,{}),Object(S.jsx)(p.a,{sx:{p:2,textAlign:"right"},children:Object(S.jsx)(A.a,{to:"#",size:"small",color:"inherit",component:N.b,endIcon:Object(S.jsx)(w.a,{icon:"eva:arrow-ios-forward-fill"}),children:"View all"})})]})}function G(e){var t=e.news,n=t.image,r=t.title,a=t.description,o=t.postedAt;return Object(S.jsxs)(x.a,{direction:"row",alignItems:"center",spacing:2,children:[Object(S.jsx)(W.a,{alt:r,src:n,sx:{width:48,height:48,borderRadius:1.5,flexShrink:0}}),Object(S.jsxs)(p.a,{sx:{minWidth:240},children:[Object(S.jsx)(I.a,{component:N.b,to:"#",color:"inherit",children:Object(S.jsx)(i.a,{variant:"subtitle2",noWrap:!0,children:r})}),Object(S.jsx)(i.a,{variant:"body2",sx:{color:"text.secondary"},noWrap:!0,children:a})]}),Object(S.jsx)(i.a,{variant:"caption",sx:{pr:3,flexShrink:0,color:"text.secondary"},children:Object(P.e)(o)})]})}var E=n(136),F=n(1832),V=n.n(F),H=n(12),J=n(68),U=n(1821),B=n(674),K=Object(H.a)("div")((function(e){var t=e.theme;return{height:372,marginTop:t.spacing(5),"& .apexcharts-canvas svg":{height:372},"& .apexcharts-canvas svg,.apexcharts-canvas foreignObject":{overflow:"visible"},"& .apexcharts-legend":{height:72,alignContent:"center",position:"relative !important",borderTop:"solid 1px ".concat(t.palette.divider),top:"calc(".concat(300,"px) !important")}}})),$=[4344,5435,1443,4443];function q(){var e=Object(J.a)(),t=Object(E.merge)(Object(B.a)(),{colors:[e.palette.primary.main,e.palette.chart.blue[0],e.palette.chart.violet[0],e.palette.chart.yellow[0]],labels:["America","Asia","Europe","Africa"],stroke:{colors:[e.palette.background.paper]},legend:{floating:!0,horizontalAlign:"center"},dataLabels:{enabled:!0,dropShadow:{enabled:!1}},tooltip:{fillSeriesColor:!1,y:{formatter:function(e){return Object(U.c)(e)},title:{formatter:function(e){return"".concat(e)}}}},plotOptions:{pie:{donut:{labels:{show:!1}}}}});return Object(S.jsxs)(u.a,{children:[Object(S.jsx)(O.a,{title:"Current Visits"}),Object(S.jsx)(K,{dir:"ltr",children:Object(S.jsx)(V.a,{type:"pie",series:$,options:t,height:280})})]})}var Q=n(1808),X=n(2726),Y=n(2727),Z=n(2728),_=n(2729),ee=n(2730),te=n(2299);function ne(){return Object(S.jsxs)(u.a,{sx:{"& .MuiTimelineItem-missingOppositeContent:before":{display:"none"}},children:[Object(S.jsx)(O.a,{title:"Order Timeline"}),Object(S.jsx)(Q.a,{children:Object(S.jsx)(X.a,{children:D.c.map((function(e,t){return Object(S.jsx)(re,{item:e,isLast:t===D.c.length-1},e.id)}))})})]})}function re(e){var t=e.item,n=e.isLast,r=t.type,a=t.title,o=t.time;return Object(S.jsxs)(Y.a,{children:[Object(S.jsxs)(Z.a,{children:[Object(S.jsx)(_.a,{color:("order1"===r?"primary":"order2"===r&&"success")||"order3"===r&&"info"||"order4"===r&&"warning"||"error"}),n?null:Object(S.jsx)(ee.a,{})]}),Object(S.jsxs)(te.a,{children:[Object(S.jsx)(i.a,{variant:"subtitle2",children:a}),Object(S.jsx)(i.a,{variant:"caption",sx:{color:"text.secondary"},children:Object(P.b)(o)})]})]})}var ie=n(1009);function ae(){return Object(S.jsxs)(u.a,{children:[Object(S.jsx)(O.a,{title:"Traffic by Site"}),Object(S.jsx)(Q.a,{children:Object(S.jsx)(a.a,{container:!0,spacing:2,children:D.e.map((function(e){return Object(S.jsx)(oe,{site:e},e.name)}))})})]})}function oe(e){var t=e.site,n=t.icon,r=t.value,o=t.name;return Object(S.jsx)(a.a,{item:!0,xs:6,children:Object(S.jsxs)(ie.a,{variant:"outlined",sx:{py:2.5,textAlign:"center"},children:[Object(S.jsx)(p.a,{sx:{mb:.5},children:n}),Object(S.jsx)(i.a,{variant:"h6",children:Object(U.e)(r)}),Object(S.jsx)(i.a,{variant:"body2",sx:{color:"text.secondary"},children:o})]})})}var ce=[{name:"Team A",type:"column",data:[23,11,22,27,13,22,37,21,44,22,30]},{name:"Team B",type:"area",data:[44,55,41,67,22,43,21,41,56,27,43]},{name:"Team C",type:"line",data:[30,25,36,30,45,35,64,52,59,36,39]}];function se(){var e=Object(E.merge)(Object(B.a)(),{stroke:{width:[0,2,3]},plotOptions:{bar:{columnWidth:"14%"}},fill:{type:["solid","gradient","solid"]},labels:["01/01/2003","02/01/2003","03/01/2003","04/01/2003","05/01/2003","06/01/2003","07/01/2003","08/01/2003","09/01/2003","10/01/2003","11/01/2003"],xaxis:{type:"datetime"},tooltip:{shared:!0,intersect:!1,y:{formatter:function(e){return"undefined"!==typeof e?"".concat(e.toFixed(0)," visits"):e}}}});return Object(S.jsxs)(u.a,{children:[Object(S.jsx)(O.a,{title:"Website Visits",subheader:"(+43%) than last year"}),Object(S.jsx)(p.a,{sx:{p:3,pb:1},dir:"ltr",children:Object(S.jsx)(V.a,{type:"line",series:ce,options:e,height:364})})]})}var le=n(98),je=Object(H.a)(u.a)((function(e){return{boxShadow:"none",textAlign:"center",padding:e.theme.spacing(5,0)}})),de=Object(H.a)("div")((function(e){var t=e.theme;return{margin:"auto",display:"flex",borderRadius:"50%",alignItems:"center",width:t.spacing(8),height:t.spacing(8),justifyContent:"center",marginBottom:t.spacing(3)}}));function be(e){var t=e.title,n=e.total,r=e.icon,a=e.color,o=void 0===a?"primary":a;return Object(S.jsxs)(je,{sx:{color:function(e){return e.palette[o].darker},bgcolor:function(e){return e.palette[o].lighter}},children:[Object(S.jsx)(de,{sx:{color:function(e){return e.palette[o].dark},backgroundImage:function(e){return"linear-gradient(135deg, ".concat(Object(le.a)(e.palette[o].dark,0)," 0%, ").concat(Object(le.a)(e.palette[o].dark,.24)," 100%)")}},children:Object(S.jsx)(w.a,{icon:r,width:24,height:24})}),Object(S.jsx)(i.a,{variant:"h3",children:Object(U.e)(n)}),Object(S.jsx)(i.a,{variant:"subtitle2",sx:{opacity:.72},children:t})]})}var ue=Object(H.a)("div")((function(e){var t=e.theme;return{height:392,marginTop:t.spacing(2),"& .apexcharts-canvas svg":{height:392},"& .apexcharts-canvas svg,.apexcharts-canvas foreignObject":{overflow:"visible"},"& .apexcharts-legend":{height:72,alignContent:"center",position:"relative !important",borderTop:"solid 1px ".concat(t.palette.divider),top:"calc(".concat(320,"px) !important")}}})),Oe=[{name:"Series 1",data:[80,50,30,40,100,20]},{name:"Series 2",data:[20,30,40,80,20,80]},{name:"Series 3",data:[44,76,78,13,43,10]}];function pe(){var e=Object(J.a)(),t=Object(E.merge)(Object(B.a)(),{stroke:{width:2},fill:{opacity:.48},legend:{floating:!0,horizontalAlign:"center"},xaxis:{categories:["English","History","Physics","Geography","Chinese","Math"],labels:{style:{colors:[e.palette.text.secondary,e.palette.text.secondary,e.palette.text.secondary,e.palette.text.secondary,e.palette.text.secondary,e.palette.text.secondary]}}}});return Object(S.jsxs)(u.a,{children:[Object(S.jsx)(O.a,{title:"Current Subject"}),Object(S.jsx)(ue,{dir:"ltr",children:Object(S.jsx)(V.a,{type:"radar",series:Oe,options:t,height:340})})]})}var xe=[{data:[400,430,448,470,540,580,690,1100,1200,1380]}];function he(){var e=Object(E.merge)(Object(B.a)(),{tooltip:{marker:{show:!1},y:{formatter:function(e){return Object(U.c)(e)},title:{formatter:function(){return""}}}},plotOptions:{bar:{horizontal:!0,barHeight:"28%",borderRadius:2}},xaxis:{categories:["Italy","Japan","China","Canada","France","Germany","South Korea","Netherlands","United States","United Kingdom"]}});return Object(S.jsxs)(u.a,{children:[Object(S.jsx)(O.a,{title:"Conversion Rates",subheader:"(+43%) than last year"}),Object(S.jsx)(p.a,{sx:{mx:3},dir:"ltr",children:Object(S.jsx)(V.a,{type:"bar",series:xe,options:e,height:364})})]})}function me(){var e=Object(o.a)().themeStretch;return Object(S.jsx)(c.a,{title:"General: Analytics",children:Object(S.jsxs)(r.a,{maxWidth:!e&&"xl",children:[Object(S.jsx)(i.a,{variant:"h4",sx:{mb:5},children:"Hi, Welcome back"}),Object(S.jsxs)(a.a,{container:!0,spacing:3,children:[Object(S.jsx)(a.a,{item:!0,xs:12,sm:6,md:3,children:Object(S.jsx)(be,{title:"Weekly Sales",total:714e3,icon:"ant-design:android-filled"})}),Object(S.jsx)(a.a,{item:!0,xs:12,sm:6,md:3,children:Object(S.jsx)(be,{title:"New Users",total:1352831,color:"info",icon:"ant-design:apple-filled"})}),Object(S.jsx)(a.a,{item:!0,xs:12,sm:6,md:3,children:Object(S.jsx)(be,{title:"Item Orders",total:1723315,color:"warning",icon:"ant-design:windows-filled"})}),Object(S.jsx)(a.a,{item:!0,xs:12,sm:6,md:3,children:Object(S.jsx)(be,{title:"Bug Reports",total:234,color:"error",icon:"ant-design:bug-filled"})}),Object(S.jsx)(a.a,{item:!0,xs:12,md:6,lg:8,children:Object(S.jsx)(se,{})}),Object(S.jsx)(a.a,{item:!0,xs:12,md:6,lg:4,children:Object(S.jsx)(q,{})}),Object(S.jsx)(a.a,{item:!0,xs:12,md:6,lg:8,children:Object(S.jsx)(he,{})}),Object(S.jsx)(a.a,{item:!0,xs:12,md:6,lg:4,children:Object(S.jsx)(pe,{})}),Object(S.jsx)(a.a,{item:!0,xs:12,md:6,lg:8,children:Object(S.jsx)(z,{})}),Object(S.jsx)(a.a,{item:!0,xs:12,md:6,lg:4,children:Object(S.jsx)(ne,{})}),Object(S.jsx)(a.a,{item:!0,xs:12,md:6,lg:4,children:Object(S.jsx)(ae,{})}),Object(S.jsx)(a.a,{item:!0,xs:12,md:6,lg:8,children:Object(S.jsx)(T,{})})]})]})})}}}]);
//# sourceMappingURL=31.82a18dd7.chunk.js.map