import Router from 'next/router';

export default function redirect(url) {
    Router.push(url);
}