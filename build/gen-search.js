/*
 * @Author: shiliangL
 * @Date: 2022-04-26 09:13:00
 * @LastEditTime: 2022-05-09 11:55:22
 * @LastEditors: Do not edit
 * @Description:
 */
'use strict';
console.log('读取本地Md生成服务器全局检索数据');
const fs = require('fs');
const path = require('path');
const algoliasearch = require('algoliasearch');
const slugify = require('transliteration').slugify;

const client = algoliasearch('JBIBURPW5N', '2996cf2a2cff6050f3f35f4ee8c70ff8');
const index = client.initIndex('Datav');

index.clearObjects().then(() => {
  fs.readdir(path.resolve(__dirname, `../docs`), (err, files) => {
    if (err) return;
    let indices = [];
    files.forEach((file) => {
      const component = file.replace('.md', '');
      const content = fs.readFileSync(
        path.resolve(__dirname, `../docs/${file}`),
        'utf8'
      );
      const matches = content
        .replace(/:::[\s\S]*?:::/g, '')
        .replace(/```[\s\S]*?```/g, '')
        .match(/#{2,4}[^#]*/g)
        .map((match) =>
          match
            .replace(/\n+/g, '\n')
            .split('\n')
            .filter((part) => !!part)
        )
        .map((match) => {
          const length = match.length;
          if (length > 2) {
            const desc = match.slice(1, length).join('');
            return [match[0], desc];
          }
          return match;
        });

      indices = indices.concat(
        matches.map((match) => {
          const isComponent = match[0].indexOf('###') < 0;
          const title = match[0].replace(/#{2,4}/, '').trim();
          const index = { component, title };
          index.ranking = isComponent ? 2 : 1;
          index.anchor = slugify(title);
          index.content = (match[1] || title).replace(/<[^>]+>/g, '');
          return index;
        })
      );
    });
    console.log(indices,'=indices=');
    index
      .saveObjects(indices, {
        autoGenerateObjectIDIfNotExist: true,
      })
      .then(({ objectIDs }) => {
        console.log(objectIDs, '=处理生成Ids结果=');
      });
  });
});
