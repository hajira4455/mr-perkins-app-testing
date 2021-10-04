(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[58],{1379:function(e,t,n){"use strict";n.r(t);var a=n(505),c=n(18),r=n(1),i=n(472),s=n(473),o=n(465),l=n(466),u=n(468),d=n(511),f=n(744),b=n(471),m=n(475),j=n(452),h=n(858),O=n(1115),p=n.n(O),x=n(1116),g=n.n(x),v=n(743),y=n(125),w=n(684),N=n(6),k=g()(p.a);t.default=function(){var e=Object(r.useState)([]),t=Object(c.a)(e,2),n=t[0],O=t[1],p=Object(y.c)((function(e){return e.offers})).offers,x=Object(y.b)();Object(r.useEffect)((function(){x(Object(w.b)())}),[]),Object(r.useEffect)((function(){O(p)}),[p]);return Object(N.jsx)("div",{children:Object(N.jsxs)(i.a,{children:[Object(N.jsx)(s.a,{md:6,children:Object(N.jsxs)(o.a,{className:"p-2",children:[Object(N.jsx)(l.a,{children:"Create New Offer"}),Object(N.jsx)(u.a,{children:Object(N.jsxs)(d.a,{onSubmit:function(e){e.preventDefault();var t,n=new FormData(e.target),r={},i=Object(a.a)(n.entries());try{for(i.s();!(t=i.n()).done;){var s=Object(c.a)(t.value,2),o=s[0],l=s[1];r[o]=l}}catch(u){i.e(u)}finally{i.f()}x(Object(w.a)(r)).then((function(e){k.fire({title:"Offer Saved",customClass:{confirmButton:"btn btn-primary"},showClass:{popup:"animate__animated animate__bounceIn"},buttonsStyling:!1})}))},encType:"multipart/form-data",children:[Object(N.jsxs)(f.a,{className:"mb-2 mr-sm-2 mb-sm-0",children:[Object(N.jsx)(b.a,{for:"image",className:"mr-sm-2",children:"Offer Image"}),Object(N.jsx)(m.a,{type:"file",name:"image",id:"image"})]}),Object(N.jsxs)(f.a,{className:"mb-2 mr-sm-2",children:[Object(N.jsx)(b.a,{for:"captions",className:"mr-sm-2",children:"Caption"}),Object(N.jsx)(m.a,{type:"text",name:"captions",id:"captions",placeholder:"caption title for image"})]}),Object(N.jsxs)(f.a,{className:"mb-2 mr-sm-2",children:[Object(N.jsx)(b.a,{for:"validTill",className:"mr-sm-2",children:"Valid Till"}),Object(N.jsx)(m.a,{type:"text",name:"validTill",id:"validTill",placeholder:"Validitiy of the offer"})]}),Object(N.jsx)(j.a,{children:"Submit"})]})})]})}),Object(N.jsx)(s.a,{md:6,children:Object(N.jsxs)(o.a,{className:"p-2",children:[Object(N.jsx)(l.a,{children:"All Offers"}),Object(N.jsx)(u.a,{children:Object(N.jsx)("div",{className:"singleOffer",children:n.length>0&&n.map((function(e){return Object(N.jsxs)(i.a,{children:[Object(N.jsx)(s.a,{md:11,children:Object(N.jsxs)(h.a,{children:[Object(N.jsx)(h.a,{left:!0,href:"#",children:Object(N.jsx)("div",{className:"imagedisplayer",style:{width:"300px",height:"300px",backgroundImage:"url(".concat(e.image,")"),backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"contain"}})}),Object(N.jsx)(h.a,{body:!0,children:Object(N.jsx)(h.a,{heading:!0,children:e.captions})})]})}),Object(N.jsx)(s.a,{md:1,children:Object(N.jsx)(j.a,{color:"primary",onClick:function(){var t;t=e.id,k.fire({title:"Are you sure?",text:"You won't be able to revert this!",icon:"warning",showCancelButton:!0,confirmButtonText:"Yes, delete it!",customClass:{confirmButton:"btn btn-primary",cancelButton:"btn btn-outline-danger ml-1"},buttonsStyling:!1}).then((function(e){return x(Object(w.c)(t)),e})).then((function(e){e.value&&k.fire({icon:"success",title:"Deleted!",text:"Your file has been deleted.",customClass:{confirmButton:"btn btn-success"}})}))},outline:!0,size:"sm",children:Object(N.jsx)(v.a,{size:14,className:"mr-25"})})})]},e.id)}))})})]})})]})})}},684:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"c",(function(){return o})),n.d(t,"b",(function(){return l}));var a=n(462),c=n.n(a),r=n(463),i=n(467),s=function(e){return function(){var t=Object(r.a)(c.a.mark((function t(n){var a,r,s,o;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(a=i.d.collection("offers"),r=(1e32*Math.random()).toString(36),!e.image){t.next=9;break}return s=e.image,o=i.e.ref("/images/".concat(r)).put(s),t.next=7,o.on("state_changed",(function(e){console.log(e)}),(function(e){console.log(e),console.log(e)}),(function(){i.e.ref("images").child(r).getDownloadURL().then((function(t){e.image=t,a.add(e).then((function(e){a.get().then((function(e){var t=[];return e.docs.map((function(e){var n=e.data();n.id=e.id,t.push(n)})),n({type:"GET_ALL_OFFERS",data:t})}))}))})).catch((function(e){console.log(e)}))}));case 7:t.next=10;break;case 9:alert("image not found");case 10:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},o=function(e){return function(){var t=Object(r.a)(c.a.mark((function t(n){var a;return c.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a=i.d.collection("offers"),t.next=3,a.doc(e).delete();case 3:return t.sent,t.abrupt("return",n({type:"Offer_Delete",id:e}));case 5:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},l=function(e){return function(e,t){i.d.collection("offers").get().then((function(t){var n=[];return t.docs.map((function(e){var t=e.data();t.id=e.id,n.push(t)})),e({type:"GET_ALL_OFFERS",data:n})}))}}}}]);
//# sourceMappingURL=58.acb5747e.chunk.js.map