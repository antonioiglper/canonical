export const GetPost = () => {
    const body = fetch('https://admin.insights.ubuntu.com/wp-json/wp/v2/posts?per_page=3&page=1&_embed=True').then( res => res.json() );
    return body;
  };