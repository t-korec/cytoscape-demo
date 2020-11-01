import cytoscape from 'cytoscape';
import cxtmenu from 'cytoscape-cxtmenu';
import cola from 'cytoscape-cola';
import expandCollapse from 'cytoscape-expand-collapse';

cytoscape.use( expandCollapse ); // register extension
cytoscape.use( cxtmenu );
cytoscape.use( cola );

window.addEventListener('DOMContentLoaded', function () { // on dom ready

  var cy = cytoscape({
    container: document.getElementById('cy'),

    ready: function () {
    },

    style: cytoscape.stylesheet()
      .selector('node')
      .style({
        'height': 80,
        'width': 80,
        'background-fit': 'cover',
        'border-color': '#000',
        'border-width': 3,
        'border-opacity': 0.5
      })
      .selector('.eating')
      .style({
        'border-color': 'red'
      })
      .selector('.eater')
      .style({
        'border-width': 9
      })
      .selector('edge')
      .style({
        'width': 6,
        'target-arrow-shape': 'triangle',
        'line-color': '#ffaaaa',
        'target-arrow-color': '#ffaaaa',
        'curve-style': 'bezier'
      })
      .selector('#bird')
      .style({
        'background-image': 'https://live.staticflickr.com/7272/7633179468_3e19e45a0c_b.jpg'
      })
      .selector('#cat')
      .style({
        'background-image': 'https://live.staticflickr.com/1261/1413379559_412a540d29_b.jpg'
      })
      .selector('#ladybug')
      .style({
        'background-image': 'https://live.staticflickr.com/3063/2751740612_af11fb090b_b.jpg'
      })
      .selector('#aphid')
      .style({
        'background-image': 'https://live.staticflickr.com/8316/8003798443_32d01257c8_b.jpg'
      })
      .selector('#rose')
      .style({
        'background-image': 'https://live.staticflickr.com/5109/5817854163_eaccd688f5_b.jpg'
      })
      .selector('#grasshopper')
      .style({
        'background-image': 'https://live.staticflickr.com/6098/6224655456_f4c3c98589_b.jpg'
      })
      .selector('#plant')
      .style({
        'background-image': 'https://live.staticflickr.com/7849/47488157892_3d9ebcdec6_c.jpg'
      })
      .selector('#wheat')
      .style({
        'background-image': 'https://live.staticflickr.com/2660/3715569167_7e978e8319_b.jpg'
      }),

    elements: {
      nodes: [
        { data: { id: 'cat' } },
        { data: { id: 'bird' } },
        { data: { id: 'ladybug' } },
        { data: { id: 'aphid' } },
        { data: { id: 'rose' } },
        { data: { id: 'grasshopper' } },
        { data: { id: 'plant' } },
        { data: { id: 'wheat' } }
      ],
      edges: [
        { data: { source: 'cat', target: 'bird' } },
        { data: { source: 'bird', target: 'ladybug' } },
        { data: { source: 'bird', target: 'grasshopper' } },
        { data: { source: 'grasshopper', target: 'plant' } },
        { data: { source: 'grasshopper', target: 'wheat' } },
        { data: { source: 'ladybug', target: 'aphid' } },
        { data: { source: 'aphid', target: 'rose' } }
      ]
    },

    layout: {
      name: 'cola',
      directed: true
    }
  }); // cy init

  const layoutConfig = {
    name: "cola",
    handleDisconnected: true,
    animate: true,
    avoidOverlap: true,
    infinite: false,
    unconstrIter: 1,
    userConstIter: 0,
    allConstIter: 1,
    ready: e => {
      e.cy.fit()
      e.cy.center()
    }
  }


  let nodeid = 1;
  cy.on('tap', 'node', evt => {

    cy.nodes().forEach(node => {
      node.lock();
    });

    const currentNodeId = nodeid++;
    const targetId = evt.target.data('id'); //cy.nodes()[Math.floor(Math.random() * cy.nodes().length)].data('id')

    cy.add([
      {
        group: 'nodes',
        data: {
          id: currentNodeId
        }
      },
      {
        group: 'edges',
        data: {
          id: currentNodeId + '-edge',
          source: currentNodeId,
          target: targetId
        }
      }
    ]);

    const layout = cy.makeLayout(layoutConfig);
    layout.run();

    layout.on("layoutstop", () => {
      cy.nodes().forEach(node => {
        node.unlock();
      })
    })

  }); // cy.on tap event

  cy.cxtmenu({
    selector: 'node, edge',

    commands: [
      {
        content: '<span class="fa fa-flash fa-2x"></span>',
        select: function (ele) {
          console.log(ele.id());
          var $input = '<input type="text" value="'+ ele.data('name') +'" size="20" style="z-index: 10000;"/>'; 
          ele.data(label)
          node.data('label', newLabel)
        }
      },

      {
        content: '<span class="fa fa-star fa-2x"></span>',
        select: function (ele) {
          console.log(ele.data('name'));
        },
        enabled: false
      },

      {
        content: 'Text',
        select: function (ele) {
          console.log(ele.position());
        }
      }
    ]
  });

  cy.cxtmenu({
    selector: 'core',

    commands: [
      {
        content: 'bg1',
        select: function () {
          console.log('bg1');
        }
      },

      {
        content: 'bg2',
        select: function () {
          console.log('bg2');
        }
      }
    ]
  }); // ctxmenu

}); // on dom ready