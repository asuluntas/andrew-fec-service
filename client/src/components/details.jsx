import React from 'react';
import axios from 'axios';

class Details extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle: false,
      id: (this.props.match.params.id),
      details: null
    }
  }

  componentDidMount() {
    if (this.state.details === null) {
      this.getMainDetails();
    }
  }

  getMainDetails() {
    const { id } = this.state;
    axios.get(`/books/${id}/details`)
      .then((res) => {
        this.setState({
          details: res.data
        })
      })
      .catch((err) => console.log('error get details', err));
  }


  render() {
    console.log(this.state.details);
    if (!this.state.details) {
      return( <div></div> )
    }

    let { type, pagenum, originalPubDate, firstPubDate, publisher } = this.state.details
    let typeAndPageNumberLine = `${type}, ${pagenum} pages`
    let publishInfoLine = `Published ${originalPubDate} by ${publisher} (first published ${firstPubDate})`

    return (
      <div>
        <div>{typeAndPageNumberLine}</div>
        <div>{publishInfoLine}</div>
      </div>
    )
  }
}


export default Details;
