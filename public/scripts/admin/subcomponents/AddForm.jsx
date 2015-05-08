var React = require('react');
var Navigation = require('react-router').Navigation;

// The form displayed to Add Users
var AddForm = React.createClass({
  mixins: [Navigation],
  handleSubmit: function(e) {
    e.preventDefault();
    var member = {
      first_name: this.refs.firstName.getDOMNode().value.trim(),
      last_name: this.refs.lastName.getDOMNode().value.trim(),
      email: this.refs.email.getDOMNode().value.trim(),
      phone: this.refs.phone.getDOMNode().value.trim()
    };
    $.ajax({
      url: '/api/add',
      method: 'POST',
      data: member,
      succss: function(data) {
        console.log('User added');
        // TODO: Add confirmation of user add
        this.transitionTo('dashboard');
      }.bind(this),
      error: function(jqXHR, status, error) {
        console.error('Error submitting form to server:', error);
        this.transitionTo('dashboard');
      }.bind(this),
      timeout: 5000
    });
  },
  render: function() {
    return (
      <div className="container">
        <form className="col-xs-8" onSubmit={this.handleSubmit}>
          <h3>Add User</h3>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" className="form-control" ref="firstName" />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" className="form-control" ref="lastName" />
          </div>
          <div className="form-group">
            <label>Title</label>
            <input type="text" className="form-control" ref="title" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" className="form-control" ref="email" />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" className="form-control" ref="phone" />
          </div>
          <button type="submit" className="btn btn-default">Add User</button>
        </form>
      </div>
    );
  }
});

module.exports = AddForm;
