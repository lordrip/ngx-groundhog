/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

const stylelint = require('stylelint');
const isStandardSyntaxRule = require('stylelint/lib/utils/isStandardSyntaxRule');
const isStandardSyntaxSelector = require('stylelint/lib/utils/isStandardSyntaxSelector');

const ruleName = 'groundhog/selector-no-deep';
const messages = stylelint.utils.ruleMessages(ruleName, {
  expected: selector => `Usage of the /deep/ in "${selector}" is not allowed`,
});


/**
 * Stylelint plugin that prevents uses of /deep/ in selectors.
 */
const plugin = stylelint.createPlugin(ruleName, isEnabled => {
  return (root, result) => {
    if (!isEnabled) return;

    root.walkRules(rule => {
      if (rule.parent.type === 'rule' &&
          isStandardSyntaxRule(rule) &&
          isStandardSyntaxSelector(rule.selector) &&
          rule.selector.includes('/deep/')) {

        stylelint.utils.report({
          result,
          ruleName,
          message: messages.expected(rule.selector),
          node: rule
        });
      }
    });
  };
});

plugin.ruleName = ruleName;
plugin.messages = messages;
module.exports = plugin;
