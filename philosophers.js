/*
 * Copyright (c) 2015-2016, Salesforce.com, Inc.
 * All rights reserved.
 * Licensed under the MIT license.
 * For full license text, see LICENSE.md file in the repo root or
 * https://opensource.org/licenses/MIT
 */

'use strict';

let View = function(controller, svg, module) {
  let model = module.env;
  let forks = memoise()
  let table = memoise()

  forks.onUpdate((model) => console.log(model.reduce((acc, item) => acc.concat(item[1]), [])))
  table.onUpdate((model) => console.log(model.reduce((acc, item) => acc.concat(item[1].tag), [])))

  return {
    name: 'PhilosophersView',
    update: function(changes) {
      table.set(model.vars.get('table'))
      forks.set(model.vars.get('forks'))
    },
  };
}; // View

module.exports = View;

const memoise = () => {
  let _model = {}
  let _cbs   = []
  return {
    set: (model) => {
      if (JSON.stringify(_model) !== JSON.stringify(model)) {
        _model = JSON.parse(JSON.stringify(model))
        _cbs.map(cb => cb(_model))
      }
      return this
    },
    get: () => _model,
    onUpdate: (cb) => (_cbs.push(cb), this)
  }
}
