(this["webpackJsonp@minimal/minimal-kit-react"]=this["webpackJsonp@minimal/minimal-kit-react"]||[]).push([[125],{1821:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"d",(function(){return c})),n.d(t,"c",(function(){return o})),n.d(t,"e",(function(){return l})),n.d(t,"b",(function(){return d}));var i=n(136),a=n(1829),r=n.n(a);function s(e){return r()(e).format(Number.isInteger(e)?"$0,0":"$0,0.00")}function c(e){return r()(e/100).format("0.0%")}function o(e){return r()(e).format()}function l(e){return Object(i.replace)(r()(e).format("0.00a"),".00","")}function d(e){return r()(e).format("0.0 b")}},1840:function(e,t,n){"use strict";n.d(t,"c",(function(){return d})),n.d(t,"b",(function(){return O})),n.d(t,"a",(function(){return R}));var i=n(4),a=n(12),r=n(269),s=n(0),c=Object(a.a)(r.a,{shouldForwardProp:function(e){return"rounded"!==e}})((function(e){var t=e.rounded;return{display:"flex",listStyle:"none",alignItems:"center",justifyContent:"center","& li":{width:18,height:18,opacity:.32,cursor:"pointer"},"& li.slick-active":Object(i.a)({opacity:1},t&&{"& .dotActive":{width:16,borderRadius:6}})}})),o=Object(a.a)("div")((function(){return{width:"100%",height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}})),l=Object(a.a)("span")((function(e){var t=e.theme;return{width:8,height:8,borderRadius:"50%",transition:t.transitions.create("width",{easing:t.transitions.easing.sharp,duration:t.transitions.duration.short})}}));function d(e){var t=null===e||void 0===e?void 0:e.color,n=(null===e||void 0===e?void 0:e.rounded)||!1;return{appendDots:function(t){return Object(s.jsx)(s.Fragment,{children:Object(s.jsx)(c,Object(i.a)(Object(i.a)({rounded:n,component:"ul"},e),{},{children:t}))})},customPaging:function(){return Object(s.jsx)(o,{children:Object(s.jsx)(l,{className:"dotActive",sx:{bgcolor:t||"primary.main"}})})}}}var j=n(25),b=n(68),h=n(1002),u=n(41),m=n(78),x=["filled","customIcon","onNext","onPrevious","children"],p=Object(a.a)(m.c,{shouldForwardProp:function(e){return"filled"!==e}})((function(e){var t=e.filled,n=e.theme;return Object(i.a)({width:40,height:40,cursor:"pointer",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center","&:hover":{color:n.palette.text.primary}},t&&{opacity:.48,borderRadius:1.5*Number(n.shape.borderRadius),color:n.palette.common.white,backgroundColor:n.palette.grey[900],"&:hover":{opacity:1,color:n.palette.common.white,backgroundColor:n.palette.grey[900]}})}));function O(e){var t=e.filled,n=void 0!==t&&t,a=e.customIcon,c=e.onNext,o=e.onPrevious,l=e.children,d=Object(j.a)(e,x),u="rtl"===Object(b.a)().direction,m={position:"absolute",mt:-2.5,top:"50%",zIndex:9};return l?Object(s.jsxs)(r.a,Object(i.a)(Object(i.a)({},d),{},{children:[Object(s.jsx)(r.a,{className:"arrow left",sx:Object(i.a)(Object(i.a)({},m),{},{left:0}),children:Object(s.jsx)(p,{filled:n,onClick:o,children:g(a,u)})}),l,Object(s.jsx)(r.a,{className:"arrow right",sx:Object(i.a)(Object(i.a)({},m),{},{right:0}),children:Object(s.jsx)(p,{filled:n,onClick:c,children:v(a,u)})})]})):Object(s.jsxs)(h.a,Object(i.a)(Object(i.a)({direction:"row",spacing:1},d),{},{children:[Object(s.jsx)(p,{className:"arrow left",filled:n,onClick:o,children:g(a,u)}),Object(s.jsx)(p,{className:"arrow right",filled:n,onClick:c,children:v(a,u)})]}))}var g=function(e,t){return Object(s.jsx)(u.a,{icon:e||"eva:arrow-right-fill",sx:Object(i.a)({width:20,height:20,transform:" scaleX(-1)"},t&&{transform:" scaleX(1)"})})},v=function(e,t){return Object(s.jsx)(u.a,{icon:e||"eva:arrow-right-fill",sx:Object(i.a)({width:20,height:20},t&&{transform:" scaleX(-1)"})})},f=n(98),y=n(1682),w=n(407),k=["index","total","onNext","onPrevious","customIcon"],C=Object(a.a)(r.a)((function(e){var t=e.theme;return{zIndex:9,display:"flex",alignItems:"center",position:"absolute",bottom:t.spacing(2),right:t.spacing(2),color:t.palette.common.white,borderRadius:t.shape.borderRadius,backgroundColor:Object(f.a)(t.palette.grey[900],.48)}})),I=Object(a.a)(y.a)((function(e){return{padding:6,opacity:.48,color:e.theme.palette.common.white,"&:hover":{opacity:1}}}));function R(e){var t=e.index,n=e.total,a=e.onNext,r=e.onPrevious,c=e.customIcon,o=Object(j.a)(e,k),l="rtl"===Object(b.a)().direction;return Object(s.jsxs)(C,Object(i.a)(Object(i.a)({},o),{},{children:[Object(s.jsx)(I,{size:"small",onClick:r,children:A(c,l)}),Object(s.jsxs)(w.a,{variant:"subtitle2",children:[t+1,"/",n]}),Object(s.jsx)(I,{size:"small",onClick:a,children:T(c,l)})]}))}var A=function(e,t){return Object(s.jsx)(u.a,{icon:e||"eva:arrow-right-fill",sx:Object(i.a)({width:20,height:20,transform:" scaleX(-1)"},t&&{transform:" scaleX(1)"})})},T=function(e,t){return Object(s.jsx)(u.a,{icon:e||"eva:arrow-right-fill",sx:Object(i.a)({width:20,height:20},t&&{transform:" scaleX(-1)"})})}},2853:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return V}));var i=n(10),a=n(12),r=n(1653),s=n(671),c=n(1768),o=n(1785),l=n(269),d=n(407),j=n(78),b=n(0),h=Object(a.a)("div")((function(e){var t=e.theme;return Object(i.a)({backgroundSize:"cover",backgroundPosition:"center",backgroundImage:"url(https://minimal-assets-api.vercel.app/assets/overlay.svg), url(https://minimal-assets-api.vercel.app/assets/images/about/hero.jpg)",padding:t.spacing(10,0)},t.breakpoints.up("md"),{height:560,padding:0})})),u=Object(a.a)("div")((function(e){var t=e.theme;return Object(i.a)({textAlign:"center"},t.breakpoints.up("md"),{textAlign:"left",position:"absolute",bottom:t.spacing(10)})}));function m(){return Object(b.jsx)(j.d,{children:Object(b.jsx)(h,{children:Object(b.jsx)(o.a,{sx:{position:"relative",height:"100%"},children:Object(b.jsxs)(u,{children:[Object(b.jsx)(j.f,{text:"Who",sx:{color:"primary.main"},variants:Object(j.k)().inRight}),Object(b.jsx)("br",{}),Object(b.jsxs)(l.a,{sx:{display:"inline-flex",color:"common.white"},children:[Object(b.jsx)(j.f,{text:"we",sx:{mr:2}}),Object(b.jsx)(j.f,{text:"are?"})]}),Object(b.jsx)(c.a.div,{variants:Object(j.k)().inRight,children:Object(b.jsxs)(d.a,{variant:"h4",sx:{mt:5,color:"common.white",fontWeight:"fontWeightMedium"},children:["Let's work together and",Object(b.jsx)("br",{})," make awesome site easily"]})})]})})})})}var x=n(68),p=n(98),O=n(1781),g=n(544),v=n(1991),f=n(169),y=n(1821),w=n(350),k=n(349),C=n(41),I=Object(a.a)("div")((function(e){var t=e.theme;return Object(i.a)({textAlign:"center",paddingTop:t.spacing(20),paddingBottom:t.spacing(10)},t.breakpoints.up("md"),{textAlign:"left"})}));function R(){var e=Object(x.a)(),t=Object(f.a)("up","md"),n="light"===e.palette.mode,i="-40px 40px 80px ".concat(Object(p.a)(n?e.palette.grey[500]:e.palette.common.black,.48));return Object(b.jsx)(I,{children:Object(b.jsx)(o.a,{children:Object(b.jsxs)(O.a,{container:!0,spacing:3,children:[t&&Object(b.jsx)(O.a,{item:!0,xs:12,md:6,lg:7,sx:{pr:{md:7}},children:Object(b.jsxs)(O.a,{container:!0,spacing:3,alignItems:"flex-end",children:[Object(b.jsx)(O.a,{item:!0,xs:6,children:Object(b.jsx)(j.e,{variants:Object(j.k)().inUp,children:Object(b.jsx)(k.a,{src:"https://minimal-assets-api.vercel.app/assets/images/about/what-1.jpg",ratio:"3/4",sx:{borderRadius:2,boxShadow:i}})})}),Object(b.jsx)(O.a,{item:!0,xs:6,children:Object(b.jsx)(j.e,{variants:Object(j.k)().inUp,children:Object(b.jsx)(k.a,{src:"https://minimal-assets-api.vercel.app/assets/images/about/what-2.jpg",ratio:"1/1",sx:{borderRadius:2}})})})]})}),Object(b.jsxs)(O.a,{item:!0,xs:12,md:6,lg:5,children:[Object(b.jsx)(j.e,{variants:Object(j.k)().inRight,children:Object(b.jsx)(d.a,{variant:"h2",sx:{mb:3},children:"What is minimal?"})}),Object(b.jsx)(j.e,{variants:Object(j.k)().inRight,children:Object(b.jsx)(d.a,{sx:{color:function(e){return"light"===e.palette.mode?"text.secondary":"common.white"}},children:"Our theme is the most advanced and user-friendly theme you will find on the market, we have documentation and video to help set your site really easily, pre-installed demos you can import in one click and everything from the theme options to page content can be edited from the front-end. This is the theme you are looking for."})}),Object(b.jsx)(l.a,{sx:{my:5},children:w.H.map((function(e){return Object(b.jsx)(j.e,{variants:Object(j.k)().inRight,children:Object(b.jsx)(A,{progress:e})},e.label)}))}),Object(b.jsx)(j.e,{variants:Object(j.k)().inRight,children:Object(b.jsx)(g.a,{variant:"outlined",color:"inherit",size:"large",endIcon:Object(b.jsx)(C.a,{icon:"ic:round-arrow-right-alt",width:24,height:24}),children:"Check out our work"})})]})]})})})}function A(e){var t=e.progress,n=t.label,i=t.value;return Object(b.jsxs)(l.a,{sx:{mt:3},children:[Object(b.jsxs)(l.a,{sx:{mb:1.5,display:"flex",alignItems:"center"},children:[Object(b.jsxs)(d.a,{variant:"subtitle2",children:[n,"\xa0-\xa0"]}),Object(b.jsx)(d.a,{variant:"body2",sx:{color:"text.secondary"},children:Object(y.d)(i)})]}),Object(b.jsx)(v.a,{variant:"determinate",value:i,sx:{"& .MuiLinearProgress-bar":{bgcolor:"grey.700"},"&.MuiLinearProgress-determinate":{bgcolor:"divider"}}})]})}var T=n(4),N=n(1),P=n(1853),W=n.n(P),z=n(1805),U=n(1002),S=n(1840),B=n(682);function M(){var e=Object(N.useRef)(null),t=Object(x.a)(),n={arrows:!1,slidesToShow:4,centerMode:!0,centerPadding:"0px",rtl:Boolean("rtl"===t.direction),responsive:[{breakpoint:1279,settings:{slidesToShow:3}},{breakpoint:959,settings:{slidesToShow:2}},{breakpoint:600,settings:{slidesToShow:1}}]};return Object(b.jsxs)(o.a,{sx:{pb:10,textAlign:"center"},children:[Object(b.jsx)(j.e,{variants:Object(j.k)().inDown,children:Object(b.jsx)(d.a,{component:"p",variant:"overline",sx:{mb:2,color:"text.secondary"},children:"Dream team"})}),Object(b.jsx)(j.e,{variants:Object(j.k)().inUp,children:Object(b.jsx)(d.a,{variant:"h2",sx:{mb:3},children:"Great team is the key"})}),Object(b.jsx)(j.e,{variants:Object(j.k)().inUp,children:Object(b.jsx)(d.a,{sx:{mx:"auto",maxWidth:630,color:function(e){return"light"===e.palette.mode?"text.secondary":"common.white"}},children:"Minimal will provide you support if you have any problems, our support team will reply within a day and we also have detailed documentation."})}),Object(b.jsx)(l.a,{sx:{position:"relative"},children:Object(b.jsx)(S.b,{filled:!0,onNext:function(){e.current.slickNext()},onPrevious:function(){e.current.slickPrev()},children:Object(b.jsx)(W.a,Object(T.a)(Object(T.a)({ref:e},n),{},{children:w.t.map((function(e){return Object(b.jsx)(j.e,{variants:Object(j.k)().in,sx:{px:1.5,py:10},children:Object(b.jsx)(X,{member:e})},e.id)}))}))})}),Object(b.jsx)(g.a,{variant:"outlined",color:"inherit",size:"large",endIcon:Object(b.jsx)(C.a,{icon:"ic:round-arrow-right-alt",width:24,height:24}),sx:{mx:"auto"},children:"View all team members"})]})}function X(e){var t=e.member,n=t.name,i=t.role,a=t.avatar;return Object(b.jsxs)(z.a,{sx:{p:1},children:[Object(b.jsx)(d.a,{variant:"subtitle1",sx:{mt:2,mb:.5},children:n}),Object(b.jsx)(d.a,{variant:"body2",sx:{mb:2,color:"text.secondary"},children:i}),Object(b.jsx)(k.a,{src:a,ratio:"1/1",sx:{borderRadius:1.5}}),Object(b.jsx)(U.a,{alignItems:"center",sx:{mt:2,mb:1},children:Object(b.jsx)(B.a,{sx:{color:"action.active"}})})]},n)}function _(){return Object(b.jsxs)(o.a,{sx:{mt:10},children:[Object(b.jsxs)(l.a,{sx:{mb:10,position:"relative",borderRadius:2,overflow:"hidden"},children:[Object(b.jsx)(k.a,{src:"https://minimal-assets-api.vercel.app/assets/images/about/vision.jpg",alt:"about-vision",effect:"black-and-white"}),Object(b.jsx)(l.a,{sx:{bottom:{xs:24,md:80},width:"100%",display:"flex",flexWrap:"wrap",alignItems:"center",position:"absolute",justifyContent:"center"},children:["logo_amazon","logo_hbo","logo_ibm","logo_lya","logo_spotify","logo_netflix"].map((function(e){return Object(b.jsx)(j.e,{variants:Object(j.k)().in,children:Object(b.jsx)(k.a,{src:"/assets/logos/".concat(e,".svg"),sx:{m:{xs:1.5,md:3},height:{xs:24,md:32}}})},e)}))})]}),Object(b.jsx)(O.a,{container:!0,justifyContent:"center",children:Object(b.jsx)(O.a,{item:!0,xs:12,sm:8,children:Object(b.jsx)(j.e,{variants:Object(j.k)().inUp,children:Object(b.jsx)(d.a,{variant:"h3",sx:{textAlign:"center"},children:"Our vision offering the best product nulla vehicula tortor scelerisque ultrices malesuada."})})})})]})}var J=n(1681),D=n(1009),F=n(1962),L=n(148),q=[{name:"Jenny Wilson",rating:5,dateCreate:"April 19, 2021",content:"Excellent Work! Thanks a lot!"},{name:"Cody Fisher",rating:5,dateCreate:"April 19, 2021",content:"It's a very good dashboard and we are really liking the product . We've done some things, like migrate to TS and implementing a react useContext api, to fit our job methodology but the product is one of the best in terms of design and application architecture. The team did a really good job."},{name:"Marvin McKinney",rating:5,dateCreate:"April 19, 2021",content:"Customer support is realy fast and helpful the desgin of this theme is looks amazing also the code is very clean and readble realy good job !"},{name:"Darrell Steward",rating:5,dateCreate:"April 19, 2021",content:"Amazing, really good code quality and gives you a lot of examples for implementations."},{name:"Jacob Jones",rating:5,dateCreate:"April 19, 2021",content:"Got a few questions after purchasing the product. The owner responded very fast and very helpfull. Overall the code is excellent and works very good. 5/5 stars!"},{name:"Bessie Cooper",rating:5,dateCreate:"April 19, 2021",content:"CEO of Codealy.io here. We\u2019ve built a developer assessment platform that makes sense - tasks are based on git repositories and run in virtual machines. We automate the pain points - storing candidates code, running it and sharing test results with the whole team, remotely. Bought this template as we need to provide an awesome dashboard for our early customers. I am super happy with purchase. The code is just as good as the design. Thanks!"}],E=Object(a.a)("div")((function(e){var t=e.theme;return Object(i.a)({textAlign:"center",padding:t.spacing(10,0),backgroundSize:"cover",backgroundImage:"linear-gradient(to right, ".concat(Object(p.a)(t.palette.grey[900],.8)," , ").concat(Object(p.a)(t.palette.grey[900],.8),"), url(https://minimal-assets-api.vercel.app/assets/images/about/testimonials.jpg)")},t.breakpoints.up("md"),{textAlign:"left",padding:0,height:840,overflow:"hidden"})}));function G(){var e=Object(f.a)("up","md");return Object(b.jsx)(E,{children:Object(b.jsxs)(o.a,{sx:{position:"relative",height:"100%"},children:[Object(b.jsxs)(O.a,{container:!0,spacing:3,alignItems:"center",justifyContent:{xs:"center",md:"space-between"},sx:{height:"100%"},children:[Object(b.jsx)(O.a,{item:!0,xs:10,md:4,children:Object(b.jsxs)(l.a,{sx:{maxWidth:{md:360}},children:[Object(b.jsx)(j.e,{variants:Object(j.k)().inUp,children:Object(b.jsx)(d.a,{component:"p",variant:"overline",sx:{mb:2,color:"text.secondary"},children:"Testimonials"})}),Object(b.jsx)(j.e,{variants:Object(j.k)().inUp,children:Object(b.jsxs)(d.a,{variant:"h2",sx:{mb:3,color:"common.white"},children:["Who love ",Object(b.jsx)("br",{}),"my work"]})}),Object(b.jsx)(j.e,{variants:Object(j.k)().inUp,children:Object(b.jsx)(d.a,{sx:{color:"common.white"},children:"Our goal is to create a product and service that you\u2019re satisfied with and use it every day. This is why we\u2019re constantly working on our services to make it better every day and really listen to what our users has to say."})}),!e&&Object(b.jsx)(l.a,{sx:{mt:3,display:"flex",justifyContent:"center"},children:Object(b.jsx)(j.e,{variants:Object(j.k)().inUp,children:Object(b.jsx)($,{})})})]})}),Object(b.jsx)(O.a,{item:!0,xs:12,md:7,lg:6,sx:{right:{md:24},position:{md:"absolute"}},children:Object(b.jsxs)(O.a,{container:!0,spacing:e?3:0,alignItems:"center",children:[Object(b.jsx)(O.a,{item:!0,xs:12,md:6,children:q.slice(0,3).map((function(e){return Object(b.jsx)(j.e,{variants:Object(j.k)().inUp,children:Object(b.jsx)(H,{testimonial:e})},e.name)}))}),Object(b.jsx)(O.a,{item:!0,xs:12,md:6,children:q.slice(3,6).map((function(e){return Object(b.jsx)(j.e,{variants:Object(j.k)().inUp,children:Object(b.jsx)(H,{testimonial:e})},e.name)}))})]})})]}),e&&Object(b.jsx)(l.a,{sx:{bottom:60,position:"absolute"},children:Object(b.jsx)(j.e,{variants:Object(j.k)().inLeft,children:Object(b.jsx)($,{})})})]})})}function $(){return Object(b.jsxs)(J.a,{href:"#",variant:"subtitle2",sx:{display:"flex",alignItems:"center"},children:["Read more testimonials",Object(b.jsx)(C.a,{icon:"ic:round-arrow-right-alt",sx:{ml:1,width:20,height:20}})]})}function H(e){var t=e.testimonial,n=Object(x.a)(),i=t.name,a=t.rating,r=t.dateCreate,s=t.content;return Object(b.jsxs)(D.a,{sx:Object(T.a)({mt:3,p:3,color:"common.white"},Object(L.a)().bgBlur({color:n.palette.common.white,opacity:.04})),children:[Object(b.jsx)(d.a,{variant:"subtitle1",gutterBottom:!0,children:i}),Object(b.jsx)(d.a,{gutterBottom:!0,component:"p",variant:"caption",sx:{color:"grey.500"},children:r}),Object(b.jsx)(F.a,{value:a,readOnly:!0,size:"small"}),Object(b.jsx)(d.a,{variant:"body2",sx:{mt:1.5},children:s})]})}var K=Object(a.a)("div")((function(e){var t=e.theme;return Object(i.a)({paddingTop:t.spacing(8)},t.breakpoints.up("md"),{paddingTop:t.spacing(11)})}));function V(){return Object(b.jsx)(s.a,{title:"About us",children:Object(b.jsxs)(K,{children:[Object(b.jsx)(m,{}),Object(b.jsx)(R,{}),Object(b.jsx)(_,{}),Object(b.jsx)(r.a,{orientation:"vertical",sx:{my:10,mx:"auto",width:2,height:40}}),Object(b.jsx)(M,{}),Object(b.jsx)(G,{})]})})}}}]);
//# sourceMappingURL=125.26e03f4b.chunk.js.map