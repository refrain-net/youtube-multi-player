'use strict';

const content_ids = [];
const getCount = count => {
  let i = 0;
  while (i ** 2 < count) i ++;
  return i;
};
const getFrame = id => {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  iframe.setAttribute('allowfullscreen', true);
  iframe.setAttribute('frameborder', 0);
  iframe.setAttribute('src', `https://www.youtube.com/embed/${id}`);
  iframe.setAttribute('title', 'YouTube video player');
  return iframe;
};
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
  ids.forEach(id => wrapper.appendChild(getFrame(id)));
  content_id.value = '';
};
document.onkeydown = event => {
  if (event.code === 'Escape') {
    const display = ctrl.style?.display || 'block';
    ctrl.style.display = display === 'none'? 'block': 'none';
  }
};
id_register.onclick = event => {
  content_ids.push(content_id.value);
  update(content_ids);
};
(() => {
  const {ids = ''} = location.search.slice(1).split('&').map(param => param.split('=')).reduce((accumulator, [key, value]) => {
    accumulator[key] = value || key;
    return accumulator;
  }, {});
  if (!ids) update(ids.split(','));
})();
