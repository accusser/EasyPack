showdown.subParser('makeMarkdown.pre', function (node, globals) {
  'use strict';

  var num  = node.getAttribute('prenum');
  return '<pre>' + globals.preList[num] + '</pre>';
});

//# sourceMappingURL=pre.js.map

//# sourceMappingURL=pre.js.map