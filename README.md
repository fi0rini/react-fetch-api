# react-fetch-api
base react component for fetching data from an api and rendering it

## instructions
to use :

```
class SampleFetchComponent extends Fetch {
  // extend this function to modify the response object
  // returned from the server
  _renderResponse() {
    // make sure to set this.__renderedResponse,
    // this will be rendered in the supers render() method
    // once the api request is finished
      this.__renderedResponse =
        <div className="my-data">
          {this.__response.someDataArray
            .map((d, i) => {
              var datum =
                <div key={i} className="a-datum">
                  {d.name}
                </div>

              return datum;
            })}
        </div>;

  }
}

// somewhere in other components render method...
...
render() {
  return <SampleFetchComponent url='http://url:300/path/to/api' />;
}
...

```
