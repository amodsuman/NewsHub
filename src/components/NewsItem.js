import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <img
            src={
              !imageUrl
                ? "https://content.api.news/v3/images/bin/24bfbc04011877bd77d9bdb061be8ecd"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}
              <span className="position-absolute top-0 m-1 start-0 badge rounded-lg bg-warning">
                {source}
              </span>
            </h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Unknown"} on{" "}
                {new Date(date).toUTCString()}
              </small>
            </p>
            <a href={newsUrl} target="blank" className="btn btn-sm btn-dark">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem