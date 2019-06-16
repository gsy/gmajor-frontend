/* Node 是 ast 的节点，接收一个 Visitor，从 xml 中解析后生成 */
class Node {
  constructor() {
    this.name = "node";
    this.level = 0;
    this.meta = {};/* 收集的 meta 信息 */
    this.children = [];/* children 节点 */
    this.yogaNode = null;
  }

  accept(visitor) {
    this.visitor = visitor
  }

  addChild(child) {
    this.children.push(child);
  }

  debug() {
    console.log("this is: ", this.name);
  }
}

class Visitor {
  constructor() {
  }
}

/* visitor 是 visitor 模式，每次访问到一个 node 的时候，调用 visitor 的 enter 和 level 方法 */

class Score extends Node {
  constructor() {
    super();
    this.level = 1;
    this.name = "score";
  }
}


class ScoreVisitor extends Visitor {
  consturctor() {
  }


  enter(node) {
    console.log("enter node:", node.type);
    return true;
  }

  leave(node) {
    console.log("leave node:", node.type);
    return true;
  }
}

class Measure extends Node {
  constructor() {
    super();
    this.level = 2;
    this.name = "measure";
  }
}

class Beam extends Node {
  constructor() {
    super();
    this.level = 3;
    this.name = "beam";
  }
}

class Note extends Node {
  constructor() {
    super();
    this.level = 4;
    this.name = "note";
  }
}

/* var s = new Score();
 * var m1 = new Measure();
 * var m2 = new Measure();
 *
 * s.debug();
 * console.log(s.meta);
 *
 * s.addChild(m1);
 * s.addChild(m2);
 *
 * console.log(s.children);*/

/* sv = new ScoreVisitor();
 * console.log("score visitor:", sv);
 * s.accept(sv);*/

/* 遍历模式 */
function visit(node) {
  var ok = false;
  if (node.visitor !== undefined) {
    var v = node.visitor
    ok = v.enter(node);
    if (ok) {
      ok = v.leave(node);
    }
  }
  if (ok) {
    console.log("visit children");
    if (node.children.length > 0) {
      node.children.forEach(function(child) {
        visit(child);
      });
    }
  }
}

/* parse xml 生成一个 ast 对象 */
/* 后续的渲染基于这个 ast 对象 */
/* visit(s);*/

module.exports = {
  Score,
  Measure,
  Beam,
  Note,
  visit
}
