
/* Each time we change the like array, it should store the data in local storage */
export default class Likes{
  constructor(){
    this.likes = []
  }


  addLike(id, title, author, img){
    const like = {
      id: id,
      title: title,
      author: author,
      img: img
    };
    this.likes.push(like);


    // Persist data in localStorage
    this.persistData();

    return like;
  }

  deleteLike(id){
    const index = this.likes.findIndex(el=>el.id === id)
    this.likes.splice(index, 1);


    // Persist data in localStorage
    this.persistData();
  }

  isLiked(id){
    return this.likes.findIndex(el=>el.id === id) !== -1;
  }

  getNumLikes(){
    return this.likes.length;
  }

  persistData(){
    localStorage.setItem('likes', JSON.stringify(this.likes));   //cause in localStorage only can set STRING.  So need to convert like array into string by JSON.stringify()
  }


  /* Read the data back from localStorage when we load the page */
  readStorage(){
    const storage = JSON.parse(localStorage.getItem('likes')); //convert everything(string) back to the structure(array)

    //Restoring likes from the localStorage
    if(storage)  this.likes = storage;
  }


}
