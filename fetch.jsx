const React = require('react');

const Fetch = (function () {
  const proxy = require('../utils/proxy');

  class Fetch extends React.Component {
    constructor(props) {
      super(props);

      var _resolve, _reject;
      this.__promise = new Promise( (resolve, reject) => { _resolve = resolve; _reject = reject; });

      this.state = {};
      this.state.loading = true;
      this.state.error = false;

      this.__opts = {};
      this.__opts.url = this.props.url;
      this.__opts.success = this._switch(_resolve);
      this.__opts.error = this._switch(_reject, true);

      this.__data = null;
    }

    componentDidMount() {
      this._fetchData();
    }

    _switch(r, er) {
      return (a) => {
        this.setState({error: er});
        this.__response = a;
        r(a);
      }
    }

    _fetchData() {
      if(this.__opts.url)
        proxy(this.__opts);
      else
        console.warn('no url provided for the request');

      this.__promise.then(this._renderResponse.bind(this), this._renderError.bind(this)).then(() => this.setState({loading: false}));
    }
    
    /* 
     * Extend this method from subclass component
     */
    _renderResponse(r) {
      return null;
    }
    
    /* 
     * Extend this method from subclass component
     */
    _renderError(e) {
      return null;
    }

    render() {
      const {state: {loading, error}} = this;
      const display =
        loading ? <div> loading... </div> :
        error ? <div> ERROR </div> :
        this.__renderedResponse

      return <div> {display} </div>;
    }
  }

  return Fetch;

}());



module.exports = Fetch;
