import { GetPost } from './utils';
const postEl = document.querySelector('.post-row');
GetPost()
  .then(res => {
      console.log(res)
      var markup = '';
      res.forEach(post => {
        var monthNames = [
          "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ];
        var author = post._embedded.author.find(element => element.id == post.author);
        var featured_media = post._embedded['wp:featuredmedia'].find(element => element.id == post.featured_media);
        var group = null;

        if(post.group.length > 0){
          group = post._embedded['wp:term'][3].find(element => element.id == post.group[0]);
        }
        else{
          group.name = 'No group defined';
        }
        var date = new Date(post.date);
        markup += 
        '<div class="col-small-12 col-medium-6 col-4">' +
        '<div class="p-card--highlighted post-card">' +
        '<p class="group-tag">'+ group.name +'</p>' +
        '<hr class="u-sv1">' +
        '<a href="'+ post.link+'"><img src="'+ featured_media.source_url +'" alt="'+ featured_media.alt_text +'" title="'+ featured_media.title.rendered+'"></a>' +
        '<h3 class="p-card__title"><a class="canonical-link" href="'+ post.link +'">'+post.title.rendered+'</a></h3>' +
        '<p class="author">By <a class="canonical-link" href="'+ author.link +'">' + author.name +'</a> on '+ date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear() + '</p>' +
        '<hr class="u-sv1">' +
        post.excerpt.rendered +
        '</div>' +
        '</div>'
      });
      postEl.innerHTML = markup;
  }).catch(err => (postEl.innerHTML = err));