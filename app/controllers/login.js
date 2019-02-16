import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  session: inject('session'),
  currentUser: inject('current-user'),

  actions: {
    authenticate: function() {
      const credentials = this.getProperties('username', 'password');
      const authenticator = 'authenticator:token'; // or 'authenticator:jwt'

      this.get('session').authenticate(authenticator, credentials);
    },
    logout: function(){
      this.get('session').invalidate();
      this.transitionToRoute('/');
    }
  }
});
