import React from "react";
import PropTypes from "prop-types";

class NotesInput extends React.Component {
  constructor(props) {
    super(props);

    // inisialisasi state
    this.state = {
      title: "",
      body: "",
      limit: 50,
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onBodyChangeEventHandler = this.onBodyChangeEventHandler.bind(this);
    this.onSubmitEventHandler = this.onSubmitEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value.slice(0, this.state.limit),
      };
    });
  }

  onBodyChangeEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.value,
      };
    });
  }

  onSubmitEventHandler(event) {
    event.preventDefault();
    this.props.addNotes(this.state);
    this.setState(() => {
      return {
        title: "",
        body: "",
      };
    });
  }

  render() {
    return (
      <div className="form-input" id="form-input">
        <h2>Add Note</h2>
        <form className="note-input" onSubmit={this.onSubmitEventHandler}>
          <input className="note-input__title" type="text" placeholder="Add Title ..." value={this.state.title} onChange={this.onTitleChangeEventHandler} required />
          <p className="note-input__title__char-limit">{this.state.limit - this.state.title.length} remaining character</p>
          <textarea placeholder="Take a Note ...." value={this.state.body} onChange={this.onBodyChangeEventHandler} required />
          <button type="submit">Add</button>
        </form>
      </div>
    );
  }
}

NotesInput.propTypes = {
  addNotes: PropTypes.func.isRequired,
};

export default NotesInput;
