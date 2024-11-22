import Service from '@ember/service';
import fetchKoenigLexical from '../utils/fetch-koenig-lexical';
import {task} from 'ember-concurrency';
import {tracked} from '@glimmer/tracking';

export default class Koenig extends Service {
    @tracked fetchPromise;
    @tracked status = 'pending';
    @tracked response;

    get koenigLexical() {
        if (!this.fetchPromise) {
            this.fetchPromise = this.fetch();
        }
        switch (this.status) {
        case 'pending':
            throw this.fetchPromise;
        case 'error':
            throw this.response;
        default:
            return this.response;
        }
    }

    async fetch() {
        try {
            this.response = await fetchKoenigLexical();
            this.status = 'success';
        } catch (e) {
            this.status = 'error';
            this.response = e;
        }
    }
}
