(this["webpackJsonp@minimal/minimal-kit-react"]=this["webpackJsonp@minimal/minimal-kit-react"]||[]).push([[145],{1837:function(t,e,o){"use strict";o.d(e,"e",(function(){return s})),o.d(e,"f",(function(){return d})),o.d(e,"c",(function(){return m})),o.d(e,"b",(function(){return O})),o.d(e,"a",(function(){return x})),o.d(e,"d",(function(){return w}));var n=o(4),r=o(25),a=o(1822),c=o(12),i=o(0),p=["children","onClose"],u=Object(c.a)(a.h)((function(t){var e=t.theme,o="rtl"===e.direction;return{"& .mapboxgl-popup-content":{maxWidth:180,padding:e.spacing(1),boxShadow:e.customShadows.z20,borderRadius:e.shape.borderRadius,backgroundColor:e.palette.grey[800]},"& .mapboxgl-popup-close-button":{width:24,height:24,fontSize:16,opacity:.48,color:e.palette.common.white,right:o&&"0",left:o&&"auto","&:hover":{opacity:1},"&:focus":{outline:"none"}},"&.mapboxgl-popup-anchor-top .mapboxgl-popup-tip":{marginBottom:-1,borderBottomColor:e.palette.grey[800]},"&.mapboxgl-popup-anchor-right .mapboxgl-popup-tip":{marginLeft:-1,borderLeftColor:e.palette.grey[800]},"&.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip":{marginTop:-1,borderTopColor:e.palette.grey[800]},"&.mapboxgl-popup-anchor-left .mapboxgl-popup-tip":{marginRight:-1,borderRightColor:e.palette.grey[800]}}}));function s(t){var e=t.children,o=t.onClose,a=Object(r.a)(t,p);return Object(i.jsx)(u,Object(n.a)(Object(n.a)({tipSize:8,anchor:"bottom",onClose:o,closeButton:!0,closeOnClick:!1},a),{},{children:e}))}var b=["sx"],l=Object(c.a)("div")((function(t){var e=t.theme;return{zIndex:99,position:"absolute",left:e.spacing(1.5),bottom:e.spacing(3.5),boxShadow:e.customShadows.z8,"& .mapboxgl-ctrl":{border:"none",borderRadius:4,lineHeight:"14px",color:e.palette.common.white,backgroundImage:"linear-gradient(to right, #8a2387, #e94057, #f27121)"}}}));function d(t){var e=t.sx,o=Object(r.a)(t,b);return Object(i.jsx)(l,{sx:e,children:Object(i.jsx)(a.i,Object(n.a)({maxWidth:100,unit:"imperial"},o))})}var j=["onClick"],h=Object(c.a)("svg")((function(t){return{height:20,stroke:"none",cursor:"pointer",fill:t.theme.palette.error.main,transform:"translate(".concat(-10,"px,").concat(-20,"px)")}}));function m(t){var e=t.onClick,o=Object(r.a)(t,j);return Object(i.jsx)(a.f,Object(n.a)(Object(n.a)({},o),{},{children:Object(i.jsx)(h,{viewBox:"0 0 24 24",onClick:e,children:Object(i.jsx)("path",{d:"M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3\n  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9\n  C20.1,15.8,20.2,15.8,20.2,15.7z"})})}))}var g=Object(c.a)(a.c)((function(t){var e=t.theme;return{zIndex:99,borderRadius:8,overflow:"hidden",top:e.spacing(6),left:e.spacing(1.5),boxShadow:e.customShadows.z8}}));function O(t){var e=Object.assign({},t);return Object(i.jsx)(g,Object(n.a)({positionOptions:{enableHighAccuracy:!0},trackUserLocation:!0},e))}var f=Object(c.a)(a.b)((function(t){var e=t.theme;return{zIndex:99,borderRadius:8,overflow:"hidden",top:e.spacing(1.5),left:e.spacing(1.5),boxShadow:e.customShadows.z8,"& span.mapboxgl-ctrl-icon":{transform:" scale(0.75)"}}}));function x(t){var e=Object.assign({},t);return Object(i.jsx)(f,Object(n.a)({},e))}var v=Object(c.a)(a.g)((function(t){var e=t.theme;return{zIndex:99,borderRadius:8,overflow:"hidden",bottom:e.spacing(6),left:e.spacing(1.5),boxShadow:e.customShadows.z8,"& button+button":{borderTop:"1px solid ".concat(e.palette.divider)}}}));function w(t){var e=Object.assign({},t);return Object(i.jsx)(v,Object(n.a)({},e))}},2823:function(t,e,o){"use strict";o.r(e),o.d(e,"default",(function(){return s}));var n=o(4),r=o(3),a=o(1),c=o(1822),i=o(68),p=o(1837),u=o(0);function s(t){var e=Object.assign({},t),o=Object(i.a)(),s=Object(a.useState)(null),b=Object(r.a)(s,2),l=b[0],d=b[1],j=Object(a.useState)({latitude:0,longitude:-100,zoom:3,bearing:0,pitch:0}),h=Object(r.a)(j,2),m=h[0],g=h[1],O={type:"circle",paint:{"circle-radius":10,"circle-color":o.palette.error.main}};return Object(a.useEffect)((function(){var t=window.requestAnimationFrame((function(){return d(function(t){var e=t.center,o=t.angle,n=t.radius;return{type:"Point",coordinates:[e[0]+Math.cos(o)*n,e[1]+Math.sin(o)*n]}}({center:[-100,0],angle:Date.now()/1e3,radius:20}))}));return function(){return window.cancelAnimationFrame(t)}})),Object(u.jsx)(u.Fragment,{children:Object(u.jsxs)(c.l,Object(n.a)(Object(n.a)(Object(n.a)({},m),{},{onViewportChange:g},e),{},{children:[Object(u.jsx)(p.f,{}),Object(u.jsx)(p.d,{}),Object(u.jsx)(p.a,{}),Object(u.jsx)(p.b,{}),l&&Object(u.jsx)(c.j,{type:"geojson",data:l,children:Object(u.jsx)(c.d,Object(n.a)({},O))})]}))})}}}]);
//# sourceMappingURL=145.d29be850.chunk.js.map