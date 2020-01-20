import React from "react";
import { Link } from "gatsby";
import styles from "./Contact.module.scss";
import { Button } from "../../../components/Button/Button";
import { FaPhone } from "react-icons/fa";

const options = [
  { value: "g", label: "General Question" },
  { value: "ss", label: "Service and Support" },
  { value: "s", label: "Spare Parts" },
  { value: "m", label: "Marketing" }
];

const defaultOption = options[0];

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

class ContactPageTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false, submitted: false };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => this.setState({ submitted: true }))
      .catch(error => alert(error));
  };

  render() {
    return (
      <div>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <div className={styles.inner}>
              <h2>{this.props.title}</h2>
              <p className={styles.callUs}>
                {this.props.subTitle}&nbsp;
                <a href={`tel:${this.props.phoneNo}`}>
                  <FaPhone className="flipImage" />
                  {this.props.phoneNo}
                </a>
              </p>
              <br />
              <p>{this.props.description}</p>
            </div>
          </div>
          <div className={styles.form}>
            {!this.state.submitted ? (
              <form
                name="contact"
                method="post"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={this.handleSubmit}
              >
                {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                <input type="hidden" name="form-name" value="contact" />
                <div hidden>
                  <label>
                    Don’t fill this out:{" "}
                    <input name="bot-field" onChange={this.handleChange} />
                  </label>
                </div>
                <div className={styles.field}>
                  <label htmlFor={"name"}>{this.props.form.name.name}</label>
                  <input
                    placeholder={this.props.form.name.placeholder}
                    type={"text"}
                    name={"name"}
                    onChange={this.handleChange}
                    id={"name"}
                    required={true}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor={"tel"}>{this.props.form.phone.name}</label>
                  <input
                    placeholder={this.props.form.phone.placeholder}
                    type={"tel"}
                    name={"phone"}
                    onChange={this.handleChange}
                    id={"phone"}
                    required={true}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor={"email"}>{this.props.form.email.name}</label>
                  <input
                    placeholder={this.props.form.email.placeholder}
                    type={"email"}
                    name={"email"}
                    onChange={this.handleChange}
                    id={"email"}
                    required={true}
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor={"type"}>{this.props.form.type.name}</label>
                  <select name={"type"} id={"type"}>
                    {this.props.form.type.option.map(item => (
                      <option value={item.value}>{item.name}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.field}>
                  <label htmlFor={"message"}>
                    {this.props.form.message.name}
                  </label>
                  <textarea
                    placeholder={this.props.form.message.placeholder}
                    rows={7}
                    name={"message"}
                    onChange={this.handleChange}
                    id={"message"}
                    required={true}
                  />
                </div>
                <div className={styles.field}>
                  <div data-netify-recaptcha="true"></div>
                </div>
                <div className={styles.submitButton}>
                  <Button title={this.props.form.submit} type="submit" />
                </div>
              </form>
            ) : (
              <div className={styles.thanks}>
                <h3>{this.props.submitSuccessMessage.title}</h3>
                <p>{this.props.submitSuccessMessage.subTitle}</p>
                <Link to="/">
                  <Button title={this.props.submitSuccessMessage.linkToHome} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ContactPageTemplate;