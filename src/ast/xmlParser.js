// 假设 musicXml 是用 python 解析的呢，那样更顺手点
// 假设能拿到的 json 的数据结构？后端渲染吧。在 node 的环境下还是服务端
// 给 xml 或者给 json 都 ok
// 先使用 string 测试
var xml2js = require('xml2js');
var ast = require('./Node');
var yoga = require('yoga-layout');
/* import yoga, { Node } from 'yoga-layout';*/

var text = `<score-partwise version="2.0">
<part id="P0">
<measure number="0">
   <attributes>
    <divisions>2</divisions>
    <key>
     <fifths>0</fifths>
     <mode>major</mode>
    </key>
    <time>
     <beats>3</beats>
     <beat-type>4</beat-type>
    </time>
    <clef>
     <sign>TAB</sign>
     <line>5</line>
    </clef>
    <staff-details>
     <staff-lines>6</staff-lines>
     <staff-tuning line="1">
      <tuning-step>E</tuning-step>
      <tuning-octave>2</tuning-octave>
     </staff-tuning>
     <staff-tuning line="2">
      <tuning-step>A</tuning-step>
      <tuning-octave>2</tuning-octave>
     </staff-tuning>
     <staff-tuning line="3">
      <tuning-step>D</tuning-step>
      <tuning-octave>3</tuning-octave>
     </staff-tuning>
     <staff-tuning line="4">
      <tuning-step>G</tuning-step>
      <tuning-octave>3</tuning-octave>
     </staff-tuning>
     <staff-tuning line="5">
      <tuning-step>B</tuning-step>
      <tuning-octave>3</tuning-octave>
     </staff-tuning>
     <staff-tuning line="6">
      <tuning-step>E</tuning-step>
      <tuning-octave>4</tuning-octave>
     </staff-tuning>
    </staff-details>
    <transpose>
     <diatonic>0</diatonic>
     <chromatic>0</chromatic>
     <octave-change>0</octave-change>
    </transpose>
   </attributes>
   <direction directive="yes" placement="above">
    <direction-type>
     <metronome default-y="40" parentheses="yes">
      <beat-unit>quarter</beat-unit>
      <per-minute>65</per-minute>
     </metronome>
    </direction-type>
    <sound tempo="65"/>
   </direction>
   <note>
    <pitch>
     <step>C</step>
     <octave>3</octave>
    </pitch>
    <duration>1</duration>
    <voice>1</voice>
    <type>eighth</type>
    <stem>up</stem>
    <beam number="1">begin</beam>
    <notations>
     <technical>
      <string>5</string>
      <fret>3</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>E</step>
     <octave>3</octave>
    </pitch>
    <duration>1</duration>
    <voice>1</voice>
    <type>eighth</type>
    <stem>up</stem>
    <beam number="1">end</beam>
    <notations>
     <technical>
      <string>4</string>
      <fret>2</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>G</step>
     <octave>3</octave>
    </pitch>
    <duration>1</duration>
    <voice>1</voice>
    <type>eighth</type>
    <stem>up</stem>
    <beam number="1">begin</beam>
    <notations>
     <technical>
      <string>3</string>
      <fret>0</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>C</step>
     <octave>3</octave>
    </pitch>
    <duration>1</duration>
    <voice>1</voice>
    <type>eighth</type>
    <stem>up</stem>
    <beam number="1">end</beam>
    <notations>
     <technical>
      <string>5</string>
      <fret>3</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>E</step>
     <octave>3</octave>
    </pitch>
    <duration>1</duration>
    <voice>1</voice>
    <type>eighth</type>
    <stem>up</stem>
    <beam number="1">begin</beam>
    <notations>
     <technical>
      <string>4</string>
      <fret>2</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>G</step>
     <octave>3</octave>
    </pitch>
    <duration>1</duration>
    <voice>1</voice>
    <type>eighth</type>
    <stem>up</stem>
    <beam number="1">end</beam>
    <notations>
     <technical>
      <string>3</string>
      <fret>0</fret>
     </technical>
    </notations>
   </note>
  </measure>
  <measure number="1">
   <attributes>
    <divisions>4</divisions>
    <clef>
     <sign>TAB</sign>
     <line>5</line>
    </clef>
   </attributes>
   <note>
    <pitch>
     <step>C</step>
     <octave>3</octave>
    </pitch>
    <duration>2</duration>
    <voice>1</voice>
    <type>eighth</type>
    <stem>up</stem>
    <beam number="1">begin</beam>
    <notations>
     <technical>
      <string>5</string>
      <fret>3</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>E</step>
     <octave>3</octave>
    </pitch>
    <duration>2</duration>
    <voice>1</voice>
    <type>eighth</type>
    <stem>up</stem>
    <beam number="1">end</beam>
    <notations>
     <technical>
      <string>4</string>
      <fret>2</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>G</step>
     <octave>3</octave>
    </pitch>
    <duration>2</duration>
    <voice>1</voice>
    <type>eighth</type>
    <stem>up</stem>
    <beam number="1">begin</beam>
    <notations>
     <technical>
      <string>3</string>
      <fret>0</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>C</step>
     <octave>3</octave>
    </pitch>
    <duration>2</duration>
    <voice>1</voice>
    <type>eighth</type>
    <stem>up</stem>
    <beam number="1">end</beam>
    <notations>
     <technical>
      <string>5</string>
      <fret>3</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>E</step>
     <octave>3</octave>
    </pitch>
    <duration>2</duration>
    <voice>1</voice>
    <type>eighth</type>
    <stem>up</stem>
    <beam number="1">begin</beam>
    <notations>
     <technical>
      <string>4</string>
      <fret>2</fret>
     </technical>
    </notations>
   </note>
   <note>
    <pitch>
     <step>C</step>
     <octave>4</octave>
    </pitch>
    <duration>1</duration>
    <voice>1</voice>
    <type>16th</type>
    <stem>up</stem>
    <beam number="1">continue</beam>
    <beam number="2">begin</beam>
    <notations>
     <technical>
      <hammer-on number="1" type="start">H</hammer-on>
      <string>2</string>
      <fret>1</fret>
     </technical>
     <slur type="start"/>
    </notations>
   </note>
   <note>
    <pitch>
     <step>D</step>
     <octave>4</octave>
    </pitch>
    <duration>1</duration>
    <voice>1</voice>
    <type>16th</type>
    <stem>up</stem>
    <beam number="1">end</beam>
    <beam number="2">end</beam>
    <notations>
     <technical>
      <hammer-on number="1" type="stop"></hammer-on>
      <string>2</string>
      <fret>3</fret>
     </technical>
     <slur type="start"/>
    </notations>
   </note>
  </measure>
</part>
</score-partwise>
`;


var root;
var parents = [];
/* score 是 root */
/* 深度优先搜索，先是 parent，当前节点加入到 parent 节点，如果所有的 child 都遍历晚了，就从队列中 push 出来，怎么知道到了多少层？ */
function extractTags(name) {
  if (name === "score-partwise") {
    console.log("create root: ScoreNode");

    var score = new ast.Score();
    var yogaNode = yoga.Node.create();

    var width = 400;
    var height = 600;
    yogaNode.setWidth(width);
    yogaNode.setHeight(height);

    yogaNode.setFlexDirection(yoga.FLEX_DIRECTION_ROW);
    yogaNode.setJustifyContent(yoga.JUSTIFY_FLEX_START);
    yogaNode.setFlexWrap(yoga.WRAP_WRAP);
    score.yogaNode = yogaNode;

    root = score;
    parents.push(root);
    console.log("tree:", root);
  } else if (name === "measure" || name === "beam" || name === "note") {
    var node;
    var yogaNode = yoga.Node.create();
    switch (name) {
      case "measure":
        node = new ast.Measure();
        yogaNode.setFlexGrow(1);
        break;
      case "beam":
        node = new ast.Beam();
        yogaNode.setFlexGrow(1);
        break;
      case "note":
        node = new ast.Note();
        yogaNode.setWidth(40);
        yogaNode.setHeight(100);
        break;
    }


    node.yogaNode = yogaNode;
    while (parents[parents.length-1].level >= node.level) {
      parents.pop()
    }
    var parent = parents[parents.length-1]
    var childrenNumber = parent.children.length
    parent.yogaNode.insertChild(yogaNode, childrenNumber);
    parent.addChild(node);
    parents.push(node);
  }

  return name;
}

/* 动态地构建出一颗树，引用 yoga 计算尺寸 */


/* export function Test() {*/
xml2js.parseString(text, {
  tagNameProcessors: [extractTags],
  attrNameProcessors: [],
  valueProcessors: [],
  attrValueProcessors: []},
  function (err, result) {
    // processed data
    console.dir(result);
  });
/* }*/

var yogaRoot = root.yogaNode;

yogaRoot.calculateLayout(400, 600, yoga.DIRECTION_LTR);

console.log("root layout:", yogaRoot.getComputedLayout());
var measure1 = yogaRoot.getChild(0);
var measure2 = yogaRoot.getChild(1);
console.log("meaure1 layout:", measure1.getComputedLayout());
console.log("meaure2 layout:", measure2.getComputedLayout());

var beam1 = measure1.getChild(0);
var beam2 = measure1.getChild(1);
var beam3 = measure1.getChild(2);
console.log("beam1 layout:", beam1.getComputedLayout());
console.log("beam2 layout:", beam2.getComputedLayout());
console.log("beam3 layout:", beam3.getComputedLayout());
