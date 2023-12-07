import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
//import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  // articles=[
  //     {
  //       "source": {
  //         "id": null,
  //         "name": "Hindustan Times"
  //       },
  //       "author": "Kunal Gaurav",
  //       "title": "Rajasthan Exit Polls 2023 LIVE Updates: Pollsters give edge to BJP; Cong close - Hindustan Times",
  //       "description": "Rajasthan Exit Polls 2023 LIVE Updates: Explore the battlegrounds and key clashes of the 2023 Rajasthan Assembly Elections.",
  //       "url": "https://www.hindustantimes.com/india-news/rajasthan-exit-polls-2023-live-updates-rajasthan-elections-exit-poll-tonk-jhalrapatan-nathdwara-jhotwara-kota-101701325418039.html",
  //       "urlToImage": "https://www.hindustantimes.com/ht-img/img/2023/11/30/1600x900/rajasthan_exit_poll_results_2023_1701330617897_1701330629373.jpg",
  //       "publishedAt": "2023-11-30T12:37:19Z",
  //       "content": "Rajasthan Exit Polls 2023 LIVE Updates: Today marks the culmination of an intense election season with voting in Telangana, one of the five states that went to polls this month. Mizoram and Chhattisg… [+13485 chars]"
  //     },
  //     {
  
  //              ]

  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "sports",
  };
  static PropsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  //document.title first letter Capital
  CapitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  constructor(props) {
    super(props);
    console.log(
      "hello I have to write some news description in my web page application.."
    );
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    document.title = `${this.CapitalizeFirstLetter(
      this.props.category
    )} -NewsApp`;
  }

  async UpdateNews() {
    this.props.setProgress(0);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true }); //show spiner
    let data = await fetch(url);
    let parseData = await data.json();
    console.log("show parseData", parseData);
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
     
    }); //hide spiner

    this.props.setProgress(100);
    }
  async componentDidMount() {
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})//show spiner
    // let data= await fetch(url);
    // let parseData=await data.json();
    // console.log('show parseData',parseData);
    // this.setState({
    //   articles: parseData.articles,
    //   totalResults: parseData.totalResults,
    // loading:false})//hide spiner

    this.UpdateNews();
  }
  handlePrevClick = async () => {
    // console.log("prev===")
    // let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true})//show spiner
    // let data= await fetch(url);
    // let parseData=await data.json();
    // console.log('show parseData',parseData);
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parseData.articles,
    //   loading:false//hide spiner 
    //  })
    this.setState({
      page: this.state.page - 1,
    });
    this.UpdateNews();
  };
  // fetchMoreData = async () => {
  //   const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  //   let data = await fetch(url);
  //   let parseData = await data.json();
  //   console.log("show parseData", parseData);
  //   this.setState({
  //     articles: this.state.articles.concat(parseData.articles),
  //     totalResults: parseData.totalResults,
 //   }); //hide spiner
  // };
  handleNextClick = async () => {
    // console.log("next===")
    // if(!(
    //   //total number of pages.
    //   this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)))
    // {

    //       let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     this.setState({loading:true})//show spiner
    //       let data= await fetch(url);
    //       let parseData=await data.json();
    //       console.log('show next parseData',parseData);
    //       this.setState({
    //         page: this.state.page + 1,
    //         articles: parseData.articles ,
    //         loading:false })
    this.setState({
      page: this.state.page + 1,
    });
    this.UpdateNews();
  };
  render() {
    return (
      <>
        
   
   { /* loading pages with spiner gif and next-prev button code...*/}
   <div className='container my-3' >
 
        <h1 className='text-center' style={{margin:'40px'}}>Top {this.CapitalizeFirstLetter(this.props.category)} News...</h1>
        {this.state.loading &&<Spinner/>}
   <div className='row'>
        { 
        !this.state.loading && this.state.articles.map((element)=>{
           return<div className="col-md-4" 
           key={element.url}>

      <NewsItems 
       newsurl={element.url}
       title={element.title.slice(0,20)}
       description={element.description} 
       imageurl={element.urlToImage}
       author={element.author}
       date={element.publishedAt}
       source={element.source.name}

       />

    </div>
     
        })}
    </div>
    <div className='container d-flex justify-content-between my-3'>
<button type="button" disabled={this.state.page<=1}  className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Prev</button>
<button type="button" disabled={this.state.page + 1 > this.state.totalResults/this.props.pageSize} className="btn btn-dark"onClick={this.handleNextClick} >Next &rarr; </button>
</div>

    </div> 

        {/* 
    // Add InfiniteScroll up to down with spinner
         but key elements are duplicate and show error
         "Encountered two children with the same key" //

        <h1 className="text-center" style={{ margin: "40px" }}>
          Top {this.CapitalizeFirstLetter(this.props.category)} News...
        </h1>

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="Container">
            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItems
                    newsurl={element.url}
                    title={element.title.slice(0, 20)}
                    description={element.description?element.description:""}
                    imageurl={element.urlToImage}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>;
              })}
            </div>
          </div>
        </InfiniteScroll> */}
      </>
    );
  }
}

export default News;
