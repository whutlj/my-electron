import { useMemo, useLayoutEffect } from 'react';
import nano_css_1 from 'nano-css';
import cssom_1 from 'nano-css/addon/cssom';
import vcssom_1 from 'nano-css/addon/vcssom';
import cssToTree_1 from 'nano-css/addon/vcssom/cssToTree';

const nano = nano_css_1.create();
cssom_1.addon(nano);
vcssom_1.addon(nano);
let count = 0;
export default function useMyScrolluseMyClass(css) {
  const className = useMemo(function() {
    return `use-my-class-${count++}`;
  }, []);
  const sheet = useMemo(function() {
    return new nano.VSheet();
  }, []);
  useLayoutEffect(function() {
    const tree = {};
    cssToTree_1.cssToTree(tree, css, '.' + className, '');
    sheet.diff(tree);
    console.log(tree);
    return function() {
      sheet.diff([]);
    };
  });
  return className;
}
