// ============================================================
// 工具函数（所有动画场景都必须嵌入）
// ============================================================
function treePos(n){var pos=[];if(!n)return pos;for(var i=0;i<n;i++){var lv=Math.floor(Math.log2(i+1)),idx=i-(Math.pow(2,lv)-1),cnt=Math.pow(2,lv),H=Math.min(60,220/Math.ceil(Math.log2(n+1))),span=600,gap=span/cnt;pos.push({x:50+gap*(idx+.5),y:40+lv*H})}return pos}
function mkDots(el,t,c){el.innerHTML='';for(var i=0;i<t;i++){var d=document.createElement('div');d.className='dot'+(i===c?' on':'');el.appendChild(d)}}
function D(i){return i+1}


// ============================================================
// 代码高亮辅助（当动画需要与代码联动时嵌入）
// 用法：在 render 函数末尾调用 hlLines('codeId', s.line)
// ============================================================
function hlLines(id,line){
  var ls=document.getElementById(id).children;
  for(var i=0;i<ls.length;i++) ls[i].classList.toggle('on',i===line);
}


// ============================================================
// 模板 A：数组 + 完全二叉树（哈夫曼树、二叉树结构等）
// 使用场景：哈夫曼编码树构建、完全二叉树形结构——任何"数组 + 完全二叉树双视角"的演示
// 需要：全局 steps 数组；DOM 里有 svgId / arrId / capId / pbId / nbId / dotsId
//
// ⚠ 使用前必须自行定义 clsFn(i) —— 根据 step 状态返回数组单元格的 CSS 类后缀。
//    参考实现：
//       function clsFn(i){
//         var s=steps[cur];
//         if(s.swap&&(s.swap[0]===i||s.swap[1]===i))return' sw';
//         if(s.focus===i)return' hl';
//         if(s.lk&&s.lk.indexOf(i)>=0)return' lk';
//         return'';
//       }
// ============================================================
var steps=[/* ... 你的 steps 数据 ... */], cur=0;
function render(){
  var s=steps[cur], n=s.vals.length, pos=treePos(n), sg='';
  for(var i=0;i<n;i++){[2*i+1,2*i+2].forEach(function(ch){
    if(ch<n) sg+='<line x1="'+pos[i].x+'" y1="'+(pos[i].y+24)+'" x2="'+pos[ch].x+'" y2="'+(pos[ch].y-24)+'" stroke="var(--bd2)" stroke-width="0.5"/>';
  })}
  if(s.swap){var a=s.swap[0],b=s.swap[1];sg+='<text x="'+((pos[a].x+pos[b].x)/2-16)+'" y="'+((pos[a].y+pos[b].y)/2)+'" font-size="16" fill="var(--or)" font-family="var(--sans)">⇅</text>'}
  for(var i=0;i<n;i++){
    var c=(function(i){
      if(s.swap&&(s.swap[0]===i||s.swap[1]===i))return{f:'var(--orb)',s:'var(--or)',t:'var(--or)'};
      if(s.focus===i)return{f:'var(--blb)',s:'var(--bl)',t:'var(--bl)'};
      return{f:'var(--bg2)',s:'var(--bd2)',t:'var(--tx)'};
    })(i);
    sg+='<circle cx="'+pos[i].x+'" cy="'+pos[i].y+'" r="24" fill="'+c.f+'" stroke="'+c.s+'" stroke-width="1.2"/>';
    sg+='<text x="'+pos[i].x+'" y="'+pos[i].y+'" text-anchor="middle" dominant-baseline="central" font-size="14" font-weight="500" fill="'+c.t+'" font-family="var(--sans)">'+s.vals[i]+'</text>';
    sg+='<text x="'+pos[i].x+'" y="'+(pos[i].y+34)+'" text-anchor="middle" font-size="10" fill="var(--tx3)" font-family="var(--mono)">['+D(i)+']</text>';
  }
  document.getElementById('xx-svg').innerHTML=sg;
  var ae=document.getElementById('xx-arr');ae.innerHTML='';
  for(var i=0;i<n;i++){var cl=document.createElement('div');cl.className='ac'+clsFn(i);cl.innerHTML=s.vals[i]+'<span class="ci">'+D(i)+'</span>';ae.appendChild(cl)}
  document.getElementById('xx-cap').innerHTML=s.cap;
  document.getElementById('xx-pb').disabled=cur===0;
  document.getElementById('xx-nb').disabled=cur===steps.length-1;
  mkDots(document.getElementById('xx-dots'),steps.length,cur);
  // 若动画联动代码，取消下一行注释并把 'xx-code' 换成你的 code-panel id：
  // hlLines('xx-code', s.line);
}
function go(d){var n=cur+d;if(n>=0&&n<steps.length){cur=n;render()}}
render();


// ============================================================
// 模板 B：自定义坐标图（数据通路 SVG、总线拓扑、中断处理流程图等）
// 使用场景：节点坐标无法由层序位置推出时——务必遵守铁律二的间距要求
// steps[i].nodes 每项: {v, x, y, cf, cs, ct}   // 值 + 坐标 + 填充/描边/文字色
// steps[i].edges 每项: {x1, y1, x2, y2, l?}    // 边（可选标签 l）
//
// ⚠ 与模板 A/C 不同，本模板只提供 renderStep() 纯函数，不自带 cur/go/初始渲染。
//    使用时需要自己写驱动层，例如：
//       var cur=0;
//       function doRender(){renderStep('xx-svg','xx-cap','xx-pb','xx-nb','xx-dots',steps,cur)}
//       function go(d){var n=cur+d;if(n>=0&&n<steps.length){cur=n;doRender()}}
//       doRender();
//    若还需联动数组视图或代码高亮，在 doRender 里自行追加对应更新逻辑。
// ============================================================
var R=24;
function renderStep(svgId,capId,pbId,nbId,dotsId,steps,cur){
  var s=steps[cur],svg=document.getElementById(svgId),g='';
  s.edges.forEach(function(e){
    g+='<line x1="'+e.x1+'" y1="'+(e.y1+R)+'" x2="'+e.x2+'" y2="'+(e.y2-R)+'" stroke="var(--bd2)" stroke-width="0.5"/>';
    if(e.l!=null){var mx=(e.x1+e.x2)/2,my=(e.y1+R+e.y2-R)/2;g+='<text x="'+(mx-10)+'" y="'+my+'" text-anchor="middle" dominant-baseline="central" font-size="11" font-weight="600" fill="var(--bl)" font-family="var(--mono)">'+e.l+'</text>'}
  });
  s.nodes.forEach(function(n){
    g+='<circle cx="'+n.x+'" cy="'+n.y+'" r="'+R+'" fill="'+n.cf+'" stroke="'+n.cs+'" stroke-width="1.2"/>';
    g+='<text x="'+n.x+'" y="'+n.y+'" text-anchor="middle" dominant-baseline="central" font-size="12" font-weight="500" fill="'+n.ct+'" font-family="var(--sans)">'+n.v+'</text>';
  });
  svg.innerHTML=g;
  document.getElementById(capId).innerHTML=s.cap;
  document.getElementById(pbId).disabled=cur===0;
  document.getElementById(nbId).disabled=cur===steps.length-1;
  mkDots(document.getElementById(dotsId),steps.length,cur);
}


// ============================================================
// 模板 C：纯数组动画（Cache 行序列、寄存器值序列、内存地址访问序列）
// 使用场景：没有树形结构、只需线性条状视图的场景——Cache 命中/缺失序列、DMA 数据块传输
// ============================================================
var steps=[/* ... 你的 steps 数据 ... */], cur=0;
function render(){
  var s=steps[cur], n=s.vals.length, ae=document.getElementById('xx-arr');ae.innerHTML='';
  for(var i=0;i<n;i++){
    var cl=document.createElement('div');cl.className='ac';
    if(s.swap&&(s.swap[0]===i||s.swap[1]===i))cl.classList.add('sw');
    else if(s.focus===i)cl.classList.add('hl');
    else if(s.lk&&s.lk.indexOf(i)>=0)cl.classList.add('lk');
    cl.innerHTML=s.vals[i]+'<span class="ci">'+D(i)+'</span>';ae.appendChild(cl);
  }
  document.getElementById('xx-cap').innerHTML=s.cap;
  document.getElementById('xx-pb').disabled=cur===0;
  document.getElementById('xx-nb').disabled=cur===steps.length-1;
  mkDots(document.getElementById('xx-dots'),steps.length,cur);
}
function go(d){var n=cur+d;if(n>=0&&n<steps.length){cur=n;render()}}
render();


// ============================================================
// 键盘导航（所有动画页面都应加这段）
// ============================================================
document.addEventListener('keydown',function(e){
  if(e.key==='ArrowLeft') go(-1);
  if(e.key==='ArrowRight') go(1);
});


// ============================================================
// 模板 D：流水线时序表（计算机组成原理专用）
// 使用场景：任何"指令 × 时钟周期"矩阵——五段流水线、停顿（stall）、转发、冒险处理
//
// 使用前必须在本模板块前定义：
//   var instLabels = ['I1: ADD R1,R2', 'I2: LOAD R3,100'];  // 指令标签（行）
//   var cycleCount = 8;                                        // 总时钟周期数（列）
//
// steps[i] 格式：
//   {
//     cells: [                    // cells[instr_idx][cycle_idx]
//       ['IF','ID','EX','MEM','WB','','',''],
//       ['','IF','IF','ID','EX','MEM','WB',''],  // IF重复=停顿等待
//     ],
//     hl: {r:1, c:2},            // 可选：当前高亮格（用 p-focus 样式）
//     cap: "说明文字（HTML）"
//   }
//
// STAGE_CLS 映射：'IF'→p-if  'ID'→p-id  'EX'→p-ex  'MEM'→p-mem  'WB'→p-wb  'st'→p-st
// 停顿格显示为 ‒，其余格显示原值。
// ============================================================
var STAGE_CLS={IF:'p-if',ID:'p-id',EX:'p-ex',MEM:'p-mem',WB:'p-wb',st:'p-st'};
var steps=[/* ... 你的 steps 数据 ... */],cur=0;
function render(){
  var s=steps[cur];
  var h='<table class="ptable"><thead><tr><th class="pth">指令</th>';
  for(var c=0;c<cycleCount;c++) h+='<th class="pth">'+(c+1)+'</th>';
  h+='</tr></thead><tbody>';
  for(var r=0;r<instLabels.length;r++){
    h+='<tr><td class="ptd p-inst">'+instLabels[r]+'</td>';
    for(var c=0;c<cycleCount;c++){
      var v=(s.cells[r]&&s.cells[r][c])||'';
      var sc=STAGE_CLS[v]?(' '+STAGE_CLS[v]):'';
      var fc=(s.hl&&s.hl.r===r&&s.hl.c===c)?' p-focus':'';
      h+='<td class="ptd'+sc+fc+'">'+(v==='st'?'‒':v)+'</td>';
    }
    h+='</tr>';
  }
  h+='</tbody></table>';
  document.getElementById('xx-tbl').innerHTML=h;
  document.getElementById('xx-cap').innerHTML=s.cap;
  document.getElementById('xx-pb').disabled=cur===0;
  document.getElementById('xx-nb').disabled=cur===steps.length-1;
  mkDots(document.getElementById('xx-dots'),steps.length,cur);
}
function go(d){var n=cur+d;if(n>=0&&n<steps.length){cur=n;render()}}
render();


// ============================================================
// 模板 E：位级寄存器动画（计算机组成原理专用）
// 使用场景：补码/原码/反码/移码计算、IEEE 754 浮点数编码、指令格式字段分解、操作码扩展
//
// 使用前必须在本模板块前定义：
//   var bitWidth = 16;   // 总位数
//   var fieldDefs = [    // 字段定义，下标 0 = MSB（最高位）
//     {name:'符号', start:0, end:0, cls:'bc-sign'},
//     {name:'阶码', start:1, end:8, cls:'bc-exp'},
//     {name:'尾数', start:9, end:15, cls:'bc-mant'},
//   ];
//
// steps[i] 格式：
//   {
//     bits: ['0','1','0','0','1','1','0','1',...],  // MSB→LSB，长度=bitWidth
//     hl:     [0, 1],    // 可选：蓝色高亮的位下标（当前关注）
//     change: [2, 3],    // 可选：橙色标记的位下标（刚刚发生变化）
//     cap: "说明文字（HTML）"
//   }
//
// 注意：change 优先级高于 hl；字段 cls 决定基础颜色；change/hl 叠加覆盖字段颜色。
// ============================================================
var steps=[/* ... 你的 steps 数据 ... */],cur=0;
function render(){
  var s=steps[cur],bits=s.bits;
  // 位行
  var h='<div class="brow">';
  for(var i=0;i<bitWidth;i++){
    var cls='bc';
    for(var f=0;f<fieldDefs.length;f++){
      if(i>=fieldDefs[f].start&&i<=fieldDefs[f].end){if(fieldDefs[f].cls)cls+=' '+fieldDefs[f].cls;break}
    }
    if(s.change&&s.change.indexOf(i)>=0) cls+=' bc-ch';
    else if(s.hl&&s.hl.indexOf(i)>=0) cls+=' bc-hl';
    h+='<div class="'+cls+'">'+bits[i]+'</div>';
  }
  h+='</div>';
  // 字段标签行（每个字段的 px 宽度 = 位数 × 26px，与 .bc min-width 对齐）
  h+='<div class="brow" style="gap:0">';
  for(var f=0;f<fieldDefs.length;f++){
    var fd=fieldDefs[f],w=(fd.end-fd.start+1)*26;
    h+='<div class="blabel" style="min-width:'+w+'px">'+fd.name+'<br>['+fd.start+':'+(fd.end===fd.start?fd.start:fd.end)+']</div>';
  }
  h+='</div>';
  document.getElementById('xx-bits').innerHTML=h;
  document.getElementById('xx-cap').innerHTML=s.cap;
  document.getElementById('xx-pb').disabled=cur===0;
  document.getElementById('xx-nb').disabled=cur===steps.length-1;
  mkDots(document.getElementById('xx-dots'),steps.length,cur);
}
function go(d){var n=cur+d;if(n>=0&&n<steps.length){cur=n;render()}}
render();
