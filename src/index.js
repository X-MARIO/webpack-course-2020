import * as $ from 'jquery';
import { Post } from '@models/Post';
import json from './assets/json';
import xml from './assets/data.xml';
import csv from './assets/data.csv';
import WebpackLogo from './assets/webpack-logo.png';
import './styles/styles.css';

const post = new Post('Webpack Post Title', WebpackLogo);

console.log('$', $)

$('pre').html(post.toString()); //HTML

console.log('Post to String', post.toString());

console.log('json', json);
console.log('xml', xml);
console.log('csv', csv);