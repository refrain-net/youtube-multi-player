'use strict';

const content_ids = [];
const getCount = count => {
  let i = 0;
  while (i ** 2 < count) i ++;
  return i;
};
const getFrame = id => `<iframe src="https://www.youtube.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
const getTemplate = count => {
  const arr = [];
  while (arr.length < count) arr.push(`${100 / count}%`);
  return arr.join(' ');
};
const update = ids => {
  const count = getCount(ids.length);
  const template = getTemplate(count);
  wrapper.style.gridTemplateColumns = template;
  wrapper.style.gridTemplateRows = template;
  wrapper.innerHTML = ids.map(getFrame).join('');
  content_id.value = '';
};
document.onkeydown = event => {
  if (event.code === 'Escape') {
    const display = ctrl.style?.display || 'block';
    ctrl.style.display = display === 'none'? 'block': 'none';
  }
};
document.onload = event => {
  const {ids} = location.search.slice(1).split('&').map(param => param.split('=')).reduce((accumulator, [key, value]) => {
    accumulator[key] = value || key;
    return accumulator;
  }, {});
  update(ids.split(','));
};
id_register.onclick = event => {
  content_ids.push(content_id.value);
  update(content_ids);
};
