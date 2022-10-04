class Helper {
    
    seo(data = {}) {

        data.title = (data.title ? data.title + ' | Movie App' : '') || 'Movie App';
        data.metaDescription = data.metaDescription || 'This is Movie App';
      
        document.title = data.title;
        document.querySelector('meta[name="description"]').setAttribute('content', data.metaDescription);
    }

}  

export default new Helper();