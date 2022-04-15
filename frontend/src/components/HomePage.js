import React from 'react'
import usePost from '../usePost';

function showhtml(htmlString){
  var html = {__html:htmlString};
  return <div dangerouslySetInnerHTML={html}></div>;
}

//This is the homepage, use <Typography> to typography the content.
export default function HomePage() {
  const cart = {
    appid:'730',
    count:'3'
  }

  const {data: newsData, error : isError} = usePost('/api/steamApi/getNews', [], cart);
  console.log(isError);
  if(isError){
    return(
      <div>
        error
      </div>
    )
  }

  const newsSummaries = newsData.map(news => ({id: news.gid, title: news.title, url:news.url, author:news.author, content:news.contents}));

  return (
    <div>
      {newsSummaries.map(os => (
          <div key={os.id}>
            <p>{os.id}</p>
            {showhtml(os.content)}
          </div>
      ))}
      </div>
  )
}


