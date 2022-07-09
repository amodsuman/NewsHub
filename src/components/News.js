import React, { Component } from 'react';
import { NewsItem } from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';

export class News extends Component {   
    
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        if(this.props.category === "general") {
            document.title = "NewsHub - Top Headlines";
        } else {
            document.title = `NewsHub - ${this.capitalizeFirstLetter(this.props.category)} News`;
        }
    }

    async componentDidMount() {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=1`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
    }
    

    handlePrevClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page - 1}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
            loading: false
        })
    }

    handleNextClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles,
            loading: false
        })
    }

    

  render() {
    return (
        <div className='container'>
            <h1 className='text-center my-4'>Top Headlines - {this.capitalizeFirstLetter(this.props.category)}</h1>
            {this.state.loading && <Spinner />}
            <div className="row">
                {!this.state.loading && this.state.articles.map((element) => {
                    return <div key={element.url}>
                        <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                    </div>            
                })}
            </div>
            <div className="container d-flex justify-content-center my-4">
                <button disabled={this.state.page <= 1} type="button" className="btn btn-dark mx-1" onClick={this.handlePrevClick}>&larr; Prev</button>
                <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark mx-1" onClick={this.handleNextClick}>Next &rarr;</button>
            </div>
        </div>
    )
  }
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News