!function(e,t){for(var o in t)e[o]=t[o]}(exports,function(e){var t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=7)}([function(e,t){e.exports=require("mongoose")},,function(e,t){e.exports=require("bcryptjs")},function(e,t,o){const r=o(0),n=new(0,r.Schema)({name:{type:String},email:{type:String,unique:!0,sparse:!0},password:{type:String},public_visible:{type:Boolean,default:!1},is_deleted:{type:Boolean,default:!1}});var s;n.methods.toJSON=function(){var e=this.toObject();return delete e.password,e},s=r.models.User?r.model("User"):r.model("User",n),e.exports=s},,,,function(e,t,o){const r=o(0),n={"Access-Control-Allow-Origin":"*","Access-Control-Allow-Methods":"POST,GET,PUT,OPTIONS","Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept"},s="mongodb+srv://admin1:alam2244@cluster0-vpqe0.mongodb.net/bookydb",i=o(2),d=o(8);t.handler=async(e,t)=>{if("POST"!==e.httpMethod)return{statusCode:405,body:"Method Not Allowed"};try{console.log("mongocon",s),r.connect(s,{useNewUrlParser:!0,useCreateIndex:!0,useFindAndModify:!1});const t=o(3),a=JSON.parse(e.body),u=a.email,l=await t.findOne({email:u});if(l){if(i.compareSync(a.password,l.password)){l.password=void 0;const e=d.sign({data:l,role:"User"},"lambda-jwt",{expiresIn:"7d"});return{statusCode:200,headers:n,body:JSON.stringify(e)}}return console.log("password doesnot match"),{statusCode:401,headers:n,body:"password doesnot match"}}{const e="This user doesnot exists. Please signup first";return{statusCode:401,headers:n,body:JSON.stringify(e)}}}catch(e){return console.log("ex",e),{statusCode:401,headers:n,body:JSON.stringify(e)}}}},function(e,t){e.exports=require("jsonwebtoken")}]));