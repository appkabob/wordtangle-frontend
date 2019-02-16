import Service from '@ember/service';
import JWT from 'ember-simple-auth-token/authenticators/jwt';
import Ember from 'ember';
const { inject: { service }, isEmpty, RSVP } = Ember;

export default Service.extend({
  session: service('session'),
  store: service(),

  load() {
    let userId = this.get('session.data.authenticated.user_id');
    if (!isEmpty(userId)) {
      return this.get('store').findRecord('user', userId).then(
        (user) => {
          this.set('user', user);
        });
    } else {
      return RSVP.resolve();
    }
  },
  _getTokenData(token) {
    const jwt = new JWT();
    const tokenData = jwt.getTokenData(token);
    console.log(tokenData);
    return tokenData;
  },
  getUserIdFromToken(token) {
    const tokenData = this._getTokenData(token)
    return tokenData['user_id'];
  },
  getUsernameFromToken(token) {
    const tokenData = this._getTokenData(token)
    return tokenData['username'];
  }
});
