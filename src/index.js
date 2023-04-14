import * as $ from 'jquery';
import { Post } from '@models/Post';
import json from './assets/json';
import xml from './assets/data.xml';
import csv from './assets/data.csv';
import WebpackLogo from './assets/webpack-logo.png';
import './styles/styles.css';

const post = new Post('Webpack Post Title', WebpackLogo);

console.log('$12', $)

$('pre').addClass('code').html(post.toString()); //HTML

console.log('Post to String', post.toString());

console.log('json', json);
console.log('xml', xml);
console.log('csv', csv);
console.log('csv1', csv);