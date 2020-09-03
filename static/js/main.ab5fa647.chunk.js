(this.webpackJsonpgame_of_life_build=this.webpackJsonpgame_of_life_build||[]).push([[0],[,,,,,,,function(e,t,a){e.exports=a(15)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(6),i=a.n(r),l=(a(12),a(1)),c=a(2),s=a(3),u=a(4),m=(a(13),a(14),function(e){Object(u.a)(a,e);var t=Object(s.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){var e=this.props,t=e.x,a=e.y;return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"CellStyle",style:{left:"".concat(10*t+1,"px"),top:"".concat(10*a+1,"px"),width:"".concat(9,"px"),height:"".concat(9,"px")}}))}}]),a}(o.a.Component)),d=function(e){Object(u.a)(a,e);var t=Object(s.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).state={cells:[],game_is_running:!1,grid_on:!1,interval:100},n.handleOnClick=function(e){var t=n.getOffset(),a=e.clientX-t.x,o=e.clientY-t.y,r=Math.floor(a/10),i=Math.floor(o/10);r>=0&&r<=n.cols&&i>=0&&i<=n.rows&&(n.board[i][r]=!n.board[i][r]),n.setState({cells:n.makeCells(),cell_holder:n.makeCells()})},n.startGame=function(){n.setState({game_is_running:!0}),n.runGeneration()},n.stopGame=function(){n.setState({game_is_running:!1}),n.timeoutHandler&&(window.clearTimeout(n.timeoutHandler),n.timeoutHandler=null)},n.clearGame=function(){n.board=n.makeEmptyBoard(),n.setState({cells:n.makeCells()})},n.randomGame=function(){for(var e=0;e<n.rows;e++)for(var t=0;t<n.cols;t++)n.board[e][t]=Math.random()>=.85;n.setState({cells:n.makeCells()})},n.showGrid=function(){n.setState({grid_on:!0}),document.getElementById("grid").className="gameGrid_ON"},n.hideGrid=function(){n.setState({grid_on:!1}),document.getElementById("grid").className="gameGrid_OFF"},n.rows=60,n.cols=80,n.board=n.makeEmptyBoard(),n}return Object(c.a)(a,[{key:"makeEmptyBoard",value:function(){for(var e=[],t=0;t<this.rows;t++){e[t]=[];for(var a=0;a<this.cols;a++)e[t][a]=!1}return e}},{key:"makeCells",value:function(){for(var e=[],t=0;t<this.rows;t++)for(var a=0;a<this.cols;a++)this.board[t][a]&&e.push({x:a,y:t});return e}},{key:"getOffset",value:function(){var e=this.boardRef.getBoundingClientRect(),t=document.documentElement;return{x:e.left+window.pageXOffset-t.clientLeft,y:e.top+window.pageYOffset-t.clientTop}}},{key:"calculateNeighbors",value:function(e,t,a){for(var n=0,o=[[-1,-1],[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1]],r=0;r<o.length;r++){var i=o[r],l=a+i[0],c=t+i[1];c>=0&&c<this.cols&&l>=0&&l<this.rows&&e[l][c]&&n++}return n}},{key:"runGeneration",value:function(){for(var e=this,t=this.makeEmptyBoard(),a=0;a<this.rows;a++)for(var n=0;n<this.cols;n++){var o=this.calculateNeighbors(this.board,n,a);this.board[a][n]?t[a][n]=2===o||3===o:this.board[a][n]||3!==o||(t[a][n]=!0)}this.board=t,this.setState({cells:this.makeCells()}),this.timeoutHandler=window.setTimeout((function(){e.runGeneration()}),this.state.interval)}},{key:"render",value:function(){var e=this,t=this.state,a=t.cells,n=t.game_is_running,r=t.grid_on;return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"gameGrid_OFF",id:"grid",style:{width:800,height:600,backgroundSize:"".concat(10,"px ").concat(10,"px")},onClick:n?void 0:this.handleOnClick,ref:function(t){e.boardRef=t}},a.map((function(e){return o.a.createElement(m,{x:e.x,y:e.y,key:"".concat(e.x,", ").concat(e.y)})}))),o.a.createElement("div",{className:"buttons"},n?o.a.createElement("button",{className:"button",onClick:this.stopGame},"STOP"):o.a.createElement("button",{className:"button",onClick:this.startGame},"START"),n?o.a.createElement("button",{className:"button"},"RANDOM"):o.a.createElement("button",{className:"button",onClick:this.randomGame},"RANDOM"),n?o.a.createElement("button",{className:"button"},"CLEAR"):o.a.createElement("button",{className:"button",onClick:this.clearGame},"CLEAR"),r?o.a.createElement("button",{className:"button show-grid",onClick:this.hideGrid},"HIDE GRID"):o.a.createElement("button",{className:"button show-grid",onClick:this.showGrid},"SHOW GRID")))}}]),a}(o.a.Component),h=function(e){Object(u.a)(a,e);var t=Object(s.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(c.a)(a,[{key:"render",value:function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"pageContainer"},o.a.createElement("div",{className:"heading"},o.a.createElement("h1",null,"GAME OF LIFE")),o.a.createElement("div",{className:"gameScreen"},o.a.createElement(d,null)),o.a.createElement("div",{className:"footer"},o.a.createElement("div",{className:"copyright"},o.a.createElement("span",null," \xa92020 Bradley Krigbaum")))))}}]),a}(o.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(o.a.createElement(h,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[7,1,2]]]);
//# sourceMappingURL=main.ab5fa647.chunk.js.map