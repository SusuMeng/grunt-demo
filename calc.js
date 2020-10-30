/* exported calc */
var reg = /^(0|([1-9]\d*))(\.\d+)?$/ ;// 包含小数的数字
var regE = /^[1-9](\.\d+)?e\d+$/;    // 包含科学计数法的数字
//检查宽度是否合法
function Wcheck() {
  var message, x;
  message = document.getElementById('werrortext');
  message.innerHTML = '';
  x = document.getElementById('width').value;
  try { 
    if(x=='') throw '宽度不能为空！';
				
    if((!reg.test(x) && !regE.test(x))) throw '宽度必须是数值';
    x = Number(x);
    if(x <= 0) throw '宽度必须大于零！';
  }
  catch(err) {
    message.innerHTML = '错误: ' + err;
    document.getElementById('width').value = '';
    setTimeout(document.getElementById('width').focus(),50);
    document.getElementById('perimeter').value='';
    document.getElementById('area').value='';
    return false;
  }
  return true;
}
//检查高度是否合法
function Hcheck() {
  var message, x;
  message = document.getElementById('herrortext');
  message.innerHTML = '';
  x = document.getElementById('height').value;
  try { 
    if(x == '') throw '高度不能为空！';
    if(!reg.test(x) && !regE.test(x)) throw '高度必须是数值';
    x = Number(x);
    if(x <= 0) throw '高度必须大于零！';
  }
  catch(err) {
    message.innerHTML = '错误: ' + err;
    document.getElementById('height').value = '';
    setTimeout(document.getElementById('height').focus(),50);
    document.getElementById('perimeter').value='';
    document.getElementById('area').value='';
    return false;
  } 
  return true;
}

function calc() {
  // 获取输入数据
  var width = document.getElementById('width').value;
  var height = document.getElementById('height').value;
  //如果高度和宽度不合法停止运行
  if(!Wcheck()||!Hcheck()) {
    return;
  }
  //清除空格
  width = width.replace(' ','');
  height = height.replace(' ','');
  // 格式化科学计数法
  /*if(width.indexOf('e') != -1) {
      var t = width.split("e");
          width = '' + (t[0] * Math.pow(10, t[1]));
    }
    if(height.indexOf('e') != -1) {
        var t = height.split("e");
            height = ''+(t[0] * Math.pow(10, t[1]));
}*/
  //清除浮点误差计算面积和周长
  width=parseFloat(width);
  height=parseFloat(height);	
  var r1,r2,s1=width.toString(),s2=height.toString();
  if(s1.indexOf('.')!= -1){
    r1=s1.split('.')[1].length;
  }else{r1=0;}
  if(s2.indexOf('.')!= -1){
    r2=s2.split('.')[1].length;
  }else{r2=0;}
  var m= r1+r2 ;
  var n= Math.pow(10,Math.max(r1,r2));
  var zc= ((width*n+height*n)/n)*2;
  var mj= Number(s1.replace('.',''))*Number(s2.replace('.',''))/Math.pow(10,m) ; 
  document.getElementById('perimeter').value=zc;
  document.getElementById('area').value=mj;
}
window.onload = function (){
  var btn = document.getElementById('btn');
  btn.onclick=calc;
};
